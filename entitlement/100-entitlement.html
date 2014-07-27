<script type="text/javascript">
    RED.nodes.registerType('entitlement',{
        category: 'function',
        color: '#a6bbcf',
        defaults: {
            name: {value:""},
            url: {value:""},
            useAuth: {value:false},
            useEntitlement: {value:false}
        },
        inputs:1,
        outputs:1,
        icon: "file.png",
        label: function() {
            return this.name||"entitlement";
        },
        oneditprepare: function() {
            $.getJSON('entitlement/'+this.id,function(data) {
                if (data.user) {
                    $('#node-input-fixedCredentials').prop('checked', true);
                    $(".node-input--row").show();
                    $('#node-config-input-user').data("v",data.user);
                    $('#node-config-input-user').val(data.user);
                } else {
                    $('#node-input-fixedCredentials').prop('checked', false);
                    $(".node-input-fixedCredentials-row").hide();
                    $('#node-config-input-user').data("v",'');
                }
                if (data.admin) {
                    $('#node-input-useEntitlement').prop('checked', true);
                    $('#node-input-useAdminCredentials').prop('checked', true);
                    $(".node-input--row").show();
                    $('#node-config-input-admin').data("v",data.admin);
                    $('#node-config-input-admin').val(data.admin);
                } else {
                    $('#node-input-useAdminCredentials').prop('checked', false);
                    $(".node-input-useAdminCredentials-row").hide();
                    $('#node-config-input-admin').data("v",'');
                }
                if (data.hasPassword) {
                    $('#node-input-fixedCredentials').prop('checked', true);
                    $(".node-input-fixedCredentials-row").show();
                    $('#node-config-input-pass').data("v",'__PWRD__');
                    $('#node-config-input-pass').val('__PWRD__');
                } else {
                    $('#node-config-input-pass').data("v",'');
                    $('#node-config-input-pass').val('');
                }
                if (data.hasAdminPassword) {
                    $('#node-input-useEntitlement').prop('checked', true);
                    $('#node-input-useAdminCredentials').prop('checked', true);
                    $(".node-input-useEntitlement-row").show();
                    $(".node-input-useAdminCredentials-row").show();
                    $('#node-config-input-adminPass').data("v",'__PWRD__');
                    $('#node-config-input-adminPass').val('__PWRD__');
                } else {
                    $('#node-config-input-adminPass').data("v",'');
                    $('#node-config-input-adminPass').val('');
                }
            });

            $("#node-input-fixedCredentials").change(function() {
                if ($(this).is(":checked")) {
                    $(".node-input-fixedCredentials-row").show();
                } else {
                    $(".node-input-fixedCredentials-row").hide();
                }
            });
            $("#node-input-useEntitlement").change(function() {
                if ($(this).is(":checked")) {
                    $(".node-input-useEntitlement-row").show();
                    if ($("#node-input-useAdminCredentials").is(":checked")) {
                        $(".node-input-useAdminCredentials-row").show();
                    }
                } else {
                    $(".node-input-useEntitlement-row").hide();
                    $(".node-input-useAdminCredentials-row").hide();
                }
            })
            $("#node-input-useAdminCredentials").change(function() {
                if ($(this).is(":checked")) {
                    $(".node-input-useAdminCredentials-row").show();
                } else {
                    $(".node-input-useAdminCredentials-row").hide();
                }
            })
        },
        oneditsave: function() {
            var oldUser = $('#node-config-input-user').data("v");
            var oldAdmin = $('#node-config-input-admin').data("v");
            var oldPass = $('#node-config-input-pass').data("v");
            var oldAdminPass = $('#node-config-input-adminPass').data("v");
            var newUser = $('#node-config-input-user').val();
            var newAdmin = $('#node-config-input-admin').val();
            var newPass = $('#node-config-input-pass').val();
            var newAdminPass = $('#node-config-input-adminPass').val();

            if (!$("#node-input-fixedCredentials").is(":checked")) {
                newUser = "";
                newPass = "";
            }
            if (!$("#node-input-useEntitlement").is(":checked") || !$("#node-input-useAdminCredentials").is(":checked")) {
                newAdmin = "";
                newAdminPass = "";
            }

            var madeChanges;
            if (oldUser != newUser || oldPass != newPass) {
                if (newUser == "" && newPass == "") {
                    $.ajax({
                        url: 'entitlement/'+this.id,
                        type: 'DELETE',
                        success: function(result) {}
                    });
                } else {
                    var credentials = {};
                    credentials.user = newUser;
                    if (newPass != '__PWRD__') {
                        credentials.password = newPass;
                    }
                    $.ajax({
                        url: 'entitlement/'+this.id,
                        type: 'POST',
                        data: credentials,
                        success:function(result){}
                    });
                }
                madeChanges = true;
            }
            if (oldAdmin != newAdmin || oldAdminPass != newAdminPass) {
                if (newAdmin == "" && newAdminPass == "") {
                    $.ajax({
                        url: 'entitlement/'+this.id,
                        type: 'DELETE',
                        success: function(result) {}
                    });
                } else {
                    var credentials = {};
                    credentials.admin = newAdmin;
                    if (newAdminPass != '__PWRD__') {
                        credentials.adminPassword = newAdminPass;
                    }
                    $.ajax({
                        url: 'entitlement/'+this.id,
                        type: 'POST',
                        data: credentials,
                        success:function(result){}
                    });
                }
                madeChanges = true;
            }
            if (madeChanges) {
                return true;
            }
        }
    });
</script>

<script type="text/x-red" data-template-name="entitlement">
    <div class="form-row">
        <label for="node-input-url"><i class="fa fa-globe"></i> Server URL</label>
        <input type="text" id="node-input-url" placeholder="https://localhost:9443">
    </div>
    <div class="form-row">
        <label>&nbsp;</label>
        <input type="checkbox" id="node-input-useAuth" style="display: inline-block; width: auto; vertical-align: top;">
        <label for="node-input-useAuth" style="width: 70%;">Enable Authentication</label>
    </div>
    <div class="form-row">
        <label>&nbsp;</label>
        <input type="checkbox" id="node-input-fixedCredentials" style="display: inline-block; width: auto; vertical-align: top;">
        <label for="node-input-fixedCredentials" style="width: 70%;">Hard-code Credentials?</label>
    </div>
    <div class="form-row node-input-fixedCredentials-row">
        <label for="node-config-input-user"><i class="fa fa-user"></i> Username</label>
        <input type="text" id="node-config-input-user">
    </div>
    <div class="form-row node-input-fixedCredentials-row">
        <label for="node-config-input-pass"><i class="fa fa-lock"></i> Password</label>
        <input type="password" id="node-config-input-pass">
    </div>
    <div class="form-row">
        <label>&nbsp;</label>
        <input type="checkbox" id="node-input-useEntitlement" style="display: inline-block; width: auto; vertical-align: top;">
        <label for="node-input-useEntitlement" style="width: 70%;">Enable Entitlement</label>
    </div>
    <div class="form-row node-input-useEntitlement-row">
        <label>&nbsp;</label>
        <input type="checkbox" id="node-input-useAdminCredentials" style="display: inline-block; width: auto; vertical-align: top;">
        <label for="node-input-useAdminCredentials" style="width: 70%;">Provide Admin Credentials?</label>
    </div>
    <div class="form-row node-input-useAdminCredentials-row">
        <label for="node-config-input-admin"><i class="fa fa-user"></i> Username</label>
        <input type="text" id="node-config-input-admin">
    </div>
    <div class="form-row node-input-useAdminCredentials-row">
        <label for="node-config-input-adminPass"><i class="fa fa-lock"></i> Password</label>
        <input type="password" id="node-config-input-adminPass">
    </div>
    <div class="form-row">
        <label for="node-input-name"><i class="icon-tag"></i> Name</label>
        <input type="text" id="node-input-name" placeholder="Name">
    </div>
</script>

<script type="text/x-red" data-help-name="entitlement">
    <p>A node that performs <b>authentication</b> and <b>entitlement</b> using WSO2 Identity Server</p>
</script>
