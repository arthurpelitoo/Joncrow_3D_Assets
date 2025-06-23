<?php
    $idioma = isset($_GET['lang']) ? $_GET['lang'] : 'en';
    $busca = isset($_GET['q']) ? strtolower(trim($_GET['q'])) : '';
    $filtrosSelecionados = isset($_GET['filter']) ? $_GET['filter'] : [];
    $precosSelecionados = isset($_GET['price']) ? $_GET['price'] : [];
    $dados = json_decode(file_get_contents('assets/dados/modelos.json'), true);

    $storePath = ($dominio === 'localhost') ? '/siteJon' : 'https://joncrow.rf.gd';
?>

<section class="sectionFilter">
    <img class="backgroundImage" src="<?= BASE_URL ?>assets/store_page_images/sectionFilter.avif" alt="Store-BG">
            <h1 class="sectionTitle">Asset Store</h1>
            <h2 class="sectionTitle2">Search for itens:</h2>
            <form method="GET" class="filters">
                <input type="hidden" name="lang" value="<?= htmlspecialchars($idioma) ?>">
                <div class="searchbar">
                    <input type="text" class="searchInput" name="q" placeholder="Search..." value="<?= htmlspecialchars($busca) ?>">
                    <button class="searchInputConfirm" type="submit"><i class="fa-solid fa-magnifying-glass"></i></a>
                </div>

                <div class="checkboxFilterContainer dropdown-center">
                    <a class="checkboxFilterBtn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Filters
                        <span class="visually-hidden">Toggle Dropdown</span>
                    </a>
                    <ul class="checkboxFilterDropdown dropdown-menu">
                        <li>
                            <label>
                                <input type="checkbox" class="filter dropdown-item" name="price[]" value="free" <?= in_array('free', $precosSelecionados) ? 'checked' : ''?>>
                                Free
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox" class="filter dropdown-item" name="price[]" value="paid" <?= in_array('paid', $precosSelecionados) ? 'checked' : ''?>>
                                Paid
                            </label>
                        </li>
                        <?php
                        $categorias = ['characters', 'monsters', 'buildings', 'games', 'asset'];
                        foreach ($categorias as $cat):
                            $checked = in_array($cat, $filtrosSelecionados) ? 'checked' : '';
                        ?>
                        <li>
                            <label>
                                <input type="checkbox" name="filter[]" value="<?= $cat ?>" <?= $checked ?>>
                                <?= ucfirst($cat) ?>
                            </label>
                        </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            </form>
        </section>

        <section class="sectionProduct">
            <div class="container">
                <div class="productContainer row">
                    <?php
                    $produtosFiltrados = array_filter($dados, function ($item) use ($idioma, $busca, $filtrosSelecionados, $precosSelecionados) {
                        $nome = strtolower($item['titulo'][$idioma]);
                        $categoria = strtolower($item['categoria'][$idioma]);
                        $preco = $item['preco'];

                        $ehgratuito = !is_numeric($preco);
                        $precoTipo = $ehgratuito ? 'free' : 'paid';

                        $precoOk = empty($precosSelecionados) || in_array($precoTipo, $precosSelecionados);
                        $buscaOk = empty($busca) || strpos($nome, $busca) !== false || strpos($categoria, $busca) !== false;
                        $filtroOk = empty($filtrosSelecionados) || in_array($categoria, $filtrosSelecionados);

                        return $buscaOk && $filtroOk && $precoOk;
                    });

                    if (empty($produtosFiltrados)) {
                        echo "<p style='color: var(--textColor);'>No products found.</p>";
                    } else {
                        foreach ($produtosFiltrados as $item):
                            $titulo = $item['titulo'][$idioma];
                            $categoria = $item['categoria'][$idioma];
                            if (is_numeric($item['preco'])) {
                                $preco = 'Cost: $' . number_format((float)$item['preco'], 2);
                            } else {
                                $preco = htmlspecialchars($item['preco']);
                            }
                            $imgSrc = $storePath . $item['imagem_card'];
                            $id = $item['id'];
                    ?>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                            <a href="<?= BASE_URL ?>product/<?= $id ?>" class="card-link">
                                <div class="card">
                                    <img src="<?= $imgSrc ?>" alt="<?= htmlspecialchars($titulo) ?>">
                                    <div class="card-body">
                                        <h3 class="card_title"><?= htmlspecialchars($titulo) ?></h3>
                                        <p class="card_cost"><?= $preco ?></p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    <?php
                        endforeach;
                    }
                    ?>
                </div>
            </div>
        </section>