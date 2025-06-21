// 

let dados = [];
let idioma = "en";

const searchInput = document.getElementById('search');
const filters = document.querySelectorAll('.filter');


async function carregarDados() {
    const res = await fetch("assets/dados/modelos.json");
    dados = await res.json();
    mostrarCatalogo(dados);
}

const BASE_URL = window.location.origin.includes("localhost") ? "/siteJon/" : "https://joncrow.rf.gd/";

function mostrarCatalogo(lista){
    const container = document.getElementById('product');
    container.innerHTML = '';
    lista.forEach(item => {
        const imagemCard = `${BASE_URL}${item.imagem_card}`;

        const card = document.createElement('div');
        card.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3');

        const cardlink = document.createElement('a');
        cardlink.classList.add('card-link');
        cardlink.type = "button";
        cardlink.onclick = () => verMais(item.id);

        const cardClass = document.createElement('div');
        cardClass.classList.add('card');

        const img = document.createElement('img');
        img.src = imagemCard;
        img.alt = item.titulo[idioma];

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const cardTitle = document.createElement('h3');
        cardTitle.classList.add('card_title');
        cardTitle.setAttribute('data-name', item.titulo[idioma]);
        cardTitle.setAttribute('data-category', item.categoria[idioma]);
        cardTitle.textContent = item.titulo[idioma];

        const cardCost = document.createElement('p');
        cardCost.classList.add('card_cost');
        cardCost.textContent =  `Cost: ${formatarPreco(item.preco)}`;

        // card.innerHTML = `
        //     <a href="#" type="button" onclick="verMais(${item.id})" class="card-link">
        //         <div class="card">
        //             <img src="${imagemCard}" alt="${item.titulo[idioma]}">
        //             <div class="card-body">
        //                 <h3 class="card_title" data-name="${item.titulo[idioma]}" data-category="${item.categoria[idioma]}">${item.titulo[idioma]}</h3>
        //                 <p class="card_cost">Cost: ${formatarPreco(item.preco)}</p>
        //             </div>
        //         </div>
        // `;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardCost);
        cardClass.appendChild(img);
        cardClass.appendChild(cardBody);
        cardlink.appendChild(cardClass);
        card.appendChild(cardlink);
        container.appendChild(card);
    });
}

function formatarPreco(preco){
    return isFinite(preco) ? `$${Number(preco).toFixed(2)}` : preco;
}

function filterProducts(){
    const searchText = searchInput.value.toLowerCase();
    const selectedFilters = Array.from(filters).filter(f => f.checked).map(f => f.value);

    const filteredList = dados.filter(item => {
        const name = item.titulo[idioma].toLowerCase();
        const category = item.categoria[idioma].toLowerCase();

        const matchesSearch = name.includes(searchText) || category.includes(searchText);
        const matchesFilter = selectedFilters.length === 0 || selectedFilters.includes(category);

        return matchesSearch && matchesFilter;
    });

    mostrarCatalogo(filteredList);
}

function mudarIdioma(novoIdioma){
    idioma = novoIdioma;
    carregarDados();
}

function verMais(id){
    const item = dados.find(produto => produto.id === id);
    localStorage.setItem('produtoItem', JSON.stringify(item));
    window.location.href = `${BASE_URL}product/${id}`;
}

searchInput.addEventListener('input', filterProducts);
filters.forEach(f => f.addEventListener('change', filterProducts));

carregarDados();
filterProducts();