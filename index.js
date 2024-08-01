document.getElementById("day-select").addEventListener("change", function () {
  const day = this.value;
  const exerciseInputs = document.getElementById("exercise-inputs");
  const inputs = exerciseInputs.getElementsByClassName("exercise-input");

  if (day == "0") {
    exerciseInputs.style.display = "none";
  } else {
    exerciseInputs.style.display = "block";

    // Reset all inputs
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].style.display = "none";
      inputs[i].placeholder = "";
    }

    switch (day) {
      case "1":
        inputs[0].style.display = "block";
        inputs[0].placeholder = "Ombro";
        inputs[1].style.display = "block";
        inputs[1].placeholder = "Costas";
        inputs[2].style.display = "block";
        inputs[2].placeholder = "Bíceps";
        break;
      case "2":
        inputs[0].style.display = "block";
        inputs[0].placeholder = "Peito";
        inputs[1].style.display = "block";
        inputs[1].placeholder = "Perna";
        inputs[2].style.display = "block";
        inputs[2].placeholder = "Tríceps";
        break;
      case "3":
        inputs[0].style.display = "block";
        inputs[0].placeholder = "Distância";
        inputs[1].style.display = "block";
        inputs[1].placeholder = "Tempo";
        break;
    }
  }
});

function handleSubmit() {
  // Lógica para o envio dos dados
  alert("Dados enviados!");
}
