
// pensa no problema
//quero que ao usuario clicar no botao que tem o header-menu acabe revelando a
//aba de navegação, que somente está desabilitada.

// input usuario clicar no botao
// processamento colocar display: block no header-nav
// output aba de navegação revelada


// const button = document.getElementById("header-menu");
// const navegacao = document.getElementById("header-nav");
// const header = document.getElementById("header"); // comentei para guardar depois essa ideia para outro projeto. (deixar header invisivel no topo e depois de scrollar fica com alguma cor de fundo.)

// console.log(button, navegacao, header);

// function showMenu(){
//     let menu = document.querySelector('.header-nav');
//     menu.classList.toggle("active");
// }

// function headerChange(){ // comentei para guardar depois essa ideia para outro projeto.

//     if(window.scrollY > 50 && window.innerWidth > 1000){
//         header.classList.add('scrolled');
//     }else{
//         header.classList.remove('scrolled');
//     }

// }

// window.addEventListener("scroll", headerChange); // comentei para guardar depois essa ideia para outro projeto.

const BASE_URL = window.location.origin.includes("localhost") ? "/siteJon/" : "/";

async function carregarDados() {
    const res = await fetch("assets/dados/modelos.json");
    dados = await res.json();
}

async function verMais(id){
    const res = await fetch("assets/dados/modelos.json");
    dados = await res.json();
    const item = dados.find(produto => produto.id === id);
    localStorage.setItem('produtoItem', JSON.stringify(item));
    window.location.href = `${BASE_URL}product/${id}`;
}