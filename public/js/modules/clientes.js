import Client from "../classes/Client.js";

let clientes = [];
let editandoIndex = null;

async function fetchClients() {
  try {
    const response = await fetch("/api/clientsTable");
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
            
            <button class="delete-button">🗑️</button>
          </td>
        `;
        tbody.appendChild(tr);
        
        //<button class="edit-button">✏️</button>
        //const editButton = tr.querySelector(".edit-button");
        //editButton.addEventListener("click", () => editarCliente(cliente.id));

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
    });

    if (!response.ok) {
      throw new Error("Falha em adicionar cliente");
    }

  } catch (error) {
    console.error("Falha em adicionar cliente:", error);
  }
}

async function deletarCliente(id) {
  try {
    const response = await fetch(`/clientes/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Falha ao deletar cliente");
    }
    clientes = clientes.filter((cliente) => cliente.id !== id);
      fetchClients()
        .then(() => {
          renderTabela();
        })
        .catch((error) => {
          console.error("Error rendering table:", error);
        });
  } catch (error) {
    console.error("Error deleting client:", error);
  }
}

async function editarCliente(id) {
  
}



document.addEventListener("DOMContentLoaded", () => {
  renderTabela()
});

export { clientes };
