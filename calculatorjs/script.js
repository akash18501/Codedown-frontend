//getting the number references

const numberone = document.getElementById('one'); 
const numbertwo = document.getElementById('two'); 
const numberthree = document.getElementById('three'); 
const numberfour = document.getElementById('four'); 
const numberfive = document.getElementById('five'); 
const numbersix = document.getElementById('six'); 
const numberseven = document.getElementById('seven'); 
const numbereight = document.getElementById('eight'); 
const numbernine = document.getElementById('nine'); 
const numberzero = document.getElementById('zero'); 

//getting the operator references

const plusbutton = document.getElementById('plus');
const minusbutton = document.getElementById('minus');
const multiplybutton = document.getElementById('multiply');
const dividebutton = document.getElementById('divide');
const equaltobutton = document.getElementById('equalto'); 

//getting others 

const calcdisplay = document.getElementById('calc-display');
const clearbutton = document.getElementById('clear'); 
const backspacebutton = document.getElementById('backspace'); 
const dotbutton = document.getElementById('dot'); 



//***************************************************************************operations 

var displayval = '0'; 
var pendingval  ; 
var evalStringArray = []; 


//grab a ref to the numbuttons 
var numbuttons = document.getElementsByClassName('number-btn'); 
// console.log(numbuttons); 

// Array.from(numbuttons).forEach(element => {
// 	console.log(element); 
// })

//grabbing a ref to operator buttons
var operatorbuttons = document.getElementsByClassName('operator-btn'); 
// console.log(operatorbuttons); 

//display the number on screen which is clicked
Array.from(numbuttons).forEach(numbutton => {
	numbutton.addEventListener('click', e => {
		var btnvalue = e.target.innerText; 

		if(displayval === '0'){
			displayval = ''; 
		}

		displayval+= btnvalue; 
		calcdisplay.textContent = displayval;  
	})
})


//the clear button functionality 
clearbutton.onclick = () => {
	displayval = '0'; 
	pendingval = undefined; 
	evalStringArray = []; 
	calcdisplay.textContent = displayval; 
}

//the delete button sunctinality 
backspacebutton.onclick = () => {

	var lenOfDisplayval = displayval.length; 

	displayval = displayval.slice(0,lenOfDisplayval-1); 

	if(displayval === '')
		displayval = '0'; 

	calcdisplay.innerText = displayval; 
}


//the dot button cannot be more than once in a number functinoality 
dotbutton.onclick = () => {
	if(!displayval.includes('.')){
		displayval+= '.'; 
	}
	calcdisplay.innerText = displayval; 
}


//perform te calculations functions 

Array.from(operatorbuttons).forEach(operatorbutton => {
	operatorbutton.addEventListener('click', e => {
		var operator = e.target.textContent; 

		switch (operator) {
			case '+':
				var span = document.createElement('span');
				console.log(span); 
				span.innerText = '+'; 
				var rowone = document.getElementById('displayrow'); 
				
				
				pendingval = displayval; 
				displayval = '0'; 
				calcdisplay.innerText = displayval; 
				evalStringArray.push(pendingval); 
				evalStringArray.push('+'); 
				break;
			case '-': 
				pendingval = displayval; 
				displayval = '0'; 
				calcdisplay.innerText = displayval; 
				evalStringArray.push(pendingval); 
				evalStringArray.push('-'); 
				break; 
			case 'x':
				pendingval = displayval; 
				displayval = '0'; 
				calcdisplay.innerText = displayval; 
				evalStringArray.push(pendingval); 
				evalStringArray.push('*'); 
				break; 
			case '/':
				pendingval = displayval; 
				displayval = '0'; 
				calcdisplay.innerText = displayval; 
				evalStringArray.push(pendingval); 
				evalStringArray.push('/'); 
				break; 
			case '=': 
				evalStringArray.push(displayval); 
				console.log(evalStringArray); 
				let result = eval(evalStringArray.join(' ')); 
				displayval = '' + result; 
				calcdisplay.innerText = displayval; 
				evalStringArray  = []; 
				break;

		}
	})
})


