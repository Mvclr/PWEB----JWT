import Client from "../classes/Client.js";

let clientes = [];
let editandoIndex = null;

async function fetchClients() {
  try {
    const response = await fetch("/api/clients");
    if (!response.ok) {
      throw new Error("Failed to fetch clients");
    }
    const data = await response.json();
    clientes = data.map((client) => new Client(client.name));
    renderTabela();
  } catch (error) {
    console.error("Error fetching clients:", error);
  }
}

function renderTabela() {
  fetchClients()
  const tbody = document.querySelector("#tabela tbody");
  tbody.innerHTML = "";
  clientes.forEach((cliente, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${cliente.name}</td>
      <td>
        <button class="edit-button">✏️</button>
        <button class="delete-button">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);

    const editButton = tr.querySelector(".edit-button");
    editButton.addEventListener("click", () => editarCliente(index));

    const deleteButton = tr.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => deletarCliente(index));
  });
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
  fetchClients(); // Fetch clients when the page loads

  const addButton = document.querySelector(".add-button");
  if (addButton) {
    addButton.addEventListener("click", () => {
      adicionarCliente();
    });
  }
});

export { clientes };
