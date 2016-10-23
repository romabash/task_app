
(function(){
  'use strict';
	
  angular.module('TaskList')
  .component('manageTask', {
	templateUrl: 'src/tasklist/templates/manage.template.html',
	controller: ManageTaskComponentController,
  bindings: {
    numberOfTasks: '@numberOfTasks',
    error: '<',
    onUndo: '&',
    onClear: '&',
    onAdd: '&'
  } 
  });
  
//Component Controller - Manage
  ManageTaskComponentController.$inject = ['$element', '$rootScope'];
  function ManageTaskComponentController($element, $rootScope){
    var $ctrl = this;
  
    $ctrl.undo = function(){
      $ctrl.onUndo();
      //Turn off broadcast 
      $rootScope.$broadcast('undo:processing', {on: false});
    };
    $ctrl.clear = function(){
      $ctrl.onClear();
      //broadcast to display Undo when item is removed
      $rootScope.$broadcast('undo:processing', {on: true});
    };
    $ctrl.add = function(){
      $ctrl.onAdd();
      //Turn off broadcast 
      $rootScope.$broadcast('undo:processing', {on: false});
      $rootScope.$broadcast('clear:processing', {on: true});
    };
  
    var undoButtonListener = $rootScope.$on('undo:processing', function (event, data) {
      if (data.on) {
        $ctrl.showUndo = true;
      }
      else {
        $ctrl.showUndo = false;
      }
    });
  
    var clearButtonListener = $rootScope.$on('clear:processing', function (event, data) {
      if (data.on) {
        $ctrl.showClear = true;
      }
      else {
        $ctrl.showClear = false;
      }
    });

    $ctrl.$onDestroy = function () {
      undoButtonListener();
      clearButtonListener();
    };
  
    $ctrl.$doCheck = function(){    
      var warningElem = $element.find('#display'); //DOM manipulation using JQuery
      if ($ctrl.error){
        //display warning in red
        warningElem.css('color', 'red');
      } 
      else{
        //display number of tasks in black
        warningElem.css('color', 'black');      
      }
    };
  }
  
})();