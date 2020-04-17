var canvas = document.getElementById('myCanvas');
var c = canvas.getContext("2d"); 




	// body...
	// console.log("akash"); 
	// c.fillStyle = "skyblue"; 
var myw = window.innerWidth; 
var myh = window.innerHeight; 
canvas.width = myw; 
canvas.height = myh;

var minradius = 5; 
var maxradius = 40; 

var mouse = {
	x:undefined,
	y:undefined,
}


var colorArray = [
 '#2C3E50',
 '#E74C3C',
 '#ECF0F1',
 '#3498DB',
 '#2980B9'
]

window.addEventListener('mousemove', e => {
	mouse.x = e.x; 
	mouse.y = e.y; 
})

window.addEventListener('resize',e => {
	canvas.width = window.innerWidth; 
	canvas.height = window.innerHeight; 

	init(); 
})


function Circle(x,y,radius,dx,dy,color){
	this.x = x;  
	this.y = y; 
	this.radius = radius; 
	this.dx = dx;
	this.dy = dy;
	this.minradius = radius; 
	this.color = colorArray[Math.floor(Math.random()*colorArray.length)];

	this.draw = function () {
		c.beginPath(); 
		c.arc(this.x, this.y,this.radius,0,Math.PI*2,false); 
		c.fillStyle = this.color; 
		c.fill(); 
	}

	this.update = function () {

		if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
			this.dx = -this.dx; 
		}
		if(this.y+this.radius > innerHeight || this.y - this.radius <0){
			this.dy = -this.dy;
		} 
		this.x+=this.dx;
		this.y+=this.dy; 

		if(mouse.x-this.x <50 && mouse.x - this.x > -50 && mouse.y - this.y <50 && 
			mouse.y - this.y > -50){
			if(this.radius<maxradius)
				this.radius += 1; 
		}
		else if(this.radius>this.minradius){
			this.radius -= 1; 
		}

		this.draw(); 
	}
		
}

// var color; 
var circleArray = []; 

 

function init() {
	circleArray = [];
	for(var i =0;i<1400;i++){
 
 	var radius = Math.random()*4 + 1;
	var x = Math.random() * (innerWidth-(radius*2)) + radius; 
	var y = Math.random() * (innerHeight-(radius*2)) + radius; 
	var dx = (Math.random() - 0.5);
	var dy = (Math.random() - 0.5); 
	 
	circleArray.push(new Circle(x,y,radius,dx,dy));  
}
}

function animate(){
	
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight); 


	for(var i=0;i<circleArray.length;i++){
		// circleArray[i].draw(); 
		circleArray[i].update(); 
	} 


}

init(); 
animate()

 


