function updateCartCount() {
    const count = JSON.parse(localStorage.getItem("cartItems") || "[]").length;
    const counter = document.getElementById("cart-count");
    if (counter) counter.textContent = `${count}`;
}
updateCartCount();