var app = angular.module("App",['ngRoute','angularUtils.directives.dirPagination']);
var cid = 0;
app.config(function($routeProvider) {
    $routeProvider
    	.when('/', {
    		templateUrl: 'src/login.html',
            controller: 'AppCtrl'
    	})
		.when('/login', {
    		templateUrl: 'src/login.html',
            controller: 'AppCtrl'
    	})
		.when('/data', {
    		templateUrl: 'src/data.html',
			controller: 'dataCtrl'
    	})
});

app.controller("AppCtrl", function($scope,  $http, $location, $route){
	localStorage.setItem("cid", 0);
	$scope.data = {};
	$scope.initSession = function(typed){
		$scope.data["type"]=typed;
		$http.post(
			'https://prueba-admision-web.herokuapp.com/session',
			$scope.data
		).success(function(session){
			localStorage.setItem("cid", session.cid);
			if(session.status == "ok"){
				$location.path('/data');
			}			
		}).error(function(){
			alert("error");
		});
	};
});

app.controller("dataCtrl", function($scope,  $http, $location, $route){
	$scope.getData = function (){		
		$http.get(
			'https://prueba-admision-web.herokuapp.com/data?cid='+localStorage.getItem("cid"),
		).success(function(data){
			$scope.listarData = data;
		});
	};
	
	$scope.logout = function(){
		$location.path('/login');
	};
	
	if(localStorage.getItem("cid") == 0 ||  localStorage.getItem("cid") == "" || localStorage.getItem("cid") == undefined){
		$location.path('/login');
	}else{
		$scope.getData();
	}
});