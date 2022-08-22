const obtemUtimoId= () => {
    const produto = obterDadosLS()
    const ultProduto = produto.reduce(function(valor,p){
        return valor = p.id
    },0)
    return ultProduto
}

const obterDadosForm = () => {
    const dados = document.getElementsByTagName('input')
    const produto = {
        id: obtemUtimoId()+1,
        nome: dados[0].value,
        descricao: dados[1].value,
        fornecedor: dados[2].value,
        preco: dados[3].value,
        estoque: dados[4].value
    }

    return produto;
}


const formatarDados = () => {
    const produto = obterDadosForm()
    
    produto.nome = produto.nome.toUpperCase()
    produto.fornecedor = produto.fornecedor.toUpperCase()
    produto.descricao = produto.descricao.toLocaleLowerCase()

    return produto
}


const salvarDados = () => {
    const produto = formatarDados()
    const produtos = obterDadosLS()
    produtos.push(produto)
    
    localStorage.setItem('produtos', JSON.stringify(produtos))

    window.location = './index.html'

}


const obterDadosLS = () => {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || []
    return produtos
}


const render = () => {
   
    const tprodutos = document.querySelector('#tprodutos')

    
    const produtos = obterDadosLS()

    produtos.forEach((p, key) => {
        
        const tr = document.createElement('tr')
        
        
        const tdId = document.createElement('td')
        const tdIdTxt = document.createTextNode(p.id)

        const tdNome = document.createElement('td')
        const tdNomeTxt = document.createTextNode(p.nome)

        const tdDes = document.createElement('td')
        const tdDesTxt = document.createTextNode(p.descricao)

        const tdForn = document.createElement('td')
        const tdFornTxt = document.createTextNode(p.fornecedor)

        const tdPreco = document.createElement('td')
        const tdPrecoTxt = document.createTextNode(p.preco)

        const tdEst = document.createElement('td')
        const tdEstTxt = document.createTextNode(p.estoque)
        
        const tdAc = document.createElement('td')
        const aEdit = document.createElement('a')
        const btnEdit = document.createElement('button')
        aEdit.setAttribute('href', './edit.html')
        aEdit.setAttribute('id',p.id)
        aEdit.setAttribute('onclick','filtrar(this.id)')
        const aEditTxt = document.createTextNode('Editar')
        const aDelete = document.createElement('a')
        const btnDelete = document.createElement('button')
        aDelete.setAttribute('href', './index.html')
        aDelete.setAttribute('id',p.id)
        aDelete.setAttribute('onclick','deletar(this.id)') 
        const aDeleteTxt = document.createTextNode('Excluir')

        
        tdId.append(tdIdTxt)
        tdNome.append(tdNomeTxt)
        tdDes.append(tdDesTxt)
        tdForn.append(tdFornTxt)
        tdPreco.append(tdPrecoTxt)
        tdEst.append(tdEstTxt)
        btnEdit.append(aEditTxt)
        btnDelete.append(aDeleteTxt)
        aEdit.append(btnEdit)
        aDelete.append(btnDelete)
        tdAc.append(aEdit)
        tdAc.append(aDelete)

        
        tr.append(tdId)
        tr.append(tdNome)
        tr.append(tdDes)
        tr.append(tdForn)
        tr.append(tdPreco)
        tr.append(tdEst)
        tr.append(tdAc)

        
        tprodutos.append(tr)
    });
}


    const filtrar=(ele)=>{
        const produto = obterDadosLS()
        let idProduto =ele

       const busca = produto.find(function(elemento){
            return elemento.id==idProduto
        })
        localStorage.setItem('editProduto', JSON.stringify(busca))
       
    }

    const pegar = () =>{
        const produto= JSON.parse(localStorage.getItem('editProduto'))
        return produto
    }
    
    const mostrar = () =>{
        const produtos = pegar()
        
        const editNome = document.querySelector('#editInNome')
        const editDescricao = document.querySelector('#editInDescricao')
        const editFornecedor = document.querySelector('#editInFornecedor')
        const editPreco = document.querySelector('#editInPreco')
        const editEstoque = document.querySelector('#editInEstoque')
        

        editNome.value = produtos.nome
        editDescricao.value = produtos.descricao
        editFornecedor.value = produtos.fornecedor
        editPreco.value = produtos.preco
        editEstoque.value = produtos.estoque
    }

    const mudar = () => {
        const editNome = document.querySelector('#editInNome').value
        const editDescricao = document.querySelector('#editInDescricao').value
        const editFornecedor = document.querySelector('#editInFornecedor').value
        const editPreco = document.querySelector('#editInPreco').value
        const editEstoque = document.querySelector('#editInEstoque').value

        const produtosTudo = obterDadosLS()
        const produtosFiltro = pegar()
        let index = produtosTudo.findIndex(produtosTudo=>produtosTudo.id==produtosFiltro.id)

        const novoProduto ={
            id:produtosFiltro.id,
            nome: editNome,
            descricao: editDescricao,
            fornecedor: editFornecedor,
            preco: editPreco,
            estoque: editEstoque
        }

        novoProduto.nome = novoProduto.nome.toUpperCase()
        novoProduto.fornecedor = novoProduto.fornecedor.toUpperCase()
        novoProduto.descricao = novoProduto.descricao.toLocaleLowerCase()

       produtosTudo.splice(index, 1,novoProduto)
       
        localStorage.setItem('produtos', JSON.stringify(produtosTudo))
        window.location = './index.html'
    }
    
    
    const deletar = (elemento) => {

        var val = confirm("Tem certeza que deseja apagar?");
        if (val == true) {
        const produtoTudo = obterDadosLS()
        let index = produtoTudo.findIndex(produtoTudo=>produtoTudo.id==elemento)
        produtoTudo.splice(index, 1)
        localStorage.setItem('produtos', JSON.stringify(produtoTudo))

        alert("Produto apagado");
        } else {
        alert("O produto não foi apagado");
        }
        
    }
