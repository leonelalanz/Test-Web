var app = angular.module("appSinergy");


app.controller("userController", function($scope, $http, $uibModal, $location, $rootScope, urlPost,
    messageType, messageUsername, messagePassword, size, modalController, userThis, templateModal,
    modalBody, modalTitle, recuperarPassWordMessage, errPostMessage, urlTimeline, cid){
        
    var user = this;
    var username = "";
    var password = "";
    var type = "";
    var urlPost = urlPost;
    var messageType = messageType;
    var messageUsername = messageUsername;
    var messagePassword = messagePassword;  
    var size = size;
    var modalController = modalController;
    var userThis = userThis;
    var templateModal = templateModal;
    var modalBody = modalBody;
    var modalTitle =  modalTitle;
    var recuperarPassWordMessage = recuperarPassWordMessage;
    var errPostMessage = errPostMessage;
    var urlTimeline = urlTimeline;
    var cid = cid;

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
                user.message = messagePassword;

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

app.controller("timelineController", function($scope, $http, $location, urlGet, urlLogin, errGetMessage, cid, 
    errorDataIsEmpty) {

    var user = this;
    var urlGet = urlGet;
    var urlLogin = urlLogin;
    var errGetMessage = errGetMessage;
    var cid = cid;
    var errorDataIsEmpty = errorDataIsEmpty;

    urlGet = urlGet + localStorage.getItem(cid);
    user.timelineData = null;

    $http.get(urlGet)
        .then(function successCallback(data){
            if(data != undefined && !(JSON.stringify(data)=='{}')){
                user.timelineData = data;
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