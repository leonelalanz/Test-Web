var app = angular.module("appSinergy");

app.factory("urlPost", function(){
        return ("https://prueba-admision-web.herokuapp.com/session");
});

app.factory("urlGet", function(){
        return ("https://prueba-admision-web.herokuapp.com/data?cid=");
});

app.factory("messageType", function(){
        return ("Debe seleccionar un valor");
});

app.factory("messageUsername", function(){
        return ("Debe introducir un usuario");
});

app.factory("messagePassword", function(){
        return ("Debe introducir una contraseña");
});

app.factory("size", function(){
        return ("md");
});

app.factory("modalController", function(){
        return ("modalController");
});

app.factory("userThis", function(){
        return ("user");
});

app.factory("templateModal", function(){
        return ("templates/modal.html");
});

app.factory("modalBody", function(){
        return ("modal-body");
});

app.factory("modalTitle", function(){
        return ("modal-title");
});

app.factory("recuperarPassWordMessage", function(){
        return ("recuperar contraseña");
});

app.factory("errPostMessage", function(){
        return ("No se pudo realizar la solicitud. Por favor verifique los datos ingresados o intente mas tarde");
});

app.factory("urlTimeline", function(){
        return ("/timeline");
});

app.factory("cid", function(){
        return ("cid");
});

app.factory("urlLogin", function(){
        return ("/");
});

app.factory("errGetMessage", function(){
        return ("No se pudo realizar la solicitud. Por favor intente mas tarde");
});

app.factory("errorDataIsEmpty", function(){
        return ("No se ha podido encontrar los datos de la session. Por favor intente mas tarde");
});






