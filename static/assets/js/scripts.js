///////////////////////////////// Tela criador de personagens começa aqui////////////////////////////////////
const totalMax = 100; 
const atributos = ["forca", "inteligencia", "agilidade", "resistencia"];
const sliders = {};
const valores = {};

atributos.forEach(attr => {
  sliders[attr] = document.getElementById(attr);
  valores[attr] = document.getElementById(attr + "_val");
});

const pontosRestantesEl = document.getElementById("pontos_restantes");
const nomeInput = document.getElementById("nome");

function atualizarPontos(event) {
  let soma = 0;
  atributos.forEach(attr => {
    soma += parseInt(sliders[attr].value);
  });

  let restante = totalMax - soma;
  pontosRestantesEl.innerText = restante;

  if(pontosRestantesEl.textContent > 50){
    pontosRestantesEl.style.color = "#95ff95";
  }
  else if(pontosRestantesEl.textContent <= 50 && pontosRestantesEl.textContent > 10){
    pontosRestantesEl.style.color = "rgb(255 242 86)";
  }else{
     pontosRestantesEl.style.color = '#ff8f8f';

  }

  atributos.forEach(attr => {
    const valor = parseInt(sliders[attr].value);
    valores[attr].innerText = valor;
    sliders[attr].max = valor + restante;

    const barra = document.getElementById("preview_" + attr);
    if (barra) {
      barra.style.width = valor + "%";
    }
  });

  atualizarPreview();
}

function atualizarPreview() {
  document.getElementById("preview_nome").innerText = nomeInput.value || "Personagem";
const corPeleSelect = document.getElementById("cor_pele");
if (corPeleSelect) {
  // Supondo que você queira aplicar no SVG
  const elementoSVG = document.getElementById("cor_da_pele");
  elementoSVG.style.fill = corPeleSelect.value;
  elementoSVG.style.stroke  = corPeleSelect.value;
}


  const armaduraSelect = document.getElementById("armaduras");
  const novaArmadura = armaduraSelect.value;

  const imagemCorpo = document.querySelector(".corpo");
  if (imagemCorpo && novaArmadura) imagemCorpo.src = novaArmadura;

  const armaSelect = document.getElementById("arma"); 
  const armaSelecionada = armaSelect.value;
  const imagemArma = document.querySelector(".arma");
  const imagemArco = document.querySelector(".arco");
  if (armaSelecionada.includes("arco.png")) {
    imagemArco.src = armaSelecionada;
    imagemArma.src = "{{ url_for('static', filename='assets/img/vazio.png') }}";
  } else {
    imagemArco.src = "{{ url_for('static', filename='assets/img/vazio.png') }}";
    imagemArma.src = armaSelecionada;
  }

  const escudoSelect = document.getElementById("escudos");
  const escudoSelecionado = escudoSelect.value;
  const imagemEscudo = document.querySelector(".escudo");
  if (imagemEscudo) imagemEscudo.src = escudoSelecionado;

  const capaceteSelect = document.getElementById("capacetes");
  const capaceteSelecionado = capaceteSelect.value;
  const imagemCabeca = document.querySelector(".cabeca");
  if (imagemCabeca) imagemCabeca.src = capaceteSelecionado;
}

function validarPontos() {
  let total = atributos.reduce((acc, attr) => acc + parseInt(sliders[attr].value), 0);
  if (total !== totalMax) {
    alert("Você precisa distribuir exatamente "+ totalMax +" pontos.");
    return false;
  }
  return true;
}

let armaIndex = 0;
function mudarArma(direcao) {
  const slides = document.querySelectorAll('.arma-slide');
  slides[armaIndex].classList.add('d-none');
  armaIndex = (armaIndex + direcao + slides.length) % slides.length;
  slides[armaIndex].classList.remove('d-none');
  const novaArma = slides[armaIndex].getAttribute('data-img');
  document.getElementById('arma').value = novaArma;
  atualizarPreview();
}


function mudarArma(direcao) {
  const slides = document.querySelectorAll('.arma-slide');
  slides[armaIndex].classList.add('d-none');
  armaIndex = (armaIndex + direcao + slides.length) % slides.length;
  slides[armaIndex].classList.remove('d-none');
  const novaArma = slides[armaIndex].getAttribute('data-img');
  document.getElementById('arma').value = novaArma;
  atualizarPreview();
}

let escudoIndex = 0;
function mudarEscudo(direcao) {
  const slides = document.querySelectorAll('.escudo-slide');
  slides[escudoIndex].classList.add('d-none');
  escudoIndex = (escudoIndex + direcao + slides.length) % slides.length;
  slides[escudoIndex].classList.remove('d-none');
  const novoEscudo = slides[escudoIndex].getAttribute('data-img');
  document.getElementById('escudos').value = novoEscudo;
  atualizarPreview();
}
 



window.onload = () => {
  atualizarPontos();
  document.getElementById("armaduras").addEventListener("change", atualizarPreview);
  document.getElementById("arma").addEventListener("change", atualizarPreview);
  document.getElementById("escudos").addEventListener("change", atualizarPreview);
  document.getElementById("capacetes").addEventListener("change", atualizarPreview);
  nomeInput.addEventListener("input", atualizarPreview);
};
/////////////////////////////////criador de personagens termina aqui////////////////////////////////////
  

  /*PARALAX FUNDO*/
  const parallax = document.getElementById('parallax');
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10; 
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

