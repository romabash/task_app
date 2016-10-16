
(function(){
	'use strict';
	
	angular.module('TaskList')
	.config(RoutesConfig);
	
	RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
	function RoutesConfig($stateProvider, $urlRouterProvider){
	  
      //Redirect to home page if no other URL matches
      $urlRouterProvider.otherwise('/');

      //Set up UI states
      $stateProvider

      //Home page
      .state('home', {
		url: '/',
		templateUrl: 'src/tasklist/templates/home.template.html',
		controller: 'TaskCtrl as list',
	  });  
	}
	
})();