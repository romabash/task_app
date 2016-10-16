
(function(){
  'use strict';
	
  angular.module('TaskList')
  .component('displayTask', {
	templateUrl: 'src/tasklist/templates/display.template.html',
	controller: DisplayTaskComponentController,
	bindings: {
	  items: '<',
	  onRemove: '&'
	} 
  });
  
//Component Controller - Display
  DisplayTaskComponentController.$inject = ['$rootScope'];
  function DisplayTaskComponentController($rootScope){
	var $ctrl = this;
  
    $ctrl.remove = function(myIndex){
      $ctrl.onRemove({index: myIndex});
      $rootScope.$broadcast('undo:processing', {on: true});
    };	
	
	
	$ctrl.$doCheck = function(){
	  if($ctrl.items.length != 0){
		$rootScope.$broadcast('clear:processing', {on: true});
	  }
	  else{
		$rootScope.$broadcast('clear:processing', {on: false});
	  }
	};
  }
	
})();