$(document).ready(() => {
    var objCategoria = {
        apiUrl: 'http://localhost:3001',

        getSchools: function () {
            $.ajax({
                url: this.apiUrl + '/schools',
                method: 'GET',
                dataType: 'JSON',
                success: function (obj) {
                    let tmp_menu_school = '';

                    $.each(obj.data, function (index, item) {

                        tmp_menu_school += '<a class="dropdown-item" href="/catalogo/' + item.id + '">' + item.nombre + '</a>';
                    });

                    $("#nav-app .dropdown-menu").html(tmp_menu_school);
                },
                error: function (err) {

                }
            });
        },

        loadMemoryProducts: function () {
            let currentInfoUser = JSON.parse(localStorage.getItem("currentUser"));
            let total = 0;
            $.each(currentInfoUser.products, function (key, val) {
                let temp_html = $($("#template-li-product").html());
                temp_html.find('.product-name').text(val.product_name);
                temp_html.find('.product-detail').text(val.size_id);

                let total_prod = val.price * val.quantity;
                total += total_prod;
                temp_html.find('.product-price').text(total_prod);
                $(".content-li-products").append(temp_html);
            });

            $("#total_checkout").html(total);
            $(".badge-pill").html(currentInfoUser.products.length)
        },

        saleOne(token, nombre_retiro, products) {
            $.ajax({
                url: this.apiUrl + '/ventas',
                method: 'POST',
                data: {
                    token: token,
                    nombre_retiro: nombre_retiro,
                    products: JSON.stringify(products)
                },
                dataType: 'JSON',
                success: function (obj) {
                    if (obj.status) {
                        $.alert({ title: 'Agregando!', content: obj.msg });
                    } else {
                        $.alert({ title: 'Agregando!', content: obj.msg });
                    }
                },
                error: function (err) {

                }
            });
        },

        init: function (settings) {
            objAuth.checkSession();
            this.loadMemoryProducts();
            this.getSchools();
            
            $("#btn-sale").on("click", function (e) {
                e.preventDefault();
                let nombre_retiro = $("#txt_nombre_retiro").val();
                let currentInfoUser = JSON.parse(localStorage.getItem("currentUser"));
                objCategoria.saleOne(currentInfoUser.token, nombre_retiro, currentInfoUser.products);
            });
        },
    };

    objCategoria.init();
});