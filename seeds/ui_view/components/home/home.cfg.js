
(function (jq) {
	'use strict';
	
	angular
			.module('example.home') // get the home module
			.config(homeConfig); // add configuration to the module level
			
	function homeConfig($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home.list', {
				url: '/list',
				templateUrl: 'components/home/home-list.tpl.html',
				controller: 'example.home.HomeCtrl'
			})
			.state('home.paragraph', {
				url: '/paragraph',
				template: 'A very simple template.'
			});
			
	}
	
} (jQuery));