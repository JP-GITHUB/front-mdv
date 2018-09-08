var perfilContent = '';

$(document).ready(() => {
    var objUsuario = {
        apiUrl: 'https://api-mdv.herokuapp.com',
        storage_data: null,
        init_datatables: function () {
           
            $.ajax({
                type:"GET",
                url:"https://api-mdv.herokuapp.com/perfiles",
                headers: {
                    authorization: this.storage_data.token
                },
                dataType:"json",
                success(data){
                    let perfiles = data.data;
                    for (item in perfiles){
                        perfilContent += '<option value="'+perfiles[item].id+'">'+perfiles[item].nombre+'</option>';                    
                    };
                    $("#cbx_perfiles").html(perfilContent);
                },
                error(err){}
            });

            let table = $('#table_perfiles').DataTable({
                "ajax": {
                    url: 'https://api-mdv.herokuapp.com/usuarios',
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
                    {
                        render: function (data, type, row) { return FormatoFecha(row.updated_at); }
                    },
                    {
                        mRender: function (data, type, row) {
                            var linkEdit = '<button type="button" class="btn btn-success"'+
                            'onclick="LoadModal('+row.id+',\''+ row.nombre+'\',\''+row.apellido+'\',\''+row.rut+'\',\''+row.mail+'\'' +
                            ',\''+row.telefono+'\',\''+row.password+'\',\''+row.estado+'\',\''+row.perfil_id+'\')"'+
                            'data-toggle="modal" data-target="#edit_modal">' +
                            '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>Editar</button>';
                            linkEdit = linkEdit.replace("-1", row.ID);

                            var linkDetails = '<a class="table-detail" data-id="' + row.id + '">Detalle</a>';
                            linkDetails = linkDetails.replace("-1", row.ID);

                            var linkDelete = '<button type="button" id="dtBtonoRechazar" class="btn btn-danger" onclick="LoadDelete(' + row.id + ')"' +
                                'data-toggle="modal" data-target="#delete_modal">' +
                                '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>Eliminar</button>';
                            linkDelete = linkDelete.replace("-1", row.ID);

                            return /*linkDetails + " | " + */linkEdit + " | " + linkDelete;
                        }
                    }
                ],
                "responsive": true

            });
            $('a.toggle-vis').on('click', function (e) {
                e.preventDefault();

                // Get the column API object
                var column = table.column($(this).attr('data-column'));

                // Toggle the visibility
                column.visible(!column.visible());
            });
        },

        getPerfil(){
            $.ajax({
                type:"GET",
                url:"https://api-mdv.herokuapp.com/perfiles",
                dataType:"json",
                success(data){
                    let perfiles = data.data;
                    var perfilContent= '<option value="0">Seleccione perfil</option>';
                    for (item in perfiles){
                        perfilContent += '<option value="'+item.id+'">'+item.nombre+'</option>';                    
                    };
                },
                error(err){}
            });
        },

        init: function (settings) {
            if (!objAuth.checkSession()) {
                window.location.href = "/";
            }

            this.storage_data = JSON.parse(localStorage.getItem("currentUser"));            
            objUsuario.init_datatables();
        },
    };

    objUsuario.init();

});

function LoadModal(id, nombre, apellido, rut, mail, telefono, password, estado, perfil_id){
    var modal_ini = '<div id="edit_modal" class="modal" tabindex="-1" role="dialog">'+
                    '<select name="cbx_perfiles" id="cbx_perfiles" class="form-control">'+
                    '</select>';
    $("#edit_modal").html(modal_ini);
    var content = '<input type="hidden" id ="id_hdn" value="'+id+'"/>'+
    '<div class="modal-dialog" role="document">'+
        '<div class="modal-content">'+
            '<div class="modal-header">'+
                '<h5 class="modal-title">Panel de edición</h5>'+
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                    '<span aria-hidden="true">&times;</span>'+
                '</button>'+
            '</div>'+
            '<div class="modal-body">'+
                '<form>'+
                    '<div class="form-group">'+
                        '<label for="Nombre">Nombre</label>'+
                        '<input type="text" class="form-control" id="txt_nombre" value="'+nombre+'">'+
                    '</div>'+
                    '<div class="form-group">'+
                        '<label for="Apellido">Apellido</label>'+
                        '<input type="text" class="form-control" id="txt_apellido" value="'+apellido+'">'+
                    '</div>'+
                    '<div class="form-group">'+
                        '<label for="Rut">Rut</label>'+
                        '<input type="text" class="form-control" id="txt_rut" value="'+rut+'">'+
                    '</div>'+
                    '<div class="form-group">'+
                        '<label for="Mail">Mail</label>'+
                        '<input type="text" class="form-control" id="txt_mail" value="'+mail+'">'+
                    '</div>'+
                    '<div class="form-group">'+
                        '<label for="Telefono">Telefono</label>'+
                        '<input type="text" class="form-control" id="txt_telefono" value="'+telefono+'">'+
                    '</div>'+
                    '<div class="form-group">'+
                        '<label for="Contraseña">Contraseña</label>'+
                        '<input type="text" class="form-control" id="txt_contraseña" value="'+password+'">'+
                    '</div>'+
                    '<div class="form-group">'+
                        '<select name="cbx_perfiles" id="cbx_perfiles" class="form-control">'+
                            perfilContent+
                        '</select>'+
                    '</div>'+
                '</form>'+
            '</div>'+
            '<div class="modal-footer">'+
                '<button type="button" id="btn_save" class="btn btn-primary" data-toggle="modal" data-target="#edit_modal">Save changes</button>'+
                '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'+
            '</div>'+
        '</div>'+
    '</div>'
    
    $("#edit_modal").html(content);
    $("#cbx_perfiles").val(perfil_id);

    $("#btn_save").on("click", function(e) {
        e.preventDefault();
        UpdateUser();
    })
};

function UpdateUser(){
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
        url: "https://api-mdv.herokuapp.com/usuarios",
        success: function () {
            table_instance.ajax.reload();
        },
        error: function (err) {

        }
    });
}

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

function LoadDelete(id) {
    var modal_ini = '<div id="delete_modal" class="modal" tabindex="-1" role="dialog">';
    $("#delete_modal").html(modal_ini);
    var content = '' +
        '<div class="modal-dialog" role="document">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<h5 class="modal-title">Confirmación</h5>' +
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' +
        '</button>' +
        '</div>' +
        '<div class="modal-body">' +
        '<h4>¿Esta seguro que desea eliminar el registro?</h4>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<button type="button" class="btn btn-danger" onclick=Delete(' + id + ') data-toggle="modal" data-target="#delete_modal">Eliminar</button>' +
        '<button type="button" class="btn btn-success" data-dismiss="modal">Cerrar</button>' +
        '</div>' +
        '</div>' +
        '</div>'

    $("#delete_modal").append(content);
};

function Delete(id) {
    let table_instance = $('#table_perfiles').DataTable();

    $.ajax({
        method: "DELETE",
        data: {
            id: id
        },
        dataType: "json",
        url: "https://api-mdv.herokuapp.com/usuarios",
        success: function () {
            table_instance.ajax.reload();
        },
        error: function (err) {

        }
    });
};