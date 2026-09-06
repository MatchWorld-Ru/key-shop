"use strict";


/* =========================
   ELEMENTS
========================= */

const generateButton =
    document.getElementById("generateButton");

const promptInput =
    document.getElementById("prompt");

const statusElement =
    document.getElementById("status");

const creditsElement =
    document.getElementById("credits");

const navCredits =
    document.getElementById("navCredits");

const result =
    document.getElementById("result");

const video =
    document.getElementById("video");

const download =
    document.getElementById("download");

const loginButton =
    document.getElementById("loginButton");

const loginModal =
    document.getElementById("loginModal");

const closeLoginButton =
    document.getElementById("closeLogin");

const googleButton =
    document.getElementById("googleButton");

const emailLoginButton =
    document.getElementById("emailLoginButton");

const registerButton =
    document.getElementById("registerButton");

const logoutButton =
    document.getElementById("logoutButton");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const accountSection =
    document.getElementById("account");

const historyContainer =
    document.getElementById("history");


/* =========================
   PLANS
========================= */

const plans = {

    Free: {
        credits: 1,
        maxSeconds: 10,
        quality: "basic"
    },

    Basic: {
        credits: 10,
        maxSeconds: 30,
        quality: "hd"
    },

    Pro: {
        credits: 50,
        maxSeconds: 60,
        quality: "fullhd"
    },

    Ultra: {
        credits: 150,
        maxSeconds: 120,
        quality: "4k"
    }

};


const qualityRank = {

    basic: 1,

    hd: 2,

    fullhd: 3,

    "4k": 4

};


/* =========================
   STORAGE
========================= */

function loadUser() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "veoUser"
            )
        ) || null;

    } catch {

        return null;

    }

}


function loadHistory() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "veoHistory"
            )
        ) || [];

    } catch {

        return [];

    }

}


let user = loadUser();

let credits =
    Number(
        localStorage.getItem(
            "veoCredits"
        )
    );

if (
    !Number.isFinite(credits) ||
    credits < 0
) {
    credits = 1;
}


let history =
    loadHistory();


/* =========================
   SAVE
========================= */

function saveUser() {

    if (!user) {

        localStorage.removeItem(
            "veoUser"
        );

        return;
    }

    localStorage.setItem(
        "veoUser",
        JSON.stringify(user)
    );

}


function saveCredits() {

    localStorage.setItem(
        "veoCredits",
        String(credits)
    );

}


function saveHistory() {

    localStorage.setItem(
        "veoHistory",
        JSON.stringify(history)
    );

}


/* =========================
   UI
========================= */

function updateCredits() {

    creditsElement.textContent =
        credits;

    navCredits.textContent =
        `⚡ ${credits}`;


    const accountCredits =
        document.getElementById(
            "accountCredits"
        );

    if (accountCredits) {

        accountCredits.textContent =
            credits;

    }


    saveCredits();

}


function updateAccount() {

    if (!user) {

        accountSection.classList.add(
            "hidden"
        );

        loginButton.textContent =
            "Войти";

        return;

    }


    accountSection.classList.remove(
        "hidden"
    );


    document.getElementById(
        "userName"
    ).textContent =
        user.name;


    document.getElementById(
        "userEmail"
    ).textContent =
        user.email;


    document.getElementById(
        "accountPlan"
    ).textContent =
        user.plan || "Free";


    loginButton.textContent =
        "Мой аккаунт";


    updateCredits();

}


/* =========================
   MODAL
========================= */

function openLogin() {

    loginModal.classList.remove(
        "hidden"
    );

    setTimeout(() => {

        emailInput.focus();

    }, 50);

}


function closeLogin() {

    loginModal.classList.add(
        "hidden"
    );

}


loginButton.addEventListener(
    "click",
    () => {

        if (!user) {

            openLogin();

            return;

        }


        accountSection.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }
);


closeLoginButton.addEventListener(
    "click",
    closeLogin
);


loginModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            loginModal
        ) {

            closeLogin();

        }

    }
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            !loginModal.classList.contains(
                "hidden"
            )
        ) {

            closeLogin();

        }

    }
);


/* =========================
   GOOGLE DEMO
========================= */

googleButton.addEventListener(
    "click",
    () => {

        user = {

            name: "Google User",

            email:
                "google@example.com",

            plan: "Free"

        };


        credits = 1;


        saveUser();

        saveCredits();

        updateAccount();

        closeLogin();


        showStatus(
            "✓ Вы вошли через Google."
        );

    }
);


/* =========================
   EMAIL LOGIN
========================= */

function loginWithEmail() {

    const email =
        emailInput.value.trim();

    const password =
        passwordInput.value.trim();


    if (!email) {

        showStatus(
            "⚠️ Введите email.",
            true
        );

        emailInput.focus();

        return;

    }


    if (
        !email.includes("@") ||
        !email.includes(".")
    ) {

        showStatus(
            "⚠️ Введите корректный email.",
            true
        );

        emailInput.focus();

        return;

    }


    if (password.length < 4) {

        showStatus(
            "⚠️ Пароль должен содержать минимум 4 символа.",
            true
        );

        passwordInput.focus();

        return;

    }


    const existingUser =
        loadUser();


    if (
        existingUser &&
        existingUser.email === email
    ) {

        user = existingUser;

    } else {

        user = {

            name:
                email
                    .split("@")[0],

            email: email,

            plan: "Free"

        };


        credits = 1;

        saveCredits();

    }


    saveUser();

    updateAccount();

    closeLogin();


    showStatus(
        "✓ Вход выполнен."
    );

}


emailLoginButton.addEventListener(
    "click",
    loginWithEmail
);


passwordInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
        ) {

            loginWithEmail();

        }

    }
);


/* =========================
   REGISTER
========================= */

registerButton.addEventListener(
    "click",
    () => {

        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value.trim();


        if (!email || !password) {

            showStatus(
                "⚠️ Заполните email и пароль.",
                true
            );

            return;

        }


        if (!email.includes("@")) {

            showStatus(
                "⚠️ Введите корректный email.",
                true
            );

            return;

        }


        if (password.length < 4) {

            showStatus(
                "⚠️ Пароль должен содержать минимум 4 символа.",
                true
            );

            return;

        }


        user = {

            name:
                email
                    .split("@")[0],

            email: email,

            plan: "Free"

        };


        credits = 1;


        saveUser();

        saveCredits();

        updateAccount();

        closeLogin();


        showStatus(
            "✓ Аккаунт создан."
        );

    }
);


/* =========================
   LOGOUT
========================= */

logoutButton.addEventListener(
    "click",
    () => {

        user = null;

        localStorage.removeItem(
            "veoUser"
        );

        updateAccount();


        showStatus(
            "Вы вышли из аккаунта."
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================
   PLANS
========================= */

document
    .querySelectorAll(
        "[data-plan-button]"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const plan =
                    button.dataset.planButton;

                selectPlan(plan);

            }
        );

    });


function selectPlan(plan) {

    if (!plans[plan]) {
        return;
    }


    if (!user) {

        openLogin();

        showStatus(
            "⚠️ Сначала войдите в аккаунт."
        );

        return;

    }


    if (plan === "Free") {

        user.plan = "Free";

        credits =
            plans.Free.credits;

        saveUser();

        saveCredits();

        updateAccount();

        updateSelectedPlan();

        showStatus(
            "✓ Бесплатный тариф активирован."
        );

        return;

    }


    /*
        Пока оплата демонстрационная.
        После подключения backend
        здесь будет платёжная система.
    */

    const confirmed =
        window.confirm(
            `Вы выбираете тариф ${plan}.\n\nСейчас это демо-режим. Активировать тариф?`
        );


    if (!confirmed) {
        return;
    }


    user.plan = plan;

    credits =
        plans[plan].credits;


    saveUser();

    saveCredits();

    updateAccount();

    updateSelectedPlan();


    showStatus(
        `✓ Тариф ${plan} активирован в демо-режиме.`
    );

}


function updateSelectedPlan() {

    document
        .querySelectorAll(
            ".price-card"
        )
        .forEach(card => {

            card.classList.remove(
                "selected"
            );


            if (
                user &&
                card.dataset.plan ===
                user.plan
            ) {

                card.classList.add(
                    "selected"
                );

            }

        });


    document
        .querySelectorAll(
            "[data-plan-button]"
        )
        .forEach(button => {

            const plan =
                button.dataset.planButton;


            if (
                user &&
                plan === user.plan
            ) {

                button.textContent =
                    "✓ Активен";

            } else {

                button.textContent =
                    plan === "Free"
                        ? "Выбрать"
                        : `Выбрать ${plan}`;

            }

        });

}


/* =========================
   GENERATOR
========================= */

generateButton.addEventListener(
    "click",
    generateVideo
);


async function generateVideo() {

    const prompt =
        promptInput.value.trim();


    const ratio =
        document.getElementById(
            "ratio"
        ).value;


    const quality =
        document.getElementById(
            "quality"
        ).value;


    const duration =
        Number(
            document.getElementById(
                "duration"
            ).value
        );


    if (!prompt) {

        showStatus(
            "⚠️ Напишите описание видео.",
            true
        );

        promptInput.focus();

        return;

    }


    if (!user) {

        showStatus(
            "⚠️ Войдите в аккаунт."
        );

        openLogin();

        return;

    }


    if (credits <= 0) {

        showStatus(
            "❌ У вас закончились кредиты.",
            true
        );

        return;

    }


    const currentPlan =
        plans[user.plan || "Free"];


    if (
        duration >
        currentPlan.maxSeconds
    ) {

        showStatus(
            `❌ Тариф ${user.plan} позволяет видео максимум ${currentPlan.maxSeconds} секунд.`,
            true
        );

        return;

    }


    if (
        qualityRank[quality] >
        qualityRank[currentPlan.quality]
    ) {

        showStatus(
            `❌ Качество ${quality.toUpperCase()} недоступно на тарифе ${user.plan}.`,
            true
        );

        return;

    }


    generateButton.disabled =
        true;

    generateButton.textContent =
        "⏳ Генерируем...";


    showStatus(
        "AI создаёт ваше видео..."
    );


    result.classList.add(
        "hidden"
    );


    /*
        ЗДЕСЬ ПОЗЖЕ БУДЕТ REAL API:

        fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json"
            },
            body: JSON.stringify({
                prompt,
                ratio,
                quality,
                duration
            })
        });

        API KEY НЕЛЬЗЯ хранить
        в этом JS-файле.
    */


    await wait(3000);


    credits--;

    saveCredits();

    updateCredits();


    const item = {

        prompt: prompt,

        ratio: ratio,

        quality: quality,

        duration: duration,

        date:
            new Date()
                .toLocaleString(
                    "ru-RU"
                )

    };


    history.unshift(item);


    if (history.length > 20) {

        history =
            history.slice(0, 20);

    }


    saveHistory();

    renderHistory();


    showStatus(
        "✓ Генерация завершена в демо-режиме. Подключи AI API для получения настоящего видео."
    );


    generateButton.disabled =
        false;

    generateButton.textContent =
        "✦ Сгенерировать видео";

}


/* =========================
   HISTORY
========================= */

function renderHistory() {

    if (!history.length) {

        historyContainer.innerHTML = `
            <div class="empty-history">
                Здесь появятся созданные вами видео.
            </div>
        `;

        return;

    }


    historyContainer.innerHTML =
        history
            .map(item => {

                return `
                    <div class="history-item">

                        <b>
                            ${escapeHtml(
                                item.prompt
                            )}
                        </b>

                        <small>
                            ${escapeHtml(
                                item.date
                            )}
                            •
                            ${escapeHtml(
                                item.ratio
                            )}
                            •
                            ${item.duration}
                            сек.
                            •
                            ${escapeHtml(
                                item.quality
                            )}
                        </small>

                    </div>
                `;

            })
            .join("");

}


/* =========================
   STATUS
========================= */

function showStatus(
    message,
    error = false
) {

    statusElement.textContent =
        message;

    statusElement.style.color =
        error
            ? "#d87861"
            : "#b8b4aa";

}


/* =========================
   HELPERS
========================= */

function wait(ms) {

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                ms
            )
    );

}


function escapeHtml(value) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        String(value);

    return div.innerHTML;

}


/* =========================
   INITIALIZATION
========================= */

updateCredits();

updateAccount();

updateSelectedPlan();

renderHistory();
