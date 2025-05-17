
// pensa no problema
//quero que ao usuario clicar no botao que tem o header-menu acabe revelando a
//aba de navegação, que somente está desabilitada.

// input usuario clicar no botao
// processamento colocar display: block no header-nav
// output aba de navegação revelada

const button = document.getElementById("header-menu");
const navegacao = document.getElementById("header-nav");

function toggleEvent(){

    if (navegacao.classList.contains("active")){
        navegacao.classList.remove("active");
    } else{
        navegacao.classList.add("active");
    }
}

button.addEventListener("click", toggleEvent);