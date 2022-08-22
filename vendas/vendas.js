const obtemUtimoId= () => {
    const venda = obterDadosLS()
    const ultVenda = venda.reduce(function(valor,p){
        return valor = p.id
    },0)
    return ultVenda
}

const select = () =>{
    const cliente = JSON.parse(localStorage.getItem('pessoas'))
    const produto = JSON.parse(localStorage.getItem('produtos'))

    const selectCliente = document.querySelector('#selectCli')
    const selectProduto = document.querySelector('#selectProd')

    cliente.forEach((c) => {
        

        const opCliente = document.createElement('option')
        opCliente.setAttribute('value',c.nome)
        opCliente.setAttribute('i',c.id)
        const opCliTxt = document.createTextNode(c.nome)

        opCliente.append(opCliTxt)

        selectCliente.append(opCliente)
    })

    produto.forEach((p) => {

        const opProduto = document.createElement('option')
        opProduto.setAttribute('value',p.nome)
        opProduto.setAttribute('id',p.id)
        const opProdTxt = document.createTextNode(p.nome)

        opProduto.append(opProdTxt)

        selectProduto.append(opProduto)
    })
}

const preco = () => {
    const produtos = JSON.parse(localStorage.getItem('produtos'))
    const produto = document.querySelector('#selectProd').value
    const campoPreco = document.querySelector('#inPreco')

       const precoProd = produtos.find(function(item){
            return item.nome = produto
        })
       
    const preco = campoPreco.value = precoProd.preco
    return preco
}
const total = () => {
    const preco = document.querySelector('#inPreco').value
    const quant = document.querySelector('#inQuantidade').value
    const total = preco * quant
    
    const campoTotal = document.querySelector('#inTotal')
    campoTotal.value = total
    return total
    
}

const obterDadosForm = () => {
    const quant = document.querySelector('#inQuantidade')
    const preco = document.querySelector('#inPreco')
    const total = document.querySelector('#inTotal')
    const cli = document.querySelector('#selectCli')
    const prod = document.querySelector('#selectProd')
    const venda = {
        id: obtemUtimoId()+1,
        cliente: cli.value,
        produto: prod.value,
        quantidade: quant.value,
        preco: preco.value,
        total: total.value
    }
    
    return venda;
}


const salvarDados = () => {
    const venda = obterDadosForm()
    const vendas = obterDadosLS()
    vendas.push(venda)
    
    localStorage.setItem('vendas', JSON.stringify(vendas))

    window.location = './index.html'

}


const obterDadosLS = () => {
    const vendas = JSON.parse(localStorage.getItem('vendas')) || []
    return vendas
}

const render = () => {
   
    const tvendas = document.querySelector('#tvenda')

    
    const vendas = obterDadosLS()

    vendas.forEach((p) => {
        
        const tr = document.createElement('tr')
        
        
        const tdId = document.createElement('td')
        const tdIdTxt = document.createTextNode(p.id)

        const tdCliente = document.createElement('td')
        const tdClienteTxt = document.createTextNode(p.cliente)

        const tdProduto = document.createElement('td')
        const tdProdutoTxt = document.createTextNode(p.produto)

        const tdQuantidade = document.createElement('td')
        const tdQuantidadeTxt = document.createTextNode(p.quantidade)

        const tdPreco = document.createElement('td')
        const tdPrecoTxt = document.createTextNode(p.preco)

        const tdTotal = document.createElement('td')
        const tdTotalTxt = document.createTextNode(p.total)
        
        const tdAc = document.createElement('td')
        const aDelete = document.createElement('a')
        const btnDelete = document.createElement('button')
        aDelete.setAttribute('href', './index.html')
        aDelete.setAttribute('id',p.id)
        aDelete.setAttribute('onclick','deletar(this.id)') 
        const aDeleteTxt = document.createTextNode('Excluir')

        
        tdId.append(tdIdTxt)
        tdCliente.append(tdClienteTxt)
        tdProduto.append(tdProdutoTxt)
        tdQuantidade.append(tdQuantidadeTxt)
        tdPreco.append(tdPrecoTxt)
        tdTotal.append(tdTotalTxt)
        btnDelete.append(aDeleteTxt)
        aDelete.append(btnDelete)
        tdAc.append(aDelete)

        
        tr.append(tdId)
        tr.append(tdCliente)
        tr.append(tdProduto)
        tr.append(tdQuantidade)
        tr.append(tdPreco)
        tr.append(tdTotal)
        tr.append(tdAc)

        
        tvendas.append(tr)
    });
    
    
}

const deletar = (elemento) => {

    var val = confirm("Tem certeza que deseja apagar?");
    if (val == true) {
    const vendaTudo = obterDadosLS()
    let index = vendaTudo.findIndex(vendaTudo=>vendaTudo.id==elemento)
    vendaTudo.splice(index, 1)
    localStorage.setItem('vendas', JSON.stringify(vendaTudo))

    alert("Venda apagada");
    } else {
    alert("A venda não foi apagada");
    }
    
}
