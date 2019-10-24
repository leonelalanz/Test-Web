var app = angular.module("appSinergy");


app.controller("userController", function($scope, $http, $uibModal, $location, $rootScope){
    var user = this;
    var username = "";
    var password = "";
    var type = "";
    var urlPost = "https://prueba-admision-web.herokuapp.com/session";
    var messageType = "Debe seleccionar un valor";
    var messageUsername = "Debe introducir un usuario";
    var messagePasswword = "Debe introducir una contraseña";  
    var size = "md";
    var modalController = "modalController";
    var userThis = "user";
    var templateModal = "templates/modal.html";
    var modalBody = "modal-body";
    var modalTitle = "modal-title";
    var recuperarPassWordMessage = "recuperar contraseña";
    var errPostMessage = "No se pudo realizar la solicitud. Por favor verifique los datos ingresados o intente mas tarde";
    var urlTimeline = "/timeline";
    var cid = "cid";

    user.message = "";
    localStorage.setItem(cid, "");
  
    user.getLogin = function(){
        username = user.username;
        password = user.password;
        type = user.type;
        user.username = '';
        user.password = '';
        user.type = '';

        if(username != undefined && username != "" 
            && password != undefined && password != "" 
            && type != undefined && type != ""){

                $http.post(urlPost, {
                    username,
                    password,
                    type
                })
                .then(function(response){        
                    if(response){
                        //console.log(response.data);
                        localStorage.setItem(cid, response.data.cid);
                        if(response.data.status == "ok"){
                            $location.path(urlTimeline);
                        }
                    }
                }, function(response){
                    alert(errPostMessage);
                }); 

        }else{

            if(type == ""){
                user.message = messageType;

                $uibModal.open({
                    animation: false,
                    ariaLabelledBy: modalTitle,
                    ariaDescribedBy: modalBody,
                    templateUrl: templateModal,
                    controller: modalController,
                    controllerAs: userThis,
                    size: size,
                    resolve: {
                      data: function () {
                        return  user.message;
                      }
                    }
                });   
                
            }else if(username == ""){
                user.message = messageUsername;

                $uibModal.open({
                    animation: false,
                    ariaLabelledBy: modalTitle,
                    ariaDescribedBy: modalBody,
                    templateUrl: templateModal,
                    controller: modalController,
                    controllerAs: userThis,
                    size: size,
                    resolve: {
                      data: function () {
                        return  user.message;
                      }
                    }
                });

            }else if(password == ""){
                user.message = messagePasswword;

                $uibModal.open({
                    animation: false,
                    ariaLabelledBy: modalTitle,
                    ariaDescribedBy: modalBody,
                    templateUrl: templateModal,
                    controller: modalController,
                    controllerAs: userThis,
                    size: size,
                    resolve: {
                      data: function () {
                        return  user.message;
                      }
                    }
                });  
               
            }
        }
    }

    user.resetPassword = function(){
        alert(recuperarPassWordMessage);
    }
});

app.controller('modalController', ['$uibModalInstance', 'data', function($uibModalInstance, data) {
    var user = this;
    user.message = data;

    user.cancel = function () {
        $uibModalInstance.dismiss();
    };
}]);

app.controller("timelineController", function($scope, $http, $location) {
    var user = this;
    var urlGet = "https://prueba-admision-web.herokuapp.com/data?cid=";
    var urlLogin = "/";
    var errGetMessage = "No se pudo realizar la solicitud. Por favor intente mas tarde";
    var cid = "cid";
    var errorDataIsEmpty = "No se ha podido encontrar los datos de la session. Por favor intente mas tarde";

    urlGet = urlGet + localStorage.getItem(cid);
    user.timelineData = null
    //console.log(urlGet);

    $http.get(urlGet)
        .then(function successCallback(data){
            //console.log(data);
            if(data != undefined && !(JSON.stringify(data)=='{}')){
                user.timelineData = data;
                //console.log(user.timelineData.data);
            }else{
                alert(errorDataIsEmpty);
            }
        },function errorCallback(response) {
            alert(errGetMessage);
        });

    user.logout = function(){
        $location.path(urlLogin);
        localStorage.setItem(cid, "");
    };    
});