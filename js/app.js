

(function(){
  'use strict';
  
  angular.module('MyApp', [])
  .controller('TaskCtrl', TaskCtrl) //set up controller with its function
  .service('StorageService', StorageService)  //set up service with its main function
  .factory('TaskFactory', TaskFactory)  //set up service with its function
  .component('displayTask', {
  templateUrl: 'dislayTask.html',
  //template: '<ul id="list">\
  //               <li ng-repeat="x in $ctrl.items">\
  //                 <i ng-click="$ctrl.remove($index)">&#10003</i>\
  //           <i ng-click="$ctrl.remove($index)">&#10007</i>\
  //           {{ x }} \
  //               </li>\
  //             </ul>',
  controller: DisplayTaskComponentController,
  bindings: {
    items: '<',
    onRemove: '&'
  } 
  })
  .component('manageTask', {
  templateUrl: 'manageTask.html',
  //template: '<div id="inputBox">\
  //          <div id="display" class="pull-left">{{ $ctrl.numberOfTasks}} </div>\
  //              <button class="btn btn-default pull-right" id="btn3" ng-click="$ctrl.onClear()">Clear</button>\
  //              <button class="btn btn-default pull-right" id="btn2" ng-click="$ctrl.onUndo()">Undo</button>\
  //          <button class="btn btn-default pull-right" id="btn1" ng-click="$ctrl.onAdd()">Add</button>\
  //            </div>',
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
  ManageTaskComponentController.$inject = ['$element'];
  function ManageTaskComponentController($element){
    var $ctrl = this;
  
    $ctrl.$doCheck = function(){
      var warningElem = $element.find('#display'); 
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

//Component Controller - Display
  function DisplayTaskComponentController(){
    var $ctrl = this;
  
    $ctrl.remove = function(myIndex){
      $ctrl.onRemove({index: myIndex});
    };
  }
  
//Controller
  TaskCtrl.$inject = ['TaskFactory'];
  function TaskCtrl(TaskFactory){
    var list = this;
    var taskList = TaskFactory(); //setting taskList to be the returned TaskService
    
    list.numberOfTasks = taskList.howMany();
    list.items = taskList.getItems(); //getting items from TaskService
    list.addMe = ""; //new task from User input
    list.error = false; //boolean, if enter same task
    
    list.addItem = function(){
      try{
        taskList.addItem(list.addMe);
        list.addMe = "";
        list.error = false;
        list.numberOfTasks = taskList.howMany();
      }
      catch (error){
        list.addMe = "";
        list.numberOfTasks = error.message; //display error message instaed of number of tasks
        list.error = true;
      }
    };
    
    list.removeItem = function (itemIndex){
      taskList.removeItem(itemIndex); 
      list.addMe = "";
      list.error = false;
      list.numberOfTasks = taskList.howMany();
    };
    
    list.clear = function(){
      taskList.clear();
      list.addMe = "";
      list.error = false;
      list.numberOfTasks = taskList.howMany();
    };
    
    list.undo = function(){
      taskList.undo();
      list.items = taskList.getItems(); //reinitialize items 
      list.error = false;
      list.numberOfTasks = taskList.howMany();
    };
    
  }
  
//Service - StorageService
  function StorageService(){
    var service = this;
    
    //loads data from LocalStorage
    service.load = function(){
      var load = JSON.parse(localStorage.getItem("tasks")) || [];
      return load;
    };
    
    //saves data to LocalStorage
    service.save = function(items){
      localStorage.setItem("tasks", JSON.stringify(items));
    };
  }
  
//Service - TaskService
  TaskService.$inject = ['StorageService'];
  function TaskService(StorageService){
    var service = this;
    var items = StorageService.load();
    var temp = StorageService.load();  //holds temporally LocalStorage data
    var numberOfTasks = "";
    
    service.addItem = function(task){
      if(!task){
        return; //if no input
      }
      else if(items.indexOf(task) === -1){
        items.push(task);
        StorageService.save(items); //saves new task into LocalStorage
        temp = StorageService.load(); //assign new LocalStorage data 
      }
      else{
        throw new Error ("Item already in the list"); //throw this error when input same task
      }
    };
    
    service.removeItem = function(itemIndex){
      temp = StorageService.load(); //assign LocalStorage data before deleting a task
      items.splice(itemIndex,1); 
      StorageService.save(items); //after deleting, save to LocalStorage
    };
    
    service.clear = function(){
      temp = StorageService.load(); //assign LocalStorage data before clearing all tasks
      items.splice(0,items.length);
      StorageService.save(items); //after clearing all tasks, save to LocalStorage
    };
    
    service.undo = function(){    
      items = temp;  //assign items to the previous data stored in temp
      StorageService.save(items); //save to LocalStorage to update
    };
    
    service.getItems = function(){
      return items; 
    };
    
  service.howMany = function(){
    if(items.length === 0){
      numberOfTasks = ' ';
    }
    else if (items.length === 1){
      numberOfTasks = items.length + ' task';
    }
    else{
      numberOfTasks = items.length + ' tasks';
    }
    return numberOfTasks;
    };
  }

//Factory - for TaskService
  function TaskFactory(StorageService){
    var factory = function(){
      return new TaskService(StorageService);  
    };
    return factory;
  }
  
})(); 