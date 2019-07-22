'use strict';

angular.module('app')
	.component('login', {
		templateUrl: '/src/templates/login.html',
		controller: function ($http, $scope) {
			let $this = $scope;
			let username = $this.username;
			let password = $this.password;
			let types = [
				{ 'name': 'V' },
				{ 'name': 'E' },
				{ 'name': 'P' },
			]
			$this.items = types;

		}
	})

