const track = document.getElementById('carouselTrack');
const cards = document.querySelectorAll('.partner-card');
let currentIndex = 0;
let cardsPerView = 4; // padrão desktop
const scrollStep = 1; // rolar menos para ser mais suave

// Variáveis para controle do arrasto
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let autoScrollInterval;

// Clonamos os primeiros cards e adicionamos no final para criar o efeito de loop
function setupInfiniteLoop() {
  const cardCount = cards.length;
  if (cardCount <= cardsPerView) return; // Não precisa de loop se couber tudo
  
  // Clonamos os primeiros cardsPerView cards e adicionamos no final
  for (let i = 0; i < cardsPerView; i++) {
    const clone = cards[i].cloneNode(true);
    clone.classList.add('clone');
    track.appendChild(clone);
  }
  
  // Clonamos os últimos cardsPerView cards e adicionamos no início
  for (let i = cardCount - 1; i >= cardCount - cardsPerView; i--) {
    const clone = cards[i].cloneNode(true);
    clone.classList.add('clone');
    track.insertBefore(clone, track.firstChild);
  }
  
  // Ajustamos a posição inicial para os cards originais
  currentIndex = cardsPerView;
  updateCarouselPosition();
}

function updateCardsPerView() {
  const width = window.innerWidth;
  if (width <= 480) cardsPerView = 1;
  else if (width <= 768) cardsPerView = 2;
  else if (width <= 1200) cardsPerView = 3;
  else cardsPerView = 4;
}

function getCardWidth() {
  const firstCard = document.querySelector('.partner-card:not(.clone)') || cards[0];
  const cardStyle = getComputedStyle(firstCard);
  return firstCard.offsetWidth + parseInt(cardStyle.marginLeft) + parseInt(cardStyle.marginRight);
}

function updateCarouselPosition() {
  const cardWidth = getCardWidth();
  const scrollAmount = cardWidth * currentIndex;
  track.style.transition = 'transform 0.5s ease-in-out';
  track.style.transform = `translateX(-${scrollAmount}px)`;
}

function autoScrollCarousel() {
  updateCardsPerView();
  
  currentIndex += scrollStep;
  const totalCards = document.querySelectorAll('.partner-card').length;
  const maxIndex = totalCards - cardsPerView;
  
  // Se chegou ao final dos clones, volta suavemente para os cards originais
  if (currentIndex >= maxIndex) {
    setTimeout(() => {
      track.style.transition = 'none';
      currentIndex = cardsPerView;
      updateCarouselPosition();
    }, 500);
  }
  
  updateCarouselPosition();
}

// Funções para o arrasto
function startDrag(e) {
  if (e.type === 'touchstart') {
    startPosition = e.touches[0].clientX;
  } else {
    startPosition = e.clientX;
    e.preventDefault();
  }
  
  isDragging = true;
  prevTranslate = currentIndex * getCardWidth();
  currentTranslate = prevTranslate;
  clearInterval(autoScrollInterval);
  track.style.transition = 'none';
  animationID = requestAnimationFrame(animation);
}

function drag(e) {
  if (!isDragging) return;
  
  let currentPosition = 0;
  if (e.type === 'touchmove') {
    currentPosition = e.touches[0].clientX;
  } else {
    currentPosition = e.clientX;
  }
  
  const diff = currentPosition - startPosition;
  currentTranslate = prevTranslate - diff;
  animationID = requestAnimationFrame(animation);
}

function endDrag() {
  if (!isDragging) return;
  
  cancelAnimationFrame(animationID);
  isDragging = false;
  
  const cardWidth = getCardWidth();
  let newIndex = Math.round(currentTranslate / cardWidth);
  
  // Ajuste para o loop infinito
  const totalCards = document.querySelectorAll('.partner-card').length;
  const originalCardCount = cards.length;
  
  if (newIndex < cardsPerView) {
    newIndex = originalCardCount + cardsPerView;
  } else if (newIndex > originalCardCount + cardsPerView) {
    newIndex = cardsPerView;
  }
  
  currentIndex = newIndex;
  updateCarouselPosition();
  
  autoScrollInterval = setInterval(autoScrollCarousel, 2000);
}

function animation() {
  track.style.transform = `translateX(-${currentTranslate}px)`;
  animationID = requestAnimationFrame(animation);
}

// Inicialização
updateCardsPerView();
setupInfiniteLoop();
autoScrollInterval = setInterval(autoScrollCarousel, 3500);

// Event listeners
track.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', endDrag);
track.addEventListener('touchstart', startDrag, { passive: false });
document.addEventListener('touchmove', drag, { passive: false });
document.addEventListener('touchend', endDrag);

// Atualizar no resize
window.addEventListener('resize', () => {
  updateCardsPerView();
  const cardWidth = getCardWidth();
  currentIndex = cardsPerView;
  track.style.transition = 'none';
  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
});