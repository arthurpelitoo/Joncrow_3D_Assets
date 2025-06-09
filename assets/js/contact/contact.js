
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email); // verifica se é true ou false. Se for true ele entrega o true e contrario tambem.
}

closeModal();

const form = document.getElementById("formId");
const steps = form.querySelectorAll(".step");
const progress = document.querySelector('.progress');
let currentStep = 0;

function updateStep(currentStep){
    steps.forEach((step, index) => {
        step.classList.toggle('active', index === currentStep);
    });
    updateProgressBar();
}

function updateProgressBar(){
    const percent = ((currentStep + 1) / steps.length) * 100;
    progress.style.width = percent + "%";
}

form.querySelectorAll('.next').forEach(btn => {
    btn.addEventListener('click', () => {
        if(currentStep < steps.length - 1){
            currentStep++;
            updateStep(currentStep);
        }
    });
});

form.querySelectorAll('.prev').forEach(btn => {
    btn.addEventListener('click', () =>{
        if(currentStep > 0){
            currentStep--;
            updateStep(currentStep);
        }
    });
});


function formContatoPreenchido(event) {

    const referencia = form.referencia.value.trim();
    const nome = form.nome.value.trim(); //o value.trim() apaga os espaços vazios antes e depois da linha.
    const email = form.email.value.trim();
    const assunto = form.assunto.value.trim();
    const urgencia = form.urgencia.value.trim();
    const mensagem = form.mensagem.value.trim();

    switch (true) {
        case (referencia === "" && nome === "" && email === "" && assunto === "" && urgencia === "" && mensagem === ""):
            title = "Error!";
            message = "All fields must be completed.";
            break;

        case(referencia === ""):
            title = "Error!";
            message = "Please select how you found this website.";
            break;

        case (nome === ""):
            title = "Error!";
            message = "Please enter your name.";
            break;

        case (email === ""):
            title = "Error!";
            message = "Please enter your email.";
            break;

        case (!validarEmail(email)):
            title = "Error!";
            message = "The informed email is not valid.";
            break;

        case (assunto === ""):
            title = "Error!";
            message = "Please provide a subject.";
            break;

        case (urgencia === ""):
            title = "Error!";
            message = "Please indicate the urgency.";
            break;

        case (mensagem === ""):
            title = "Error!";
            message = "Please provide a message.";
            break;

        default:
            // Sucesso
            title = "Success!";
            message = "The form has been successfully submitted!";
            openModal();

            // ✅ (Opcional) Desabilita o botão de envio por alguns segundos
            const sendBtn = form.querySelector('[type="submit"]');
            if (sendBtn) {
                sendBtn.disabled = true;
                setTimeout(() => {
                    sendBtn.disabled = false;
                    // ✅ Limpa os campos do formulário
                    form.reset();
                    // ✅ Zera a barra de progresso se tiver (exemplo)
                    const progress = document.querySelector('.progress');
                    if(progress) progress.style.width = '0%';
                    currentStep = 0;
                    updateStep(currentStep);
                }, 3000); // habilita novamente após 3 segundos
            }

            return; // Permite o envio
    }

    openModal();
    event.preventDefault(); // Impede o envio se caiu em algum `case`
};

form.addEventListener("submit", formContatoPreenchido);

function openModal(){

    // let modal, modalContainerTitle, modalTitle, modalContainerMessage, modalMessage, modalButton, button;

    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContainerTitle = document.createElement('div');
    modalContainerTitle.classList.add('modalContainerTitle');
    const modalTitle = document.createElement('h3');
    modalTitle.classList.add('modalTitle');
    modalTitle.textContent = `${title}`;

    const modalContainerMessage = document.createElement('div');
    modalContainerMessage.classList.add('modalContainerMessage');
    const modalMessage = document.createElement('p');
    modalMessage.classList.add('modalMessage');
    modalMessage.textContent = `${message}`;

    const modalButton = document.createElement('div');
    modalButton.classList.add('modalButton');
    const button = document.createElement('button');
    button.onclick = closeModal;
    button.textContent = "Ok!"

    document.getElementById("modal-container").appendChild(modal);

    modal.appendChild(modalContainerTitle);
    modal.appendChild(modalContainerMessage);
    modal.appendChild(modalButton);

    modalContainerTitle.appendChild(modalTitle);

    modalContainerMessage.appendChild(modalMessage);
    
    modalButton.appendChild(button);

    document.getElementById("modal-container").style.display = "flex";
    document.getElementById("modal-overlay").style.display = "flex";
    document.getElementById("modal-container").style.opacity = "1";
    document.getElementById("modal-overlay").style.opacity = "1";

}

function closeModal(){
    const modalContainer = document.getElementById("modal-container");
    const modalOverlay = document.getElementById("modal-overlay");

    // Esconde o modal
    modalContainer.style.display = "none";
    modalOverlay.style.display = "none";
    modalContainer.style.opacity = "0";
    modalOverlay.style.opacity = "0";

    // 🧹 Remove o modal inserido dinamicamente
    const modal = modalContainer.querySelector(".modal");
    if (modal) {
        modal.remove(); // ou modalContainer.removeChild(modal);
    }
}