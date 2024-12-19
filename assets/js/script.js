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
        const date = container.querySelector('.photo-caption').textContent.toLowerCase();
        const categories = container.getAttribute('data-categorias').toLowerCase();

        const matchesName = title.includes(searchNameValue);
        const matchesDate = date.includes(searchDateValue);
        const matchesCategory = categories.includes(searchCategoryValue);

        if (matchesName && matchesDate && matchesCategory) {
            container.style.display = 'block'; // Exibe a foto
        } else {
            container.style.display = 'none'; // Oculta a foto
        }
    });
}

// Adiciona event listeners para os campos de busca
searchNameInput.addEventListener('input', filterContainers);
searchDateInput.addEventListener('input', filterContainers);
searchCategoryInput.addEventListener('input', filterContainers);

// Seleciona o botão de voltar ao topo
const backToTopButton = document.getElementById('back-to-top');

// Exibe o botão quando o usuário rolar para baixo
window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopButton.style.display = 'block'; // Exibe o botão
    } else {
        backToTopButton.style.display = 'none'; // Oculta o botão
    }
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
};

// Função para rolar até o topo da página quando o botão for clicado
backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Rolar suavemente até o topo
    });
});

// Função para calcular o número de dias desde o início
const startDate = new Date("2023-06-01"); // Substitua pela data de início
const today = new Date();
const diffTime = today - startDate;
const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

// Exibe o número de dias no elemento HTML
document.getElementById("days-counter").innerText = `Já se passaram ${diffDays} dias desde o nosso primeiro dia juntos!`;
