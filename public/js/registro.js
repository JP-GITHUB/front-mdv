$(document).ready(function () {
    $("#btnGuardarfrm").click(function (e) {
        e.preventDefault();

        if ($('#Nombre').val() === "") {
            $('#Nombre').addClass('is-invalid');
            return;
        } else {
            $('#Nombre').removeClass('is-invalid');
        }

        if ($('#Apellido').val() === "") {
            $('#Apellido').addClass('is-invalid');
            return;
        } else {
            $('#Apellido').removeClass('is-invalid');
        }

        if ($('#Run').val() === "") {
            $('#Run').addClass('is-invalid');
            return;
        } else {
            $('#Run').removeClass('is-invalid');

            if (validate($('#Run').val()) === false) {
                $.alert({
                    title: 'Error!',
                    content: 'El campo rut es Inválido',
                });

                $('#Run').val("");
            }
        }

        if ($('#Email').val() === "") {
            $('#Email').addClass('is-invalid');
            return;
        } else {
            $('#Email').removeClass('is-invalid');

            if (validar_email($('#Email').val()) === false) {
                $.alert({
                    title: 'Error!',
                    content: 'El campo Email es Inválido',
                });

                $('#Email').val("");
            }
        }

        if ($('#Telefono').val() === "") {
            $('#Telefono').addClass('is-invalid');
            return;
        } else {
            $('#Telefono').removeClass('is-invalid');
        }

        if ($('#Pwd').val() === "") {
            $('#Pwd').addClass('is-invalid');
            return;
        } else {
            $('#Pwd').removeClass('is-invalid');
        }

        if ($('#Pwdrpt').val() === "") {
            $('#Pwdrpt').addClass('is-invalid');
            return;
        } else {
            $('#Pwdrpt').removeClass('is-invalid');
        }

        if ($('#Pwd').val() !== $('#Pwdrpt').val()) {
            $.alert({
                title: 'Error!',
                content: 'Las contraseñas deben ser iguales',
            });

            $('#Pwd, #Pwdrpt').addClass('is-invalid');
        } else {
            $('#Pwd, #Pwdrpt').removeClass('is-invalid');
        }

        $.ajax({
            url: 'http://localhost:3001/usuarios/register',
            method: 'POST',
            dataType: 'json',
            data: {
                nombre: $('#Nombre').val(),
                apellido: $('#Apellido').val(),
                run: $('#Run').val(),
                mail: $('#Email').val(),
                telefono: $('#Telefono').val(),
                password: $('#Pwd').val(),
                rptpassword: $('#Pwdrpt').val(),
            },
            success: function (data) {
                console.log(data);
                $.alert({
                    title: 'Registro!',
                    content: 'Completado'
                });
            },
            error: function (err) {

            }
        })
    })
})

function validar_email(email) {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
}

function clean(rut) {
    return typeof rut === 'string'
        ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase()
        : ''
}

function validate(rut) {
    if (typeof rut !== 'string') {
        return false
    }
    if (!/^0*(\d{1,3}(\.?\d{3})*)-?([\dkK])$/.test(rut)) {
        return false
    }

    rut = clean(rut)

    var t = parseInt(rut.slice(0, -1), 10)
    var m = 0
    var s = 1

    while (t > 0) {
        s = (s + (t % 10) * (9 - m++ % 6)) % 11
        t = Math.floor(t / 10)
    }

    var v = s > 0 ? '' + (s - 1) : 'K'
    return v === rut.slice(-1)
}

function format(rut) {
    rut = clean(rut)

    var result = rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1)
    for (var i = 4; i < rut.length; i += 3) {
        result = rut.slice(-3 - i, -i) + '.' + result
    }

    return result
}