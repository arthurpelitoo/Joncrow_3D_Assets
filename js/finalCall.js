
// a ideia aqui é fazer um sistema de troca de mensagens para caso a pessoa passe o mouse no botão
// além disso ter tambem mensagens automaticas passando mesmo quando a pessoa não passe o mouse.


// Lista de mensagens que vão aparecer automaticamente
const mensagens = [
    "Give your project a creative boost!",
    "Perfect models for your game!",
    "Use amazing characters in your video!",
    "Your ideas don't deserve to stay only on paper!",
    "Bring the next idea that appears on someone's screen"
];

// indice para controlar qual mensagem está sendo exibida
let index = 0;

// variavel para guardar o identificador do intervalo
let intervalo;

// para definir se o texto automatico está pausado ou não
let pausado = false;

// para identificar a tag <p> que será alterada.
let elementoMensagem = document.getElementById("mensagens");

let btnAllModels = document.getElementById("btn1");
let btnFAQ = document.getElementById("btn2");


// Função para iniciar a troca de mensagens automatica;
function iniciarTroca(){

    // Define que a cada 3 segundos a mensagem mudará. (setInterval é uma função interna do javascript.)
    intervalo = setInterval(() => {

        //só entra se tiver pausado = false
        if(!pausado){
            elementoMensagem.style.opacity = '0';
            
            setTimeout(() => {

                // avança para a próxima mensagem do array
                index = (index + 1) % mensagens.length;
                // atualiza o conteúdo do parágrafo
                elementoMensagem.textContent = mensagens[index];
                elementoMensagem.style.opacity = '1';
            }, 500); // quantos milisegundos demora.
        }
    }, 3000); // quantos milisegundos demora.
}

//Função que muda a mensagem para a descrição do botão quando o usuario passa o mouse em cima.
function mudarDescricao(texto) {
    //fala para pausar a troca automatica.
    pausado = true;

    elementoMensagem.style.opacity = '0';

    setTimeout(() => {
        //atualiza a mensagem
        elementoMensagem.textContent = texto;
        elementoMensagem.style.opacity = '1';
    }, 500);
}

function voltarAutomatico() {
    //Despausa a troca automática.
    pausado = false;

    elementoMensagem.style.opacity = '0';
    
    setTimeout(() => {
        elementoMensagem.textContent = mensagens[index];
        elementoMensagem.style.opacity = '1';
    }, 500);
}


// Inicia a troca automáticamente quando a página carregar.
iniciarTroca();

btnAllModels.addEventListener('mouseover', () => mudarDescricao('See now more of 50 3D models'));
btnAllModels.addEventListener('mouseout', voltarAutomatico);

btnFAQ.addEventListener('mouseover', () => mudarDescricao('Find answers to common questions!'));
btnFAQ.addEventListener('mouseout', voltarAutomatico);