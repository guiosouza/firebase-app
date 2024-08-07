import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getDatabase,
  ref,
  child,
  get,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";

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

firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const exerciseFormDB = firebase.database().ref("exerciseForm");

onAuthStateChanged(auth, (user) => {
  if (user) {
    loadExercises(user.uid); // Passando o UID do usuário autenticado
  } else {
    // Redirecionar ou mostrar mensagem caso o usuário não esteja autenticado
    console.log("Usuário não autenticado");
  }
});

function loadExercises(uid) {
  const userRef = ref(database, `users/${uid}/exerciseForm`);
  get(userRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const exercises = [];

        // Transformar os dados em um array e adicionar o ID
        for (let id in data) {
          exercises.push({ id, ...data[id] });
        }

        // Ordenar os exercícios em ordem decrescente
        exercises.sort((a, b) => b.timestamp - a.timestamp);

        // Renderizar os cartões
        renderCards(exercises);
      } else {
        console.log("Nenhum exercício encontrado para este usuário.");
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar dados:", error);
    });
}

// Função para renderizar os cartões
function renderCards(exercises) {
  const carousel = document.getElementById("carousel");
  carousel.innerHTML = ""; // Limpar o conteúdo existente

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
    totalLoadBiceps: "Total sobrecarga nos bíceps",
    totalLoadShoulders: "Total de sobrecarga nos ombros",
    tutTriceps: "Total de reps tríceps (TUT)",
    tutShoulders: "Total de reps usando ombro (TUT)",
    tutBiceps: "Total de reps usando bíceps (TUT)",
    tutLegs: "Total de reps usando pernas (TUT)",
  };

  function groupByCategory(exercise) {
    const categories = {
      Peito: [],
      Perna: [],
      Triceps: [],
      Ombros: [],
      Biceps: [],
      Corrida: [],
    };

    for (let key in exercise) {
      if (key !== "id" && key !== "day" && key !== "timestamp") {
        let p = document.createElement("p");
        p.classList.add("exercise-detail");
        p.textContent = `${fieldMap[key] || key}: ${exercise[key]}`;

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

// // Chamar a função para carregar os exercícios quando a página carregar
// document.addEventListener("DOMContentLoaded", loadExercises);
