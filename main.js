var canvas;
var ctx;
var ball = new Image(); 
var frames = 60;
var one;
var two;
var grav = 5;
var boost = 0;

// считываем координаты курсора мыши
var MouseCoords = {
  // координаты x и y
  x: 0,
  y: 0,

  // X-координата
  setX: function(e)
  {
      if (e.pageX)
      {
          this.x = e.pageX;
      }
      else if (e.clientX)
      {
          this.x = e.clientX+(document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft;
      }
  else
  {
        this.x = 0;
  }
  },

  // Y-координата
  setY: function(e)
  {
      if (e.pageY)
      {
          this.y = e.pageY;
      }
      else if (e.clientY)
      {
          this.y = e.clientY+(document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop;
      }
  else
  {
    this.y = 0;
  }
  }
}

document.onmousemove = function(e)
{
  if (!e) e = window.event;
  MouseCoords.setX(e);
  MouseCoords.setY(e);
};

function redrawScene(){
}

window.onload = function(){
    canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d');
    var xPos =  canvas.width-(canvas.width/2)-50;
    var yPos =  canvas.height-(canvas.height/2)+250;
    redrawScene();

let cw = (canvas.width ),
  cx = (cw / 2)-150;
let ch = (canvas.height ),
  cy = (ch / 2) - 150;
let a = 200,
  b = 240,
  c = 300;
let R = 300;
let angle = Math.asin(.5 * 59 /  30);
ctx.beginPath();
ctx.arc(cx, cy, R, 0, 2 * Math.PI);
ctx.stroke();

var triangle = {
  x1: cx,
  y1: cy,
  x2: cx + R,
  y2: cy,
  x3: cx + R * Math.cos(angle),
  y3: cy + R * Math.sin(angle)
};

setInterval( function () {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ball.src = "images/ball.png";
  ctx.drawImage(ball, xPos, yPos, 100, 100);
  ctx.beginPath();
  ctx.fill();
  ctx.closePath();
  
  ctx.strokeStyle = "black";
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.moveTo(triangle.x1, triangle.y1);
  ctx.lineTo(triangle.x2, triangle.y2);
  ctx.lineTo(triangle.x3, triangle.y3);
  ctx.lineTo(triangle.x1, triangle.y1);
  ctx.fill();
  ctx.closePath();

  ctx.stroke();
  grav +=0.2;
  xPos +=boost;
  if(boost > 0){
    boost-=0.2;
  }
  if(boost < 0){
    boost+=0.2;
  }
  if(boost < 0.2 && boost> -0.2){
    boost=0;
  }
  if ( yPos + 100 < canvas.height ) {
    yPos += grav;
  }
  if ( xPos < 0 || xPos + 100 > canvas.width) {
    boost *= -1;
  }
  if ( yPos && xPos == triangle.x3 && triangle.y3) {
    alert([yPos, triangle.y3]);
    grav *= -1;
  }
  if ( yPos < 0  ) {
    grav = 3;
  }
  document.onclick = function(){
    ///////UP
    if((MouseCoords.x - xPos >30 && MouseCoords.x - xPos <65) && (MouseCoords.y - yPos <85 && MouseCoords.y - yPos > 55)){
      // moveUP();
      grav = -10;
      yPos += grav;
    }
    //  //////down
    if((MouseCoords.x - xPos >30 && MouseCoords.x - xPos <75) && (MouseCoords.y - yPos <35 && MouseCoords.y - yPos > 0)){
      grav = +8;
    }
    //////right
    if((MouseCoords.x - xPos >0 && MouseCoords.x - xPos <30) && (MouseCoords.y - yPos <60 && MouseCoords.y - yPos > 30)){
      boost = +8;
    }
    //////left
    if((MouseCoords.x - xPos >65 && MouseCoords.x - xPos <95) && (MouseCoords.y - yPos <60 && MouseCoords.y - yPos > 30)){
      boost = -8;
    }
    //////UP+left
    if((MouseCoords.x - xPos >65 && MouseCoords.x - xPos <95) && (MouseCoords.y - yPos <85 && MouseCoords.y - yPos > 55)){
      grav = -10;
      yPos += grav;
      boost = -10;
    }
    //////UP+right
    if((MouseCoords.x - xPos >0 && MouseCoords.x - xPos <30) && (MouseCoords.y - yPos <85 && MouseCoords.y - yPos > 55)){
      grav = -10;
      yPos += grav;
      boost = +010
    }
    //////down+left
    if((MouseCoords.x - xPos >65 && MouseCoords.x - xPos <95) && (MouseCoords.y - yPos <35 && MouseCoords.y - yPos > 0)){
      grav = +8;
      boost = -10;
    }
    //////down+right
    if((MouseCoords.x - xPos >0 && MouseCoords.x - xPos <30) && (MouseCoords.y - yPos <35 && MouseCoords.y - yPos > 0)){
      grav = +8;
      boost = +10;
    }
  };
  if(yPos>870){
    yPos=870;
  }
  if(x<0){
    xPos=0;
  }
    ctx.onclick = function(){
    yPos -= 300;
  };
  }, 1000/frames);
}

