let produtos = [];

    let editandoIndex = null;

    function renderTabela() {
      const tbody = document.querySelector('#tabela-clientes tbody');
      tbody.innerHTML = '';
      produtos.forEach((produto, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${produtos[index].nome}</td>
          <td>${produtos[index].id}</td>
          <td>
            <button onclick="editarProduto(${index})">✏️</button>
            <button onclick="deletarProduto(${index})">🗑️</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }

    function adicionarProdutos() {
      const nomeInput = document.getElementById('nome');
      const idInput = document.getElementById('id')
      const id =  idInput.value.trim()
      const nome = nomeInput.value.trim();  
      if (!nome || !id) return;
      
      const jaExiste = produtos.some(
        (produto, i) =>
          (produto.nome === nome || produto.id === id) && i !== editandoIndex
      );
      if (jaExiste) {
        alert("Nome de produto ou ID já em uso");
        return;
      }
      if (editandoIndex !== null) {
        produtos[editandoIndex] = {nome, id};
        editandoIndex = null;
      } else {
        produtos.push({nome, id});
      }
      nomeInput.value = '';
      id.value  = '';
      renderTabela();
    }

    function deletarProduto(index) {
      produtos.splice(index, 1);
      renderTabela();
    }

    function editarProduto(index) {
        document.getElementById('nome').value = produtos[index].nome;
        document.getElementById('id').value = produtos[index].id;
        editandoIndex = index;
    }

    renderTabela();