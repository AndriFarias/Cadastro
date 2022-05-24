const arr = [23,3,15,99,22,11,9]
//forEach --> loop principal
arr.forEach(function(item,index,arr){
    console.log('Item: '+item+ ' na posição: '+index);
})

//map --> executa uma função para cada item do array
const novoArr = arr.map(function(item,index,arr){
    return item * 2
})

//filter --> filtrar dados
const maior18 = arr.filter(function(item,index,arr){
    return item >= 18
})

const pessoas = [
    {
        nome: 'João',
        idade: 21
    },
    {
        nome: 'Maria',
        idade: 19
    },
    {
        nome: 'Tereza',
        idade: 30
    }
]

const busca = pessoas.filter(function(item){
    return item.idade > 20 
})

//find --> iqual o filter mas só mostra o primeiro item
const busca2 = pessoas.find(function(item){
    return item.idade > 20
})

//reduce --> pega o número anterior e faz alguma operação
const soma = arr.reduce(function(total,item, index, arr){
    return total + item
}) 
//every --> se todos pasarem no teste
const maior18_2 = arr.every(function (item){
    return item > 18
})

//some --> se alguns passarem no teste
const maior18_3 = arr.some( function (item){
    return item> 18
})