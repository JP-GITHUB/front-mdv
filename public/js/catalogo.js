$(document).ready(() => {
    var objCategoria = {
        apiUrl: 'http://localhost:3001',

        loadProducts: function (id_colegio) {
            $.ajax({
                url: this.apiUrl + "/productos/" + id_colegio,
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    $.each(data.obj, function (key, val) {
                        var t = document.querySelector('#template_card_product'),
                            content_cards_product = document.querySelector("#content_cards_products");

                        t.content.querySelector(".title").innerHTML = val.nombre;
                        t.content.querySelector(".desc").innerHTML = val.descripcion;

                        $.each(val.TALLAs, function (key2, val2) {
                            var div = document.createElement('div');
                            div.innerHTML = val2.descripcion + " - $ " + val2.PRODUCTO_TALLA.precio;
                            t.content.querySelector('.price-wrap').appendChild(div);
                        });

                        content_cards_product.appendChild(document.importNode(t.content, true))
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

        init: function (settings) {
            var temp = document.getElementById("template_info");
            var id_colegio = $(temp.innerHTML).filter('#hidd_id_colegio').val();
            this.getSchools();
            this.loadProducts(id_colegio);
        },
    };

    objCategoria.init();
});