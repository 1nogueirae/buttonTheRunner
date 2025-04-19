const button = document.getElementById('runner');
const audio = document.getElementById('bg-music');

let clickCount = 0;
let musicStarted = false;
let isMoving = false;

let posX = 0;
let posY = 0;
let dirX = 1;
let dirY = 1;
let speed = 1; // velocidade inicial reduzida

button.addEventListener('click', () => {
  clickCount++;

  // Toca a música no primeiro clique
  if (!musicStarted) {
    audio.play();
    musicStarted = true;
  }

  // Se tiver 5 ou mais cliques e ainda não estiver se movendo, inicia movimento
  if (clickCount >= 5 && !isMoving) {
    isMoving = true;
    moveDiagonal();
  }

  // Aumenta a velocidade a cada 2 cliques extras (6, 8, 10...)
  if (clickCount > 5 && (clickCount - 5) % 2 === 0) {
    speed += 0.5; // incremento suave
  }

  // Movimento aleatório antes do 5º clique
  if (clickCount < 5) {
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    let randomX = Math.random() * (screenWidth - button.offsetWidth);
    let randomY = Math.random() * (screenHeight - button.offsetHeight);

    button.style.position = 'absolute';
    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
  }
});

// Movimento diagonal contínuo
function moveDiagonal() {
  setInterval(() => {
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    posX += dirX * speed;
    posY += dirY * speed;

    // Inverte direção ao atingir bordas
    if (posX <= 0 || posX >= screenWidth - button.offsetWidth) dirX *= -1;
    if (posY <= 0 || posY >= screenHeight - button.offsetHeight) dirY *= -1;

    button.style.position = 'absolute';
    button.style.left = `${posX}px`;
    button.style.top = `${posY}px`;
  }, 10); // frequência da atualização do movimento
}
