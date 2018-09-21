$(document).ready(() => {
    $("#btn_recovery").click(function (e) {
        e.preventDefault();

        $.ajax({
            url: 'http://localhost:3001/usuarios/forgot_password',
            method: 'POST',
            dataType: 'json',
            data: {
                email: $("#txt_email_forgot").val()
            },
            success: function (data) {
                console.log(data);
                $(".dv_sended").css("display", "block");
                $(".dv_recovery").css("display", "none");
                $.alert({
                    title: 'Success!',
                    content: data.msg,
                });
            },
            error: function (err) {
                console.log(err);
                $.alert({
                    title: 'Error!',
                    content: data.msg,
                });
            }
        })
    });

    $("#btn_change").click(function (e) {
        e.preventDefault();
        let mail = JSON.parse(localStorage.getItem("currentUser")).email;

        $.ajax({
            url: 'http://localhost:3001/usuarios/change_password',
            method: 'POST',
            dataType: 'json',
            data: {
                mail: mail,
                old_pass: $("#txt_oldpass").val(),
                new_pass: $("#txt_newpass").val(),
                new_pass_confirm: $("#txt_newpass_confirm").val()
            },
            success: function (data) {
                console.log(data);
                $(".dv_sended").css("display", "block");
                $(".dv_change").css("display", "none");
                $.alert({
                    title: 'Success!',
                    content: data.msg,
                });
            },
            error: function (err) {
                console.log(err);
                $.alert({
                    title: 'Error!',
                    content: data.msg,
                });
            }
        })
    })
});