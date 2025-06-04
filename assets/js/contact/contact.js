
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
        const currentInputs = steps[currentStep].querySelectorAll('input, select, textarea');
        for(let input of currentInputs){
            if(!input.value.trim()){
                title = "Error!";
                message = "Please fill out the field.";
                openModal();
                return;
            }
            if(input.name === 'email' && !validarEmail(input.value.trim())){
                title = "Error!";
                message = "The informed email it's not valid";
                openModal();
                return;
            }
        }
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

    if(referencia == "" || nome == "" || email == "" || assunto == "" || urgencia == "" || mensagem == ""){
        title = "Error!";
        message = "All fields must be completed.";

        openModal();
        event.preventDefault();
        return;
    } if(!validarEmail(email)){
        title = "Error!";
        message = "The informed email it's not valid";
        
        openModal();
        event.preventDefault();
        return;
    }
    
    title = "Success!";
    message = "The form has been successfully submitted to my Email!"
    openModal();
};

form.addEventListener("submit", formContatoPreenchido);

function openModal(){

    let modal, modalContainerTitle, modalTitle, modalContainerMessage, modalMessage, modalButton, button;

    modal = document.createElement('div');
    modal.classList.add('modal');

    modalContainerTitle = document.createElement('div');
    modalContainerTitle.classList.add('modalContainerTitle');
    modalTitle = document.createElement('h3');
    modalTitle.classList.add('modalTitle');
    modalTitle.textContent = `${title}`;

    modalContainerMessage = document.createElement('div');
    modalContainerMessage.classList.add('modalContainerMessage');
    modalMessage = document.createElement('p');
    modalMessage.classList.add('modalMessage');
    modalMessage.textContent = `${message}`;

    modalButton = document.createElement('div');
    modalButton.classList.add('modalButton');
    button = document.createElement('button');
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
    document.getElementById("modal-container").style.display = "none";
    document.getElementById("modal-overlay").style.display = "none";
    document.getElementById("modal-container").style.opacity = "0";
    document.getElementById("modal-overlay").style.opacity = "0";
}