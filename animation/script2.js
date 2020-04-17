var canvas = document.getElementById('myCanvas');
var c = canvas.getContext("2d"); 

var colArray = [
'violet','indigo','blue','green','yellow','orange','red'
]

window.onload = function(){
	init(); 
	window.addEventListener('resize',init,false); 
};
function init() {

	canvas.width = window.innerWidth; 
	canvas.height = window.innerHeight;

	function Circle(x,y,radius,dx,dy,color){
	this.x = x;  
	this.y = y; 
	this.radius = radius; 
	this.dx = dx;
	this.dy = dy;

	this.draw = function () {
		c.beginPath(); 
		c.arc(this.x, this.y,this.radius,0,Math.PI*2,false); 
		c.fillStyle = color; 
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

		this.draw(); 
	}
		
}
var color; 
var circleArray = []; 
for(var i =0;i<100;i++){
	color = colArray[Math.floor(Math.random()*colArray.length)]
	var radius = 10;
	var x = Math.random() * (innerWidth-(radius*2)) + radius; 
	var y = Math.random() * (innerHeight-(radius*2)) + radius; 
	var dx = (Math.random() - 0.5)*10;
	var dy = (Math.random() - 0.5)*10; 
	 
	circleArray.push(new Circle(x,y,radius,dx,dy,color));  
}
 
var circle = new Circle(200,200,50,4,4);  

function animate(){
	
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight); 
	for(var i=0;i<circleArray.length;i++){
		// circleArray[i].draw(); 
		circleArray[i].update(); 
	} 
}
animate()
}
 


