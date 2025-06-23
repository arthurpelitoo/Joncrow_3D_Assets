function formatarPreco(preco){
    return isFinite(preco) ? `$${Number(preco).toFixed(2)}` : preco;
}


function loadCart(){
    const list = document.getElementById("cartList");
    const empty = document.getElementById("emptyCartMessage");
    const cartTotalPriceContainer = document.querySelector(".cartTotalContainer");
    const totalPrice = document.getElementById("cartTotalPrice");

    let cart = JSON.parse(localStorage.getItem("cartItems") || "[]");

    list.innerHTML = "";

    //se não tiver items apresenta o texto "não tem nada no carrinho";
    if(cart.length === 0){
        list.style.display = "none";
        if(totalPrice) totalPrice.textContent = "";
        cartTotalPriceContainer.style.display = "none";
        empty.classList.add('emptyCartMessage');
        empty.style.display = "block";
        empty.textContent = "Your cart is empty.";
        return;
    } else{
        empty.style.display = "none";
        cartTotalPriceContainer.style.display = "flex";
        
        cart.forEach((item, index) => {
            const div = document.createElement("div");
            div.classList.add("itemOrganization");
            const sectionImage = document.createElement("section");
            sectionImage.classList.add("sectionImage");
            const sectionInformation = document.createElement("section");
            sectionInformation.classList.add("sectionInformation");
            const li = document.createElement("li");
            const img = document.createElement("img");
            img.src = `${item.cardimg}`;
            img.alt = `${item.title}`;
            img.classList.add('cartImgItem');
            const itemTitle = document.createElement("h2");
            itemTitle.classList.add("itemTitle");
            itemTitle.textContent = `${item.title}`;
            const price = document.createElement("p");
            price.classList.add("itemPrice");
            price.textContent = `${formatarPreco(item.price)}`;
            const br = document.createElement("br");
            const buttonGroup = document.createElement("div");
            buttonGroup.classList.add("buttonGroup");
            const a = document.createElement("a");
            a.classList.add("itemBtnLink");
            a.href = `${item.link}`;
            a.target = "_blank";
            a.textContent = `${item.btntext}`;
            const button = document.createElement("button");
            button.classList.add("itemBtnRemove");
            button.onclick = () => removeItem(index);
            const cartIcon = document.createElement('i');
            cartIcon.classList.add("fa-solid", "fa-cart-shopping");
            const text = document.createTextNode(" Remove");
            button.appendChild(cartIcon);
            button.appendChild(text);
            const hr = document.createElement("hr");

            sectionInformation.appendChild(itemTitle);
            sectionInformation.appendChild(price);
            sectionInformation.appendChild(br);
            buttonGroup.appendChild(a);
            buttonGroup.appendChild(button);
            sectionInformation.appendChild(buttonGroup);
            sectionImage.appendChild(img);
            div.appendChild(sectionImage);
            div.appendChild(sectionInformation);
            li.appendChild(div);
            li.appendChild(hr);
            list.appendChild(li);
        });

        const total = cart.reduce((sum, item) => {
            const price = parseFloat(item.price);
            return sum + (isFinite(price) ? price : 0);
        }, 0);

        if(totalPrice) totalPrice.textContent = `Total: ${formatarPreco(total)}`;
    }
}

function removeItem(index){
    let cart = JSON.parse(localStorage.getItem("cartItems") || "[]");
    cart.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

loadCart();