import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyARzjV2HNxKXvXcEeyzbAmyuSfQ2haH7KU",
  authDomain: "my-private-app-7e1c1.firebaseapp.com",
  databaseURL: "https://my-private-app-7e1c1-default-rtdb.firebaseio.com",
  projectId: "my-private-app-7e1c1",
  storageBucket: "my-private-app-7e1c1.appspot.com",
  messagingSenderId: "443117665061",
  appId: "1:443117665061:web:48abf382af18ff24c8f8cc",
};

// initialize firebase
firebase.initializeApp(firebaseConfig);
const exerciseFormDB = firebase.database().ref("exerciseForm");

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const viewLoggedOut = document.getElementById("view-logged-out");
const viewLoggedIn = document.getElementById("view-logged-in");

const continueWithGoogleEl = document.getElementById("google-button");
const logOutEl = document.getElementById("log-out-button");

continueWithGoogleEl.addEventListener("click", function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("logged in with Google");
    })
    .catch((error) => {
      console.log(error.code);
    });
});

logOutEl.addEventListener("click", function () {
  signOut(auth);
});

onAuthStateChanged(auth, async function (user) {
  if (user) {
    viewLoggedIn.style.display = "block";
    viewLoggedOut.style.display = "none";
  } else {
    viewLoggedIn.style.display = "none";
    viewLoggedOut.style.display = "block";
  }
});

document.getElementById("exercise-form").addEventListener("submit", submitForm);

function convertTimestampToBRFormat(timestamp) {
  // Converte o timestamp para um objeto Date
  const date = new Date(timestamp);

  // Extrai os componentes da data
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Os meses são indexados a partir de 0
  const year = date.getFullYear();

  // Extrai os componentes da hora
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  // Formata a data no formato brasileiro
  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
}

// Função para mostrar a modal de sucesso
function showSuccessModal() {
  document.getElementById("success-modal").style.display = "block";
}

// Função para fechar a modal de sucesso
function closeModal() {
  document.getElementById("success-modal").style.display = "none";
  reloadPage(); // Recarrega a página ao fechar a modal
}

// Função para recarregar a página
function reloadPage() {
  location.reload();
}

window.closeModal = closeModal;
window.showSuccessModal = showSuccessModal;
window.reloadPage = reloadPage;

function saveMessages(data) {
  const user = auth.currentUser;
  if (!user) {
    console.error("User is not authenticated");
    return;
  }

  const userId = user.uid;
  const userExerciseFormDB = ref(database, `users/${userId}/exerciseForm`);
  const newExerciseFormDay = push(userExerciseFormDB);

  const {
    seriesChest,
    dayNumber,
    repsChest,
    tutChest,
    seriesLeg,
    repsLeg,
    weightLeg,
    tutLegs,
    seriesTriceps,
    repsTriceps,
    weightTriceps,
    tutTriceps,
    seriesShoulders,
    repsShoulders,
    weightShoulders,
    tutShoulders,
    seriesBiceps,
    repsBiceps,
    weightBiceps,
    tutBiceps,
    runTime,
    runDistance,
    timestamp,
  } = data;

  const formattedData = {
    seriesChest: Number(seriesChest) || null,
    day: Number(dayNumber),
    repsChest: Number(repsChest) || null,
    tutChest: Number(tutChest) || null,
    seriesLeg: Number(seriesLeg) || null,
    repsLeg: Number(repsLeg) || null,
    weightLeg: Number(weightLeg) || null,
    tutLegs: Number(tutLegs) || null,
    seriesTriceps: Number(seriesTriceps) || null,
    repsTriceps: Number(repsTriceps) || null,
    weightTriceps: Number(weightTriceps) || null,
    tutTriceps: Number(tutTriceps) || null,
    seriesShoulders: Number(seriesShoulders) || null,
    repsShoulders: Number(repsShoulders) || null,
    weightShoulders: Number(weightShoulders) || null,
    tutShoulders: Number(tutShoulders) || null,
    seriesBiceps: Number(seriesBiceps) || null,
    repsBiceps: Number(repsBiceps) || null,
    weightBiceps: Number(weightBiceps) || null,
    tutBiceps: Number(tutBiceps) || null,
    runTime: Number(runTime) || null,
    runDistance: Number(runDistance) || null,
    timestamp: timestamp,
    dateTime: convertTimestampToBRFormat(timestamp),
  };

  set(newExerciseFormDay, formattedData)
    .then(() => {
      showSuccessModal();
    })
    .catch((error) => {
      console.error("Error saving data:", error);
    });
}

function getElementVal(id) {
  return document.getElementById(id).value;
}

function getDayNumberFromId(id) {
  const match = id.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}

function elementExists(id) {
  return document.getElementById(id) !== null;
}

function submitForm(event) {
  event.preventDefault();

  let dayNumber;
  let selectedOption = document.querySelector(".selected-option");

  if (selectedOption.innerHTML === "Dia 1") {
    dayNumber = getDayNumberFromId("day1");
    let seriesChest = getElementVal("series-chest");
    let repsChest = getElementVal("reps-chest");
    let tutChest = getElementVal("tut-chest");
    let seriesLeg = getElementVal("series-legs");
    let repsLeg = getElementVal("reps-legs");
    let weightLeg = getElementVal("weight-legs");
    let tutLegs = getElementVal("tut-legs");
    let seriesTriceps = getElementVal("series-triceps");
    let repsTriceps = getElementVal("reps-triceps");
    let weightTriceps = getElementVal("weight-triceps");
    let tutTriceps = getElementVal("tut-triceps");
    saveMessages({
      seriesChest,
      dayNumber: Number(dayNumber),
      repsChest: Number(repsChest),
      tutChest: Number(tutChest),
      seriesLeg: Number(seriesLeg),
      repsLeg: Number(repsLeg),
      weightLeg: Number(weightLeg),
      tutLegs: Number(tutLegs),
      seriesTriceps: Number(seriesTriceps),
      repsTriceps: Number(repsTriceps),
      weightTriceps: Number(weightTriceps),
      tutTriceps: Number(tutTriceps),
      seriesShoulders: null,
      repsShoulders: null,
      weightShoulders: null,
      tutShoulders: null,
      seriesBiceps: null,
      repsBiceps: null,
      weightBiceps: null,
      tutBiceps: null,
      runTime: null,
      runDistance: null,
      timestamp: Date.now(),
    });
  } else if (selectedOption.innerHTML === "Dia 2") {
    dayNumber = getDayNumberFromId("day2");
    let seriesShoulders = getElementVal("series-shoulders");
    let repsShoulders = getElementVal("reps-shoulders");
    let weightShoulders = getElementVal("weight-shoulders");
    let tutShoulders = getElementVal("tut-shoulders");
    let seriesBiceps = getElementVal("series-biceps");
    let repsBiceps = getElementVal("reps-biceps");
    let weightBiceps = getElementVal("weight-biceps");
    let tutBiceps = getElementVal("tut-biceps");
    let runTime = getElementVal("run-time");
    let runDistance = getElementVal("run-distance");
    saveMessages({
      seriesChest: null,
      dayNumber: Number(dayNumber),
      repsChest: null,
      tutChest: null,
      seriesLeg: null,
      repsLeg: null,
      weightLeg: null,
      tutLegs: null,
      seriesTriceps: null,
      repsTriceps: null,
      weightTriceps: null,
      tutTriceps: null,
      seriesShoulders: Number(seriesShoulders),
      repsShoulders: Number(repsShoulders),
      weightShoulders: Number(weightShoulders),
      tutShoulders: Number(tutShoulders),
      seriesBiceps: Number(seriesBiceps),
      repsBiceps: Number(repsBiceps),
      weightBiceps: Number(weightBiceps),
      tutBiceps: Number(tutBiceps),
      runTime: Number(runTime),
      runDistance: Number(runDistance),
      timestamp: Date.now(),
    });
  } else if (selectedOption.innerHTML == "Dia 3") {
    dayNumber = getDayNumberFromId("day3");
    let runTime = getElementVal("run-time");
    let runDistance = getElementVal("run-distance");
    console.log(dayNumber);
    saveMessages({
      seriesChest: null,
      dayNumber: Number(dayNumber),
      repsChest: null,
      tutChest: null,
      seriesLeg: null,
      repsLeg: null,
      weightLeg: null,
      tutLegs: null,
      seriesTriceps: null,
      repsTriceps: null,
      weightTriceps: null,
      tutTriceps: null,
      seriesShoulders: null,
      repsShoulders: null,
      weightShoulders: null,
      tutShoulders: null,
      seriesBiceps: null,
      repsBiceps: null,
      weightBiceps: null,
      tutBiceps: null,
      runTime: Number(runTime),
      runDistance: Number(runDistance),
      timestamp: Date.now(),
    });
  }
}
