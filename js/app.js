
(function(){
  'use strict';
  
  angular.module('MyApp', [])
  .controller('TaskCtrl', TaskCtrl) //set up controller with its function
  .service('StorageService', StorageService)  //set up service with its main function
  .factory('TaskFactory', TaskFactory);  //set up service with its function
    
//Controller
  TaskCtrl.$inject = ['TaskFactory'];
  function TaskCtrl(TaskFactory){
    var list = this;
    var taskList = TaskFactory(); //setting taskList to be the returned TaskService
	  
		list.numberOfTasks = taskList.howMany();
    list.items = taskList.getItems(); //getting items from TaskService
    list.addMe = ""; //new task from User input
    
    //adds item using TaskService addItem function
    list.addItem = function(){
      try{
        list.errorMessage = "";
        taskList.addItem(list.addMe);
        list.addMe = "";
				list.numberOfTasks = taskList.howMany();
      }
      catch (error){
        list.errorMessage = error.message; //'thrown' error in TaskService
        list.addMe = "";
				list.numberOfTasks = taskList.howMany();
      }
    };
    
    list.removeItem = function (itemIndex){
      taskList.removeItem(itemIndex); 
      list.errorMessage = "";
      list.addMe = "";
			list.numberOfTasks = taskList.howMany();
    };
    
    list.clear = function(){
      taskList.clear();
      list.errorMessage = "";
      list.addMe = "";
			list.numberOfTasks = taskList.howMany();
    };
    
    list.undo = function(){
      taskList.undo();
      list.items = taskList.getItems(); //reinitialize items 
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
			}else if (items.length === 1){
				numberOfTasks = items.length + ' task';
			}else{
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



