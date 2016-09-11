document.getElementById("inputField").focus();

var errorMessage = document.getElementById('error');
errorMessage.style.visibility = 'hidden';

var clearBtn = document.getElementById('btn1');
clearBtn.style.visibility = 'hidden';

function hide (obj){
	obj.style.visibility = 'hidden';	
}

clearBtn.onclick = function(){hide(clearBtn)};

function show(){
	errorMessage.style.visibility = 'visible';
	setTimeout(function(){hide(errorMessage)}, 2000);
  document.getElementById("inputField").focus();
}

var myButton = document.getElementById('btn2');
myButton.onclick = show;

var inputField = document.getElementById('inputField');

inputField.addEventListener('keyup', function(event){
  event.preventDefault();
  if(event.keyCode == 13) {
    myButton.click();
    clearBtn.style.visibility = 'visible';
  }
});

