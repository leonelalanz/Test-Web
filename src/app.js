var app = angular.module('AppLogin', ['ngAnimate','ui.bootstrap']);

app.controller('LoginController', function LoginController($scope, $http, $uibModal) {

  $scope.loginForm = {
    username : "",
    password : "",
    type : ""
  };
  $scope.logeado= false;
  $scope.validacion= "";

  $scope.loginData= [];

          $scope.submitLogin = function() {
              if($scope.formSignin.$valid){ 
                      $http({
                          method : 'POST',
                          url : 'https://prueba-admision-web.herokuapp.com/session',
                          data : angular.toJson($scope.loginForm),
                          headers : {
                              'Content-Type' : 'application/json'
                          }
                      }).then( _success, _error );
              }else { 
                if(!$scope.formSignin.type.$valid){
                  var modalInstance =  $uibModal.open({
                    templateUrl: "src/modal.html",
                    controller: "Modalvalida",
                    resolve: {
                      items: function () {
                        return $scope.validacion= "El campo tipo es obligatorio";
                      }
                    }
                  });
                  return false;
                } 
                if(!$scope.formSignin.username.$valid){ 
                
                  var modalInstance =  $uibModal.open({
                    templateUrl: "src/modal.html",
                    controller: "Modalvalida",
                    resolve: {
                      items: function () {
                        return $scope.validacion= "El campo Usuario es obligatorio";
                      }
                    }
                  });
                  return false;
                } 
                if(!$scope.formSignin.password.$valid){ 
                  var modalInstance =  $uibModal.open({
                    templateUrl: "src/modal.html",
                    controller: "Modalvalida",
                    resolve: {
                      items: function () {
                        return $scope.validacion= "El campo Contraseña es obligatorio";
                      }
                    }
                  });
                  return false;
                } 
              } 

                };

                $scope.recuperarPassword = function() {
         
                  alert("Recuperar contraseña");
                };

                function _obtenerData(id) {
                    $http({
                        method : 'GET',
                        url : 'https://prueba-admision-web.herokuapp.com/data?cid='+id
                    }).then(function successCallback(response) {
                        $scope.loginData = response.data;
                    }, function errorCallback(response) {
                        console.log(response.statusText);
                    });
                }

                function _success(response) {
                    _obtenerData(response.data.cid);
                    $scope.loginForm = {
                      username : "",
                      password : "",
                      type : ""
                    };
                  $scope.logeado= true;
                }
         
                function _error(response) {
                    console.log(response.statusText);
                    alert("Datos incorrectos! Verifique e intente de nuevo.");
                }

});

app.controller('Modalvalida', function($scope, $uibModalInstance, items) {
  $scope.validacion= items;

  $scope.cancel = function(){
    $uibModalInstance.dismiss();
  } 
  
});