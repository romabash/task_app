
var errorMessage = document.getElementById('error');
errorMessage.style.visibility = 'hidden';

function hide (obj){
	obj.style.visibility = 'hidden';	
}

function show(){
	errorMessage.style.visibility = 'visible';
	setTimeout(function(){hide(errorMessage)}, 2000);
}

var myButton = document.getElementById('btn');
myButton.onclick = show;
