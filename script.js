//listeners
document.addEventListener('keydown', keyPush);

//the canvas
const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');
console.log(ctx);

//the snake
const snakeSize = 50;
let snakeSpeed = 5;
let snakePosX = 0;
let snakePosY = canvas.height / 2 - snakeSize / 2;

//where on each axis is the snake now?
// // 0,1, -1 >> 0 is snake "stopped", 1 is moves forward, -1 is move backward
let velocityX = 1;
let velocityY = 0;

///////////////////
//snake move loop
function gameLoop() {
  moveStuff();
  drawStuff();
  setTimeout(gameLoop, 1000 / 15); //framerate 15 frames per second
}
gameLoop();

function moveStuff() {
  //the snake moves
  snakePosX += snakeSpeed * velocityX;
  snakePosY += snakeSpeed * velocityY;

  //rules for moving through the walls (entire snake fix with minus)
  if (snakePosX > canvas.width) {
    snakePosX = 0;
  }
  if (snakePosX < -snakeSize) {
    snakePosX = canvas.width;
  }

  if (snakePosY > canvas.height) {
    snakePosY = 0;
  }
  if (snakePosY < -snakeSize) {
    snakePosY = canvas.height;
  }
}

function drawStuff() {
  ////background rect
  rectangle('#DCC9A0', 0, 0, canvas.width, canvas.height);

  ////snake's position and dimensions
  rectangle('#a0dcc9', snakePosX, snakePosY, snakeSize, snakeSize);
}

function rectangle(color, x, y, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

/////////////////////////////////////////////

// //keyboard controls - improved version - the snake moves on its own, you only give it directions
function keyPush(evt) {
  switch (evt.key) {
    //condition: prevent going to the opposite direction (down) right "through" its body
    case 'ArrowLeft':
      if (velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
      }
      break;
    case 'ArrowRight':
      if (velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
      }
      break;
    case 'ArrowUp':
      if (velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
      }
      break;
    case 'ArrowDown':
      if (velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
      }
      break;
  }
}
