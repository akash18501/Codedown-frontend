
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth; 
canvas.height = innerHeight; 


const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}
var friction = .9; 
var gravity = 1; 

const colors = [
'#2185C5',
'#7ECEFD',
'#FFF6E5', 
'#FF7F66'
]
// Event Listeners
// addEventListener('mousemove', (event) => {
//   mouse.x = event.clientX
//   mouse.y = event.clientY
// })

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})


addEventListener('click',() => {
  init(); 
})

// Objects
function Ball(x,y,dx,dy,color,radius){
  
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dy = dy; 
    this.dx = dx; 

    this.update = function(){

        if(this.y+this.radius+this.dy>innerHeight){
            this.dy = -this.dy * friction; 
        }
        else{
          this.dy+=gravity; 
        }

        if(this.x+this.radius > innerWidth || this.x - this.radius < 0){
          this.dx = -this.dx; 
        }
        this.x+=this.dx; 
        this.y+=this.dy; 
        this.draw();
    }
  

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color; 
        c.fill();
        c.closePath();
        c.stroke(); 
    }

  
}

var ballArray = []; 
function init() {
  ballArray =[];

  for(var i=0;i<400;i++){

      radius = (Math.random()*30)+10;
      var x = (Math.random() * (innerWidth - radius*2)) +radius;
      var y = (Math.random() * (innerHeight - radius*2)) + radius; 
      var dx = (Math.random() * 4)-2;
      var dy = (Math.random() *4)-2; 
      var color = colors[Math.floor(Math.random()*colors.length)];
      ballArray.push(new Ball(x,y,dx,dy,color,radius));
  } 

  // console.log(ballArray); 

}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  for(var i=0;i<ballArray.length;i++){
    ballArray[i].update(); 
  }

}

init();
animate();