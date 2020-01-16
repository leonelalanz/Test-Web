angular.module("app", ['ngRoute'])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/', { templateUrl: '../src/components/login.html', controller: 'loginController', })
      .when('/feed', { templateUrl: '../src/components/feed.html', controller: 'feedController', })
      .otherwise({ redirectTo: '/' });
  }])
  .controller('loginController', function($scope, $http, $location) {
    $scope.form = {
      type: null,
      username: null,
      password: null
    }
    
    $scope.selectType = type => {
      $scope.form.type = type;
    }

    $scope.forgotPassword = () => {
      alert('Olvidó su contraseña')
    }

    $scope.LoginError = msg => {
      $scope.modalMessage = msg
      $('#loginErrorModal').modal('show')
    }
/*Los campos de nombre de usuario, contraseña y tipo deben ser marcados como obligatorios.
 Si el usuario no ingresa alguno de ellos se debe mostrar un modal indicando el campo faltante.
 En caso de faltar varios campos, sólo se indica el primero.*/


    $scope.onsubmit = () => {
      if(!$scope.form.type) return $scope.LoginError('El Campo de Nacionalidad es Obligatorio')
      if(!$scope.form.username) return $scope.LoginError('El campo de usuario es Obligatorio')
      if(!$scope.form.password) return $scope.LoginError('El campo de contraseña es Obligatorio')
	  
/*Debes consumir el servicio web session para crear una sesión en el servidor. Para ello, debes hacer una petición HTTP usando
 el verbo POST al siguiente URL https://prueba-admision-web.herokuapp.com/session.*/
      $http.post('https://prueba-admision-web.herokuapp.com/session', $scope.form, {})
        .then(response => {
          localStorage.setItem('cid', response.data.cid)
          $location.path( "/feed" );
        }, err => {
          $scope.LoginError("Error al iniciar sesión, intentelo nuevamente.")
        });
      
    }
    
  })
/*Debes consumir el servicio web data obtener los datos del usuario del servidor. Para ello, debes hacer una petición HTTP usando 
el verbo GET al siguiente URL https://prueba-admision-web.herokuapp.com/data enviando por parámetros del query string el cookie id*/
  .controller('feedController', function($scope, $http, $location) {
    var cid = localStorage.getItem('cid')
    if(!cid) return $location.path('/')

    $scope.posts = []

    $scope.logout = function(){
      localStorage.removeItem('cid');
      $location.path('/')
    }

    $http.get(`https://prueba-admision-web.herokuapp.com/data?cid=${cid}`)
      .then( response => {  
        $scope.posts = response.data
      }, err => {
        console.log(err)
      })
  })
  
