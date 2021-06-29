const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const ground = new Image();
ground.src = "images/bgc.jpg";

const foodImg = new Image();
foodImg.src = "images/apple.png";

let box = 32;

let score = 0;

let food = {
   x: Math.floor(Math.random() * 17) * box,
   y: Math.floor(Math.random() * 15) * box
}

let snake = [];
snake[0] = {
   x: 9 * box,
   y: 10 * box
}

document.addEventListener('keydown', direction);

let dir;

function direction(e) {
   if(e.keyCode === 37 && dir != 'right') {
      dir = 'left';
   } else if (e.keyCode === 38 && dir != 'down') {
      dir = 'up';
   } else if (e.keyCode === 39 && dir != 'left') {
      dir = 'right';
   } else if (e.keyCode === 40 && dir != 'up') {
      dir = 'down';
   }
}

function eatTail(head, arr) {
   for (let i = 0; i < arr.length; i++) {
      if(head.x === arr[i].x && head.y === arr[i].y) {
         clearInterval(game);
      }
   }
}


function drawGame() {
   ctx.drawImage(ground, 0, 0);

   ctx.drawImage(foodImg, food.x, food.y);

   for (let i = 0; i < snake.length; i++) {
      ctx.fillStyle = "green";
      ctx.fillRect(snake[i].x, snake[i].y, box, box);
   }

   ctx.fillStyle = "white";
   ctx.font = "32px Tahoma";
   ctx.fillText(score, 10, 30);

   let snakeX = snake[0].x;
   let snakeY = snake[0].y;

   if (snakeX === food.x && snakeY === food.y) {
      score++;
      food = {
         x: Math.floor(Math.random() * 17) * box,
         y: Math.floor(Math.random() * 15 + 1) * box
      }
   } else {
      snake.pop();
   }

   if(snakeX < box || snakeX > box * 17 || snakeY < box || snakeY > box * 17) {
      clearInterval(game);
   }

   if (dir === 'left') snakeX -= box;
   if (dir === 'right') snakeX += box;
   if (dir === 'up') snakeY -= box;
   if (dir === 'down') snakeY += box;

   let newHead = {
      x: snakeX,
      y: snakeY
   }

   eatTail(newHead, snake);

   snake.unshift(newHead);
}



let game = setInterval(drawGame, 100);