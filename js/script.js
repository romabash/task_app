
//Initial focus on the inut box
var inputField = document.getElementById('inputField');
inputField.focus();

//Bind Return keyup to Add button
inputField.addEventListener('keyup', function(event){
  event.preventDefault();
  if(event.keyCode == 13) {
    myButton.click();
  }
});

//Set the error message to hidden
var errorMessage = document.getElementById('error');
errorMessage.style.visibility = 'hidden';

//Hide function
function hide (obj){
	obj.style.visibility = 'hidden';	
}

//Shows error message and hides after 2 seconds
function show(){
	errorMessage.style.visibility = 'visible';
	setTimeout(function(){hide(errorMessage)}, 2000);
  document.getElementById("inputField").focus();
}

//Setting Events to the Add button to show error message 
var myButton = document.getElementById('btn2');
myButton.addEventListener('click', show);

//Setting focus on input filed after clicking Clear button
var clearButton = document.getElementById('btn1');
clearButton.addEventListener('click', function(){inputField.focus();});




