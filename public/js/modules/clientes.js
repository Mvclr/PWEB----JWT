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
    clientes = data.map((client) => new Client(client.name, client.id));
  } catch (error) {
    console.error("Error fetching clients:", error);
  }
}

function renderTabela() {
  fetchClients()
    .then(() => {
      const tbody = document.querySelector("#tabela tbody");
      tbody.innerHTML = "";
      console.log(clientes);
      clientes.forEach((cliente, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${cliente.name}</td>
          <td>${cliente.id}</td>
          <td>
            <button class="edit-button">✏️</button>
            <button class="delete-button">🗑️</button>
          </td>
        `;
        tbody.appendChild(tr);

        const editButton = tr.querySelector(".edit-button");
        editButton.addEventListener("click", () => editarCliente(index));

        const deleteButton = tr.querySelector(".delete-button");
        deleteButton.addEventListener("click", () => deletarCliente(cliente.id));
      });
    })
    .catch((error) => {
      console.error("Error rendering table:", error);
    });
  
}

async function adicionarCliente() {
  const nomeInput = document.querySelector(".nome");
  const nome = nomeInput.value.trim();
  if (!nome) return;

  try {
    const response = await fetch("/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: nome }),
    });

    if (!response.ok) {
      throw new Error("Failed to add client");
    }

    const newClient = await response.json();
    clientes.push(new Client(newClient.name, newClient.id));

    // Dynamically add the new client to the table
    const tbody = document.querySelector("#tabela tbody");
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${newClient.name}</td>
      <td>${newClient.id}</td>
      <td>
        <button class="edit-button">✏️</button>
        <button class="delete-button">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);

    // Attach event listeners to the new buttons
    const editButton = tr.querySelector(".edit-button");
    editButton.addEventListener("click", () => editarCliente(clientes.length - 1));

    const deleteButton = tr.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => deletarCliente(newClient.id));

    nomeInput.value = ""; // Clear the input field
  } catch (error) {
    console.error("Error adding client:", error);
  }
}

async function deletarCliente(id) {
  try {
    const response = await fetch(`/clientes/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete client");
    }

    // Remove the client from the local array
    clientes = clientes.filter((cliente) => cliente.id !== id);

    // Dynamically remove the row from the table
    const tbody = document.querySelector("#tabela tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));
    rows.forEach((row) => {
      const clientId = row.querySelector("td:nth-child(2)").textContent;
      if (parseInt(clientId) === id) {
        tbody.removeChild(row);
      }
    });
  } catch (error) {
    console.error("Error deleting client:", error);
  }
}

function editarCliente(index) {
  document.getElementById("nome").value = clientes[index].name;
  editandoIndex = index;
}



document.addEventListener("DOMContentLoaded", () => {
  renderTabela()
});

export { clientes };
