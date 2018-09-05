$(document).ready(() => {
    $("#menu-toggle ").click(function (e) {
        e.preventDefault();

        if (!$(".label-title").hasClass("d-none")) {
            $(".frm-buscar").addClass("d-none");
            $(".label-title").addClass("d-none");
        } else {
            $(".frm-buscar").removeClass("d-none");
            $(".label-title").removeClass("d-none");
        }

        $("#wrapper ").toggleClass("toggled ");
    });

    $("#btn_login").click(function (e) {
        e.preventDefault();
        let email = $("#txt_email").val();
        let password = $("#txt_pswd").val();

        objPage.logginEmail(email, password);
    });

    $("#btn_close_session").click(function (e) {
        objPage.closeSession();
    });


    var objPage = {
        apiUrl: 'http://localhost:3001',

        myMethod: function () {
            console.log(myFeature.myProperty);
        },

        getSchools: function () {
            $.ajax({
                url: this.apiUrl + '/schools',
                method: 'GET',
                dataType: 'JSON',
                success: function (obj) {
                    let tmp_menu_school = '';

                    $.each(obj['schools'], function (index, data) {

                        tmp_menu_school += '<a class="dropdown-item" href="/catalogo">' + data.name + '</a><div class="dropdown-divider"></div>';
                    });

                    $("#nav-app .dropdown-menu").html(tmp_menu_school);
                },
                error: function (err) {

                }
            });
        },

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
                        localStorage.setItem("currentEmail", JSON.stringify({
                            email: email,
                            token: obj.token
                        }));

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
            localStorage.removeItem("currentEmail");
            $(".dropdown_session").css("display", "none");
            $("#dropdown_session #dropdownMenuButton").html("");
            $("#span_uareregistered, #loginBtn").css("display", "block");
        },

        statusSession() {
            let currentEmail = JSON.parse(localStorage.getItem("currentEmail"));
            if (currentEmail) {
                $(".dropdown_session").css("display", "block");
                $("#dropdown_session #dropdownMenuButton").html(currentEmail.email);
                $("#span_uareregistered, #loginBtn").css("display", "none");
            } else {
                $(".dropdown_session").css("display", "none");
                $("#dropdown_session #dropdownMenuButton").html("");
                $("#span_uareregistered, #loginBtn").css("display", "block");
            }
        },

        init: function (settings) {
            objPage.statusSession();
            this.getSchools();
        },

        readSettings: function () {
            console.log(myFeature.settings);
        }
    };

    objPage.init();

});