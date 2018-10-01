$(document).ready(() => {
    var objCategoria = {
        apiUrl: 'http://localhost:3001',

        loadProducts: function (id_colegio) {
            $.ajax({
                url: this.apiUrl + "/productos/colegio/" + id_colegio,
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    var content_cards_product = document.querySelector("#content_cards_products");
                    if (data.obj.length == 0) {
                        var tmp_title = document.createElement('h2');
                        tmp_title.innerHTML = 'No existen productos para mostrar';
                        content_cards_product.appendChild(tmp_title);
                    }

                    $.each(data.obj, function (key, val) {
                        var t = document.querySelector('#template_card_product');

                        t.content.querySelector(".hdd_id_producto").value = val.id;
                        t.content.querySelector(".title").innerHTML = val.nombre;
                        t.content.querySelector(".desc").innerHTML = val.descripcion;

                        $.each(val.TALLAs, function (key2, val2) {
                            var div = document.createElement('div');
                            div.innerHTML = "Talla: " + val2.descripcion + " | Precio: $ " + val2.PRODUCTO_TALLA.precio;
                            t.content.querySelector('.price-wrap').appendChild(div);
                        });

                        content_cards_product.appendChild(document.importNode(t.content, true))
                    });

                    $(".btn-express-add").on('click', function () {
                        $.alert({ title: 'Agregando!', content: 'En un futuro cercano ... agregara instantaneamente al carro.' });
                    });

                    $("#btn-info-product").on('click', function () {
                        let id_producto = $(this).parent().find('.hdd_id_producto').val();

                        objCategoria.getProductDetail(id_producto);

                    });
                },
                error: function (err) {

                }
            });
        },

        getSchools: function () {
            $.ajax({
                url: this.apiUrl + '/schools',
                method: 'GET',
                dataType: 'JSON',
                success: function (obj) {
                    let tmp_menu_school = '';

                    $.each(obj['schools'], function (index, data) {

                        tmp_menu_school += '<a class="dropdown-item" href="/catalogo/' + data.id + '">' + data.name + '</a>';
                    });

                    $("#nav-app .dropdown-menu").html(tmp_menu_school);
                },
                error: function (err) {

                }
            });
        },

        getProductDetail: function (id) {
            $.ajax({
                url: this.apiUrl + '/productos/' + id,
                method: 'GET',
                dataType: 'JSON',
                success: function (data) {
                    $(".row-sizes dd").html('');
                    $("#modal__product_title").html(data.obj.nombre);
                    $("#modal__product_desc").html(data.obj.descripcion);

                    $.each(data.obj.TALLAs, function (key2, val2) {
                        let temp_html = $($("#template_sizes").html());
                        temp_html.find('.label-size').text(val2.descripcion);
                        temp_html.find('.input-radio-size').attr("value", val2.id);
                        temp_html.find('.input-radio-size').attr("data-pricing", val2.PRODUCTO_TALLA.precio);
                        temp_html.find('.label-price').text(val2.PRODUCTO_TALLA.precio);
                        $(".row-sizes dd").append(temp_html);
                    });

                    // Set events
                    $('.input-radio-size').on('change', function () {
                        let price = $(this).attr("data-pricing");
                        let quantity = $("#txt_quantity").val();
                        objCategoria.setTotal(price, quantity);
                    });

                    $("#txt_quantity").bind('keyup mouseup', function () {
                        let price = $('input:radio[name=radio-size]:checked').attr("data-pricing");
                        let quantity = $("#txt_quantity").val();
                        objCategoria.setTotal(price, quantity);
                    });

                    $("#btn_add_cart").on('click', function () {
                        $.alert({ title: 'Agregando!', content: 'En un futuro cercano ... agregara producto al carro.' });
                    });

                    $("#btn_express_buy").on('click', function () {
                        let product_id = $(".hdd_id_producto").val();
                        let product_name = $("#modal__product_title").html();
                        let size_id = $('input:radio[name=radio-size]:checked').val();
                        let quantity = $("#txt_quantity").val();
                        let price = $('input:radio[name=radio-size]:checked').attr("data-pricing");
                        $("#total_span").html(total);

                        objCategoria.oneProductSale(product_id, product_name, size_id, quantity, price);
                    });
                },
                error: function (err) {

                }
            });
        },

        oneProductSale(product_id, product_name, size_id, quantity, price) {
            let currentInfoUser = JSON.parse(localStorage.getItem("currentUser"));
            currentInfoUser.products = [
                {
                    product_id: product_id,
                    product_name: product_name,
                    size_id: size_id,
                    quantity: quantity,
                    price: price
                }
            ];

            localStorage.setItem("currentUser", JSON.stringify(currentInfoUser));
        },

        setTotal(price, quantity) {
            let total = price * quantity;
            $("#total_span").html(total);
        },

        init: function (settings) {
            var temp = document.getElementById("template_info");
            var id_colegio = $(temp.innerHTML).filter('#hidd_id_colegio').val();
            this.getSchools();
            this.loadProducts(id_colegio);
        },
    };

    objCategoria.init();
});