const button = document.getElementById('runner');
const audio = document.getElementById('bg-music');

let clickCount = 0;
let musicStarted = false;
let isMoving = false;

let posX = 0;
let posY = 0;
let dirX = 1;
let dirY = 1;
let speed = 1;

// Aguardar primeiro clique
button.addEventListener('click', () => {
  if (clickCount === 0) {
    clickCount++;
    
    // Toca a música no primeiro clique
    if (!musicStarted) {
      audio.play();
      musicStarted = true;
    }

    // Inicia o movimento diagonal
    isMoving = true;
    moveDiagonal();
    
    // Muda a posição inicial aleatória
    moveToRandomPosition();
  }
});

// Função de movimentação para posição aleatória
function moveToRandomPosition() {
  let screenWidth = window.innerWidth;
  let screenHeight = window.innerHeight;

  posX = Math.random() * (screenWidth - button.offsetWidth);
  posY = Math.random() * (screenHeight - button.offsetHeight);

  button.style.position = 'absolute';
  button.style.left = `${posX}px`;
  button.style.top = `${posY}px`;
}

// Movimento diagonal contínuo
function moveDiagonal() {
  setInterval(() => {
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    posX += dirX * speed;
    posY += dirY * speed;

    // Colisão com borda da tela
    if (posX <= 0 || posX >= screenWidth - button.offsetWidth) dirX *= -1;
    if (posY <= 0 || posY >= screenHeight - button.offsetHeight) dirY *= -1;

    button.style.left = `${posX}px`;
    button.style.top = `${posY}px`;
  }, 10);
}

// A partir do segundo clique, movimento com mouse
button.addEventListener('mouseover', () => {
  if (clickCount > 0) {
    moveToRandomPosition(); // Muda a posição ao passar o mouse
  }
});
