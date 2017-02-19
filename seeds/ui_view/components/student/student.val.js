
(function (jq) {
	'use strict';
	
	angular
			.module('example.student') // load the student module
			.value('example.student.StudentDO', StudentDO); // add a value to the student module
			
	function StudentDO () {
		this.firstName = '';
		this.lastName = '';
		
		this.fullName = function() {
			return this.firstName + " " + this.lastName;
	    }
	}
} (jQuery));