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
let inputFieldEl = document.getElementById("series-chest");

document.getElementById("exercise-form").addEventListener("submit", submitForm);

function saveMessages(data) {
  // Desestruturar os dados recebidos
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
  } = data;

  if (dayNumber === 1) {
    let newExerciseFormDay = exerciseFormDB.push();
    newExerciseFormDay.set({
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
    });
  } else if (dayNumber === 2) {
    let newExerciseFormDay = exerciseFormDB.push();
    newExerciseFormDay.set({
      seriesChest: null,
      day: Number(dayNumber),
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
      seriesShoulders: Number(seriesShoulders) || null,
      repsShoulders: Number(repsShoulders) || null,
      weightShoulders: Number(weightShoulders) || null,
      tutShoulders: Number(tutShoulders) || null,
      seriesBiceps: Number(seriesBiceps) || null,
      repsBiceps: Number(repsBiceps) || null,
      weightBiceps: Number(weightBiceps) || null,
      tutBiceps: Number(tutBiceps) || null,
      runTime: null,
      runDistance: null,
    });
  } else if (dayNumber === 3) {
    let newExerciseFormDay = exerciseFormDB.push();
    newExerciseFormDay.set({
      seriesChest: null,
      day: Number(dayNumber),
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
      runTime: Number(runTime) || null,
      runDistance: Number(runDistance) || null,
    });
  }
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
      seriesChest: seriesChest,
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
      seriesShoulders: Number(seriesShoulders),
      repsShoulders: Number(repsShoulders),
      weightShoulders: Number(weightShoulders),
      tutShoulders: Number(tutShoulders),
      seriesBiceps: Number(seriesBiceps),
      repsBiceps: Number(repsBiceps),
      weightBiceps: Number(weightBiceps),
      tutBiceps: Number(tutBiceps),
      runTime: null,
      runDistance: null,
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
    });
  }
}
