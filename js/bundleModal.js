const openModal = document.getElementById('openModal');
const closeModal = document.getElementById('closeModal');
const bundleModal = document.getElementById('bundleModal');

openModal.addEventListener('click', () => {
    bundleModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    bundleModal.style.display = 'none';
});

// Fecha o modal se clicar fora dele
window.addEventListener('click', (e) => {
    if (e.target == bundleModal) {
        bundleModal.style.display = 'none';
    }
});