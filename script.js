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

///////////////////
//snake move loop
function gameLoop() {
  //moveStuff();
  drawStuff();
  requestAnimationFrame(gameLoop);
}
gameLoop();

function moveStuff() {
  //the snake moves
  snakePosX += snakeSpeed;
  if (snakePosX > canvas.width) {
    snakePosX = 0;
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

// //keyboard controls - after pushing a button the snake moves (distance = snakeSpeed)
function keyPush(evt) {
  switch (evt.key) {
    case 'ArrowLeft':
      snakePosX -= snakeSpeed;
      break;
    case 'ArrowRight':
      snakePosX += snakeSpeed;
      break;
    case 'ArrowUp':
      snakePosY -= snakeSpeed;
      break;
    case 'ArrowDown':
      snakePosY += snakeSpeed;
      break;
  }

  // rules enabling travelling through the walls - if statements
  if (snakePosX > canvas.width) {
    snakePosX = 0;
  }
  if (snakePosX < 0) {
    snakePosX = canvas.width;
  }

  if (snakePosY > canvas.height) {
    snakePosY = 0;
  }
  if (snakePosY < 0) {
    snakePosY = canvas.height;
  }
}
