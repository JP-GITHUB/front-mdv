$(document).ready(() => {
    var objPerfiles = {
        apiUrl: 'http://localhost:3001',
        init: function (settings) {
            if(!objAuth.checkSession()){
                window.location.href = "/";
            }
        },
    };

    objPerfiles.init();

});