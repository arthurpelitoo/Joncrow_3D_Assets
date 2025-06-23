document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".btn-add-cart");
    buttons.forEach(button => {

        const id = button.dataset.id;
        const cardimg = button.dataset.cardimg;
        const btntext = button.dataset.btntext === "Download now" ? "Get Now" : button.dataset.btntext;
        const title = button.dataset.title;
        const link = button.dataset.link;
        const price = button.dataset.price;
        
        updateButtonText(button, id);

        button.addEventListener("click", () => {
            let cart = JSON.parse(localStorage.getItem("cartItems") || "[]");
            const itemIndex = cart.findIndex(item => item.id === id);

            // se itemIndex entregar -1 é pq ele não achou nada, então adiciona pro carrinho. 
            if(itemIndex === -1){
                cart.push({id, cardimg, btntext, title, link, price});
                localStorage.setItem("cartItems", JSON.stringify(cart));
                updateButtonText(button, id);
            }else{
                //remove do carrinho se encontrar.
                cart.splice(itemIndex, 1);
                localStorage.setItem("cartItems", JSON.stringify(cart));
                updateButtonText(button, id);
            }

            updateCartCount();
        });
    });

    function updateButtonText(button, id) {
        const cart = JSON.parse(localStorage.getItem("cartItems") || "[]");
        const isInCart = cart.some(item => item.id === id);

        button.textContent = ""; // limpa o conteúdo antigo

        const cartIcon = document.createElement('i');
        cartIcon.classList.add("fa-solid", "fa-cart-shopping");
        const text = document.createTextNode(isInCart ? " Remove from Cart" : " Add to cart");

        button.appendChild(cartIcon);
        button.appendChild(text);
    }
});