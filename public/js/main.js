$(document).ready(() => {
    $("#menu-toggle ").click(function (e) {
        e.preventDefault();

        if (!$(".label-title").hasClass("d-none")) {
            $(".frm-buscar").addClass("d-none");
            $(".label-title").addClass("d-none");
        } else {
            $(".frm-buscar").removeClass("d-none");
            $(".label-title").removeClass("d-none");
        }

        $("#wrapper ").toggleClass("toggled ");
    });

    var objMain = {
        apiUrl: 'http://localhost:3001',

        getSchools: function () {
            $.ajax({
                url: this.apiUrl + '/schools',
                method: 'GET',
                dataType: 'JSON',
                success: function (obj) {
                    let tmp_menu_school = '';

                    $.each(obj['schools'], function (index, data) {

                        tmp_menu_school += '<a class="dropdown-item" href="/catalogo">' + data.name + '</a><div class="dropdown-divider"></div>';
                    });

                    $("#nav-app .dropdown-menu").html(tmp_menu_school);
                },
                error: function (err) {

                }
            });
        },

        init: function (settings) {
            this.getSchools();
        }
    };

    objMain.init();

});