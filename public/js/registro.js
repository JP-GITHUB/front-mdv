$(document).ready(function() {
    $("#btnGuardarfrm").click(function(e) {
        e.preventDefault();
        $.ajax({
            url: 'http://localhost:3001/usuarios/register',
            method: 'POST',
            dataType: 'json',
            data: {

                nombre: $('#Nombre').val(),
                apellido: $('#Apellido').val(),
                run: $('#Run').val(),
                email: $('#Email').val(),
                telefono: $('#Telefono').val(),
                password: $('#Pwd').val(),
                rptpassword: $('#Pwdrpt').val(),
            },
            success: function(data) {
                console.log(data)
            },
            error: function(err) {

            }
        })
    })
})