import Client from "../classes/Client.js";
let clientes = [];
let editandoIndex = null;

function renderTabela() {
  const tbody = document.querySelector("#tabela tbody");
  tbody.innerHTML = "";
  clientes.forEach((cliente, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${clientes[index].name}</td>
      <td>
        <button  class="edit-button">✏️</button>
        <button  class="delete-button">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);
    const editButton = tr.querySelector(".edit-button");
      editButton.addEventListener("click", () => {
        editarCliente(index);
      });
    const deleteButton = tr.querySelector(".delete-button");
      deleteButton.addEventListener("click", () => {
        deletarCliente(index);
      });
  });
}

function adicionarCliente() {
  const nomeInput = document.getElementById("nome");
  const nome = nomeInput.value.trim();
  if (!nome) return;

  const newClient = new Client(nome);
  if (editandoIndex !== null) {
    clientes[editandoIndex] = newClient;
    editandoIndex = null;
  } else {
    clientes.push(newClient);
    
  }
  nomeInput.value = "";
  renderTabela();
}

function deletarCliente(index) {
  clientes.splice(index, 1);
  renderTabela();
}

function editarCliente(index) {
  document.getElementById("nome").value = clientes[index].name;
  editandoIndex = index;
}

document.addEventListener("DOMContentLoaded", () => {
  const tabela = document.querySelector("#tabela");
  if (tabela) renderTabela();

  const addButton = document.querySelector("#add-button");
  if (addButton) {
    addButton.addEventListener("click", () => {
      adicionarCliente();
    });
  }
});


export { clientes };
