const button = document.getElementById('runner');
const audio = document.getElementById('bg-music');

// Áudios diferentes para cada clique com os novos nomes
const clickAudios = [
  new Audio('valorant-1-kill.mp3'), // Primeiro áudio
  new Audio('valorant-2-kills.mp3'), // Segundo áudio
  new Audio('valorant-3-kills.mp3'), // Terceiro áudio
  new Audio('valorant-4-kills.mp3'), // Quarto áudio
  new Audio('valorant-5-kills.mp3')  // Quinto áudio
];

const victoryText = document.getElementById('victory-text');
let clickCount = 0;
let musicStarted = false;
let isMoving = false;

let posX = 0;
let posY = 0;
let dirX = 1;
let dirY = 1;
let speed = 1;
let hoverTimeout; // Para controlar o tempo de hover

// Iniciar movimento aleatório imediatamente
window.addEventListener('load', () => {
  isMoving = true;
  moveToRandomPosition();
  moveDiagonal();
  startRandomMovement();
});

// Aguardar primeiro clique
button.addEventListener('click', () => {
  console.log('Botão clicado');
  if (clickCount < 5) {
    clickAudios[clickCount].play(); // Toca o áudio correspondente ao clique

    clickCount++;

    // Caso o usuário clique dentro de 1 segundo após o hover
    if (hoverTimeout) {
      clearTimeout(hoverTimeout); // Limpa o timeout se o usuário clicou a tempo
    }

    // Se o jogador clicar 5 vezes corretamente
    if (clickCount === 5) {
      setTimeout(() => {
        // Limpa a tela
        document.body.innerHTML = '';
        victoryText.style.display = 'block'; // Mostra o texto de vitória
        startVictoryAnimation(); // Começa a animação do texto
      }, 1000); // Atraso para garantir que o último áudio tenha tocado
    }
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
    // Se o usuário passar o cursor por cima, começa a contagem do tempo
    hoverTimeout = setTimeout(() => {
      moveToRandomPosition(); // Muda a posição após 1 segundo
    }, 200); // Tempo de 1 segundo
  }
});

// Função para movimento aleatório contínuo
function startRandomMovement() {
  setInterval(() => {
    moveToRandomPosition();
  }, 2000); // Move para uma posição aleatória a cada 2 segundos
}

// Função para animação de "Victory"
function startVictoryAnimation() {
  let blinkState = true;
  setInterval(() => {
    victoryText.style.visibility = blinkState ? 'visible' : 'hidden';
    blinkState = !blinkState;
  }, 500); // Piscar a cada 500ms
}
