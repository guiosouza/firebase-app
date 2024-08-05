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

function saveMessages(seriesChest, dayNumber, repsChest) {
  var newExerciseForm = exerciseFormDB.push();

  newExerciseForm.set({
    seriesChest: Number(seriesChest),
    day: Number(dayNumber),
    repsChest: Number(repsChest),
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

  var dayNumber;

  if (elementExists("day1")) {
    dayNumber = getDayNumberFromId("day1");
    var seriesChest = getElementVal("series-chest");
    var repsChest = getElementVal("reps-chest");
    saveMessages(seriesChest, dayNumber, repsChest);
  } else if (elementExists("day2")) {
    dayNumber = getDayNumberFromId("day2");
  } else if (elementExists("day3")) {
    dayNumber = getDayNumberFromId("day3");
  }
}
