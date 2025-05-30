// 

let dados = [];
let idioma = "en";

const searchInput = document.getElementById('search');
const filters = document.querySelectorAll('.filter');


async function carregarDados() {
    const res = await fetch('/assets/dados/modelos.json');
    dados = await res.json();
    mostrarCatalogo(dados);
}

function mostrarCatalogo(lista){
    const container = document.getElementById('product');
    container.innerHTML = '';
    lista.forEach(item => {
        card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${item.imagem_card}" alt="${item.titulo[idioma]}">
            <h3 data-name="${item.titulo[idioma]}" data-category="${item.categoria[idioma]}">${item.titulo[idioma]}</h3>
            <p>Cost: ${formatarPreco(item.preco)}</p>
            <button type="button" onclick="verMais(${item.id})">${item.btn[idioma]}</button>
        `;
        container.appendChild(card);
    });
}

function formatarPreco(preco){
    return isFinite(preco) ? `$${Number(preco).toFixed(2)}` : preco;
}

function filterProducts(){
    const searchText = searchInput.value.toLowerCase();
    const selectedFilters = Array.from(filters).filter(f => f.checked).map(f => f.value);

    const cards = document.querySelectorAll('#product .card');

    cards.forEach(card => {
        const h3 = card.querySelector('h3');
        const name = h3.dataset.name.toLowerCase();
        const category = h3.dataset.category.toLowerCase();

        const matchesSearch = name.includes(searchText);
        const matchesFilter = selectedFilters.length === 0 || selectedFilters.includes(category);

        if(matchesSearch && matchesFilter){
            card.classList.remove('hidden');
        } else{
            card.classList.add('hidden');
        }
    });
}

function mudarIdioma(novoIdioma){
    idioma = novoIdioma;
    carregarDados();
}

searchInput.addEventListener('input', filterProducts);
filters.forEach(f => f.addEventListener('change', filterProducts));

carregarDados();
filterProducts();