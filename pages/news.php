<?php
    $idioma = 'en'; // ou 'pt'

    $dados = json_decode(file_get_contents('assets/dados/modelos.json'), true);

    // Ordena pelo ID (maior para menor)
    // o usort ta basicamente pegando os ids e reordenando eles, estou pedindo para retornar uma subtração de ids onde o b veio depois e o a veio antes.
    // ele pega o numero da frente e subtrai com o de tras, se der positivo o maior fica no topo, se der negativo o menor dá espaço pro maior ir na frente.
    usort($dados, function($a, $b){
        return $b['id'] - $a['id'];
    });

    // pega os 5 primeiros elementos, que agora são os de maior id
    $latestNews = array_slice($dados, 0, 5);


    // <?= $index == 0 ? 'class="active"' : ''
    // condição ? se_verdadeiro : se_falso

    $newsPath = ($dominio === 'localhost') ? '/siteJon/' : 'https://joncrow.rf.gd';
?>

<?php
$firstItem = $latestNews[0];
$ogTitle = htmlspecialchars($firstItem['titulo'][$idioma]);
$ogDesc = htmlspecialchars($firstItem['descricao'][$idioma][0]);
$ogImage = $firstItem['imagem_card'];
?>

<img class="backgroundImage" src="<?= BASE_URL ?>assets/news_page_images/News_Background.avif" alt="News-BG">
<div class="newsContainer container">
    <h1 class="newsTitle">
        Latest 3D Asset Updates & New Low Poly Models
    </h1>
    <div id="newsCarousel" class="newsCarousel carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
            <?php foreach($latestNews as $index => $item): ?>
                <!-- $index pega o indice de cada elemento ($item) do nosso array $latestNews. -->
                <button type="button" data-bs-target="#newsCarousel" data-bs-slide-to="<?= $index ?>" <?= $index == 0 ? 'class="active"' : '' ?>></button>
            <?php endforeach; ?>
        </div>
        <div class="carousel-inner">
            <?php foreach($latestNews as $index => $item): ?>
                <div class="carousel-item <?= $index == 0 ? 'active' : '' ?>">
                        <img src="<?= $newsPath . $item['imagem_card'] ?>" alt="<?= htmlspecialchars($item['titulo'][$idioma]) ?>" class="d-block w-100">
                        <div class="carousel-caption">
                            <h5 class="itemTitle"><?= htmlspecialchars($item['titulo'][$idioma]) ?></h5>
                            <p class="itemParagraph"><?= htmlspecialchars($item['descricao'][$idioma][0]) ?></p>
                            <a class="itemBtn" href="/product/<?= $item['id'] ?>" target="_blank" rel="noopener noreferrer"><?= htmlspecialchars($item['btn'][$idioma]) ?></a>
                        </div>
                </div>
            <?php endforeach; ?>
        </div>

        <button class="carousel-control-prev" type="button" data-bs-target="#newsCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#newsCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon"></span>
        </button>
    </div>
</div>