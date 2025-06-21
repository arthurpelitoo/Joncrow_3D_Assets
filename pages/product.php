<?php
$idioma = 'en'; // ou 'pt'

// Lê o ID da URL
$id = isset($_GET['id']) ? $_GET['id'] : null;

// Lê o JSON com os dados
$dados = json_decode(file_get_contents('assets/dados/modelos.json'), true);

// Busca o item com o ID correspondente
$item = null;
$idfound = false;
foreach ($dados as $prod) {
    if ($prod['id'] == $id) {
        $item = $prod;
        $idfound = true;
        break;
    }
}

// Função para formatar o preço
function formatarPreco($preco) {
    return is_numeric($preco) ? '$' . number_format($preco, 2) : $preco;
}

if (!$item && $idioma === "pt") {
    echo "<h1>Esse item não existe ou não foi encontrado!</h1>";
    exit;
}else if(!$item && $idioma === "en"){
    echo "<h1>This item does not exist or not found</h1>";
    exit;
}

$productPath = ($dominio === 'localhost') ? '/siteJon/' : 'https://joncrow.rf.gd';

?>

    <img class="banner" height="200px" src="<?= BASE_URL . "assets/product_page_images/banner.avif" ?>" alt="Product-BG"></section>
    <article class="articleDetailProduct">
        <header class="product_title">
            <h1 id="productTitle"><?= htmlspecialchars($item['titulo'][$idioma]) ?></h1>
        </header>

        <div class="productOrganization">
            <section class="product_gallery">
                <div id="carouselExampleIndicators" class="product_carousel carousel slide" data-bs-ride="carousel">
                    <div class="carousel-indicators">
                        <?php foreach ($item['imagens'] as $index => $img): ?>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="<?= $index ?>" <?= $index == 0 ? 'class="active"' : '' ?>></button>
                        <?php endforeach; ?>
                        <?php
                        $indexBase = count($item['imagens']);
                        $extraIndex = 0;
                        if (!empty($item['sketchfab'])): ?>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="<?= $indexBase + $extraIndex ?>" ></button>
                            <?php $extraIndex++; ?>
                        <?php endif; ?>
                        <?php if (!empty($item['video'])): ?>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="<?= $indexBase + $extraIndex ?>"></button>
                        <?php endif; ?>
                    </div>

                    <div class="carousel-inner">
                        <?php foreach ($item['imagens'] as $index => $img): ?>
                            <div class="carousel-item <?= $index == 0 ? 'active' : '' ?>">
                                <img src="<?= $productPath . $img ?>" onclick="openFullScreen(this)" class="galleryImage d-block w-100" alt="Slide <?= $index + 1 ?>">
                            </div>
                        <?php endforeach; ?>

                        <?php if (!empty($item['sketchfab'])): ?>
                            <div class="carousel-item">
                                <div class="ratio ratio-16x9">
                                    <?= $item['sketchfab'] ?>
                                </div>
                            </div>
                        <?php endif; ?>
                        <?php if (!empty($item['video'])): ?>
                            <div class="carousel-item">
                                <div class="ratio ratio-16x9">
                                    <iframe src="<?= htmlspecialchars($item['video']) ?>" title="<?= htmlspecialchars($item['titulo'][$idioma]) ?>" allowfullscreen></iframe>
                                </div>
                            </div>
                        <?php endif; ?>
                    </div>

                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon"></span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span class="carousel-control-next-icon"></span>
                    </button>
                </div>
            </section>

            <section class="product_info">
                <p class="productPrice"><?= formatarPreco($item['preco']) ?></p>
                <a class="productBuyLink" href="<?= htmlspecialchars($item['link_do_pagamento']) ?>" type="button">
                    <?= htmlspecialchars($item['btnPurchase'][$idioma]) ?>
                </a>
                <p class="productLicence"><?= htmlspecialchars($item['licenca']) ?></p>

                <?php if (!empty($item['serie']) && !empty($item['serielink'])): ?>
                    <div class="collectionContainer">
                        <p class="serieParagraphStyle"> <?= $idioma == 'pt' ? "Esse item é da série de coleção" : "This item is from the collection" ?> <?= $item['serie'] ?>:</p>
                        <a href="<?= $item['serielink'] ?>" target="_blank" rel="noopener noreferrer">
                            <?= $idioma == 'pt' ? "Clique aqui para ver a coleção completa" : "Click here to see the full collection" ?>
                        </a>
                    </div>
                <?php endif; ?>
            </section>
        </div>

        <section class="descriptionCollapseContainer text-center">
            <button class="descriptionCollapseBtn" type="button" data-bs-toggle="collapse" data-bs-target="#descriptionCollapseBox">
                <?= htmlspecialchars($item['btnInfo'][$idioma]) ?>
            </button>

            <div class="descriptionCollapseBox collapse" id="descriptionCollapseBox">
                <br>
                <div class="description container">
                    <?php foreach ($item['descricao'][$idioma] as $i => $paragrafo): ?>
                        <?php if ($i === 2 && isset($item['extra_link'])): ?>
                            <p>
                                <a href="<?= $item['extra_link']['url'] ?>" class="clicklinkStyle" target="_blank"><?= $item['extra_link']['click'][$idioma] ?></a><br>
                                <span><?= $item['extra_link']['label'][$idioma] ?></span>
                            </p>
                        <?php endif; ?>
                        <p class="paragraphStyle"><?= htmlspecialchars($paragrafo) ?></p>
                    <?php endforeach; ?>
                </div>

                <div class="arquives container">
                    <?php foreach ($item['arquivos_recebidos'] as $arq): ?>
                        <p class="arquiveParagraphStyle"><?= htmlspecialchars($arq) ?></p>
                    <?php endforeach; ?>
                </div>

                <h2 class="container">Tags:</h2>
                <div class="tags container">
                    <p class="tagsParagraphStyle">
                        <?php foreach ($item['tags'] as $i => $tag): ?>
                            <span class="tagSpanStyle"><?= htmlspecialchars($tag) ?></span><?= $i < count($item['tags']) - 1 ? ', ' : '' ?>
                        <?php endforeach; ?>
                    </p>
                </div>
            </div>
        </section>

        <?php if (!empty($item['devlogs'])): ?>
            <section class="productDevlogs">
                <h2 id="devlogTitle">DevLog:</h2>
                <ul class="devlogUl" id="devlogUl">
                    <?php foreach ($item['devlogs'] as $log): ?>
                        <li>
                            <a href="<?= $log['link'] ?>" class="devlogAStyle"><?= $log['titulo'] ?></a>
                            <div class="devlogDiv">
                                <abbr class="devlogAbbr" title="<?= $log['data'] ?>"><?= $log['data'] ?></abbr>
                            </div>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </section>
        <?php endif; ?>

        <div class="container" id="disqus_thread"></div>
    </article>
    <div id="fullscreen-container" onclick="closeFullScreen()">
        <img id="fullscreen-img">
    </div>

<script>

    var disqus_config = function () {
        this.page.url = window.location.href;
        this.page.identifier = "<?= $item['id'] ?>";
        this.page.title = "Produto <?= addslashes($item['titulo'][$idioma]) ?>";
    };
    (function () {
        var d = document, s = d.createElement('script');
        s.src = 'https://joncrow-asset-store.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        s.async = true;
        (d.head || d.body).appendChild(s);
    })();
</script>