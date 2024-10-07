// workout-list.js
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";

const ITEMS_PER_PAGE = 15; // Alterado para carregar 3 itens por vez

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyARzjV2HNxKXvXcEeyzbAmyuSfQ2haH7KU",
  authDomain: "my-private-app-7e1c1.firebaseapp.com",
  databaseURL: "https://my-private-app-7e1c1-default-rtdb.firebaseio.com",
  projectId: "my-private-app-7e1c1",
  storageBucket: "my-private-app-7e1c1.appspot.com",
  messagingSenderId: "443117665061",
  appId: "1:443117665061:web:48abf382af18ff24c8f8cc",
};

initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

let allExercises = []; // Armazena todos os exercícios carregados
let currentIndex = 0; // Índice do próximo exercício a ser renderizado

onAuthStateChanged(auth, (user) => {
  if (user) {
    loadExercises(user.uid);
  } else {
    console.log("Usuário não autenticado");
  }
});

function loadExercises(uid) {
  const cachedExercises = JSON.parse(localStorage.getItem("exercises")) || [];

  if (cachedExercises.length > 0) {
    renderCards(cachedExercises);
    currentIndex = cachedExercises.length;
  } else {
    document.getElementById("loading-message").style.display = "block";
  }

  const userRef = ref(database, `users/${uid}/exerciseForm`);
  get(userRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const exercises = Object.keys(data).map((id) => ({ id, ...data[id] }));
        exercises.sort((a, b) => b.timestamp - a.timestamp);

        allExercises = exercises;
        const newExercises = exercises.slice(0, ITEMS_PER_PAGE);

        if (
          newExercises.length > 0 &&
          JSON.stringify(newExercises) !== JSON.stringify(cachedExercises)
        ) {
          localStorage.setItem("exercises", JSON.stringify(newExercises));
          renderCards(newExercises);
          currentIndex = ITEMS_PER_PAGE;
        }
      } else {
        showNoDataMessage();
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar dados:", error);
    })
    .finally(() => {
      document.getElementById("loading-message").style.display = "none";
    });

  window.addEventListener("scroll", handleScroll);
}

function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (
    scrollTop + clientHeight >= scrollHeight - 5 &&
    currentIndex < allExercises.length
  ) {
    loadMoreExercises();
  }
}

function loadMoreExercises() {
  const nextExercises = allExercises.slice(currentIndex, currentIndex + 10);
  renderCards(nextExercises);
  currentIndex += 10;
}

function renderCards(exercises) {
  const carousel = document.getElementById("carousel");

  exercises.forEach((exercise) => {
    const card = document.createElement("div");
    card.classList.add("exercise-card");

    const title = document.createElement("h2");
    title.textContent = `Dia ${exercise.day}`;

    const dateTime = document.createElement("p");
    dateTime.classList.add("exercise-date");
    dateTime.textContent = `Dia e hora de treino: ${
      exercise.dateTime ? exercise.dateTime : "Sem dados para exibir"
    }`;

    card.appendChild(title);
    card.appendChild(dateTime);

    const categories = groupByCategory(exercise);

    for (let category in categories) {
      if (categories[category].length > 0) {
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("exercise-category");

        const categoryTitle = document.createElement("h3");
        categoryTitle.classList.add("category-title");
        categoryTitle.textContent = category;

        categoryDiv.appendChild(categoryTitle);
        categories[category].forEach((p) => categoryDiv.appendChild(p));
        card.appendChild(categoryDiv);
      }
    }

    carousel.appendChild(card);
  });
}

function groupByCategory(exercise) {
  const categories = {
    Peito: [],
    Perna: [],
    Triceps: [],
    Ombros: [],
    Biceps: [],
    Corrida: [],
  };

  const fieldMap = {
    repsChest: "Repetições de peito",
    repsLeg: "Repetições de perna",
    repsTriceps: "Repetições de tríceps",
    seriesChest: "Séries de peito",
    seriesLeg: "Séries de perna",
    seriesTriceps: "Séries de tríceps",
    weightLeg: "Peso perna (KG)",
    weightTriceps: "Peso tríceps (KG)",
    runDistance: "Distância percorrida (KM)",
    runTime: "Tempo de corrida",
    seriesShoulders: "Séries de ombros",
    repsShoulders: "Repetições de ombros",
    weightShoulders: "Peso ombro (KG)",
    seriesBiceps: "Séries de bíceps",
    repsBiceps: "Repetições de bíceps",
    weightBiceps: "Peso bíceps (KG)",
    totalLoadChest: "Total de carga no peito",
    totalLoadBiceps: "Total de carga nos bíceps",
    totalLoadTriceps: "Total de carga nos tríceps",
    totalLoadShoulders: "Total de carga nos ombros",
    tutTriceps: "Total de reps com TUTs usando tríceps",
    tutChest: "Total de reps TUTs usando o peito",
    tutShoulders: "Total de reps com TUTs usando ombro",
    tutBiceps: "Total de reps TUTs usando bíceps",
    tutLegs: "Total de reps TUTs usando pernas",
    totalLoadLegs: "Total de carga nas pernas: ",
  };

  for (let key in exercise) {
    if (key !== "id" && key !== "day" && key !== "timestamp") {
      let p = document.createElement("p");
      p.classList.add("exercise-detail");
      p.textContent = `${fieldMap[key] || key}: ${exercise[key]}`;

      // Adiciona destaque para "Total de carga"
      if (fieldMap[key] && fieldMap[key].includes("Total de carga")) {
        // Envolve o número em uma span para destaque
        const highlightedText = `${fieldMap[key]}: <span class="highlight">${exercise[key]}</span>`;
        p.innerHTML = highlightedText;
      } else {
        p.textContent = `${fieldMap[key] || key}: ${exercise[key]}`;
      }

      if (key.includes("Chest")) {
        categories.Peito.push(p);
      } else if (key.includes("Leg")) {
        categories.Perna.push(p);
      } else if (key.includes("Triceps")) {
        categories.Triceps.push(p);
      } else if (key.includes("Shoulders")) {
        categories.Ombros.push(p);
      } else if (key.includes("Biceps")) {
        categories.Biceps.push(p);
      } else if (key.includes("run")) {
        categories.Corrida.push(p);
      }
    }
  }

  return categories;
}

function showNoDataMessage() {
  document.getElementById("loading-message").style.display = "none";
  document.getElementById("no-data-message").style.display = "block";
}
