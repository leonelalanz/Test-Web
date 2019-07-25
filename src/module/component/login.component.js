'use strict';

angular.module('app')
	.component('login', {
		templateUrl: '/src/templates/login.html',
		controller: function ($http, $scope) {
			//let $this = $scope;


			let types = [
				{ 'name': 'V' },
				{ 'name': 'E' },
				{ 'name': 'P' },
			]
			$scope.items = types;

			$scope.send = function () {

				let form = [];
				form.push({
					"username": $scope.username,
					"password": $scope.password,
					"type": $scope.selected
				});
				console.log(form);


				//$http POST function
				$http({

					method: 'POST',
					url: 'https://prueba-admision-web.herokuapp.com/session',
					data: form

				}).then(function successCallback(response) {

					console.log(response);
					alert("User has Logging Successfully")

				}, function errorCallback(response) {
					console.log(response.data);


					$scope.username = '';
					$scope.password = '';
					alert("Error. while Logging user Try Again!");

				});


			}



		}
	})

