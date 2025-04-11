import Product from "../classes/Product.js";

let produtos = [];
let editandoIndex = null;

function renderTabela() {
  const tbody = document.querySelector("#tabela tbody");
  tbody.innerHTML = "";
  produtos.forEach((produto, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${produtos[index].nome}</td>
      <td>${produtos[index].id}</td>
      <td>
        <button id="edit-button">✏️</button>
        <button id="delete-button">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);

    const editButton = tr.querySelector("#edit-button");
    editButton.addEventListener("click", () => {
      editarProduto(index);
    });
    const deleteButton = tr.querySelector("#delete-button");
    deleteButton.addEventListener("click", () => {
      deletarProduto(index);
    });
  });
}

function adicionarProdutos() {
  const nomeInput = document.getElementById("nome");
  const idInput = document.getElementById("id");
  const nome = nomeInput.value.trim();
  const id = idInput.value.trim();
  if (!nome || !id) return;

  const newProduct = new Product(nome, id);
  if (editandoIndex !== null) {
    produtos[editandoIndex] = newProduct;
    editandoIndex = null;
  } else {
    produtos.push(newProduct);
  }
  nomeInput.value = "";
  idInput.value = "";
  renderTabela();
}

function deletarProduto(index) {
  produtos.splice(index, 1);
  renderTabela();
}

function editarProduto(index) {
  document.getElementById("nome").value = produtos[index].nome;
  document.getElementById("id").value = produtos[index].id;
  editandoIndex = index;
}

document.addEventListener("DOMContentLoaded", () => {
  const tabela = document.querySelector("#tabela");
  if (tabela) renderTabela();

  const addButton = document.querySelector("#add-button");
if (addButton) {
  addButton.addEventListener("click", adicionarProdutos);
}
});

export { produtos };
