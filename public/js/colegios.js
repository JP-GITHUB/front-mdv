var colegioContent = '';
var colegios = "";

$(document).ready(() => {

    $("#btn_save").click(function () {
        objColegios.newSchool();
    });

    var objColegios = {
        apiUrl: 'http://localhost:3001',

        newSchool: function () {
            let nombre = $("#txt_nombre").val();
            let rut = $("#txt_rut").val();
            let direccion = $("#txt_direccion").val();
            let telefono = $("#txt_telefono").val();
            let sucursal = $("#cbx_sucursales").val();
           
            if(nombre == "" || rut == "" || direccion == "" || telefono == "" || sucursal == "0" || sucursal == null){
                $.alert({ title: 'Error!', content: 'Todos los campos son obligatorios.' });
                return false;
            }

            $.ajax({
                url: this.apiUrl + "/schools",
                method: 'POST',
                dataType: 'json',
                data: {
                    nombre: nombre,
                    rut: rut,
                    direccion: direccion,
                    telefono: telefono,
                    sucursal: sucursal
                },
                success: function (data) {
                    if (data.status) {
                        objColegios.clearControls();
                        $.alert({ title: 'Agregando!', content: data.msg });
                    } else {
                        $.alert({ title: 'Agregando!', content: data.msg });
                    }
                },
                error: function (err) {
                    $.alert({ title: 'Agregando!', content: 'Error en el proceso.' });
                }
            });

        },

        clearControls() {
            $("#txt_nombre").val("");
            $("#txt_rut").val("");
            $("#txt_direccion").val("");
            $("#txt_telefono").val("");
            $("#cbx_sucursales").attr("value", "0");
        },

        init: function (settings) {
            if (!objAuth.checkSession()) {
                window.location.href = "/";
            }

            this.storage_data = JSON.parse(localStorage.getItem("currentUser"));
        },
    };

    objColegios.init();
});