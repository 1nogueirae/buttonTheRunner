let clickCount = 0; // Contador de cliques
let isMovingSideToSide = false; // Flag para controlar se o botão deve se mover lateralmente

// Função para movimentação lateral
function moveSideToSide() {
  let button = document.getElementById('runner');
  let screenWidth = window.innerWidth;
  let direction = 1; // 1 para direita, -1 para esquerda
  let step = 5; // Passo de movimento (quanto maior, mais rápido)

  // Movimento lateral constante
  setInterval(function() {
    let currentPosition = parseFloat(button.style.left || 0);
    
    // Se o botão chegar nas extremidades da tela, inverte a direção
    if (currentPosition >= screenWidth - button.offsetWidth || currentPosition <= 0) {
      direction *= -1; // Troca direção
    }

    // Move o botão
    button.style.position = 'absolute';
    button.style.left = (currentPosition + step * direction) + 'px';
  }, 10); // Executa a cada 10ms para suavizar o movimento
}

// Adiciona o evento de clique no botão
document.getElementById('runner').addEventListener('click', function() {
  clickCount++; // Aumenta o contador de cliques

  if (clickCount >= 5 && !isMovingSideToSide) {
    isMovingSideToSide = true; // Marca que o movimento lateral vai começar
    moveSideToSide(); // Inicia o movimento lateral
  } else {
    // Movimento aleatório antes de 5 cliques
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    let randomX = Math.random() * (screenWidth - this.offsetWidth);
    let randomY = Math.random() * (screenHeight - this.offsetHeight);

    this.style.position = 'absolute';
    this.style.left = `${randomX}px`;
    this.style.top = `${randomY}px`;
  }
});
