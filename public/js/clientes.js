let clientes = [];
    let editandoIndex = null;

    function renderTabela() {
      const tbody = document.querySelector('#tabela tbody');
      tbody.innerHTML = '';
      clientes.forEach((cliente, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${clientes[index]}</td>
          <td>
            <button onclick="editarCliente(${index})">✏️</button>
            <button onclick="deletarCliente(${index})">🗑️</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }

    function adicionarCliente() {
      const nomeInput = document.getElementById('nome');
      const nome = nomeInput.value.trim();
      if (!nome) return;

      if (editandoIndex !== null) {
        clientes[editandoIndex] = nome;
        editandoIndex = null;
      } else {
        clientes.push(nome);
      }
      nomeInput.value = '';
      renderTabela();
    }

    function deletarCliente(index) {
      clientes.splice(index, 1);
      renderTabela();
    }

    function editarCliente(index) {
      document.getElementById('nome').value = clientes[index];
      editandoIndex = index;
    }
    document.addEventListener("DOMContentLoaded", () => {
      const tabela = document.querySelector('#tabela');
      if (tabela) renderTabela();
    });
    
  



    export {clientes}