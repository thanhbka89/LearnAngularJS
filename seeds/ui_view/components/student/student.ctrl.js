
(function (jq) {
	'use strict';
	
	angular
			.module('example.student') // load the student module
			.controller('example.student.StudentCtrl', StudentController)// add a controller to the student module
			.controller('example.student.StudentListCtrl', StudentListController) // add a controller to the student module
			.controller('example.student.StudentEditCtrl', StudentEditController); // add a controller to the student module
			
	StudentController.$inject = ['$scope', '$stateParams'];
	function StudentController($scope, $stateParams) {
		var ctrl = this;
		ctrl.testS  ="hello";
	}
	
	StudentListController.$inject = ['$scope', '$stateParams','$state','studentService'];
	function StudentListController($scope, $stateParams,$state,studentService) {
		//$scope.students = 
		var ctrl = this;
		ctrl.studentList = null;
		studentService.getStudentList().then(function(students){
			console.log(students);
			ctrl.studentList = students;
		});
		
		ctrl.selected = function($index) {
			var student1= ctrl.studentList[$index];
			$state.transitionTo('.manage','{selectedStudent: {firstName:student1.firstName, lastName:student1.lastName}}');
		}
		
		
	}
	
	StudentEditController.$inject = ['$scope', '$stateParams','example.student.StudentDO'];
	function StudentEditController($scope, $stateParams,StudentDO) {
		console.log($stateParams.selectedStudent);
		var ctrl = this;
		ctrl.student = new StudentDO();
		if($stateParams.selectedStudent){
			ctrl.student.firstName = $stateParams.selectedStudent.firstName;
			ctrl.student.lastName = $stateParams.selectedStudent.lastName;	
		}
		
	}
} (jQuery));