  
  
  /*PARALAX FUNDO*/
  const parallax = document.getElementById('parallax');
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10; // -5 a +5
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    parallax.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
  });

 

/*LETREIRO ANIMADO */
  document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.animate').forEach(container => {
    const spans = container.querySelectorAll('span');
    spans.forEach((span, i) => {
      span.style.animationDelay = `${i * 0.05}s`;
    });
  });
});


 
  function selecionarPersonagem(botao) {
    // Remove a classe "selecionado" de todos os cards
    document.querySelectorAll('.finish-card.selecionado').forEach(card => {
      card.classList.remove('selecionado');
    });

    // Adiciona "selecionado" apenas no card pai do botão clicado
    const card = botao.closest('.finish-card');
    if (card) {
      card.classList.add('selecionado');
    }
  }