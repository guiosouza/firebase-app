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
    exercises.sort((a, b) => b.timestamp - a.timestamp);

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
    repsLeg: "Repetições de perna",
    repsTriceps: "Repetições de tríceps",
    seriesChest: "Séries de peito",
    seriesLeg: "Séries de perna",
    seriesTriceps: "Séries de tríceps",
    weightLeg: "Peso (perna)",
    weightTriceps: "Peso (tríceps)",
    runDistance: "Distância percorrida (KM)",
    runTime: "Tempo de corrida",
    seriesShoulders: "Séries de ombros",
    repsShoulders: "Repetições de ombros",
    weightShoulders: "Peso (ombros)",
    seriesBiceps: "Séries de bíceps",
    repsBiceps: "Repetições de bíceps",
    weightBiceps: "Peso (bíceps)",
    totalLoadBiceps: "Total sobrecarga nos bíceps",
    totalLoadShoulders: "Total de sobrecarga nos ombros",
  };

  // Função para agrupar exercícios por categoria
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
        p.classList.add("align-right");
        p.classList.add("items-listing");
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
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = "https://via.placeholder.com/150";
    img.alt = `Card para o dia ${exercise.day}`;

    const title = document.createElement("h2");
    const dateTime = document.createElement("p");
    title.textContent = `Dia ${exercise.day}`;
    dateTime.textContent = `Dia e hora de treino: ${
      exercise.dateTime ? exercise.dateTime : "Sem dados para exibir"
    }`;

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(dateTime);

    const categories = groupByCategory(exercise);

    // Adicionar os detalhes dos exercícios agrupados por categoria
    for (let category in categories) {
      if (categories[category].length > 0) {
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("category");

        const categoryTitle = document.createElement("h3");
        categoryTitle.classList.add("align-right");
        categoryTitle.textContent = category;

        categoryDiv.appendChild(categoryTitle);
        categories[category].forEach((p) => categoryDiv.appendChild(p));
        card.appendChild(categoryDiv);
      }
    }

    carousel.appendChild(card);
  });
}

// Chamar a função para carregar os exercícios quando a página carregar
document.addEventListener("DOMContentLoaded", loadExercises);
