class Product {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }
}

let products = [];

async function fetchProducts() {
  try {
    const response = await fetch("/api/produtosTable");
    if (!response.ok) {
      throw new Error("Falha ao buscar produto");
    }
    const data = await response.json();
    products = data.map((product) => new Product(product.name, product.id));
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
  }
}

function renderTabela() {
 fetchProducts()
    .then(() => {
      const tbody = document.querySelector("#tabela tbody");
      tbody.innerHTML = "";
      console.log(products);
      products.forEach((product, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${product.name}</td>
          <td>${product.id}</td>
          <td>
            
            <button class="delete-button">🗑️</button>
          </td>
        `;
        tbody.appendChild(tr);
        
        //<button class="edit-button">✏️</button>
        //const editButton = tr.querySelector(".edit-button");
        //editButton.addEventListener("click", () => editarproducte(producte.id));

        const deleteButton = tr.querySelector(".delete-button");
        deleteButton.addEventListener("click", () => deletarProduto(product.id));
      });
    })
    .catch((error) => {
      console.error("Error rendering table:", error);
    });
  
}

async function adicionarProduto() {
  const nomeInput = document.querySelector(".nome");
  const nome = nomeInput.value.trim();
  if (!nome) return;

  try {
    const response = await fetch("/produto", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Falha em adicionar produto");
    }

  } catch (error) {
    console.error("Falha em adicionar produto:", error);
  }
}

async function deletarProduto(id) {
  try {
    const response = await fetch(`/produto/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Falha ao deletar produto");
    }
    products = products.filter((product) => product.id !== id);
     fetchProducts()
        .then(() => {
          renderTabela();
        })
        .catch((error) => {
          console.error("Erro na geração da tabela:", error);
        });
  } catch (error) {
    console.error("Erro ao delatar produto:", error);
  }
}

async function editarproducte(id) {
  
}



document.addEventListener("DOMContentLoaded", () => {
  renderTabela()
});

export { products };
