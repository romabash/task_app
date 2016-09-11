
var errorMessage = document.getElementById('error');
errorMessage.style.visibility = 'hidden';

function hide (obj){
	obj.style.visibility = 'hidden';	
}

function show(){
	errorMessage.style.visibility = 'visible';
	setTimeout(function(){hide(errorMessage)}, 2000);
  document.getElementById("inputField").focus();
}

var myButton = document.getElementById('btn');
myButton.onclick = show;



var inputField = document.getElementById('inputField');

inputField.addEventListener('keyup', function(event){
  event.preventDefault();
  if(event.keyCode == 13) {
    myButton.click();
  }
});
