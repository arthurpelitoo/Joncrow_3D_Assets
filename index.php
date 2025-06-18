<?php

    $idioma = 'en'; // ou 'pt'

    define('BASE_URL', '/');

        if (isset($_GET["param"])) {

            $param = $_GET["param"] ?? '';
            $p = explode("/", $param);
        }

        $page = $p[0] ?? "home";
        $id = $p[1] ?? null;

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

        if($page === "product" && !$idfound){
            header("Location: ".BASE_URL."erro404");
            exit;
        }

        $pagina = "pages/{$page}.php";
        if (!file_exists($pagina)) {
            $page = "erro404";
            header("Location: ".BASE_URL."erro404");
            exit;
        }

    usort($dados, function($a, $b){
        return $b['id'] - $a['id'];
    });

    // pega os 5 primeiros elementos, que agora são os de maior id
    $latestNews = array_slice($dados, 0, 5);

    $firstItem = $latestNews[0];
    $ogTitle = htmlspecialchars($firstItem['titulo'][$idioma]);
    $ogDesc = htmlspecialchars($firstItem['descricao'][$idioma][0]);
    $ogImage = $firstItem['imagem_card'];

    $siteBaseUrl = "https://www.joncrow.rf.gd";

    $seoMap = [
        "home" => [
            "title" => "Low Poly 3D Models for Games – Characters, NPCs & Props | Joncrow Asset Store",
            "description" => "Download royalty-free low poly 3D characters, NPCs and props optimized for Unity, Unreal, Godot, Blender and other engines. Game-ready assets, affordable pricing, indie-friendly.",
            "keywords" => "Download royalty-free low poly 3D characters, NPCs and props optimized for Unity, Unreal, Godot, Blender and other engines. Game-ready assets, affordable pricing, indie-friendly.",
            "author" => "Asset Store | Joncrow Asset Store",
            "og_title" => "Low Poly 3D Models – Game-Ready Characters & Props | Joncrow Asset Store",
            "og_description" => "Royalty-free low poly 3D assets optimized for Unity, Unreal, Godot and more. Build your games and prototypes with affordable, indie-friendly models.",
            "og_image" => BASE_URL . "assets/main_page_images/banner.png",
            "og_url" => BASE_URL . "home",
            "twitter_card" => "summary_large_image",
            "twitter_title" => "Home | Joncrow Asset Store",
            "twitter_description" => "Download royalty-free low poly 3D characters, NPCs and props optimized for Unity, Unreal, Godot, Blender and other engines. Game-ready assets, affordable pricing, indie-friendly.",
            "twitter_image" => BASE_URL . "assets/main_page_images/banner.png"
        ],

        "contact" => [
            "title" => "Contact | Joncrow Asset Store",
            "description" => "Get in touch with JonCrow for feedback, suggestions. Reach me via email, social media, or use the contact form.",
            "keywords" => "Get in touch with JonCrow for feedback, suggestions. Reach me via email, social media, or use the contact form.",
            "author" => "Asset Store | Joncrow Asset Store",
            "og_title" => "Contact | Joncrow Asset Store",
            "og_description" => "Contact us for any support or information about 3D models.",
            "og_image" => BASE_URL . "assets/main_page_images/banner.png",
            "og_url" => BASE_URL . "contact",
            "twitter_card" => "summary_large_image",
            "twitter_title" => "Contact | Joncrow Asset Store",
            "twitter_description" => "Get in touch with JonCrow for feedback, suggestions. Reach me via email, social media, or use the contact form.",
            "twitter_image" => BASE_URL . "assets/main_page_images/banner.png"
        ],

        "store" => [
            "title" => "Asset Store | Joncrow Asset Store",
            "description" => "Browse and search for 3D models in JonCrow's Asset Store. Find characters, monsters, buildings, games, and other assets optimized for your projects.",
            "keywords" => "Browse and search for 3D models in JonCrow's Asset Store. Find characters, monsters, buildings, games, and other assets optimized for your projects.",
            "author" => "Asset Store | Joncrow Asset Store",
            "og_title" => "Asset Store | Joncrow Asset Store",
            "og_description" => "Huge collection of royalty-free 3D models for indie game developers.",
            "og_image" => BASE_URL . "assets/main_page_images/banner.png",
            
            "og_url" => BASE_URL . "store",
            "twitter_card" => "summary_large_image",
            "twitter_title" => "Asset Store | Joncrow Asset Store",
            "twitter_description" => "Browse and search for 3D models in JonCrow's Asset Store. Find characters, monsters, buildings, games, and other assets optimized for your projects.",
            "twitter_image" => BASE_URL . "assets/main_page_images/banner.png"
        ],

        "FAQ" => [
            "title" => "FAQ | Joncrow Asset Store",
            "description" => "Frequently asked questions about JonCrow's 3D models, file formats, licenses, supported software, and contact options. Get all the answers here.",
            "keywords" => "Frequently asked questions about JonCrow's 3D models, file formats, licenses, supported software, and contact options. Get all the answers here.",
            "author" => "Asset Store | Joncrow Asset Store",
            "og_title" => "FAQ | Joncrow Asset Store",
            "og_description" => "Frequently asked questions about JonCrow's 3D models, file formats, licenses, supported software, and contact options.",
            "og_type" => "image",
            "og_image" => BASE_URL . "assets/main_page_images/banner.png",
            "og_url" =>  BASE_URL . "FAQ",
            "twitter_card" => "summary_large_image",
            "twitter_title" => "FAQ | Joncrow Asset Store",
            "twitter_description" => "Frequently asked questions about JonCrow's 3D models, file formats, licenses, supported software, and contact options. Get all the answers here.",
            "twitter_image" => BASE_URL . "assets/main_page_images/banner.png"
        ],

        "news" => [
        ],

        "product" => [
        ]

];

    $seo = $seoMap[$page] ?? null;


?>

<!DOCTYPE html>
<html lang="<?= $idioma ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="<?= BASE_URL ?>assets/all_pages_use_images/header/logoCentralizado.avif" type="image/x-icon">
<?php if($seo): ?>
    <title><?= htmlspecialchars($seo['title']) ?></title>
    <meta name="description" content="<?= htmlspecialchars($seo['description']) ?>">
    <meta name="keywords" content="<?= htmlspecialchars($seo['keywords']) ?>">
    <meta name="author" content="<?= htmlspecialchars($seo['author']) ?>">
    
    <meta property="og:title" content="<?= htmlspecialchars($seo['og_title']) ?>">
    <meta property="og:description" content="<?= htmlspecialchars($seo['og_description']) ?>">
    <meta property="og:type" content="<?= htmlspecialchars($seo['og_type']) ?>">
    <meta property="og:url" content="<?= htmlspecialchars($siteBaseUrl . $seo['og_url']) ?>">
    <meta property="og:image" content="<?= htmlspecialchars($siteBaseUrl . $seo['og_image']) ?>">
    <meta property="og:image:width" content="1024">
    <meta property="og:image:height" content="768">

    <meta name="twitter:card" content="<?= htmlspecialchars($seo['twitter_card']) ?>">
    <meta name="twitter:title" content="<?= htmlspecialchars($seo['twitter_title']) ?>">
    <meta name="twitter:description" content="<?= htmlspecialchars($seo['twitter_description']) ?>">
    <meta name="twitter:image" content="<?= htmlspecialchars($siteBaseUrl . $seo['twitter_image']) ?>">
    <meta property="twitter:image:width" content="1024">
    <meta property="twitter:image:height" content="768">

<?php elseif($page == "product"): ?>
    <title><?= htmlspecialchars($item['titulo'][$idioma]) ?> | Joncrow Asset Store</title>
    <meta name="description" content="<?= htmlspecialchars($item['descricao'][$idioma][0]) ?>">
    <meta name="keywords" content="<?= htmlspecialchars(implode(', ', $item['tags'])) ?>">
    <meta name="author" content="Asset Store | Joncrow Asset Store">

    <!-- Open Graph para Facebook, LinkedIn -->
    <meta property="og:title" content="<?= htmlspecialchars($item['titulo'][$idioma]) ?>">
    <meta property="og:description" content="<?= htmlspecialchars($item['descricao'][$idioma][0]) ?>">
    <meta property="og:type" content="product">
    <meta property="og:url" content="<?= htmlspecialchars($siteBaseUrl . "/product/" . $item['id']) ?>">
    <meta property="og:image" content="<?= htmlspecialchars($siteBaseUrl . $item['imagens'][2]) ?>">

    <!-- Twitter Cards -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?= htmlspecialchars($item['titulo'][$idioma]) ?>">
    <meta name="twitter:description" content="<?= htmlspecialchars($item['descricao'][$idioma][0]) ?>">
    <meta name="twitter:image" content="<?= htmlspecialchars($siteBaseUrl . $item['imagens'][2]) ?>">
    <meta property="twitter:image:width" content="1024">
    <meta property="twitter:image:height" content="768">

<?php elseif($page == "news"): ?>
    <meta name="description" content="<?= $ogDesc ?>">
    <meta name="keywords" content="<?= $ogDesc ?>">
    <meta name="author" content="Asset Store | Joncrow Asset Store">

    <meta property="og:title" content="<?= $ogTitle ?> | New Update - Joncrow Asset Store">
    <meta property="og:description" content="<?= $ogDesc ?>">
    <meta property="og:type" content="news and updates">
    <meta property="og:image" content="<?= htmlspecialchars($siteBaseUrl . $ogImage) ?>">
    <meta property="og:image:width" content="1024">
    <meta property="og:image:height" content="768">
    <meta property="og:url" content=<?= htmlspecialchars($siteBaseUrl . "/news/")?>>
    
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?= $ogTitle ?> | New Update - Joncrow Asset Store">
    <meta name="twitter:description" content="<?= $ogDesc ?>">
    <meta name="twitter:image" content="<?= htmlspecialchars($siteBaseUrl . $ogImage) ?>">
    <meta property="twitter:image:width" content="1024">
    <meta property="twitter:image:height" content="768">

    <title>Latest 3D Asset Updates – New Low Poly Models for Your Games | Joncrow Asset Store</title>
    <meta name="description" content="See the latest updates, new 3D characters, props and game-ready low poly assets added to the Joncrow Asset Store. Always expanding and royalty-free.">
<?php else: ?>
    <title>Joncrow Asset Store</title>
<?php endif; ?>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <?php

        $cssMap = [
            "home" => [
                "assets/css/mainPage/style.css",
                "assets/css/all_pages_use/header_and_footer.css"
            ],
            "contact" => ["assets/css/contact/contact.css"],
            "store" => [
                "assets/css/storePage/store.css",
                "assets/css/all_pages_use/header_and_footer.css"
            ],
            "product" => [
                "assets/css/productPage/product.css",
                "assets/css/all_pages_use/header_and_footer.css"
            ],
            "FAQ" => [
                "assets/css/faqPage/faq.css",
                "assets/css/all_pages_use/header_and_footer.css"
            ],
            "news" => [
                "assets/css/newsPage/news.css",
                "assets/css/all_pages_use/header_and_footer.css"
            ],
            "erro404" => [
                "assets/css/erro404/erro.css",
                "assets/css/all_pages_use/header_and_footer.css"
            ]
        ];

        if (isset($cssMap[$page])) {
            foreach ($cssMap[$page] as $cssFile) {
                if (file_exists($cssFile)) {
                    echo "<link rel='stylesheet' href=\"" . BASE_URL . "$cssFile\">";
                }
            }
        }
    ?>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css">
</head>
<body>
    <header id="header">
        <div class="container">
            <div class="flex">
                <div class="flex-col1">
                    <a href="/home" class="headerLogo" title="Home">
                        <img src="<?= BASE_URL ?>assets/all_pages_use_images/header/logoCentralizado.avif" alt="Joncrow Logo">
                    </a>
                </div>
                <div class="flex-col2">
                    <a href="javascript:showMenu()" class="header-menu" id="header-menu">
                        <i class="fas fa-bars"></i>
                    </a>
                    <nav class="header-nav" id="header-nav">
                        <ul class="nav-ul">
                            <li class="nav-li"><a class="nav-btn" href="/home" title="Home">Home</a></li>
                            <li class="nav-li"><a class="nav-btn" href="/contact" title="Contact">Contact</a></li>
                            <li class="nav-li"><a class="nav-btn" href="/FAQ" title="FAQ">F.A.Q</a></li>
                            <li class="nav-li"><a class="nav-btn" href="/news" title="News">News</a></li>
                            <li class="nav-li">
                                <div class="nav-div"><a class="nav-btn-models" href="/store" type="button">Asset Store</a></div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </header>
    <main>
        <?php

        if($id){
            $_GET["id"] = $id;
        }

        //verificar se a pagina existe

        if (file_exists($pagina)) {
            // echo "<!-- Incluindo: $pagina -->";
            include $pagina;
        } else {
            $page = "erro404";
            include "pages/{$page}.php";
        }

        ?>
    </main>
    <footer class="footer">
        <div class="footerClass">
            <p>
                <a href="<?= BASE_URL ?>home">
                    <img src="<?= BASE_URL ?>assets/all_pages_use_images/header/logoCentralizado.avif" alt="Joncrow - 3D models">
                </a>
            </p>
            <p class="iconRedes">
                <a href="mailto:jeovane.contact@gmail.com">
                    <i class="fa-solid fa-envelope"></i>
                </a>
                <a href="https://t.me/joncrow64" title="My Telegram" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-telegram"></i>
                </a>
                <a href="https://www.instagram.com/joncroww/" title="My Instagram" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-square-instagram"></i>
                </a>
                <a href="https://x.com/joncrow_devlog" title="My Twitter/ X Page" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-x-twitter"></i>
                </a>
                <a href="https://www.youtube.com/@joncrow?sub_confirmation=1" title="My Youtube Channel" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-youtube"></i>
                </a>
                <a href="https://joncrow.itch.io/" target="_blank" rel="noopener noreferrer" title="My Itch.io Page">
                    <svg class="itch-icon" xmlns="http://www.w3.org/2000/svg" height="38" width="37" viewBox="0 0 245.371 220.736">
                        <path d="M31.99 1.365C21.287 7.72.2 31.945 0 38.298v10.516C0 62.144 12.46 73.86 23.773 73.86c13.584 0 24.902-11.258 24.903-24.62 0 13.362 10.93 24.62 24.515 24.62 13.586 0 24.165-11.258 24.165-24.62 0 13.362 11.622 24.62 25.207 24.62h.246c13.586 0 25.208-11.258 25.208-24.62 0 13.362 10.58 24.62 24.164 24.62 13.585 0 24.515-11.258 24.515-24.62 0 13.362 11.32 24.62 24.903 24.62 11.313 0 23.773-11.714 23.773-25.046V38.298c-.2-6.354-21.287-30.58-31.988-36.933C180.118.197 157.056-.005 122.685 0c-34.37.003-81.228.54-90.697 1.365zm65.194 66.217a28.025 28.025 0 0 1-4.78 6.155c-5.128 5.014-12.157 8.122-19.906 8.122a28.482 28.482 0 0 1-19.948-8.126c-1.858-1.82-3.27-3.766-4.563-6.032l-.006.004c-1.292 2.27-3.092 4.215-4.954 6.037a28.5 28.5 0 0 1-19.948 8.12c-.934 0-1.906-.258-2.692-.528-1.092 11.372-1.553 22.24-1.716 30.164l-.002.045c-.02 4.024-.04 7.333-.06 11.93.21 23.86-2.363 77.334 10.52 90.473 19.964 4.655 56.7 6.775 93.555 6.788h.006c36.854-.013 73.59-2.133 93.554-6.788 12.883-13.14 10.31-66.614 10.52-90.474-.022-4.596-.04-7.905-.06-11.93l-.003-.045c-.162-7.926-.623-18.793-1.715-30.165-.786.27-1.757.528-2.692.528a28.5 28.5 0 0 1-19.948-8.12c-1.862-1.822-3.662-3.766-4.955-6.037l-.006-.004c-1.294 2.266-2.705 4.213-4.563 6.032a28.48 28.48 0 0 1-19.947 8.125c-7.748 0-14.778-3.11-19.906-8.123a28.025 28.025 0 0 1-4.78-6.155 27.99 27.99 0 0 1-4.736 6.155 28.49 28.49 0 0 1-19.95 8.124c-.27 0-.54-.012-.81-.02h-.007c-.27.008-.54.02-.813.02a28.49 28.49 0 0 1-19.95-8.123 27.992 27.992 0 0 1-4.736-6.155zm-20.486 26.49l-.002.01h.015c8.113.017 15.32 0 24.25 9.746 7.028-.737 14.372-1.105 21.722-1.094h.006c7.35-.01 14.694.357 21.723 1.094 8.93-9.747 16.137-9.73 24.25-9.746h.014l-.002-.01c3.833 0 19.166 0 29.85 30.007L210 165.244c8.504 30.624-2.723 31.373-16.727 31.4-20.768-.773-32.267-15.855-32.267-30.935-11.496 1.884-24.907 2.826-38.318 2.827h-.006c-13.412 0-26.823-.943-38.318-2.827 0 15.08-11.5 30.162-32.267 30.935-14.004-.027-25.23-.775-16.726-31.4L46.85 124.08C57.534 94.073 72.867 94.073 76.7 94.073zm45.985 23.582v.006c-.02.02-21.863 20.08-25.79 27.215l14.304-.573v12.474c0 .584 5.74.346 11.486.08h.006c5.744.266 11.485.504 11.485-.08v-12.474l14.304.573c-3.928-7.135-25.79-27.215-25.79-27.215v-.006l-.003.002z" color="#000"/>
                    </svg>
                </a>
            </p>
            <p class="dev">
                Website Developed by Arthur Antonio
            </p>
            <br>
        </div>
    </footer>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"></script>

<script>
function showMenu(){
    let menu = document.querySelector('.header-nav');
    menu.classList.toggle("active");
}
</script>

<?php
$jsMap = [
    "home" => [
        "assets/js/all_pages_use/index.js",
        "assets/js/main_page/finalCall.js",
        "assets/js/main_page/updateTimer.js"
    ],
    "contact" => ["assets/js/contact/contact.js"],
    "store" => ["assets/js/store/storeFilter.js"],
    "product" => ["assets/js/product/product.js"]
];

if (isset($jsMap[$page])) {
    foreach ($jsMap[$page] as $jsFile) {
        if (file_exists($jsFile)) {
            echo "<script src=\"" . BASE_URL . "$jsFile\"></script>";
        }
    }
}
?>
</body>
</html>