setInterval(getClock,1000); 

const secondHand = document.querySelector('[date-seconds]'); 
const minuteHand = document.querySelector('[date-minute]');
const hourHand = document.querySelector('[date-hour]');

console.log(secondHand); 
console.log(minuteHand); 
console.log(hourHand); 

function getClock() {
	
	const dateNow =  new Date(); 
	const secondR = dateNow.getSeconds()/60;
	// console.log(dateNow);  
	// console.log(dateNow.getSeconds());
	// console.log(dateNow.getMinutes());
	// console.log(dateNow.getHours());  
	const minuteR = (secondR + dateNow.getMinutes())/60;
	const hourR = (minuteR + dateNow.getHours())/12; 

	setClock(secondHand,secondR); 
	setClock(minuteHand,minuteR); 
	setClock(hourHand,hourR); 
}

function setClock(hand,ratio) {
	hand.style.setProperty('--rot',ratio*360); 
}


// getClock(); 


getClock(); 

