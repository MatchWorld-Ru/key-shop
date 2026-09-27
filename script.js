```javascript
document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("projectForm");

    const progressBar =
        document.getElementById("progressBar");

    const progressText =
        document.getElementById("progressText");

    const mobileButton =
        document.getElementById("mobileMenuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const cursorGlow =
        document.getElementById("cursorGlow");


    /* ================= CURSOR GLOW ================= */

    if (cursorGlow && window.innerWidth > 800) {

        document.addEventListener("mousemove", (event) => {

            cursorGlow.style.left =
                event.clientX + "px";

            cursorGlow.style.top =
                event.clientY + "px";

        });

    }


    /* ================= MOBILE MENU ================= */

    if (mobileButton) {

        mobileButton.addEventListener("click", () => {

            mobileMenu.classList.toggle("active");

        });

    }


    document
        .querySelectorAll(".mobile-menu a")
        .forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("active");

            });

        });


    /* ================= HEADER ================= */

    const header =
        document.querySelector(".header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {

            header.style.background =
                "rgba(7,7,8,.92)";

        } else {

            header.style.background =
                "rgba(7,7,8,.68)";

        }

    });


    /* ================= FORM PROGRESS ================= */

    function updateProgress() {

        const name =
            document
                .getElementById("name")
                .value
                .trim();

        const description =
            document
                .getElementById("description")
                .value
                .trim();

        const phone =
            document
                .getElementById("phone")
                .value
                .trim();

        const types =
            document.querySelectorAll(
                'input[name="type"]:checked'
            );

        const budget =
            document.querySelector(
                'input[name="budget"]:checked'
            );


        let completed = 0;


        if (name.length >= 2) {
            completed++;
        }


        if (types.length > 0) {
            completed++;
        }


        if (description.length >= 10) {
            completed++;
        }


        if (budget) {
            completed++;
        }


        if (phone.length >= 7) {
            completed++;
        }


        const percent =
            Math.round(
                (completed / 5) * 100
            );


        progressBar.style.width =
            percent + "%";


        progressText.textContent =
            percent + "%";

    }


    document
        .querySelectorAll(
            "#projectForm input, #projectForm textarea"
        )
        .forEach(element => {

            element.addEventListener(
                "input",
                updateProgress
            );

            element.addEventListener(
                "change",
                updateProgress
            );

        });


    /* ================= PHONE FORMAT ================= */

    const phoneInput =
        document.getElementById("phone");


    phoneInput.addEventListener("input", () => {

        let value =
            phoneInput.value.replace(
                /[^0-9+]/g,
                ""
            );


        if (
            value.length > 0 &&
            !value.startsWith("+")
        ) {

            if (value.startsWith("7")) {

                value = "+" + value;

            }

        }


        phoneInput.value = value;

    });


    /* ================= FORM SUBMIT ================= */

    form.addEventListener("submit", (event) => {

        event.preventDefault();


        const name =
            document
                .getElementById("name")
                .value
                .trim();


        const description =
            document
                .getElementById("description")
                .value
                .trim();


        const phone =
            document
                .getElementById("phone")
                .value
                .trim();


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


        /* CHECK PROJECT TYPE */

        if (selectedTypes.length === 0) {

            alert(
                "Выберите хотя бы один тип проекта."
            );

            return;

        }


        /* CHECK DESCRIPTION */

        if (description.length < 10) {

            alert(
                "Пожалуйста, немного подробнее расскажите о проекте."
            );

            return;

        }


        /* CHECK PHONE */

        if (phone.length < 7) {

            alert(
                "Введите корректный номер телефона."
            );

            return;

        }


        /* ================= MESSAGE ================= */

        const message =

`🚀 НОВАЯ ЗАЯВКА — WEBCRAFT

━━━━━━━━━━━━━━━━

👤 КЛИЕНТ
${name}

💻 ТИП ПРОЕКТА
${selectedTypes.join(", ")}

📝 ЗАДАЧА
${description}

💰 БЮДЖЕТ
${budget}

📞 ТЕЛЕФОН
${phone}

━━━━━━━━━━━━━━━━

🌐 Заявка отправлена с сайта WEBCRAFT.`;


        /* ================= WHATSAPP ================= */

        const whatsappNumber =
            "77002538020";


        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(message);


        const button =
            form.querySelector(".submit-button");


        button.innerHTML =
            "<span>Открываем WhatsApp...</span><b>↗</b>";


        setTimeout(() => {

            window.open(
                whatsappURL,
                "_blank"
            );


            button.innerHTML =
                "<span>Отправить заявку</span><b>↗</b>";

        }, 400);

    });


    /* ================= REVEAL ANIMATION ================= */

    const revealElements =
        document.querySelectorAll(
            ".service-card, .project, .process-row, .number-item"
        );


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                });

            },
            {
                threshold: 0.08
            }
        );


    revealElements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(20px)";

        element.style.transition =
            "opacity .6s ease, transform .6s ease";


        observer.observe(element);

    });


    /* ================= VISIBLE STATE ================= */

    const style =
        document.createElement("style");


    style.textContent = `

        .service-card.visible,
        .project.visible,
        .process-row.visible,
        .number-item.visible {

            opacity: 1 !important;

            transform: translateY(0) !important;

        }

    `;


    document.head.appendChild(style);


    /* ================= SMOOTH ANCHORS ================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener("click", event => {

                const targetId =
                    anchor.getAttribute("href");

                if (
                    targetId === "#" ||
                    !targetId
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            });

        });


    /* ================= INITIAL PROGRESS ================= */

    updateProgress();

});
```
