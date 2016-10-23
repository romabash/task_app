
(function(){
  'use strict';
  
  angular.module('TaskList')
  .factory('TaskFactory', TaskFactory);
  
//Service - TaskService
  TaskService.$inject = ['StorageService'];
  function TaskService(StorageService){
    var service = this;
    var items = StorageService.load("allTasks");
    var temp = StorageService.load("allTasks");  //holds temporally LocalStorage data
    var numberOfTasks = "";
    var editIndex = false;
    
    service.addItem = function(task){
    //check to see if task is already in the list
      var found = false;
      for(var i = 0; i < items.length; i++) {
        if (items[i].task == task) {
          found = true;
          break;
        }
      }
    
      if(!task){
        return; //if no input
      }
      else if(found === false && editIndex === false){
        items.push({task: task, done: false});
        StorageService.save("allTasks", items); //saves new task into LocalStorage
        temp = StorageService.load("allTasks"); //assign new LocalStorage data 
      }
    else if(editIndex !== false){
        items[editIndex].task = task;
        //items.push({task: task, done: false});
        StorageService.save("allTasks", items); //saves new task into LocalStorage
        temp = StorageService.load("allTasks"); //assign new LocalStorage data 
      }
      else{
        throw new Error ("Item already in the list"); //throw this error when input same task
      }
    editIndex = false;
    };
  
  service.edit = function(itemIndex){
    editIndex = itemIndex;
  };
  
  service.checkItem = function(itemIndex){
    //console.log(items[itemIndex].done); 
    items[itemIndex].done = true;
    //console.log(items[itemIndex].done); 
    StorageService.save("allTasks", items); //saves checked task into LocalStorage
      temp = StorageService.load("allTasks"); //assign new LocalStorage data with checked allTasks
    };
  
    service.unCheckItem = function(itemIndex){
    //console.log(items[itemIndex].done); 
    items[itemIndex].done = false;
    //console.log(items[itemIndex].done); 
    StorageService.save("allTasks", items); //saves checked task into LocalStorage
      temp = StorageService.load("allTasks"); //assign new LocalStorage data with checked allTasks
    };
    
    service.removeItem = function(itemIndex){
      temp = StorageService.load("allTasks"); //assign LocalStorage data before deleting a task
      items.splice(itemIndex,1); 
      StorageService.save("allTasks", items); //after deleting, save to LocalStorage
    };
    
    service.clear = function(){
      temp = StorageService.load("allTasks"); //assign LocalStorage data before clearing all allTasks
      items.splice(0,items.length);
      StorageService.save("allTasks", items); //after clearing all allTasks, save to LocalStorage
    };
    
    service.undo = function(){    
      items = temp;  //assign items to the previous data stored in temp
      StorageService.save("allTasks", items); //save to LocalStorage to update
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

