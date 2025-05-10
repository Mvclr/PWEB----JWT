async function fetchClients() {
  try {
    const response = await fetch("/api/clients");
    const data = await response.json();
    return data.total_clients;
  } catch (error) {
    console.error("Erro conseguindo a response de clients:", error);
  }
}

async function fetchProducts() {
  try {
    const response = await fetch("/api/products");
    const data = await response.json();
    return data.total_products;
  } catch (error) {
    console.error("Erro conseguindo a response de products:", error);
  }
}


 async function initializePage() {
  const total_clients = await fetchClients();
  const total_products = await fetchProducts();

  let principalHtml = document.querySelector(".div-js");
  if (principalHtml) {
    let html = `
      <form action="/clientes" method="get">
              <div class="card black">${total_clients}<br>Clientes Ativos<br><button type="submit" class="button-cards">Gerenciar Clientes</button></div>
          </form>
          <form action="/produtos"  method="get">
              <div class="card gray">${total_products}<br>Produtos Cadastrados<br><button  type="submit" class="button-cards">Gerenciar Produtos</button></div>
          </form>
    `;
    principalHtml.innerHTML = html;
  } else {
    console.error("Element with class 'div-js' not found in the DOM.");
  }
}
initializePage();

