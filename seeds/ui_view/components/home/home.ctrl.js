
(function (jq) {
	'use strict';
	
	angular
			.module('example.home') // load the home module
			.controller('example.home.HomeCtrl', HomeController); // add a controller to the application module
			
	HomeController.$inject = ['$scope', '$stateParams'];
	function HomeController($scope, $stateParams) {
		$scope.dogs = ['Bernese', 'Husky', 'Goldendoodle']; // add a default list
	}
} (jQuery));