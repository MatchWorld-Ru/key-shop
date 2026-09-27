document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("projectForm");

    const progressBar = document.getElementById("progressBar");

    const progressText = document.getElementById("progressText");

    const mobileButton =
        document.getElementById("mobileMenuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");


    /* ================= MOBILE MENU ================= */

    mobileButton.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

    });


    document.querySelectorAll(".mobile-menu a").forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

        });

    });


    /* ================= FORM PROGRESS ================= */

    function updateProgress() {

        const name =
            document.getElementById("name").value.trim();

        const description =
            document.getElementById("description").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const types =
            document.querySelectorAll(
                'input[name="type"]:checked'
            ).length;

        const budget =
            document.querySelector(
                'input[name="budget"]:checked'
            );

        let completed = 0;

        if (name.length > 0) completed++;

        if (types > 0) completed++;

        if (description.length > 10) completed++;

        if (budget) completed++;

        if (phone.length > 5) completed++;

        const percent =
            Math.round((completed / 5) * 100);

        progressBar.style.width = percent + "%";

        progressText.textContent =
            percent + "% заполнено";
    }


    document.querySelectorAll(
        "#projectForm input, #projectForm textarea"
    ).forEach(element => {

        element.addEventListener(
            "input",
            updateProgress
        );

        element.addEventListener(
            "change",
            updateProgress
        );

    });


    /* ================= WHATSAPP ================= */

    form.addEventListener("submit", (event) => {

        event.preventDefault();


        const name =
            document.getElementById("name").value.trim();

        const description =
            document.getElementById("description").value.trim();

        const phone =
            document.getElementById("phone").value.trim();


        const selectedTypes =
            Array.from(
                document.querySelectorAll(
                    'input[name="type"]:checked'
                )
            ).map(
                checkbox => checkbox.value
            );


        const budgetElement =
            document.querySelector(
                'input[name="budget"]:checked'
            );


        const budget =
            budgetElement
                ? budgetElement.value
                : "Не указан";


        if (selectedTypes.length === 0) {

            alert(
                "Пожалуйста, выберите тип проекта."
            );

            return;

        }


        const message =

`🚀 НОВАЯ ЗАЯВКА НА САЙТ

👤 Имя:
${name}

💻 Что нужно создать:
${selectedTypes.join(", ")}

📝 Описание проекта:
${description}

💰 Примерный бюджет:
${budget}

📞 Телефон клиента:
${phone}

━━━━━━━━━━━━━━━━

Заявка отправлена с сайта WEBCRAFT.`;


        const whatsappNumber =
            "77002538020";


        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(message);


        window.open(
            whatsappURL,
            "_blank"
        );

    });


    /* ================= HEADER SCROLL ================= */

    const header =
        document.querySelector(".header");


    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.style.background =
                "rgba(7, 7, 9, 0.94)";

        } else {

            header.style.background =
                "rgba(7, 7, 9, 0.75)";

        }

    });


});
