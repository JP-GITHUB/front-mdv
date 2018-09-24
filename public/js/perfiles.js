$(document).ready(() => {

    $("#btn_save").click(function () {
        objPerfiles.editPerfil();
    });

    $("#btn_new").click(function () {
        objPerfiles.newPerfil();
    });

    $("#btn_delete").click(function () {
        objPerfiles.deletePerfil();
    });

    var objPerfiles = {
        apiUrl: 'https://api-mdv.herokuapp.com',
        storage_data: null,
        editPerfil: function () {
            let table_instance = $('#table_perfiles').DataTable();
            let id = $("#hidd_id").val();
            let nombre = $("#txt_nombre").val();

            $.ajax({
                url: this.apiUrl + "/perfiles",
                method: 'PUT',
                dataType: 'json',
                headers: {
                    authorization: this.storage_data.token
                },
                data: {
                    id: id,
                    nombre: nombre
                },
                success: function (data) {
                    table_instance.ajax.reload();
                },
                error: function (err) {

                }
            });

        },

        newPerfil: function() {
            let table_instance = $('#table_perfiles').DataTable();
            let nombre = $("#txt_new").val();

            $.ajax({
                url: this.apiUrl + "/perfiles",
                method: 'POST',
                dataType: 'json',
                data: {
                    nombre: nombre
                },
                success: function (data) {
                    table_instance.ajax.reload();
                },
                error: function (err) {

                }
            });
            
        },

        deletePerfil: function(){
            let table_instance = $('#table_perfiles').DataTable();
            let id = $("#hidd_id").val();

            $.ajax({
                url: this.apiUrl + "/perfiles",
                method: 'DELETE',
                dataType: 'json',
                data: {
                    id: id
                },
                success: function (data) {
                    table_instance.ajax.reload();
                },
                error: function (err) {

                }
            });
        },

        init_datatables: function () {
            let table = $('#table_perfiles').DataTable({
                "ajax": {
                    url: this.apiUrl + '/perfiles',
                    headers: {
                        authorization: this.storage_data.token
                    }
                },
                "columns": [
                    { "data": "id" },
                    { "data": "nombre" },
                    { "data": "estado" },
                    {
                        mRender: function (data, type, row) {
                            var linkEdit = '<button type="button" class="btn btn-success" data-id="' + row.id + '" data-toggle="modal" data-target="#edit_modal">'+
                            '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>Editar</button>';
                            linkEdit = linkEdit.replace("-1", row.ID);

                            var linkDelete = '<button type="button" id="dtBtonoRechazar" class="btn btn-danger" data-id="' + row.id + '"data-toggle="modal" data-target="#delete_modal">'+
                            '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>Eliminar</button>';
                            linkDelete = linkDelete.replace("-1", row.ID);

                            return linkEdit + " | " + linkDelete;
                        }
                    }
                ],
                "responsive": true
            });

            $('#table_perfiles tbody').on('click', 'tr', function () {
                let data = table.row(this).data();
                $("#hidd_id").val(data.id);
                $("#txt_nombre").val(data.nombre);
                $("#cbx_estado").val((data.estado) ? 1 : 2);
            });
        },

        init: function (settings) {
            if (!objAuth.checkSession()) {
                window.location.href = "/";
            }

            this.storage_data = JSON.parse(localStorage.getItem("currentUser")); 
            objPerfiles.init_datatables();
        },
    };

    objPerfiles.init();

});

function FormatoFecha(fecha) {
    //DECLARACION
    var date = "";
    var año = "";
    var mes = "";
    var dia = "";
    var hora = "";
    var minuto = "";
    var segundo = "";
    //ASIGNACION  
    date = new Date(fecha);
    año = date.getFullYear();
    mes = date.getMonth() + 1;
    dia = date.getDate();
    hora = date.getHours();
    minuto = date.getMinutes();
    segundo = date.getSeconds();
    if (mes < 10) { mes = '0' + mes }
    if (dia < 10) { dia = '0' + dia }
    if (hora < 10) { hora = '0' + hora }
    if (minuto < 10) { minuto = '0' + minuto }
    if (segundo < 10) { segundo = '0' + segundo }
    var formatoFecha = "<div> Fecha: " + dia + "-" + mes + "-" + año + " </div><div> Hora &nbsp: " + hora + ":" + minuto + ":" + segundo + "</div>";
    return formatoFecha;
};