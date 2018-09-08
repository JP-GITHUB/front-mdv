$(document).ready(() => {
    var objPerfiles = {
        apiUrl: 'http://localhost:3001',

        editPerfil: function () {

        },

        init_datatables: function () {
            let table = $('#table_perfiles').DataTable({
                "ajax": 'http://localhost:3001/perfiles',
                "columns": [
                    { "data": "id" },
                    { "data": "nombre" },
                    { "data": "estado" },
                    { "data": "created_at" },
                    { "data": "updated_at" },
                    {
                        mRender: function (data, type, row) {
                            var linkEdit = '<a class="table-edit btn-edit" data-id="' + row.id + '" data-toggle="modal" data-target="#edit_modal">Editar</a>';
                            linkEdit = linkEdit.replace("-1", row.ID);

                            var linkDetails = '<a class="btn-details" data-id="' + row.id + '">Detalle</a>';
                            linkDetails = linkDetails.replace("-1", row.ID);

                            var linkDelete = '<a class="table-delete btn-delete" data-id="' + row.id + '">Eliminar</a>';
                            linkDelete = linkDelete.replace("-1", row.ID);

                            return linkDetails + " | " + linkEdit + " | " + linkDelete;
                        }
                    }
                ],
            });

            $('#table_perfiles tbody').on('click', 'tr', function () {
                let data = table.row(this).data();
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