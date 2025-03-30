// JavaScript para filtro
const searchNameInput = document.getElementById('search-name');
const searchDateInput = document.getElementById('search-date');
const searchCategoryInput = document.getElementById('search-category');
const containers = document.querySelectorAll('.container');

function filterContainers() {
    const searchNameValue = searchNameInput.value.toLowerCase();
    const searchDateValue = searchDateInput.value.toLowerCase();
    const searchCategoryValue = searchCategoryInput.value.toLowerCase();

    containers.forEach(container => {
        const title = container.querySelector('h2').textContent.toLowerCase();
        const dateElement = container.querySelector('.photo-caption');
        const date = dateElement ? dateElement.textContent.toLowerCase() : "";
        const categories = container.getAttribute('data-categorias')?.toLowerCase() || "";

        const matchesName = title.includes(searchNameValue);
        const matchesDate = date.includes(searchDateValue);
        const matchesCategory = categories.includes(searchCategoryValue);

        container.style.display = (matchesName && matchesDate && matchesCategory) ? 'block' : 'none';
    });
}

// Adiciona event listeners para os campos de busca
searchNameInput.addEventListener('input', filterContainers);
searchDateInput.addEventListener('input', filterContainers);
searchCategoryInput.addEventListener('input', filterContainers);

// Botão de voltar ao topo
const backToTopButton = document.getElementById('back-to-top');
window.onscroll = function() {
    if (document.documentElement.scrollTop > 100) {
        backToTopButton.style.display = 'block';
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.style.display = 'none';
        backToTopButton.classList.remove('show');
    }
};
backToTopButton.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Contador de dias
const startDate = new Date("2025-03-23");
const today = new Date();
const diffTime = today - startDate;
const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

document.getElementById("days-counter").innerText = `Já se passaram ${diffDays} dias desde que estamos juntos!`;
