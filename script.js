document.getElementById('runner').addEventListener('click', function() {
  // Pega a largura e altura da tela
  let screenWidth = window.innerWidth;
  let screenHeight = window.innerHeight;

  // Gera posições aleatórias dentro da tela
  let randomX = Math.random() * (screenWidth - this.offsetWidth);
  let randomY = Math.random() * (screenHeight - this.offsetHeight);

  // Muda a posição do botão
  this.style.position = 'absolute';
  this.style.left = `${randomX}px`;
  this.style.top = `${randomY}px`;
});
