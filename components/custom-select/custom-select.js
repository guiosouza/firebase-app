document.addEventListener("DOMContentLoaded", function () {
  const selectElement = document.getElementById("day-select");
  const options = selectElement.querySelectorAll("option");
  const inputsContainer = document.getElementById("inputs-container");

  // Criação da estrutura do select customizado
  const customSelect = document.createElement("div");
  customSelect.classList.add("custom-select");

  const selectedOption = document.createElement("div");
  selectedOption.classList.add("selected-option");
  selectedOption.textContent = options[0].textContent; // Texto do primeiro option
  customSelect.appendChild(selectedOption);

  const optionList = document.createElement("div");
  optionList.classList.add("option-list");

  options.forEach((option, index) => {
    if (index !== 0) {
      // Ignora o primeiro option
      const optionItem = document.createElement("div");
      optionItem.classList.add("option-item");
      optionItem.textContent = option.textContent;
      optionItem.dataset.value = option.value;

      // Adiciona o ID dinâmico com base no índice
      optionItem.id = `day${index}`;

      optionList.appendChild(optionItem);

      // Adiciona evento de clique para alterar a seleção
      optionItem.addEventListener("click", function () {
        selectedOption.textContent = this.textContent;
        selectElement.value = this.dataset.value;
        optionList.classList.remove("show");
        customSelect.classList.remove("open");
        createInputs(this.dataset.value);
      });
    }
  });

  customSelect.appendChild(optionList);
  selectElement.parentNode.insertBefore(customSelect, selectElement);
  selectElement.style.display = "none"; // Esconde o select original

  // Adiciona evento para mostrar/ocultar a lista de opções
  selectedOption.addEventListener("click", function () {
    optionList.classList.toggle("show");
    customSelect.classList.toggle("open");
  });

  // Fecha a lista de opções se clicar fora do select
  document.addEventListener("click", function (event) {
    if (!customSelect.contains(event.target)) {
      optionList.classList.remove("show");
      selectedOption.classList.remove("active");
      customSelect.classList.remove("open");
    }
  });

  // Função para criar os inputs dinamicamente
  function createInputs(day) {
    inputsContainer.innerHTML = "";

    if (day === "1") {
      inputsContainer.innerHTML = `

        <div class="input-group">
          <label for="series-chest">Séries de Flexões:</label>
          <input class="input-form" type="number" id="series-chest" name="series-chest" min="1" />
        </div>
        <div class="input-group">
          <label for="reps-chest">Reps por Série:</label>
          <input class="input-form" type="number" id="reps-chest" name="reps-chest" min="1" />
        </div>
        <div class="input-group">
          <label for="tut-chest">Quantas séries de TUT Excêntrica (4 segundos):</label>
          <input class="input-form" type="number" id="tut-chest" name="tut-chest" min="0" step="0.1" />
        </div>
        <div class="input-group">
          <label for="fail-chest">Quantas reps falhou:</label>
          <input class="input-form" type="number" id="fail-chest" name="fail-chest" min="0" step="0.1" />
        </div>
        <div class="input-group">
          <label for="weight-for-pushup">Seu peso:</label>
          <input class="input-form" type="number" id="weight-for-pushup" name="weight-for-pushup" min="1" />
        </div>

        <div class="input-group" style="margin-top: 96px">
          <label for="series-legs">Séries de Perna:</label>
          <input class="input-form" type="number" id="series-legs" name="series-legs" min="1" />
        </div>
        <div class="input-group">
          <label for="reps-legs">Reps por Série:</label>
          <input class="input-form" type="number" id="reps-legs" name="reps-legs" min="1" />
        </div>
        <div class="input-group">
          <label for="tut-legs">Séries TUT Excêntrica (4 segundos):</label>
          <input class="input-form" type="number" id="tut-legs" name="tut-legs" min="0" step="0.1" />
        </div>
        <div class="input-group">
          <label for="fail-legs">Quantas reps falhou:</label>
          <input class="input-form" type="number" id="fail-legs" name="fail-legs" min="0" step="0.1" />
        </div>
        <div class="input-group">
          <label for="weight-legs">Peso (kg):</label>
          <input class="input-form" type="number" id="weight-legs" name="weight-legs" min="0" step="0.1" />
        </div>

        <div class="input-group" style="margin-top: 96px">
          <label for="series-triceps">Séries de Tríceps:</label>
          <input class="input-form" type="number" id="series-triceps" name="series-triceps" min="1" />
        </div>
        <div class="input-group">
          <label for="reps-triceps">Reps por Série:</label>
          <input class="input-form" type="number" id="reps-triceps" name="reps-triceps" min="1" />
        </div>
        <div class="input-group">
          <label for="tut-triceps">Séries de TUT Excêntrica (4 segundos):</label>
          <input class="input-form" type="number" id="tut-triceps" name="tut-triceps" min="0" step="0.1" />
        </div>
        <div class="input-group">
          <label for="fail-triceps">Quantas reps falhou:</label>
          <input class="input-form" type="number" id="fail-triceps" name="tfail-triceps" min="0" step="0.1" />
        </div>
        <div class="input-group">
          <label for="weight-triceps">Peso (kg):</label>
          <input class="input-form" type="number" id="weight-triceps" name="weight-triceps" min="0" step="0.1" />
        </div>
      `;
    } else if (day === "2") {
      inputsContainer.innerHTML = `
        <div class="input-group">
          <label for="series-shoulders">Séries de Ombro:</label>
          <input class="input-form" type="number" id="series-shoulders" name="series-shoulders" min="1" />
        </div>
        <div class="input-group">
          <label for="reps-shoulders">Reps por Série:</label>
          <input class="input-form" type="number" id="reps-shoulders" name="reps-shoulders" min="1" />
        </div>
        <div class="input-group">
          <label for="weight-shoulders">Peso (kg):</label>
          <input class="input-form" type="number" id="weight-shoulders" name="weight-shoulders" min="0" step="0.1" />
        </div>
        <div class="input-group">
          <label for="tut-shoulders">Séries de TUT Excêntrica (4 segundos):</label>
          <input class="input-form" type="number" id="tut-shoulders" name="tut-shoulders" min="0" step="0.1" />
        </div>
         <div class="input-group" style="margin-top: 96px">
          <label for="series-biceps">Séries de Bíceps:</label>
          <input class="input-form" type="number" id="series-biceps" name="series-biceps" min="1" />
        </div>
        <div class="input-group">
          <label for="reps-biceps">Reps por Série:</label>
        <input class="input-form" type="number" id="reps-biceps" name="reps-biceps" min="1" />
        </div>
        <div class="input-group">
          <label for="weight-biceps">Peso (kg):</label>
          <input class="input-form" type="number" id="weight-biceps" name="weight-biceps" min="0" step="0.1" />
        </div>
        <div class="input-group">
          <label for="tut-biceps">Séries de TUT Excêntrica (4 segundos):</label>
          <input class="input-form" type="number" id="tut-biceps" name="tut-biceps" min="0" step="0.1" />
        </div>
      `;
    } else if (day === "3") {
      inputsContainer.innerHTML = `
        <div class="input-group">
          <label for="run-time">Tempo de Corrida (minutos):</label>
          <input class="input-form" type="number" id="run-time" name="run-time" min="0" step="0.1" />
        </div>
        <div class="input-group">
          <label for="run-distance">Distância (km):</label>
          <input class="input-form" type="number" id="run-distance" name="run-distance" min="0" step="0.1" />
        </div>
      `;
    }
  }
});
