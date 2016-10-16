
(function(){
  'use strict';
	
  angular.module('TaskList')
  .factory('TaskFactory', TaskFactory);
  
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