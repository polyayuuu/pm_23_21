document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. АКОРДЕОН (Стрілочки)
    // ==========================================
    const toggleHeaders = document.querySelectorAll('.toggle-header');
    toggleHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.toggle-icon');

            if (content && icon) {
                content.classList.toggle('collapsed');
                icon.classList.toggle('rotated');
            }
        });
    });

    // ==========================================
    // 2. AJAX ЗАПИТ ДО JSON (ЛР №5)
    // ==========================================
    fetch('data.json')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP помилка: ${response.status}`);
            return response.json();
        })
        .then(data => {
            // Підстановка імені
            const nameElement = document.getElementById('personName');
            if (nameElement) {
                nameElement.textContent = `${data.firstName} ${data.lastName}`;
            }

            // Генерація карток досвіду
            const experienceContainer = document.getElementById('experienceContent');
            if (experienceContainer) {
                experienceContainer.innerHTML = ''; 
                let htmlString = '';

                data.jobs.forEach(item => {
                    htmlString += `
                        <div class="row mb-4">
                            <div class="col-sm-3">
                                <span class="badge bg-teal text-white px-3 py-2 rounded-0">${item.years}</span>
                            </div>
                            <div class="col-sm-9 mt-3 mt-sm-0">
                                <h5 class="fw-bold mb-0 text-uppercase">${item.title}</h5>
                                <p class="text-dark fst-italic mb-1">${item.company} <span class="float-end text-teal fst-normal">${item.location}</span></p>
                                <p class="text-muted small">${item.description}</p>
                            </div>
                        </div>
                    `;
                });
                experienceContainer.innerHTML = htmlString;
            }
        })
        .catch(error => {
            console.error('Помилка:', error);
            const experienceContainer = document.getElementById('experienceContent');
            if (experienceContainer) {
                experienceContainer.innerHTML = `<div class="alert alert-danger">Не вдалося завантажити дані.</div>`;
            }
        });
});