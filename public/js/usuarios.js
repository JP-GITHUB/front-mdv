$(document).ready(() => {
    var objPerfiles = {
        apiUrl: 'http://localhost:3001',
        init_datatables: function () {
            let table = $('#table_perfiles').DataTable({
                "ajax": 'http://localhost:3001/usuarios',
                "columns": [
                    { "data": "id" },
                    { "data": "nombre" },
                    { "data": "apellido" },
                    { "data": "rut" },
                    { "data": "mail" },
                    { "data": "telefono" },
                    { "data": "password" },
                    { "data": "estado" },
                    { "data": "mail" },
                    { "data": "created_at" },
                    { "data": "updated_at" },
                    {
                        mRender: function (data, type, row) {
                            console.log(row);
                            var linkEdit = '<a class="table-edit" data-id="' + row[0] + '">Editar</a>';
                            linkEdit = linkEdit.replace("-1", row.ID);

                            var linkDetails = '<a class="table-detail" data-id="' + row[0] + '">Detalle</a>';
                            linkDetails = linkDetails.replace("-1", row.ID);

                            var linkDelete = '<a class="table-delete" data-id="' + row[0] + '">Eliminar</a>';
                            linkDelete = linkDelete.replace("-1", row.ID);

                            return /*linkDetails + " | " + */linkEdit + " | " + linkDelete;
                        }
                    }
                ],
                "responsive":true

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