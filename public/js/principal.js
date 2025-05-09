function initializePage() {
  let principalHtml = document.querySelector(".div-js");
  if (principalHtml) {
    let html = `
      <form action="/clientes" method="get">
              <div class="card black" >1<br>Clientes Ativos<br><button type="submit" class="button-cards">Gerenciar Clientes</button></div>
          </form>
          <form action="/produtos"  method="get">
              <div class="card gray">1<br>Produtos Cadastrados<br><button  type="submit" class="button-cards">Gerenciar Produtos</button></div>
          </form>
          <div class="card yellow">44<br>Captações Pendentes<br><button class="button-cards">Gerenciar Captação</button></div>
    `;
    principalHtml.innerHTML = html;
  } else {
    console.error("Element with class 'div-js' not found in the DOM.");
  }
}
initializePage();

