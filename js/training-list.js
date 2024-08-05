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

  // Objeto de mapeamento para traduzir e formatar os campos
  const fieldMap = {
    repsChest: "Repetições de peito",
    tutChest: "Tempo sob tensão (peito)",
    repsLeg: "Repetições de perna",
    repsTriceps: "Repetições de tríceps",
    seriesChest: "Séries de peito",
    seriesLeg: "Séries de perna",
    seriesTriceps: "Séries de tríceps",
    tutLegs: "Tempo sob tensão (pernas)",
    tutTriceps: "Tempo sob tensão (tríceps)",
    weightLeg: "Peso (perna)",
    weightTriceps: "Peso (tríceps)",
    runDistance: "Distância percorrida (KM)",
    runTime: "Tempo de corrida",
    seriesShoulders: "Séries de ombros",
    repsShoulders: "Repetições de ombros",
    weightShoulders: "Peso (ombros)",
    tutShoulders: "Tempo sob tensão (ombros)",
    seriesBiceps: "Séries de bíceps",
    repsBiceps: "Repetições de bíceps",
    weightBiceps: "Peso (bíceps)",
    tutBiceps: "Tempo sob tensão (bíceps)",
  };

  // Função para agrupar exercícios por categoria
  function groupByCategory(exercise) {
    const categories = {
      Peito: [],
      Perna: [],
      Tríceps: [],
      Ombros: [],
      Bíceps: [],
      Corrida: [],
    };

    for (let key in exercise) {
      if (key !== "id" && key !== "day") {
        let p = document.createElement("p");
        p.textContent = `${fieldMap[key] || key}: ${exercise[key]}`;

        if (key.includes("Chest")) {
          categories.Peito.push(p);
        } else if (key.includes("Leg")) {
          categories.Perna.push(p);
        } else if (key.includes("Triceps")) {
          categories.Tríceps.push(p);
        } else if (key.includes("Shoulders")) {
          categories.Ombros.push(p);
        } else if (key.includes("Biceps")) {
          categories.Bíceps.push(p);
        } else if (key.includes("run")) {
          categories.Corrida.push(p);
        }
      }
    }

    return categories;
  }

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

    const categories = groupByCategory(exercise);

    // Adicionar os detalhes dos exercícios agrupados por categoria
    for (let category in categories) {
      if (categories[category].length > 0) {
        const categoryTitle = document.createElement("h3");
        categoryTitle.textContent = category;
        card.appendChild(categoryTitle);
        categories[category].forEach((p) => card.appendChild(p));
      }
    }

    carousel.appendChild(card);
  });
}

// Chamar a função para carregar os exercícios quando a página carregar
document.addEventListener("DOMContentLoaded", loadExercises);
