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
                    { "data": "password"},
                    { "data": "estado" },
                    { 
                        render: function (data, type, row) { return FormatoFecha(row.updated_at); }
                    },
                    {
                        mRender: function (data, type, row) {
                            console.log(row);
                            var linkEdit = '<button type="button" class="btn btn-success"'+
                            'onclick="LoadModal('+row.id+',\''+ row.nombre+'\',\''+row.apellido+'\',\''+row.rut+'\',\''+row.mail+'\'' +
                            ',\''+row.telefono+'\',\''+row.password+'\',\''+row.estado+'\')"'+
                            'data-toggle="modal" data-target="#edit_modal">' +
                            '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>Editar</button>';
                            linkEdit = linkEdit.replace("-1", row.ID);

                            var linkDetails = '<a class="table-detail" data-id="' + row.id + '">Detalle</a>';
                            linkDetails = linkDetails.replace("-1", row.ID);

                            var linkDelete = '<button type="button" id="dtBtonoRechazar" class="btn btn-danger" onclick="LoadDelete('+row.id+')"'+
                            'data-toggle="modal" data-target="#delete_modal">' +
                            '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>Eliminar</button>';
                            linkDelete = linkDelete.replace("-1", row.ID);

                            return /*linkDetails + " | " + */linkEdit + " | " + linkDelete;
                        }
                    }
                ],
                "responsive": true

            });
            $('a.toggle-vis').on( 'click', function (e) {
                e.preventDefault();
         
                // Get the column API object
                var column = table.column( $(this).attr('data-column') );
         
                // Toggle the visibility
                column.visible( ! column.visible() );
            } );
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

function LoadModal(id, nombre, apellido, rut, mail, telefono, password, estado){
    var modal_ini = '<div id="edit_modal" class="modal" tabindex="-1" role="dialog">';
    $("#edit_modal").html(modal_ini);
    var content = ''+
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
                '</form>'+
            '</div>'+
            '<div class="modal-footer">'+
                '<button type="button" class="btn btn-primary" onclick=UpdateUser('+id+')>Save changes</button>'+
                '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'+
            '</div>'+
        '</div>'+
    '</div>'
    
    $("#edit_modal").append(content);
};

function UpdateUser(id){


    let nombre = $("#txt_nombre").val();
    let apellido = $("#txt_apellido").val();
    console.log(nombre, apellido, id);

    /*
    $.ajax({
        type:"POST",
        data:{
            id: id,
            nombre: nombre
        },
        dataType: "json",
        url:"http://localhost:3001/usuariosUpdate",



    });
    */
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

function LoadDelete(id){
    var modal_ini = '<div id="delete_modal" class="modal" tabindex="-1" role="dialog">';
    $("#delete_modal").html(modal_ini);
    var content = ''+
    '<div class="modal-dialog" role="document">'+
        '<div class="modal-content">'+
            '<div class="modal-header">'+
                '<h5 class="modal-title">Confirmación</h5>'+
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                    '<span aria-hidden="true">&times;</span>'+
                '</button>'+
            '</div>'+
            '<div class="modal-body">'+
                '<h4>¿Esta seguro que desea eliminar el registro?</h4>'+
            '</div>'+
            '<div class="modal-footer">'+
                '<button type="button" class="btn btn-danger" onclick=Delete('+id+')>Eliminar</button>'+
                '<button type="button" class="btn btn-success" data-dismiss="modal">Cerrar</button>'+
            '</div>'+
        '</div>'+
    '</div>'
    
    $("#delete_modal").append(content);
};