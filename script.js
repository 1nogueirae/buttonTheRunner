const button = document.getElementById('runner');
const audio = document.getElementById('ESQV');

let clickCount = 0;
let isMovingSideToSide = false;
let musicStarted = false;
let direction = 1;
let posX = 0;

button.addEventListener('click', () => {
  clickCount++;

  // Inicia a música no primeiro clique
  if (!musicStarted) {
    audio.play();
    musicStarted = true;
  }

  if (clickCount >= 5 && !isMovingSideToSide) {
    isMovingSideToSide = true;
    moveSideToSide();
  } else {
    // Movimento aleatório nos primeiros 5 cliques
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    let randomX = Math.random() * (screenWidth - button.offsetWidth);
    let randomY = Math.random() * (screenHeight - button.offsetHeight);

    button.style.position = 'absolute';
    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
  }
});

// Movimento lateral contínuo depois do quinto clique
function moveSideToSide() {
  setInterval(() => {
    posX += direction * 2;

    // muda direção ao bater na borda
    if (posX <= 0 || posX >= window.innerWidth - button.offsetWidth) {
      direction *= -1;
    }

    button.style.position = 'absolute';
    button.style.left = `${posX}px`;
  }, 10); // velocidade do movimento (menor = mais rápido)
}
