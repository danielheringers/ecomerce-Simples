let vitrine             = document.querySelector(".listaProdutos")
let listaCarrinho       = document.querySelector(".listaCarrinho")
let carrinhoDetalhes    = document.querySelector(".carrinhoDetails")
let carrinho            = [];
let Quantidade          = document.querySelector(".quantidade")
let Total               = document.querySelector(".total")

function listarProdutosVitrine(listaProdutos, vitrine){
    vitrine.innerHTML = ""
    for(let i = 0; i < listaProdutos.length; i++){

        let produto = listaProdutos[i];
        let cardProduto = createProductsVitrine(produto)

        vitrine.appendChild(cardProduto)
    }

}

function listarProdutosCarrinho(listaProdutos, vitrine){
    vitrine.innerHTML = ""
    for(let i = 0; i < listaProdutos.length; i++){

        let produto = listaProdutos[i];
        produto.index = i;
        let cardProduto = createCartCard(produto)

        vitrine.appendChild(cardProduto)
    }

}

listarProdutosVitrine(data, vitrine)

function createProductsVitrine(produto){
    //inserindo dados nas variaveis
    let id          = produto.id
    let imgURL      = produto.img
    let nome        = produto.nameItem
    let desc        = produto.description
    let valor       = produto.value
    let categoria   = produto.tag
    let addCart     = produto.addCart

    //criando elementos no html
    let tagItem         = document.createElement("li")
    let tagDivImg       = document.createElement("div")
    let tagImag         = document.createElement("img")
    let tagCategoria    = document.createElement("button")
    let tagTitulo       = document.createElement("h3")
    let tagDesc         = document.createElement("p")
    let tagValor        = document.createElement("span")
    let button          = document.createElement("a")

    button.setAttribute("id", id)
    //Passando classes
    tagItem.classList.add("cardProduto")
    tagDivImg.classList.add("containerImg")
    tagCategoria.classList.add("categoriaProduto")
    tagTitulo.classList.add("tituloProduto")
    tagDesc.classList.add("descProduto")
    tagValor.classList.add("valorProduto")
    button.classList.add("button", "Bcard")

    //Passando Infos pras tags
    tagImag.src              = imgURL
    tagImag.alt              = nome
    tagCategoria.innerText   = categoria
    tagTitulo.innerText      = nome
    tagDesc.innerText        = desc
    tagValor.innerText       = `R$${valor}`.replace(".",",")
    button.innerText         = addCart
    button.addEventListener("click", function(){
        if(produto != undefined){
            carrinho.push(produto)
            listarProdutosCarrinho(carrinho, listaCarrinho)
            soma()
            contador()
        }       
        
    })

    //Montando Template
    tagItem.append(tagDivImg, tagCategoria, tagTitulo, tagDesc, tagValor,button)
    tagDivImg.appendChild(tagImag)

    return tagItem
}

function soma(){
    let result = 0;
    for(let i = 0; i < carrinho.length; i++){
        result += carrinho[i].value;
    } 
    Total.innerText = `R$ ${result}`.replace(".",",");
}

function contador(){
    let contar = 0;
    for(let i = 0; i < carrinho.length; i++){
        contar = carrinho.length
    } 
    Quantidade.innerText = contar;
}


function createCartCard(produto){
    let cartId     = produto.id
    let cartImgURL = produto.img
    let cartNome   = produto.nameItem
    let cartValor  = produto.value
    

    let tagCartDiv              = document.createElement("div")
    let tagCartDivImg           = document.createElement("div")
    let tagCartImg              = document.createElement("img")
    let tagCartDivDetails       = document.createElement("div")
    let tagCartTitulo           = document.createElement("h3")
    let tagCartValor            = document.createElement("span")
    let tagCartRemover          = document.createElement("button")

    tagCartRemover.setAttribute("id", cartId)

    tagCartDiv.classList.add("cardCarrinho")
    tagCartDivDetails.classList.add("cardCarrinhoDetails")
    tagCartTitulo.classList.add("cardCarrinhoTitulo")
    tagCartValor.classList.add("cardCarrinhoValor")
    tagCartRemover.classList.add("cardCarrinhoRemove")

    tagCartImg.src                = cartImgURL
    tagCartImg.alt                = cartNome
    tagCartTitulo.innerText       = cartNome
    tagCartValor.innerText        = `R$${cartValor}`.replace(".",",")
    tagCartRemover.innerText      = "Remover Produto"
    tagCartRemover.addEventListener("click", function(){
        let btnRemover = produto.index
        let index = btnRemover
        carrinho.splice(index, 1)
        listarProdutosCarrinho(carrinho, listaCarrinho)
        soma()
        contador()
    })

    tagCartDiv.append(tagCartDivImg, tagCartDivDetails)
    tagCartDivImg.append(tagCartImg)
    tagCartDivDetails.append(tagCartTitulo, tagCartValor, tagCartRemover)
    
    return tagCartDiv
}


//Função Busca
let inputBusca  = document.querySelector(".campoBusca")
let btnBusca    = document.querySelector(".botaoBusca")


btnBusca.addEventListener("click", function(){

    let pesquisa = inputBusca.value.trim()
    if(pesquisa != ""){
        let resultadoBusca = busca(pesquisa)
        listarProdutosVitrine(resultadoBusca, vitrine)
    }
    if(pesquisa == ""){
        listarProdutosVitrine(data, vitrine)
    }

})


function busca(valorPesquisa){

    let resultBusca = []

    for(let i = 0; i < data.length; i++){
        let nomeProduto = data[i].nameItem
        let categoriaProd = data[i].tag.toString()
        if(nomeProduto.includes(valorPesquisa) || categoriaProd.includes(valorPesquisa)){
            resultBusca.push(data[i])
        }
    }

    return resultBusca
}




/////////////////////////////////////////////CODIGOS REFATORADOS/////////////////////////////////////////////////



// function carrinhoDetails(vitrine){
    
//     let tagCartDiv              = document.createElement("div")
//     let tagCartDivQuant         = document.createElement("div")
//     let tagQuantLabel           = document.createElement("span")
//     let tagQuant                = document.createElement("span")
//     let tagCartDivTotal         = document.createElement("div")
//     let tagTotalLabel           = document.createElement("span")
//     let tagTotal                = document.createElement("span")


//     tagCartDiv.classList.add("carrinhoDetails")
//     tagCartDivQuant.classList.add("carrinhoDetailsQuant")
//     tagCartDivTotal.classList.add("carrinhoDetailsTotal")
//     tagTotal.classList.add("totalCompras")

//     tagQuantLabel.innerText   = "Quantidade:"
//     tagQuant.innerText        = "0"
//     tagTotalLabel.innerText   = "Total:"
//     tagTotal.innerText        = 0

//     tagCartDiv.append(tagCartDivQuant, tagCartDivTotal)
//     tagCartDivQuant.append(tagQuantLabel, tagQuant)
//     tagCartDivTotal.append(tagTotalLabel, tagTotal)
//     vitrine.append(tagCartDiv)
//     return vitrine
// }



// Função para adicionar e remover do carrinho os produtos
// let btnProdutos = document.querySelectorAll("ul li a")
// // for(let i = 0; i < btnProdutos.length; i++){
// //     let btnAdicionar = btnProdutos[i]
// //     btnAdicionar.addEventListener("click", interceptarProduto)
// // }

// function interceptarProduto(){
//     let btnComprar = event.target
//     if(btnComprar.tagName == "A"){
//         let idProduto = btnComprar.id

//         let produto = data.find(function(produto){
//             if(produto.id == idProduto){
//                 return produto
//             }
//         })
//         addCarrinho(produto)
//     }
// }

// function addCarrinho(produto){

// }
