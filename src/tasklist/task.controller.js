
(function(){
  'use strict';

  angular.module('TaskList')
  .controller('TaskCtrl', TaskCtrl);
  
  
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
  
    list.edit = function(itemIndex){
      taskList.edit(itemIndex);
      list.addMe = list.items[itemIndex].task;
    };
  
    list.checkItem = function (itemIndex){
      taskList.checkItem(itemIndex); 
    };
  
    list.unCheckItem = function (itemIndex){
      taskList.unCheckItem(itemIndex); 
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
  
})();