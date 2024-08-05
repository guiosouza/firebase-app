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
  startPos = getPositionY(event); // Usa a função getPositionY
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
    const currentPosition = getPositionY(event); // Usa a função getPositionY
    currentTranslate = prevTranslate + currentPosition - startPos;
    setSliderPosition();
  }
}

function getPositionY(event) {
  return event.type.includes("mouse") ? event.pageY : event.touches[0].clientY;
}

function animation() {
  if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
  carousel.style.transform = `translateY(${currentTranslate}px)`; // Altera para translateY
}

function getMaxTranslate() {
  // Calcula o valor máximo que pode ser arrastado (altura total do carrossel - altura do container)
  return carousel.scrollHeight - carousel.offsetHeight;
}

// Inicialize o Firebase
const firebaseConfig = {
  apiKey: "AIzaSyARzjV2HNxKXvXcEeyzbAmyuSfQ2haH7KU",
  authDomain: "my-private-app-7e1c1.firebaseapp.com",
  databaseURL: "https://my-private-app-7e1c1-default-rtdb.firebaseio.com",
  projectId: "my-private-app-7e1c1",
  storageBucket: "my-private-app-7e1c1.appspot.com",
  messagingSenderId: "443117665061",
  appId: "1:443117665061:web:48abf382af18ff24c8f8cc",
};

// Inicialize o Firebase
firebase.initializeApp(firebaseConfig);
const exerciseFormDB = firebase.database().ref("exerciseForm");

// Função para carregar os dados do Firebase
function loadExercises() {
  exerciseFormDB.once("value", (snapshot) => {
    const data = snapshot.val();
    const exercises = [];

    // Transformar os dados em um array e adicionar o ID
    for (let id in data) {
      exercises.push({ id, ...data[id] });
    }

    // Ordenar os exercícios em ordem decrescente
    exercises.sort((a, b) => b.day - a.day);

    // Renderizar os cards
    renderCards(exercises);
  });
}

// Função para renderizar os cards
function renderCards(exercises) {
  const carousel = document.getElementById("carousel");
  carousel.innerHTML = ""; // Limpar o conteúdo existente

  exercises.forEach((exercise) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = "https://via.placeholder.com/150";
    img.alt = `Card para o dia ${exercise.day}`;

    const title = document.createElement("h2");
    title.textContent = `Dia ${exercise.day}`;

    card.appendChild(img);
    card.appendChild(title);

    // Adicionar os detalhes dos exercícios
    for (let key in exercise) {
      if (key !== "id" && key !== "day") {
        const p = document.createElement("p");

        // Traduzir e formatar os campos específicos
        if (key == "repsChest") {
          p.textContent = `Repetições de peito: ${exercise[key]}`;
        } else if (key == "repsLeg") {
          p.textContent = `Repetições de perna: ${exercise[key]}`;
        } else if (key == "repsTriceps") {
          p.textContent = `Repetições de tríceps: ${exercise[key]}`;
        } else if (key == "seriesChest") {
          p.textContent = `Séries de peito: ${exercise[key]}`;
        } else if (key == "seriesLeg") {
          p.textContent = `Séries de perna: ${exercise[key]}`;
        } else if (key == "seriesTriceps") {
          p.textContent = `Séries de tríceps: ${exercise[key]}`;
        } else if (key == "tutChest") {
          p.textContent = `Tempo sob tensão (peito): ${exercise[key]} segundos`;
        } else if (key == "tutLegs") {
          p.textContent = `Tempo sob tensão (pernas): ${exercise[key]} segundos`;
        } else if (key == "tutTriceps") {
          p.textContent = `Tempo sob tensão (tríceps): ${exercise[key]} segundos`;
        } else if (key == "weightLeg") {
          p.textContent = `Peso (perna): ${exercise[key]} kg`;
        } else if (key == "weightTriceps") {
          p.textContent = `Peso (tríceps): ${exercise[key]} kg`;
        } else if (key == "runDistance") {
          p.textContent = `Distância percorrida (KM): ${exercise[key]}`;
        } else if (key == "runTime") {
          p.textContent = `Tempo de corrida: ${exercise[key]}`;
        } else {
          p.textContent = `${key}: ${exercise[key]}`;
        }

        card.appendChild(p);
      }
    }

    carousel.appendChild(card);
  });
}

// Chamar a função para carregar os exercícios quando a página carregar
document.addEventListener("DOMContentLoaded", loadExercises);
