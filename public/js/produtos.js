let produtos = [];

    let editandoIndex = null;

    function renderTabela() {
      const tbody = document.querySelector('#tabela-clientes tbody');
      tbody.innerHTML = '';
      produtos.forEach((produto, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${produtos[index]}</td>
          <td></td>
          <td>
            <button onclick="editarCliente(${index})">✏️</button>
            <button onclick="deletarCliente(${index})">🗑️</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }

    function adicionarProduto() {
      const nomeInput = document.getElementById('nome');
      const id = document.getElementById('id')
      const nome = nomeInput.value.trim();
      if (!nome || !id) return;

      if (editandoIndex !== null) {
        produtos[editandoIndex] = {nome, id};
        editandoIndex = null;
      } else {
        produtos.push({nome, id});
      }
      nomeInput.value = '';
      renderTabela();
    }

    function deletarProduto(index) {
      produtos.splice(index, 1);
      renderTabela();
    }

    function editarProduto(index) {
      document.getElementById('nome').value = produtos[index];
      editandoIndex = index;
    }

    renderTabela();