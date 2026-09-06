/* =========================
   ELEMENTS
========================= */

const generateButton =
    document.getElementById("generateButton");

const promptInput =
    document.getElementById("prompt");

const status =
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

const accountSection =
    document.getElementById("account");

const historyContainer =
    document.getElementById("history");


/* =========================
   USER DATA
========================= */

let user =
    JSON.parse(
        localStorage.getItem("veoUser")
    ) || null;


let credits =
    Number(
        localStorage.getItem("veoCredits")
    );

if (Number.isNaN(credits)) {
    credits = 1;
}


let history =
    JSON.parse(
        localStorage.getItem("veoHistory")
    ) || [];


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


/* =========================
   CREDITS
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


    localStorage.setItem(
        "veoCredits",
        credits
    );
}


/* =========================
   ACCOUNT
========================= */

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
        user.name;


    updateCredits();
}


/* =========================
   LOGIN BUTTON
========================= */

loginButton.addEventListener(
    "click",
    () => {

        if (user) {

            accountSection.scrollIntoView({
                behavior: "smooth"
            });

        } else {

            loginModal.classList.remove(
                "hidden"
            );

        }

    }
);


/* =========================
   CLOSE LOGIN
========================= */

function closeLogin() {

    loginModal.classList.add(
        "hidden"
    );

}


/* =========================
   GOOGLE LOGIN
========================= */

function loginGoogle() {

    /*
        ДЕМО-ВХОД.

        Настоящий Google OAuth
        подключается через backend.
    */

    user = {
        name: "Demo User",
        email: "demo@example.com",
        plan: "Free"
    };


    localStorage.setItem(
        "veoUser",
        JSON.stringify(user)
    );


    closeLogin();

    updateAccount();


    alert(
        "Демо-вход выполнен."
    );
}


/* =========================
   EMAIL LOGIN
========================= */

function loginEmail() {

    const email =
        document.getElementById(
            "email"
        ).value.trim();


    const password =
        document.getElementById(
            "password"
        ).value.trim();


    if (!email || !password) {

        alert(
            "Введите email и пароль."
        );

        return;
    }


    if (!email.includes("@")) {

        alert(
            "Введите корректный email."
        );

        return;
    }


    user = {

        name:
            email.split("@")[0],

        email:
            email,

        plan:
            "Free"

    };


    localStorage.setItem(
        "veoUser",
        JSON.stringify(user)
    );


    closeLogin();

    updateAccount();

}


/* =========================
   REGISTER
========================= */

function registerEmail() {

    const email =
        document.getElementById(
            "email"
        ).value.trim();


    const password =
        document.getElementById(
            "password"
        ).value.trim();


    if (!email || !password) {

        alert(
            "Введите email и пароль для регистрации."
        );

        return;
    }


    loginEmail();

}


/* =========================
   LOGOUT
========================= */

function logout() {

    user = null;


    localStorage.removeItem(
        "veoUser"
    );


    updateAccount();


    alert(
        "Вы вышли из аккаунта."
    );

}


/* =========================
   PLAN SELECTION
========================= */

function selectPlan(plan) {

    if (!user) {

        loginModal.classList.remove(
            "hidden"
        );

        alert(
            "Сначала войдите в аккаунт."
        );

        return;
    }


    if (!plans[plan]) {
        return;
    }


    if (plan === "Free") {

        alert(
            "У вас уже выбран бесплатный тариф."
        );

        return;
    }


    const confirmPayment =
        confirm(
            `Вы выбрали тариф ${plan}.\n\nОплату подключим следующим этапом.`
        );


    if (!confirmPayment) {
        return;
    }


    /*
        Здесь позже можно сделать:

        POST /api/payment

        После успешной оплаты:

        user.plan = plan
        credits = plans[plan].credits
    */

    alert(
        `Тариф ${plan} выбран.`
    );

}


/* =========================
   GENERATION
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


    /* PROMPT */

    if (!prompt) {

        status.textContent =
            "⚠️ Напиши описание видео.";

        promptInput.focus();

        return;
    }


    /* LOGIN */

    if (!user) {

        status.textContent =
            "⚠️ Войдите в аккаунт.";

        loginModal.classList.remove(
            "hidden"
        );

        return;
    }


    /* CREDITS */

    if (credits <= 0) {

        status.textContent =
            "❌ У вас закончились генерации.";

        return;
    }


    /* PLAN LIMIT */

    const currentPlan =
        plans[user.plan || "Free"];


    if (
        duration >
        currentPlan.maxSeconds
    ) {

        status.textContent =
            `❌ Тариф ${user.plan || "Free"} позволяет создавать видео максимум ${currentPlan.maxSeconds} секунд.`;

        return;
    }


    /* QUALITY LIMIT */

    const qualityRank = {
        basic: 1,
        hd: 2,
        fullhd: 3,
        "4k": 4
    };


    if (
        qualityRank[quality] >
        qualityRank[currentPlan.quality]
    ) {

        status.textContent =
            `❌ Качество ${quality.toUpperCase()} недоступно на тарифе ${user.plan || "Free"}.`;

        return;
    }


    /* START */

    generateButton.disabled =
        true;

    generateButton.textContent =
        "⏳ Генерируем...";


    status.textContent =
        "AI создаёт ваше видео...";


    result.classList.add(
        "hidden"
    );


    /*
        ДЕМО.

        Здесь позже будет:

        POST /api/generate

        Например:

        const response = await fetch(
            "/api/generate",
            {
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
            }
        );

        const data =
            await response.json();

        video.src =
            data.videoUrl;
    */


    await new Promise(
        resolve =>
            setTimeout(
                resolve,
                3000
            )
    );


    /* REMOVE CREDIT */

    credits--;

    updateCredits();


    /* SAVE HISTORY */

    const historyItem = {

        prompt: prompt,

        ratio: ratio,

        quality: quality,

        duration: duration,

        date:
            new Date().toLocaleString(
                "ru-RU"
            )

    };


    history.unshift(
        historyItem
    );


    localStorage.setItem(
        "veoHistory",
        JSON.stringify(history)
    );


    renderHistory();


    status.textContent =
        "⚠️ Интерфейс готов. Теперь можно подключать настоящий AI API.";


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
        history.map(
            item => `

                <div class="history-item">

                    <b>
                        ${escapeHtml(item.prompt)}
                    </b>

                    <small>
                        ${item.date}
                        • ${item.ratio}
                        • ${item.duration} сек.
                    </small>

                </div>

            `
        ).join("");

}


/* =========================
   HTML SECURITY
========================= */

function escapeHtml(text) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        text;

    return div.innerHTML;

}


/* =========================
   CLOSE MODAL BY BACKGROUND
========================= */

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


/* =========================
   ESCAPE KEY
========================= */

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
   INITIALIZATION
========================= */

updateCredits();

updateAccount();

renderHistory();
