var objAuth = {
    apiUrl: 'http://localhost:3001',
    logginEmail(email, password) {
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
                        token: obj.token
                    }));

                    if (obj.user_data.PERFIL.nombre === 'ADMIN') {
                        $("#session_dynamic_option").append(
                            `<a class="dropdown-item" href="/usuarios">Administrar Usuario</a>
                             <a class="dropdown-item" href="/perfiles">Administrar Perfiles</a>`
                        );
                    }

                    $("#dropdown_session #dropdownMenuButton").html(email);
                    $("#span_uareregistered, #loginBtn").css("display", "none");
                    $(".dropdown_session").css("display", "block");
                } else {
                    $.alert({
                        title: 'Error!',
                        content: obj.msg,
                    });
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

    checkSession(){
        return (localStorage.getItem("currentUser")) ? true : false;
    },

    statusSession() {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser) {
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

        objAuth.logginEmail(email, password);
    });

    $("#btn_close_session").click(function (e) {
        objAuth.closeSession();
    });

    objAuth.init();
});