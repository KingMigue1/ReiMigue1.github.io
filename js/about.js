const track = document.getElementById('carouselTrack');
const cards = document.querySelectorAll('.partner-card');
let currentIndex = 0;
let cardsPerView = 4; // padrão desktop
const scrollStep = 1; // rolar menos para ser mais suave

function updateCardsPerView() {
  const width = window.innerWidth;
  if (width <= 480) cardsPerView = 1;
  else if (width <= 768) cardsPerView = 2;
  else if (width <= 1200) cardsPerView = 3;
  else cardsPerView = 4;
}

function autoScrollCarousel() {
  updateCardsPerView();

  const cardCount = cards.length;
  const maxIndex = cardCount - cardsPerView;

  currentIndex += scrollStep;
  if (currentIndex > maxIndex) currentIndex = 0;

  const cardStyle = getComputedStyle(cards[0]);
  const cardWidth = cards[0].offsetWidth + parseInt(cardStyle.marginLeft) + parseInt(cardStyle.marginRight);
  const scrollAmount = cardWidth * currentIndex;

  track.style.transform = `translateX(-${scrollAmount}px)`;
}

// Roda a cada 4 segundos
setInterval(autoScrollCarousel, 4000);

// Atualiza também quando redimensiona a tela para evitar bugs
window.addEventListener('resize', () => {
  currentIndex = 0;
  track.style.transform = `translateX(0)`;
});
