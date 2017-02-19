
(function (jq) {
	'use strict';
	
	angular
			.module('example') // load the application module
			.factory('securityService', securityService); // add a SecurityService to the application module
			
	//securityService.$inject = ['$cookies', '$resource'];
	function securityService($cookies, $resource) {
		var sessionId = $cookies.get('JSESSIONID');
		
	}
} (jQuery));