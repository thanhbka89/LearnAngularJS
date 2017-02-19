
(function (jq) {
	'use strict';
	
	angular
			.module('example.student') // load the application module
			.factory('studentService', studentService); // add a SecurityService to the application module
			
	//securityService.$inject = ['$cookies', '$resource'];
	function studentService($cookies, $resource,$http,ajaxService) {
		var stService = {
			getStudentList:getStudentList
		};
		return stService;

		function getStudentList(){
			return ajaxService.get('components/student/data/studentlist.json',null,{}).then(function(data){
				console.log(data.data.students);
				return data.data.students;
			});
		};
		
	}
} (jQuery));