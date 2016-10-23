
(function(){
  'use strict';
	
  angular.module('TaskList')
  .component('displayTask', {
	templateUrl: 'src/tasklist/templates/display.template.html',
	controller: DisplayTaskComponentController,
	bindings: {
	  items: '<',
	  onRemove: '&',
	  onCheck: '&',
	  onUncheck: '&',
	  onEdit: '&'
	} 
  });
  
//Component Controller - Display
  DisplayTaskComponentController.$inject = ['$rootScope'];
  function DisplayTaskComponentController($rootScope){
	var $ctrl = this;
	$ctrl.condition;
	$ctrl.allView = true; //when viewing all tasks
  
    $ctrl.remove = function(myIndex){
      $ctrl.onRemove({index: myIndex});
      $rootScope.$broadcast('undo:processing', {on: true});
    };	
	$ctrl.edit = function(myIndex){
      $ctrl.onEdit({index: myIndex});
    };	
	$ctrl.check = function(myIndex){
      $ctrl.onCheck({index: myIndex});
    };	
	$ctrl.uncheck = function(myIndex){
      $ctrl.onUncheck({index: myIndex});
    };
	
	$ctrl.displayAll = function(){
	  $ctrl.searchFilter = "";
	  $ctrl.allView = true;
      $ctrl.condition = "";
    };
	$ctrl.displayComplete = function(){
	  $ctrl.allView = false;
      $ctrl.condition = {done : true};
    };
	$ctrl.displayIncomplete = function(){
	  $ctrl.allView = false;
      $ctrl.condition = {done : false};
    };
	
	var searchButtonListener = $rootScope.$on('search:processing', function (event, data) {
      if (data.searchTerm) {
		$ctrl.searchFilter = {task: data.searchTerm};
      }
    });

    $ctrl.$onDestroy = function () {
	  searchButtonListener();
    };
	
	
	$ctrl.$doCheck = function(){
	  if($ctrl.items.length != 0 && $ctrl.allView){
		$rootScope.$broadcast('clear:processing', {on: true}); //when items are not 0 and viewing all items
	  }
	  else{
		$rootScope.$broadcast('clear:processing', {on: false});
	  }
	};
  }
	
})();

