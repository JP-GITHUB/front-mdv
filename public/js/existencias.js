
var apiUrl = 'http://localhost:3001';
$.ajax({
    url: apiUrl + "/productos",
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        var productoContent = '';
        productos = data.data;
        for (item in productos) {
            productoContent += '<option value="' + productos[item].id + '">' + productos[item].nombre +'('+productos[item].COLEGIO.nombre+')'+ '</option>';
        };
        $("#cbx_newProducto").html(productoContent);
    },
    error: function (err) {
        alert("no se puede establecer conexión con el servicio");
    }
});

$.ajax({
    url: apiUrl + "/tallas",
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        var tallaContent = '';
        tallas = data.data;
        for (item in tallas) {
            tallaContent += '<option value="' + tallas[item].id + '">' + tallas[item].descripcion +'</option>';
        };
        $("#cbx_newTalla").html(tallaContent);
    },
    error: function (err) {
        alert("no se puede establecer conexión con el servicio");
    }
});


$(document).ready(() => {

    $("#btn_save").click(function () {
        objExistencias.editExistencia();
    });

    $("#btn_new").click(function () {
        objExistencias.newExistencia();
    });

    var objExistencias = {
        apiUrl: 'http://localhost:3001',
        storage_data: null,
        editExistencia: function () {
            let table_instance = $('#table_productos').DataTable();
            let precio = $("#txt_precio").val();
            let cantidad = $("#txt_cantidad").val();
            let producto_id = $("#hidd_id_p").val();
            let talla_id = $("#hidd_id_t").val();

            $.ajax({
                url: this.apiUrl + "/existencias",
                method: 'PUT',
                dataType: 'json',
                headers: {
                    authorization: this.storage_data.token
                },
                data: {
                    precio: precio,
                    cantidad: cantidad,
                    producto_id: producto_id,
                    talla_id: talla_id
                },
                success: function (data) {
                    table_instance.ajax.reload();
                },
                error: function (err) {

                }
            });

        },

        newExistencia: function () {
            let table_instance = $('#table_productos').DataTable();
            let precio = $("#txt_newPrecio").val();
            let cantidad = $("#txt_newCantidad").val();
            let producto_id = $("#cbx_newProducto").val();
            let talla_id = $("#cbx_newTalla").val();

            $.ajax({
                url: this.apiUrl + "/existencias",
                method: 'POST',
                dataType: 'json',
                data: {
                    precio: precio,
                    cantidad: cantidad,
                    producto_id: producto_id,
                    talla_id: talla_id
                },
                success: function (data) {
                    table_instance.ajax.reload();
                },
                error: function (err) {

                }
            });

        },

        init_datatables: function () {
            let table = $('#table_existencias').DataTable({
                "ajax": {
                    url: this.apiUrl + '/existencias',
                    headers: {
                        authorization: this.storage_data.token
                    }
                },
                "columns": [
                    {
                        mRender: function (data, type, row) {
                            var linkProducto = '<td>' + row.PRODUCTO.nombre +'('+row.PRODUCTO.COLEGIO.nombre+')'+ '</td>';
                            linkProducto = linkProducto.replace("-1", row.ID);

                            return linkProducto;
                        }
                    },
                    {
                        mRender: function (data, type, row) {
                            var linkTalla = '<td>' + row.TALLA.descripcion + '</td>';
                            linkTalla = linkTalla.replace("-1", row.ID);

                            return linkTalla;
                        }
                    },
                    { "data": "precio" },
                    { "data": "cantidad" },
                    {
                        mRender: function (data, type, row) {

                            var linkEdit = '<button type="button" class="btn btn-success" data-id="' + row.id + '" data-toggle="modal" data-target="#edit_modal">' +
                                '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>Editar</button>';
                            linkEdit = linkEdit.replace("-1", row.ID);

                            return linkEdit
                        }
                    }
                ],
                "responsive": true
            });

            $('#table_existencias tbody').on('click', 'tr', function () {
                let data = table.row(this).data();
                $("#hidd_id_p").val(data.producto_id);
                $("#hidd_id_t").val(data.talla_id);
                $("#txt_precio").val(data.precio);
                $("#txt_cantidad").val(data.cantidad);
            });
        },

        init: function (settings) {
            if (!objAuth.checkSession()) {
                window.location.href = "/";
            }

            this.storage_data = JSON.parse(localStorage.getItem("currentUser"));
            objExistencias.init_datatables();
        },
    };

    objExistencias.init();

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
    let formatoFecha = "<div> Fecha: " + dia + "-" + mes + "-" + año + " </div><div> Hora &nbsp: " + hora + ":" + minuto + ":" + segundo + "</div>";
    return formatoFecha;
};