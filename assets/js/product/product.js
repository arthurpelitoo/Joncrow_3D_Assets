let idioma = "en";

const error = {

    'en': "This item doesnt exist or found!",
    'pt': "Esse item não existe ou não foi encontrado!"

}

function formatarPreco(preco){
    return isFinite(preco) ? `$${Number(preco).toFixed(2)}` : preco;
}

const BASE_URL = window.location.origin.includes("localhost") ? "/siteJon/" : "/";

async function carregarProduto() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const res = await fetch('assets/dados/modelos.json');
    const dados = await res.json();
    const item = dados.find(prod => prod.id == id);
    // || JSON.parse(localStorage.getItem('produtoItem'));

    const produto = document.getElementById('detailProduct');

    if (item){

        function carregarComentarios(item){

            const identificacaoProduto = { id: item.id, title: `Produto ${item.titulo.en}` };

            if(window.DISQUS){
                DISQUS.reset({
                    reload:true,
                    config:function(){
                        this.page.identifier = identificacaoProduto.id;
                        this.page.title = identificacaoProduto.title;
                        this.page.url = window.location.href;
                    }
                });
            } else{
                window.disqus_config = function () {
                    this.page.identifier = identificacaoProduto.id;
                    this.page.title = identificacaoProduto.title;
                    this.page.url = window.location.href;
                };

                let d = document, s = d.createElement('script');
                s.src = 'https://joncrow-asset-store.disqus.com/embed.js';
                s.setAttribute('data-timestamp', +new Date());
                s.async = true;
                (d.head || d.body).appendChild(s);
            }
        }

        carregarComentarios(item);

        const productTitle = document.getElementById('productTitle');
        productTitle.textContent = item.titulo[idioma];

        const productPrice = document.getElementById('productPrice');
        productPrice.textContent = formatarPreco(item.preco);

        const productBuyLink = document.getElementById('productBuyLink');
        productBuyLink.href  = item.link_do_pagamento;
        productBuyLink.textContent = item.btnPurchase[idioma];

        const productLicence = document.getElementById('productLicence');
        productLicence.textContent = item.licenca;

        const descriptionCollapse = document.getElementById('descriptionCollapse');
        descriptionCollapse.textContent = item.btnInfo[idioma];

        //pra poder adicionar as coleções

        if(item.serie && item.serielink){

            const collectionPhrase = {

                'en': `This item is from the ${item.serie} serie's collection:`,
                'pt': `Esse item é da serie de coleção ${item.serie}:`
            }

            const linkText = {
                'en': `Click here to see the full serie's collection`,
                'pt': `Clique aqui para ver a serie de coleção completa`
            }

            const collectionContent = document.getElementById('collectionContent');

            const serieParagraph = document.createElement('p');
            serieParagraph.classList.add('serieParagraphStyle');

            serieParagraph.textContent = collectionPhrase[idioma];

            const linkElement = document.createElement('a');
            linkElement.href = item.serielink;
            linkElement.textContent = linkText[idioma];
            linkElement.target = '_blank';
            linkElement.rel = 'noopener noreferrer';

            collectionContent.appendChild(serieParagraph);

            collectionContent.appendChild(linkElement);

        }

        if(item.devlogs && item.devlogs.length > 0){

            const devlogTitle = document.getElementById('devlogTitle');
            devlogTitle.textContent = "DevLog:";

            const devlogUl = document.getElementById('devlogUl');
            
            item.devlogs.forEach((valor) => {

                console.log(valor.link)

                const devlogLi = document.createElement('li');
                
                const devlogA = document.createElement('a');
                devlogA.classList.add('devlogAStyle');

                devlogA.href = valor.link;
                devlogA.textContent = valor.titulo;

                const devlogDiv = document.createElement('div');
                devlogDiv.classList.add('devlogDiv');

                const devlogAbbr = document.createElement('abbr');
                devlogAbbr.classList.add('devlogAbbr');
                devlogAbbr.title = valor.data;
                devlogAbbr.textContent = valor.data;

                devlogDiv.appendChild(devlogAbbr);
                devlogLi.appendChild(devlogA);
                devlogLi.appendChild(devlogDiv);
                devlogUl.appendChild(devlogLi);

            });
        }

        const tagsTxt = document.getElementById('receivedTags');

        //cria um parágrafo só
        const tagsParagraph = document.createElement('p');
        tagsParagraph.classList.add('tagsParagraphStyle');

        item.tags.forEach((valor, index, array) => {

            const tagSpan = document.createElement('span');

            tagSpan.classList.add('tagSpanStyle');
            tagSpan.textContent = valor;

            tagsParagraph.appendChild(tagSpan);

            //Se não for o ultimo item, adiciona uma virgula
            if(index < array.length - 1){
                //adicionar um espaço ou separador
                const separator = document.createTextNode(', ');
                tagsParagraph.appendChild(separator);
            }
        });

        //adiciona o parágrafo no container
        tagsTxt.appendChild(tagsParagraph);

        //pra ele passar por todos os arquivos recebidos

        const arquivesTxt = document.getElementById('receivedArquives');

        item.arquivos_recebidos.forEach((valor) => {

            const arquiveParagraph = document.createElement('p');
            arquiveParagraph.classList.add('arquiveParagraphStyle');

            arquiveParagraph.textContent = valor;

            arquivesTxt.appendChild(arquiveParagraph);
        });

        //pra ele passar por todas as descrições

        //index 1

        const description = document.getElementById('descriptionTxt');

        item.descricao[idioma].forEach((valor, index) => {

            if(index === 2 && item.extra_link){

                const paragraphGroup = document.createElement('p');
                paragraphGroup.classList.add('paragraphStyle');

                const clicklink = document.createElement('a');
                clicklink.type = 'button';
                clicklink.classList.add('clicklinkStyle');
                clicklink.href = item.extra_link.url;
                clicklink.textContent = item.extra_link.click[idioma];

                const linkPhrase = document.createElement('p');
                linkPhrase.classList.add('linkPhraseStyle');
                linkPhrase.textContent = item.extra_link.label[idioma];

                description.appendChild(paragraphGroup);
                paragraphGroup.appendChild(clicklink);
                paragraphGroup.appendChild(linkPhrase);

            }
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
            const imagemCard = `${BASE_URL}${img}`;
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
            image.src = imagemCard;
            image.classList.add('d-block', 'w-100');
            image.alt = `Slide ${index + 1}`;

            div.appendChild(image);

            inner.appendChild(div);
        });

        if(item.sketchfab){
            const index = item.imagens.length;

            const button = document.createElement('button');
            button.type = 'button';
            button.setAttribute('data-bs-target', '#carouselExampleIndicators');
            button.setAttribute('data-bs-slide-to', index);
            indicators.appendChild(button);

            const div = document.createElement('div');
            div.classList.add('carousel-item');
            
            const iframeContainer = document.createElement('div');
            iframeContainer.classList.add('ratio', 'ratio-16x9');

            const iframe = document.createElement('iframe');
            iframe.title = '3D Model';
            iframe.setAttribute('frameborder', '0');
            iframe.allowFullscreen = true;
            iframe.allow = 'autoplay; xr-spatial-tracking';
            iframe.setAttribute('mozallowfullscreen', 'true');
            iframe.setAttribute('webkitallowfullscreen', 'true');
            iframe.setAttribute('xr-spatial-tracking', '');
            iframe.setAttribute('execution-while-out-of-viewport', '');
            iframe.setAttribute('execution-while-not-rendered', '');
            iframe.setAttribute('web-share', '');

            const embedUrl = item.sketchfab.match(/src='([^']+)'/);
            if (embedUrl){
                iframe.src = embedUrl[1];
            }else{
                console.warn('Sketchfab embed URL not found.');
            }

            iframeContainer.appendChild(iframe);
            div.appendChild(iframeContainer);
            inner.appendChild(div);
        }

        if(item.video){

            const index = item.imagens.length;

            const button = document.createElement('button');
            button.type = 'button';
            button.setAttribute('data-bs-target', '#carouselExampleIndicators');
            button.setAttribute('data-bs-slide-to', index);
            indicators.appendChild(button);

            const div = document.createElement('div');
            div.classList.add('carousel-item');

            const iframeContainer = document.createElement('div');
            iframeContainer.classList.add('ratio', 'ratio-16x9');

            const iframe = document.createElement('iframe');
            iframe.title = item.titulo[idioma];
            const embedUrl = item.video;
            if(embedUrl){
                iframe.src = embedUrl;
            } else{
                console.warn('Youtube embed not found');
            }

            iframeContainer.appendChild(iframe);
            div.appendChild(iframeContainer);
            inner.appendChild(div);

        }
    } else {
        produto.textContent = error[idioma];
    }
}

function mudarIdioma(novoIdioma){
    idioma = novoIdioma;
    carregarProduto();
}

carregarProduto();

