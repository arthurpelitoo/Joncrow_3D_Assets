
const targetTime = new Date("2025-05-31T00:00:00").getTime(); //Tempo limite

//id dos elementos no html que serão alterados:
const timerElement = document.getElementById("timer"); 
const section_badge = document.getElementById("section_badge");
const banner_collapse = document.getElementById("banner_collapse");
const section_title = document.getElementById("section_title");

const svgIcon = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M2 9.453v-9.453h9.352l10.648 10.625-3.794 3.794 1.849 4.733-12.34 4.848-5.715-14.547zm1.761 1.748l4.519 11.503 10.48-4.118-1.326-3.395-4.809 4.809-8.864-8.799zm-.761-10.201v8.036l9.622 9.552 7.963-7.962-9.647-9.626h-7.938zm12.25 8.293c-.415-.415-.865-.617-1.378-.617-.578 0-1.227.241-2.171.803-.682.411-1.118.585-1.456.585-.361 0-1.083-.409-.961-1.219.052-.345.25-.696.572-1.019.652-.652 1.544-.848 2.276-.107l.744-.744c-.476-.475-1.096-.792-1.761-.792-.566 0-1.125.228-1.663.677l-.626-.626-.698.699.653.652c-.569.826-.842 2.021.076 2.937 1.011 1.011 2.188.541 3.413-.232.6-.379 1.083-.563 1.475-.563.589.001 1.18.498 1.078 1.258-.052.386-.26.764-.621 1.122-.451.451-.904.679-1.347.679-.418 0-.747-.192-1.049-.462l-.739.739c.463.458 1.082.753 1.735.753.544 0 1.087-.201 1.612-.597l.54.538.697-.697-.52-.521c.743-.896 1.157-2.209.119-3.247zm-9.25-7.292c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0 1c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z"/></svg>`;
const promoBannerText = `Special Offer! Get the all-in-one bundle: 54 models at 50% off`
const promoBadgeText = `Special Offer`;

    banner_collapse.innerHTML = `${svgIcon} ${promoBannerText}`;

    section_badge.innerHTML = `${svgIcon} ${promoBadgeText}`; 

function updateTimer(){

    const now = new Date().getTime();
    const distance = targetTime - now;

    if(distance <= 0){
        banner_collapse.innerText = "Get the all-in-one bundle: 54 models";
        timerElement.classList.remove("active");
        section_badge.style.display = "none";
        section_title.innerText = "Bundle of 54 3D Model characters for $54 USD";
        clearInterval(interval);
        return;
    }
    
    const dias = Math.floor(distance / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distance / (1000 * 60 * 60) % 24));
    const minutos = Math.floor((distance / (1000 * 60) % 60));
    const segundos = Math.floor((distance / 1000) % 60);

    timerElement.innerText = `⏳ Offer ends in ${dias}d ${horas}h ${minutos}m ${segundos}s`;

}

const interval = setInterval(updateTimer, 1000);
updateTimer();