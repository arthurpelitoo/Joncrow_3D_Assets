async function carregarProduto() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const res = await fetch('/assets/dados/modelos.json');
    const dados = await res.json();
    const item = dados.find(prod => prod.id == id);

    const produto = document.getElementById('produto');

    if (item){
        produto.innerHTML = `
            <h1>${item.titulo.en}</h1>
            
        
        `
    }
}