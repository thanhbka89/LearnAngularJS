
(function (jq) {
	'use strict';
	
	angular
			.module('example.student') // get the student module
			.config(homeConfig); // add configuration to the module level
			
	function homeConfig($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('student.manage', {
				url: '/manage',
				params: {
							selectedStudent: null
						},
				views:{

					'studentList':{
						templateUrl: 'components/student/student-list.tpl.html',	
						controller: 'example.student.StudentListCtrl',
						controllerAs: 'studentListCtrl'	
					},
					'studentEdit':{
						templateUrl: 'components/student/student-edit.html',
						controller: 'example.student.StudentEditCtrl',
						controllerAs: 'studentEditCtrl'
					}
				}
				
			})
			
			
	}
	
} (jQuery));