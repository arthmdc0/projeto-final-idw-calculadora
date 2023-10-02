let currentInput = "";
let history = [];

function addToDisplay(value) {
   currentInput += value;
   document.getElementById("display").value = currentInput;
}

function calculate() {
   try {
      const result = eval(currentInput);
      history.push(`${currentInput} = ${result}`);
      saveOperationToServer(currentInput, result);
      currentInput = "";
      document.getElementById("display").value = result;
      updateHistory();
   } catch (error) {
      alert("Erro na expressão!");
      clearDisplay();
   }
}

function clearDisplay() {
   currentInput = "";
   document.getElementById("display").value = "";
}

function updateHistory() {
   const historyList = document.getElementById("history-list");
   historyList.innerHTML = "";
   history.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      historyList.appendChild(li);
   });
}

function saveOperationToServer(operacao, resultado) {
   fetch("/api/operacoes", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({ operacao, resultado }),
   })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) =>
         console.error("Erro ao salvar a operação no servidor:", error)
      );
}

function deleteOperationsFromServer() {
   fetch("/api/operacoes", {
      method: "DELETE",
   })
      .then((response) => response.json())
      .then((data) => {
         console.log(data);
         history = [];
         updateHistory();
      })
      .catch((error) =>
         console.error("Erro ao excluir as operações do servidor:", error)
      );
}

function fetchOperationsFromServer() {
   fetch("/api/operacoes")
      .then((response) => response.json())
      .then((data) => {
         history = data.map((item) => `${item.operacao} = ${item.resultado}`);
         updateHistory();
      })
      .catch((error) =>
         console.error("Erro ao recuperar as operações do servidor:", error)
      );
}

fetchOperationsFromServer();
