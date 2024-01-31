//listeners
document.addEventListener('keydown', keyPush);

//the canvas
const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');
console.log(ctx);

//game stuff
const title = document.querySelector('.score');

let score = 0;
let gameIsRunning = true;

const fps = 15;
//the snake
const tileSize = 50;
let snakeSpeed = tileSize;
let snakePosX = 0;
let snakePosY = canvas.height / 2;

//direction
let velocityX = 1;
let velocityY = 0;

//food
let foodPosX, foodPosY;

//snake tail
let tail = [];
let snakeLength = 5;

//grid tiles
const tileCountX = canvas.width / tileSize;
const tileCountY = canvas.height / tileSize;

///////////////////
//snake move loop
function gameLoop() {
  if (gameIsRunning) {
    drawStuff();
    moveStuff();
    setTimeout(gameLoop, 1000 / fps); //framerate {fps} frames per second
  }
}

//(run on startup)
gameLoop();
resetFood();

function moveStuff() {
  //the snake moves
  snakePosX += snakeSpeed * velocityX;
  snakePosY += snakeSpeed * velocityY;

  //wall collision
  if (snakePosX > canvas.width - tileSize) {
    snakePosX = 0;
  }
  if (snakePosX < 0) {
    snakePosX = canvas.width;
  }
  if (snakePosY > canvas.height - tileSize) {
    snakePosY = 0;
  }
  if (snakePosY < 0) {
    snakePosY = canvas.height;
  }

  //tail collision
  tail.forEach((snakePart) => {
    if (snakePart.x === snakePosX && snakePart.y === snakePosY) {
      gameOver();
    }
  });

  //tail
  tail.push({ x: snakePosX, y: snakePosY });

  //forget earliest parts of the snake
  tail = tail.slice(-1 * snakeLength);

  //food collision
  if (foodPosX === snakePosX && snakePosY === foodPosY) {
    score++;
    title.textContent = `score: ${score}`;

    snakeLength++;

    resetFood();
  }
}

function drawStuff() {
  ////background
  rectangle('#C9A0DC', 0, 0, canvas.width, canvas.height);

  ////grid
  drawGrid();

  ////snake
  rectangle('#a0dcc9', snakePosX, snakePosY, tileSize, tileSize);

  ////food
  rectangle('fuchsia', foodPosX, foodPosY, tileSize, tileSize);

  //tail
  tail.forEach((snakePart) =>
    rectangle('#a0dcc9', snakePart.x, snakePart.y, tileSize, tileSize),
  );
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
    default:
      if (!gameIsRunning) location.reload();
      break;
  }
}

// //grid
function drawGrid() {
  for (let i = 0; i < tileCountX; i++) {
    for (let j = 0; j < tileCountY; j++) {
      rectangle('#fff', tileSize * i, tileSize * j, tileSize - 1, tileSize - 1);
    }
  }
}

//random food position
function resetFood() {
  foodPosX = Math.floor(Math.random() * tileCountX) * tileSize;
  foodPosY = Math.floor(Math.random() * tileCountY) * tileSize;
  //tileSize - represents tile width

  //don't spawn food on snake's head
  if (foodPosX === snakePosX && foodPosY === snakePosY) resetFood();

  //don't spawn food on the tail
  if (
    tail.some(
      (snakePart) => snakePart.x === foodPosX && snakePart.y === foodPosY,
    )
  ) {
    resetFood();
  }

  //when snake fills all tiles
  if (snakeLength === tileCountX * tileCountY) {
    gameOver();
  }
}

function gameOver() {
  gameIsRunning = false;
  title.style.fontSize = '4rem';
}
