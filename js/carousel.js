const carousel = document.getElementById("carousel");
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let currentIndex = 0;

carousel.addEventListener("touchstart", touchStart);
carousel.addEventListener("touchend", touchEnd);
carousel.addEventListener("touchmove", touchMove);
carousel.addEventListener("mousedown", touchStart);
carousel.addEventListener("mouseup", touchEnd);
carousel.addEventListener("mouseleave", touchEnd);
carousel.addEventListener("mousemove", touchMove);

function touchStart(event) {
  isDragging = true;
  startPos = getPositionX(event);
  animationID = requestAnimationFrame(animation);
  carousel.classList.add("grabbing");
}

function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);
  carousel.classList.remove("grabbing");

  // Limita a rolagem para não ultrapassar os limites do carrossel
  currentTranslate = Math.max(
    Math.min(currentTranslate, 0),
    -getMaxTranslate()
  );

  // Atualiza prevTranslate
  prevTranslate = currentTranslate;

  // Ajusta a posição final para o cartão mais próximo
  setSliderPosition();
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
    setSliderPosition();
  }
}

function getPositionX(event) {
  return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
}

function animation() {
  if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
  carousel.style.transform = `translateX(${currentTranslate}px)`;
}

function getMaxTranslate() {
  // Calcula o valor máximo que pode ser arrastado (largura total do carrossel - largura do container)
  return carousel.scrollWidth - carousel.offsetWidth;
}
