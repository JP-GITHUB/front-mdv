$(document).ready(() => {
    var objCategoria = {
        apiUrl: 'http://localhost:3001',

        loadProducts: function (id_colegio) {
            $.ajax({
                url: this.apiUrl + "/productos/" + id_colegio,
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    var content_cards_product = document.querySelector("#content_cards_products");
                    if(data.obj.length == 0){
                        var tmp_title = document.createElement('h2');
                        tmp_title.innerHTML = 'No existen productos para mostrar';
                        content_cards_product.appendChild(tmp_title);
                    }

                    $.each(data.obj, function (key, val) {
                        var t = document.querySelector('#template_card_product');

                        t.content.querySelector(".title").innerHTML = val.nombre;
                        t.content.querySelector(".desc").innerHTML = val.descripcion;

                        $.each(val.TALLAs, function (key2, val2) {
                            var div = document.createElement('div');
                            div.innerHTML = "Talla: " + val2.descripcion + " | Precio: $ " + val2.PRODUCTO_TALLA.precio;
                            t.content.querySelector('.price-wrap').appendChild(div);
                        });

                        content_cards_product.appendChild(document.importNode(t.content, true))
                    });

                    $(".btn-express-add").on('click', function(){
                        $.alert({ title: 'Agregando!', content: 'En un futuro cercano ... agregara instantaneamente al carro.' });
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