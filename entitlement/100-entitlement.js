module.exports = function(RED) {

    var https = require('https');
    var querystring = require("querystring");
    var url = require("url");
    
    function checkAndAuthenticate(data) {
        if (!data.config.useAuth) {
            data.callback(data);
            return;
        }
        var node = data.node;
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        var callPath = "/services/AuthenticationAdmin/login?username=" + data.username + "&password=" + data.password + "&remoteAddress=127.0.0.1";
        https.get(data.config.url + callPath, function(res) {
            res.on('data', function (payload) {
                if (payload.toString().indexOf("false") == -1) {
                    data.callback(data);
                } else {
                    node.warn("Unable to login as: " + data.username);
                    setHeaders(data.req,data.res);
                }
            });
        }).on('error', function(e) {
            node.warn("Error while authenticating: " + e.message);
        });
    }

    function checkAndDoEntitlement(data) {
        if (!data.config.useEntitlement) {
            data.callback(data);
            return;
        }
        var node = data.node;
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        var serverURL = url.parse(data.config.url);
        var authString = "";
        if (data.adminUsername) {
            authString = data.adminUsername + ":" + (data.adminPassword||"");
        } else {
            authString = data.username + ":" + (data.password||"");
        }
        var options = {
            hostname: serverURL.hostname,
            port: serverURL.port,
            path: "/services/EntitlementService/getBooleanDecision?subject=" + data.username + "&resource=" + data.req.url + "&action=" + data.req.method,
            auth: authString
        };
        https.get(options, function(res) {
            res.on('data', function (payload) {
                if (res.statusCode == 500) {
                    node.warn("Error while validating entitlement");
                } else if (payload.toString().indexOf("false") == -1) {
                    data.callback(data);
                    return;
                } else {
                    node.warn("The user " + data.username + " is not allowed to perform the given operation");
                }
                setHeaders(data.req,data.res);
            });
        }).on('error', function(e) {
            node.warn("Error while validating entitlement: " + e.message);
        });
    }

    function setHeaders(req,res) {
        res.set('WWW-Authenticate', 'Basic realm="WSO2 Identity Server Login"');
        res.send(401,req.query);
    }

    function EntitlementNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
            var req = msg.req;
            var res = msg.res;
            var credentials = RED.nodes.getCredentials(config.id);
            var authData = {};
            if (credentials && credentials.user) {
                authData = {
                    username: credentials.user,
                    password: credentials.password||""
                };
            } else if (req.headers.authorization) {
                var authHeader = req.headers.authorization;
                var credString = new Buffer(authHeader.substring("Basic".length).trim(), 'base64').toString('ascii');
                var username = credString.split(":")[0];
                var password = credString.split(":")[1];
                var authData = {
                    username: username,
                    password: password
                };
            }
            if (authData.username) {
                authData.node = node;
                authData.config = config;
                authData.req = req;
                authData.res = res;
                if (credentials && credentials.admin) {
                    authData.adminUsername = credentials.admin;
                    authData.adminPassword = credentials.adminPassword||"";
                }
                authData.callback = 
                    function(data) {
                        data.callback = function(data) {
                            node.send(msg);
                        }
                        checkAndDoEntitlement(data);
                    };
                checkAndAuthenticate(authData);
            } else if (config.useAuth || config.useEntitlement) {
                setHeaders(req,res);
            } else {
                node.send(msg);
            }
        });
    }
    RED.nodes.registerType("entitlement",EntitlementNode);

    RED.httpAdmin.get('/entitlement/:id',function(req,res) {
        var credentials = RED.nodes.getCredentials(req.params.id);
        if (credentials) {
            res.send(JSON.stringify({user:credentials.user,hasPassword:(credentials.password&&credentials.password!=""),admin:credentials.admin,hasAdminPassword:(credentials.adminPassword&&credentials.adminPassword!="")}));
        } else {
            res.send(JSON.stringify({}));
        }
    });

    RED.httpAdmin.delete('/entitlement/:id',function(req,res) {
        RED.nodes.deleteCredentials(req.params.id);
        res.send(200);
    });

    RED.httpAdmin.post('/entitlement/:id',function(req,res) {
        var body = "";
        req.on('data', function(chunk) {
            body+=chunk;
        });
        req.on('end', function(){
            var newCreds = querystring.parse(body);
            var credentials = RED.nodes.getCredentials(req.params.id)||{};
            if (newCreds.user == null || newCreds.user == "") {
                delete credentials.user;
            } else {
                credentials.user = newCreds.user;
            }
            if (newCreds.admin == null || newCreds.admin == "") {
                delete credentials.admin;
            } else {
                credentials.admin = newCreds.admin;
            }
            if (newCreds.password == "") {
                delete credentials.password;
            } else {
                credentials.password = newCreds.password||credentials.password;
            }
            if (newCreds.adminPassword == "") {
                delete credentials.adminPassword;
            } else {
                credentials.adminPassword = newCreds.adminPassword||credentials.adminPassword;
            }
            RED.nodes.addCredentials(req.params.id,credentials);
            res.send(200);
        });
    });
}
