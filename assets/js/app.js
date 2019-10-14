var app = angular.module("app",['ngRoute']);

/*RouteProvider*/
app.config(['$routeProvider',
  function($routeProvider){
        $routeProvider.
        when('/timeline',{
            templateUrl : 'timeline.html',
            controller: 'timelineController'
        });
    }
    ]);
/*RouteProvider*/

app.controller('timelineController',function($scope){
  $scope.timeline="TIMELINE";
});
app.controller('controlador',['$scope', '$http',function($scope,$http){
var login= this;

$scope.login.username="";
$scope.login.password="";
$scope.login.tipo="";

	$scope.makeCall= function () {
  $http.post('https://prueba-admision-web.herokuapp.com/session', {
    "username": login.username,
    "password": login.password,
    "type": login.tipo
    }).then(function(respuesta) {
        alert("Vista del timeLine. Se realiza peticion a la URL solicitada con el dato referente a la cookie arrojada por el sistema. Verificar peticiones para validar");
        $scope.getData();
      }).catch(function(){
        alert('Ha ocurrido un error inesperado')
      });
    }

    $scope.getData= function(req,res){
      $http.get('https://prueba-admision-web.herokuapp.com/data',{
      params:{cid: "k6lj87hj8"} 
      }).then(function(respuesta){

      }).catch(function(){alert('No se han podido obtener los datos solicitados')})
    }

  login.ingresar= function(){
  	 var username= login.username;
  	 var password= login.password;
  	 var tipo= login.tipo;
  	 if(username=='' || password=='' || tipo==''){
 		$('#myModal').modal('show');
  	 }else{
          $scope.makeCall();
  	 }
  }
  login.resetpass= function(){
  	alert("Recuperar contraseña");
  }

}] );

