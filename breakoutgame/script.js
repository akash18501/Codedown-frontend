var canvas = document.getElementById("myCanvas");
var c = canvas.getContext("2d");

var colArray = [
'#FF8CE7', 
'#D780E8', 
'#D399FF', 
'#9E80E8', 
'#8F8CFF'
]
var score =0; 

var paddleSpeed = 10; 
var leftPressed = false; 
var rightPressed = false; 

document.addEventListener('keydown',(e) => {

	if(e.key == "Right" || e.key == "ArrowRight"){
		rightPressed = true;  
	}
	if(e.key == "Left" || e.key == "ArrowLeft"){
		leftPressed = true; 
	}
})

document.addEventListener('keyup',(e) => {

	if(e.key == "Right" || e.key == "ArrowRight"){
		rightPressed = false;  
	}
	if(e.key == "Left" || e.key == "ArrowLeft"){
		leftPressed = false;
	}
})

//the ball constructor
function Ball(x,y,dx,dy,radius,color) {

	this.x = x; 
	this.y = y; 
	this.dx = dx; 
	this.dy = dy; 
	this.radius = radius; 
	this.color = color; 


	this.draw = function() {

		c.beginPath(); 
		c.arc(this.x,this.y,this.radius,0,Math.PI*2); 
		c.fillStyle = this.color; 
		c.fill(); 
		c.closePath(); 
	}

	this.update = function () {


		this.draw(); 
		
		if(this.x+this.radius>canvas.width || this.x-this.radius<0){
			this.dx = -this.dx; 
			this.color = colArray[Math.floor(Math.random()*colArray.length)]; 

		}

		if(this.y-this.radius<0){
			// console.log("akash"); 
			this.dy=-this.dy;
			this.color = colArray[Math.floor(Math.random()*colArray.length)];  
		}
		else if(this.y+this.radius>canvas.height){

			if(this.x>paddleX && this.x<paddleX+paddleWidth){
		
				this.dy=-this.dy;
				this.color = colArray[Math.floor(Math.random()*colArray.length)];  
			}
			else { 
				score = 0; 
				location.reload(true);
			}
		}

		this.x+=this.dx; 
		this.y+=this.dy; 		
	}
}


var x = canvas.width/2; 
var y = canvas.height-30; 
var dx = 2; 
var dy = -2; 
var radius = 10; 
var color = colArray[1]; 
var ball = new Ball(x,y,dx,dy,radius,color); 

//the paddle constructor
var paddleWidth = 75; 
var paddleHeight = 10; 
var paddleX = (canvas.width-paddleWidth)/2; 
	
function drawPaddle(){

	c.beginPath();
	c.fillRect(paddleX,canvas.height - paddleHeight,paddleWidth,paddleHeight); 
	c.fill(); 
	c.stroke(); 
	c.closePath();

	if(rightPressed==true && paddleX+paddleWidth<canvas.width){
		paddleX+=paddleSpeed; 
	}
	else if(leftPressed==true && paddleX>0){
		paddleX-=paddleSpeed; 
	}
}


function Bricks(x,y,height,width,status){
	this.x =x; 
	this.y = y; 
	this.height = height; 
	this.width = width; 
	this.status =true; 

	this.draw = function() {

		if(this.status==true){
			c.fillStyle = "blue"; 
			c.beginPath(); 
			c.fillRect(this.x,this.y,this.width,this.height); 
			c.closePath(); 
		}
		else
		{
			let index = brickArray.indexOf(this); 
			if(index > -1){
				brickArray.splice(index,1); 
			}
		}
		
	}
}

var offsetLeft = 30; 
var offsetTop = 30; 
var brickPadding = 10; 
var brickHeight = 20; 
var BrickWidth = 75;
var brickArray = [] ;
var rows = 3; 
var columns = 5; 
function createBricks(){
	for(var i=0;i<columns;i++){
		for(var j=0;j<rows;j++){
			var x = (i*(BrickWidth+brickPadding) + offsetLeft); 
			var y = (j*(brickHeight+brickPadding) + offsetTop); 

			brickArray.push(new Bricks(x,y,brickHeight,BrickWidth,true)); 

		}
	}
}

createBricks();


function detectCollission() {

	brickArray.forEach(brick => {
		
		if(ball.x > brick.x && ball.x < brick.x+brick.width && 
		 ball.y > brick.y && ball.y < brick.y+brick.height){
			ball.dy = -ball.dy; 
			brick.status=false; 
			score++; 
			console.log(score); 
		}
	})
 } 

function drawScore() {
	c.font = "16px Arial"; 
	c.fillStyle = "cyan"; 
	c.fillText("Score: "+score,8,20); 
}

function animate() {
	requestAnimationFrame(animate); 

	c.clearRect(0,0,canvas.width,canvas.height); 
 	
 	brickArray.forEach(brick => {
 		brick.draw(); 
 	})
 	drawPaddle(); 
	ball.update(); 
	detectCollission(); 
	drawScore(); 


}

animate(); 





// function drawBall() {

// 	c.beginPath(); 
// 	c.arc(x,y,radius,0,Math.PI*2); 
// 	c.fillStyle = color; 
// 	c.fill(); 
// 	c.closePath(); 

// 	if(x+radius+dx>canvas.width || x-radius+dx<0){
// 		dx = -dx; 
// 		color = colArray[Math.floor(Math.random()*colArray.length)]; 

// 	}
// 	if(y+radius>canvas.height|| y-radius<0){
// 		dy=-dy;
// 		color = colArray[Math.floor(Math.random()*colArray.length)];  
// 	}
// }