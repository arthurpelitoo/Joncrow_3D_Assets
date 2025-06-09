    <main id="detailProduct">
        <section class="banner"></section>
        <article class="articleDetailProduct">
                <header class="product_title">
                    <h1 id="productTitle"></h1>
                </header>
                <div class="productOrganization">
                    <section class="product_gallery">
                        <div id="carouselExampleIndicators" class="product_carousel carousel slide" data-bs-ride="carousel">
                            <div class="carousel-indicators" id="carousel-indicators"></div>
                            <div class="carousel-inner" id="carousel-inner"></div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon"></span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span class="carousel-control-next-icon"></span>
                            </button>
                        </div>
                    </section>
                    <section class="product_info">
                        <p class="productPrice" id="productPrice"></p>
                        <a class="productBuyLink" id="productBuyLink" href="${item.link_do_pagamento}" type="button"></a>
                        <p class="productLicence" id="productLicence"></p>
                        <div class="collectionContainer" id="collectionContent">
                        </div>
                    </section>
                </div>
                <section class="descriptionCollapseContainer text-center">
                    <button class="descriptionCollapseBtn" type="button" data-bs-toggle="collapse" data-bs-target="#descriptionCollapseBox" aria-expanded="false" aria-controls="descriptionCollapseBox" id="descriptionCollapse">
                        
                    </button>

                    <div class="descriptionCollapseBox collapse" id="descriptionCollapseBox">
                        <br>
                        <div class="description container" id="descriptionTxt">
                        </div>
                        <div class="arquives container" id="receivedArquives">
                        </div>
                        <h2 class="container">Tags:</h2>
                        <div class="tags container" id="receivedTags">
                        </div>
                    </div>
                </section>
                <section class="productDevlogs">
                    <h2 id="devlogTitle">
                    </h2>
                    <ul class="devlogUl" id="devlogUl">

                    </ul>
                </section>
                <div class="container" id="disqus_thread"></div>
        </article>
    </main>
    