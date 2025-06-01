let idioma = "en";

const error = {

    'en': "This item doesnt exist or found!",
    'pt': "Esse item não existe ou não foi encontrado!"

}

function formatarPreco(preco){
    return isFinite(preco) ? `$${Number(preco).toFixed(2)}` : preco;
}

async function carregarProduto() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const res = await fetch('/assets/dados/modelos.json');
    const dados = await res.json();
    const item = dados.find(prod => prod.id == id) || JSON.parse(localStorage.getItem('produtoItem'));

    const produto = document.getElementById('detailProduct');

    if (item){
        produto.innerHTML = `

            <div class="product_title">
                <h1>${item.titulo[idioma]}</h1>
            </div>
            <div class="product_info">
                <p class="price">${formatarPreco(item.preco)}</p>
                <a class="buy_btn" href="${item.link_do_pagamento}" type="button">${item.btnPurchase[idioma]}</a>
            </div>
            <div id="carouselExampleIndicators" class="carousel slide w-50" data-bs-ride="carousel">
                <div class="carousel-indicators" id="carousel-indicators"></div>
                <div class="carousel-inner" id="carousel-inner"></div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon"></span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span class="carousel-control-next-icon"></span>
                </button>
            </div>
            <div class="descriptionCollapseContainer text-center">
                <button class="descriptionCollapseBtn" type="button" data-bs-toggle="collapse" data-bs-target="#descriptionCollapseBox" aria-expanded="false" aria-controls="descriptionCollapseBox" id="banner_collapse">
                    ${item.btnInfo[idioma]}
                </button>

                <div class="descriptionCollapseBox collapse" id="descriptionCollapseBox">
                    <div class="description" id="descriptionTxt">
                    </div>
                    <div class="arquives" id="receivedArquives">
                    </div>
                </div>
            </div>
        `;

        //pra ele passar por todos os arquivos recebidos

        const arquivesTxt = document.getElementById('receivedArquives');

        item.arquivos_recebidos.forEach((valor) => {

            const arquiveParagraph = document.createElement('p');
            arquiveParagraph.classList.add('arquiveParagraphStyle');

            arquiveParagraph.textContent = valor;

            arquivesTxt.appendChild(arquiveParagraph);
        });

        //pra ele passar por todas as descrições

        const description = document.getElementById('descriptionTxt');

        item.descricao[idioma].forEach((valor) => {
            const paragraph = document.createElement('p');
            paragraph.classList.add('paragraphStyle');

            paragraph.textContent = valor;

            description.appendChild(paragraph);
        });

        //pra ele passar por todas as imagens.

        const indicators = document.getElementById('carousel-indicators');
        const inner = document.getElementById('carousel-inner');

        item.imagens.forEach((img, index) => {
            // criar indicadores
            const button = document.createElement('button');
            button.type = 'button';
            button.setAttribute('data-bs-target', '#carouselExampleIndicators');
            button.setAttribute('data-bs-slide-to', index);
            if (index === 0) button.classList.add('active');
            indicators.appendChild(button);

            const div = document.createElement('div');
            div.classList.add('carousel-item');
            if(index === 0) div.classList.add('active');

            const image = document.createElement('img');
            image.src = img;
            image.classList.add('d-block', 'w-100');
            image.alt = `Slide ${index + 1}`;

            div.appendChild(image);

            inner.appendChild(div);
        });
    } else {
        produto.innerHTML = `
            <h1>${error[idioma]}</h1>
        
        
        `;
    }
}

function mudarIdioma(novoIdioma){
    idioma = novoIdioma;
    carregarProduto();
}

carregarProduto();

