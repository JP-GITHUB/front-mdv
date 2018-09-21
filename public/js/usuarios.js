var perfilContent = '';

$(document).ready(() => {
    var objUsuario = {
        apiUrl: 'http://localhost:3001',
        storage_data: null,
        current_obj_table: {},
        init_datatables: function () {

            $.ajax({
                type: "GET",
                url: this.apiUrl + '/perfiles',
                headers: {
                    authorization: this.storage_data.token
                },
                dataType: "json",
                success(data) {
                    let perfiles = data.data;
                    for (item in perfiles) {
                        perfilContent += '<option value="' + perfiles[item].id + '">' + perfiles[item].nombre + '</option>';
                    };
                    $("#cbx_perfiles").html(perfilContent);
                },
                error(err) { }
            });

            let table = $('#table_perfiles').DataTable({
                "ajax": {
                    url: this.apiUrl + '/usuarios',
                    headers: {
                        authorization: this.storage_data.token
                    }
                },
                "columns": [
                    { "data": "id" },
                    { "data": "nombre" },
                    { "data": "apellido" },
                    { "data": "rut" },
                    { "data": "mail" },
                    { "data": "telefono" },
                    { "data": "password" },
                    { "data": "estado" },
                    /*{
                        render: function (data, type, row) { return FormatoFecha(row.updated_at); }
                    },*/
                    {
                        mRender: function (data, type, row) {
                            var linkEdit = `<button type="button" class="btn-edit btn btn-success" data-toggle="modal" data-target="#edit_modal">Editar</button>`;
                            //linkEdit = linkEdit.replace("-1", row.ID);

                            var linkDelete = `<button type="button" class="btn-del btn btn-danger" data-toggle="modal" data-target="#delete_modal">Eliminar</button>`;
                            //linkDelete = linkDelete.replace("-1", row.ID);

                            return linkEdit + " | " + linkDelete;
                        }
                    }
                ],
                "responsive": true
            });

            $('#table_perfiles tbody').on('click', 'td button', function (){
                let data_selected = table.row($(this).parent().parent()).data();
                
                if($(this).hasClass('btn-edit')){
                    objUsuario.loadDataModalEdit(data_selected);
                }

                if($(this).hasClass('btn-del')){
                    objUsuario.loadModalDel(data_selected);
                }                    
            });

            $('a.toggle-vis').on('click', function (e) {
                e.preventDefault();

                // Get the column API object
                var column = table.column($(this).attr('data-column'));

                // Toggle the visibility
                column.visible(!column.visible());
            });
        },

        loadDataModalEdit: function (data) {
           $("#id_hdn").val($.trim(data.id));
           $("#txt_nombre").val($.trim(data.nombre));
           $("#txt_apellido").val($.trim(data.apellido));
           $("#txt_rut").val($.trim(data.rut));
           $("#txt_mail").val($.trim(data.mail));
           $("#txt_telefono").val($.trim(data.telefono));
           $("#txt_contraseña").val($.trim(data.password));
           $("#cbx_perfiles").val($.trim(data.perfil_id));
        },

        loadModalDel: function (data) {
            $("#btn_modal_del").attr('data-id', $.trim(data.id));
        },

        edit_user: function() {
            let table_instance = $('#table_perfiles').DataTable();
        
            let id = $("#id_hdn").val();
            let nombre = $("#txt_nombre").val();
            let apellido = $("#txt_apellido").val();
            let rut = $("#txt_rut").val();
            let mail = $("#txt_mail").val();
            let telefono = $("#txt_telefono").val();
            let password = $("#txt_contraseña").val();
            let perfil = $("#cbx_perfiles").val();
        
            $.ajax({
                method: "PUT",
                data: {
                    id: id,
                    nombre: nombre,
                    apellido: apellido,
                    rut: rut,
                    mail: mail,
                    telefono: telefono,
                    password: password,
                    perfil: perfil
                },
                dataType: "json",
                url: objUsuario.apiUrl + "/usuarios",
                success: function (data) {
                    table_instance.ajax.reload();
                    console.log(data)
                },
                error: function (err) {
        
                }
            });
        },
        
        delete_user: function(id) {
            let table_instance = $('#table_perfiles').DataTable();
        
            $.ajax({
                method: "DELETE",
                data: {
                    id: id
                },
                dataType: "json",
                url: objUsuario.apiUrl + "/usuarios",
                success: function () {
                    table_instance.ajax.reload();
                },
                error: function (err) {
        
                }
            });
        },

        init: function (settings) {
            if (!objAuth.checkSession()) {
                window.location.href = "/";
            }

            this.storage_data = JSON.parse(localStorage.getItem("currentUser"));
            objUsuario.init_datatables();
            
            $("#btn_modal_update").on('click', this.edit_user);

            $("#btn_modal_del").on('click', function(){
                objUsuario.delete_user($("#btn_modal_del").attr('data-id'));
            });
        },
    };

    objUsuario.init();

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