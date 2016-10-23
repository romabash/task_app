
(function(){
  'use strict';
	
  angular.module('TaskList')
  .component('welcomeTask', {
    templateUrl: 'src/tasklist/templates/welcome.template.html',
    controller: WelcomedTaskComponentController,
	bindings: {
	  addMe: '=', //2-directional
	  items: '<'
	} 
  });
  
//Component Controller - Welcome
  WelcomedTaskComponentController.$inject = ['$rootScope'];
  function WelcomedTaskComponentController($rootScope){
	var $ctrl = this;
	$ctrl.searchTerm = "";
	
	$ctrl.search = function(){
	  if($ctrl.searchTerm){
		$rootScope.$broadcast('search:processing', {searchTerm: $ctrl.searchTerm}); 
	  }
	  $ctrl.searchTerm = "";
	}
	
  }
	
})();
