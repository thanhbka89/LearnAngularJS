
(function (jq) {
	'use strict';

	angular
			.module('example') // get the application module
			.config(appRouterConfig) // add configuration to the application level
			.run(['$rootScope', '$state', appInitialization]);

	function appRouterConfig($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: 'components/home/home.tpl.html'
			})
			.state('student', {
				url: '/student',
				templateUrl: 'components/student/student.tpl.html',
				controller: 'example.student.StudentCtrl',
				controllerAs: 'studentCtrl',
				resolve: {
					initializeData: loadStudents
				}
			})
			.state('about', {
				url: '/about',
				template: '<h3>Single Page Application - version 1.0</h3>' // a simple template
			});

		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/home'); // It means default to 'home' state
	}

	function appInitialization($rootScope, $state) {
		//$state.go('student');
	}

	function loadStudents() {

	}
} (jQuery));
