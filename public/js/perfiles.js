$(document).ready(() => {

    $("#btn_save").click(function () {
        objPerfiles.editPerfil();
    });

    $("#btn_new").click(function () {
        objPerfiles.newPerfil();
    });

    var objPerfiles = {
        apiUrl: 'http://localhost:3001',

        editPerfil: function () {
            let table_instance = $('#table_perfiles').DataTable();
            let id = $("#hidd_id").val();
            let nombre = $("#txt_nombre").val();

            $.ajax({
                url: this.apiUrl + "/perfiles",
                method: 'PUT',
                dataType: 'json',
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

        init_datatables: function () {
            let table = $('#table_perfiles').DataTable({
                "ajax": 'http://localhost:3001/perfiles',
                dom: 'l<"toolbar">frtip',
                initComplete: function(){
                    $("div.toolbar").html('<a>&nbsp;&nbsp;</a><button type="button" class="btn btn-success" data-toggle="modal" data-target="#new_modal">Agregar perfil nuevo</button>');           
                 } ,
                "columns": [
                    { "data": "id" },
                    { "data": "nombre" },
                    { "data": "estado" },
                    { "data": "created_at" },
                    { "data": "updated_at" },
                    {
                        mRender: function (data, type, row) {
                            var linkEdit = '<a class="table-edit btn-edit" href="#" data-id="' + row.id + '" data-toggle="modal" data-target="#edit_modal">Editar</a>';
                            linkEdit = linkEdit.replace("-1", row.ID);

                            //var linkDetails = '<a class="btn-details" data-id="' + row.id + '">Detalle</a>';
                            //linkDetails = linkDetails.replace("-1", row.ID);

                            var linkDelete = '<a class="table-delete btn-delete" data-id="' + row.id + '">Eliminar</a>';
                            linkDelete = linkDelete.replace("-1", row.ID);

                            return /*linkDetails + " | " + */ linkEdit + " | " + linkDelete;
                        }
                    }
                ],
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

            objPerfiles.init_datatables();
        },
    };

    objPerfiles.init();

});