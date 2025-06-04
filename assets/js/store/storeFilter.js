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
        card.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3');
        card.innerHTML = `
            <a href="#" type="button" onclick="verMais(${item.id})" class="card-link">
                <div class="card">
                    <img src="${item.imagem_card}" alt="${item.titulo[idioma]}">
                    <div class="card-body">
                        <h3 class="card_title" data-name="${item.titulo[idioma]}" data-category="${item.categoria[idioma]}">${item.titulo[idioma]}</h3>
                        <p class="card_cost">Cost: ${formatarPreco(item.preco)}</p>
                    </div>
                </div>
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
    window.location.href = "/pages/product.html" + `?id=${id}`;
}

searchInput.addEventListener('input', filterProducts);
filters.forEach(f => f.addEventListener('change', filterProducts));

carregarDados();
filterProducts();