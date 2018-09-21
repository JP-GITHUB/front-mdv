var objAuth = {
    apiUrl: 'http://localhost:3001',
    logginUser(email, password) {
        if ($.trim(email) == "" || $.trim(password) == "") {
            $.alert({ title: 'Error!', content: 'Ambos campos son requeridos' });
            return;
        }

        $.ajax({
            url: this.apiUrl + '/auth/login',
            data: {
                email: email,
                password: password
            },
            method: 'POST',
            dataType: 'JSON',
            success: function (obj) {
                if (obj.status) {
                    localStorage.setItem("currentUser", JSON.stringify({
                        email: email,
                        token: obj.token,
                        user_data: obj.user_data
                    }));

                    objAuth.statusSession();
                } else {
                    $.alert({ title: 'Error!', content: obj.msg });
                    $("#txt_email, #txt_pswd").val("");
                }
            },
            error: function (err) {

            }
        });
    },

    closeSession() {
        localStorage.removeItem("currentUser");
        $(".dropdown_session").css("display", "none");
        $("#dropdown_session #dropdownMenuButton").html("");
        $("#span_uareregistered, #loginBtn").css("display", "block");
        window.location.href = "/";
    },

    checkSession() {
        return (localStorage.getItem("currentUser")) ? true : false;
    },

    statusSession() {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser) {
            if (
                currentUser.user_data.PERFIL.nombre === 'ADMIN' ||
                currentUser.user_data.PERFIL.nombre === 'ADMININSTRADOR' ||
                currentUser.user_data.PERFIL.id === 1
            ) {
                $("#session_dynamic_option").append($("adm-dropdown-options").html())
            }

            $(".dropdown_session").css("display", "block");
            $("#dropdown_session #dropdownMenuButton").html(currentUser.email);
            $("#span_uareregistered, #loginBtn").css("display", "none");
        } else {
            $(".dropdown_session").css("display", "none");
            $("#dropdown_session #dropdownMenuButton").html("");
            $("#span_uareregistered, #loginBtn").css("display", "block");
        }
    },

    init: function (settings) {
        objAuth.statusSession();
    }
};

$(document).ready(() => {
    $("#btn_login").click(function (e) {
        e.preventDefault();
        let email = $("#txt_email").val();
        let password = $("#txt_pswd").val();

        objAuth.logginUser(email, password);
    });

    $("#btn_close_session").click(function (e) {
        objAuth.closeSession();
    });

    objAuth.init();
});