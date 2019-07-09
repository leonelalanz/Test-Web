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

    $scope.onsubmit = () => {
      if(!$scope.form.type) return $scope.LoginError('Debe seleccionar un tipo de documento')
      if(!$scope.form.username) return $scope.LoginError('El campo de usuario es requerido')
      if(!$scope.form.password) return $scope.LoginError('El campo de contraseña es requerido')

      $http.post('https://prueba-admision-web.herokuapp.com/session', $scope.form, {})
        .then(response => {
          localStorage.setItem('cid', response.data.cid)
          $location.path( "/feed" );
        }, err => {
          $scope.LoginError("Error al iniciar sesión, intentelo nuevamente.")
        });
      
    }
    
  })
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
  
