document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // ЗАВДАННЯ 1: Підстановка імені (textContent)
    // ==========================================
    const nameElement = document.getElementById('personName');
    if (nameElement) {
        nameElement.textContent = "Kevin C. Silva";
    }

    // ==========================================
    // ЗАВДАННЯ 2: Стрілочки та згортання контенту
    // ==========================================
    const toggleHeaders = document.querySelectorAll('.toggle-header');

    toggleHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Знаходимо контент, який йде відразу після заголовка
            const content = header.nextElementSibling;
            // Знаходимо стрілочку всередині заголовка
            const icon = header.querySelector('.toggle-icon');

            if (content && icon) {
                // Перемикаємо класи
                content.classList.toggle('collapsed');
                icon.classList.toggle('rotated');
            }
        });
    });

    // ==========================================
    // ЗАВДАННЯ 3: Генерація розмітки з масиву
    // ==========================================
    const experienceData = [
        {
            years: "2020 - Present",
            title: "Senior Web Designer",
            company: "Creative Agency",
            location: "Chicago",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
            years: "2015 - 2020",
            title: "Graphic Designer",
            company: "Creative Market",
            location: "United Kingdom",
            description: "Lorem Ipsum has been the industry's standard dummy text."
        },
        {
            years: "2013 - 2015",
            title: "Marketing Manager",
            company: "Marketing Agency",
            location: "United Kingdom",
            description: "Lorem Ipsum has been the industry's standard dummy text."
        }
    ];

    const experienceContainer = document.getElementById('experienceContent');
    
    if (experienceContainer) {
        // Очищаємо контейнер перед вставкою
        experienceContainer.innerHTML = '';
        
        let htmlString = '';

        // Генеруємо HTML для кожного запису
        experienceData.forEach(item => {
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

        // Вставляємо згенерований HTML
        experienceContainer.innerHTML = htmlString;
    }
});