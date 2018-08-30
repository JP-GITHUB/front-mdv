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
});