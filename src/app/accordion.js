// Функція для ініціалізації акордеону (згортання/розгортання блоків)
export function initAccordion() {
    const toggleHeaders = document.querySelectorAll('.toggle-header');

    toggleHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Знаходимо контент, який йде відразу після заголовка
            const content = header.nextElementSibling;
            // Знаходимо стрілочку всередині заголовка
            const icon = header.querySelector('.toggle-icon');

            if (content && icon) {
                // Перемикаємо класи для анімації та приховування
                content.classList.toggle('collapsed');
                icon.classList.toggle('rotated');
            }
        });
    });
}