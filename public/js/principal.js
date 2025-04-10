import { clientes } from "./modules/clientes.js";
import { produtos } from "./modules/produtos.js";

document.addEventListener('DOMContentLoaded', () => {
let principalHtml = document.querySelector('#div-js');
let html =  `
    <form action="/clientes" method="get">
            <div class="card black" >${clientes.length}<br>Clientes Ativos<br><button type="submit">Gerenciar Clientes</button></div>
        </form>
        <form action="/produtos"  method="get">
            <div class="card gray">${produtos.length}<br>Produtos Cadastrados<br><button  type="submit">Gerenciar Produtos</button></div>
        </form>
        <div class="card yellow">44<br>Captações Pendentes<br><button>Gerenciar Captação</button></div>
`
principalHtml.innerHTML = html;
});
