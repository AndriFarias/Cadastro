
const obtemUtimoId= () => {
    const pessoas = obterDadosLS()
    const ultPessoa = pessoas.reduce(function(valor,p){
        return valor = p.id
    },0)
    return ultPessoa
}

const obterDadosForm = () => {
    const dados = document.getElementsByTagName('input')
    const pessoa = {
        id: obtemUtimoId()+1,
        nome: dados[0].value,
        endereco: dados[1].value,
        telefone: dados[2].value,
        email: dados[3].value,
        dataNascimento: dados[4].value
    }

    return pessoa;
}


const formatarDados = () => {
    const pessoa = obterDadosForm()
    
    pessoa.nome = pessoa.nome.toUpperCase()
    pessoa.endereco = pessoa.endereco.toUpperCase()
    pessoa.email = pessoa.email.toLocaleLowerCase()

    return pessoa
}


const salvarDados = () => {
    const pessoa = formatarDados()
    const pessoas = obterDadosLS()
    pessoas.push(pessoa)
    
    localStorage.setItem('pessoas', JSON.stringify(pessoas))

    window.location = './index.html'

}


const obterDadosLS = () => {
    const pessoas = JSON.parse(localStorage.getItem('pessoas')) || []
    return pessoas
}


const render = () => {
   
    const tpessoas = document.querySelector('#tpessoas')

    
    const pessoas = obterDadosLS()

    pessoas.forEach((p, key) => {
        
        const tr = document.createElement('tr')
        
        
        const tdId = document.createElement('td')
        const tdIdTxt = document.createTextNode(p.id)

        const tdNome = document.createElement('td')
        const tdNomeTxt = document.createTextNode(p.nome)

        const tdEnd = document.createElement('td')
        const tdEndTxt = document.createTextNode(p.endereco)

        const tdTel = document.createElement('td')
        const tdTelTxt = document.createTextNode(p.telefone)

        const tdMail = document.createElement('td')
        const tdMailTxt = document.createTextNode(p.email)

        const tdNasc = document.createElement('td')
        const tdNascTxt = document.createTextNode(p.dataNascimento)
        
        const tdAc = document.createElement('td')
        const aEdit = document.createElement('a')
        aEdit.setAttribute('href', './edit.html')
        const btnEdit = document.createElement('button')
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
        tdEnd.append(tdEndTxt)
        tdTel.append(tdTelTxt)
        tdMail.append(tdMailTxt)
        tdNasc.append(tdNascTxt)
        btnEdit.append(aEditTxt)
        btnDelete.append(aDeleteTxt)
        aEdit.append(btnEdit)
        aDelete.append(btnDelete)
        tdAc.append(aEdit)
        tdAc.append(aDelete)
        
        
        tr.append(tdId)
        tr.append(tdNome)
        tr.append(tdEnd)
        tr.append(tdTel)
        tr.append(tdMail)
        tr.append(tdNasc)
        tr.append(tdAc)

        
        tpessoas.append(tr)
    });
}


    const filtrar=(ele)=>{
        const pessoas = obterDadosLS()
        let idPessoa =ele

       const busca = pessoas.find(function(elemento){
            return elemento.id==idPessoa
        })
        localStorage.setItem('editPessoa', JSON.stringify(busca))
       
    }

    const pegar = () =>{
        const pessoa= JSON.parse(localStorage.getItem('editPessoa'))
        return pessoa
    }
    
    const mostrar = () =>{
        const pessoa = pegar()
        
        const editNome = document.querySelector('#editInNome')
        const editEnd = document.querySelector('#editInEnd')
        const editTel = document.querySelector('#editInTel')
        const editEmail = document.querySelector('#editInEmail')
        const editDt = document.querySelector('#editInDtNasc')
        
        editNome.value = pessoa.nome
        editEnd.value = pessoa.endereco
        editTel.value = pessoa.telefone
        editEmail.value = pessoa.email
        editDt.value = pessoa.dataNascimento
    }

    const mudar = () => {
        const editNome = document.querySelector('#editInNome').value
        const editEnd = document.querySelector('#editInEnd').value
        const editTel = document.querySelector('#editInTel').value
        const editEmail = document.querySelector('#editInEmail').value
        const editDt = document.querySelector('#editInDtNasc').value

        const pessoaTudo = obterDadosLS()
        const pessoaFiltro = pegar()
        let index = pessoaTudo.findIndex(pessoaTudo=>pessoaTudo.id==pessoaFiltro.id)

        const novaPessoa ={
            id:pessoaFiltro.id,
            nome: editNome,
            endereco: editEnd,
            telefone: editTel,
            email: editEmail,
            dataNascimento: editDt
        }

        novaPessoa.nome = novaPessoa.nome.toUpperCase()
        novaPessoa.endereco = novaPessoa.endereco.toUpperCase()
        novaPessoa.email = novaPessoa.email.toLocaleLowerCase()

       pessoaTudo.splice(index, 1,novaPessoa)
       //pessoaTudo.splice(index, 1)
        console.log(index)
        localStorage.setItem('pessoas', JSON.stringify(pessoaTudo))

        window.location = './index.html'
        
    }
    
    
    const deletar = (elemento) => {
        var val = confirm("Tem certeza que deseja apagar?");
        if (val == true) {
        const pessoaTudo = obterDadosLS()
        let index = pessoaTudo.findIndex(pessoaTudo=>pessoaTudo.id==elemento)
        pessoaTudo.splice(index, 1)
        localStorage.setItem('pessoas', JSON.stringify(pessoaTudo))

        alert("Pessoa apagada");
        } else {
        alert("Pessoa não apagada");
        }
        
    }

    

