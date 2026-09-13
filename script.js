const modal = document.getElementById("modal");
const content = document.getElementById("modal-content");

let currentUser = localStorage.getItem("nexoraUser");

let applications =
    JSON.parse(localStorage.getItem("nexoraApplications")) || [];

function showModal(html) {
    content.innerHTML = html;
    modal.classList.add("active");
}

function closeModal() {
    modal.classList.remove("active");
}

modal.addEventListener("click", function (e) {
    if (e.target === modal) {
        closeModal();
    }
});


/* =========================
   AUTH
========================= */

function openAuth() {

    if (currentUser) {
        openAccount();
        return;
    }

    showModal(`
        <h2>Вход в NEXORA</h2>

        <div class="form">

            <label>Игровой ник / логин</label>
            <input id="loginName" placeholder="KVY1NN">

            <label>Пароль</label>
            <input id="loginPassword" type="password">

            <button class="btn purple" onclick="login()">
                Войти
            </button>

            <button class="btn secondary" onclick="openRegister()">
                Создать аккаунт
            </button>

        </div>
    `);
}


function openRegister() {

    showModal(`
        <h2>Создание аккаунта</h2>

        <div class="form">

            <label>Логин</label>
            <input id="regName" placeholder="Твой ник">

            <label>Пароль</label>
            <input id="regPassword" type="password">

            <label>Повторите пароль</label>
            <input id="regPassword2" type="password">

            <button class="btn purple" onclick="register()">
                Зарегистрироваться
            </button>

            <button class="btn secondary" onclick="openAuth()">
                Назад
            </button>

        </div>
    `);
}


function register() {

    const name = document.getElementById("regName").value.trim();
    const password = document.getElementById("regPassword").value;
    const password2 = document.getElementById("regPassword2").value;

    if (!name || !password) {
        alert("Заполни все поля.");
        return;
    }

    if (password.length < 6) {
        alert("Пароль должен содержать минимум 6 символов.");
        return;
    }

    if (password !== password2) {
        alert("Пароли не совпадают.");
        return;
    }

    localStorage.setItem("nexoraUser", name);
    currentUser = name;

    openAccount();
}


function login() {

    const name = document.getElementById("loginName").value.trim();

    if (!name) {
        alert("Введи логин.");
        return;
    }

    localStorage.setItem("nexoraUser", name);
    currentUser = name;

    openAccount();
}


function logout() {

    localStorage.removeItem("nexoraUser");

    currentUser = null;

    closeModal();
}


/* =========================
   ACCOUNT
========================= */

function openAccount() {

    if (!currentUser) {
        openAuth();
        return;
    }

    const myApps = applications.filter(
        app => app.user === currentUser
    );

    let appsHTML = "";

    if (myApps.length === 0) {

        appsHTML = `
            <p>У тебя пока нет заявок.</p>
        `;

    } else {

        appsHTML = myApps.map(app => `
            <div class="application">

                <b>${escapeHTML(app.nickname)}</b>

                <br>

                <small>
                    ${escapeHTML(app.role)}
                    • ${escapeHTML(app.rank)}
                </small>

                <br>

                <span class="status">
                    ${escapeHTML(app.status)}
                </span>

            </div>
        `).join("");
    }

    showModal(`

        <h2>Личный кабинет</h2>

        <div class="message">
            Добро пожаловать, <b>${escapeHTML(currentUser)}</b>
        </div>

        <h3>Мои заявки</h3>

        ${appsHTML}

        <button class="btn purple" onclick="openApply()">
            Подать заявку
        </button>

        <button class="btn secondary" onclick="logout()">
            Выйти
        </button>

    `);
}


/* =========================
   APPLICATION
========================= */

function openApply() {

    if (!currentUser) {
        openAuth();
        return;
    }

    showModal(`

        <h2>Заявка в NEXORA</h2>

        <div class="form">

            <label>Игровой ник *</label>
            <input id="appNickname" placeholder="KVY1NN">

            <label>Возраст *</label>
            <input id="appAge" type="number" min="12" max="50">

            <label>Позиция *</label>

            <select id="appRole">
                <option>Rifler</option>
                <option>AWPer</option>
                <option>IGL</option>
                <option>Support</option>
                <option>Entry</option>
                <option>Lurker</option>
            </select>

            <label>Faceit / Premier ранг *</label>
            <input id="appRank" placeholder="Faceit 8 / 20k Premier">

            <label>Сколько играешь в неделю? *</label>
            <input id="appHours" placeholder="20 часов">

            <label>Discord / Telegram</label>
            <input id="appContact" placeholder="@username">

            <label>Опыт / достижения</label>
            <textarea id="appAbout"
                placeholder="Расскажи о своих командах, турнирах и опыте...">
            </textarea>

            <button class="btn purple" onclick="sendApplication()">
                Отправить заявку
            </button>

        </div>
    `);
}


function sendApplication() {

    const nickname =
        document.getElementById("appNickname").value.trim();

    const age =
        document.getElementById("appAge").value;

    const role =
        document.getElementById("appRole").value;

    const rank =
        document.getElementById("appRank").value.trim();

    const hours =
        document.getElementById("appHours").value.trim();

    const contact =
        document.getElementById("appContact").value.trim();

    const about =
        document.getElementById("appAbout").value.trim();

    if (!nickname || !age || !rank || !hours) {

        alert("Заполни обязательные поля.");

        return;
    }

    const application = {

        id: Date.now(),

        user: currentUser,

        nickname,

        age,

        role,

        rank,

        hours,

        contact,

        about,

        status: "На рассмотрении",

        date: new Date().toLocaleDateString("ru-RU")
    };

    applications.push(application);

    localStorage.setItem(
        "nexoraApplications",
        JSON.stringify(applications)
    );

    showModal(`

        <h2>Заявка отправлена ✓</h2>

        <div class="message">
            Спасибо! Заявка успешно отправлена
            администрации NEXORA.
        </div>

        <button class="btn purple"
            onclick="openAccount()">
            Открыть кабинет
        </button>

    `);
}


/* =========================
   ADMIN
========================= */

const ADMIN_KEY = "NEXORA-2026-ADMIN";


function openAdmin() {

    showModal(`

        <h2>Администрация NEXORA</h2>

        <div class="form">

            <label>Ключ администратора</label>

            <input
                id="adminKey"
                type="password"
                placeholder="Введите ключ">

            <button class="btn purple"
                onclick="adminLogin()">
                Войти
            </button>

        </div>
    `);
}


function adminLogin() {

    const key =
        document.getElementById("adminKey").value;

    if (key !== ADMIN_KEY) {

        alert("Неверный ключ администратора.");

        return;
    }

    openAdminPanel();
}


function openAdminPanel() {

    applications =
        JSON.parse(
            localStorage.getItem("nexoraApplications")
        ) || [];

    let html = `
        <h2>Admin Panel</h2>

        <div class="message">
            Всего заявок:
            <b>${applications.length}</b>
        </div>
    `;

    if (applications.length === 0) {

        html += `
            <p>Заявок пока нет.</p>
        `;

    } else {

        html += applications.map(app => `

            <div class="application">

                <b>
                    #${app.id} —
                    ${escapeHTML(app.nickname)}
                </b>

                <br>

                <small>
                    Игрок:
                    ${escapeHTML(app.user)}
                </small>

                <br>

                <small>
                    Возраст: ${escapeHTML(app.age)}
                    • Позиция: ${escapeHTML(app.role)}
                    • Ранг: ${escapeHTML(app.rank)}
                </small>

                <br>

                <small>
                    В неделю:
                    ${escapeHTML(app.hours)}
                </small>

                <br>

                <small>
                    Контакт:
                    ${escapeHTML(app.contact || "не указан")}
                </small>

                <p>
                    ${escapeHTML(app.about || "Описание отсутствует")}
                </p>

                <select
                    onchange="changeStatus(${app.id}, this.value)">

                    <option
                        ${app.status === "На рассмотрении" ? "selected" : ""}>
                        На рассмотрении
                    </option>

                    <option
                        ${app.status === "Принята" ? "selected" : ""}>
                        Принята
                    </option>

                    <option
                        ${app.status === "Отклонена" ? "selected" : ""}>
                        Отклонена
                    </option>

                </select>

            </div>

        `).join("");
    }

    showModal(html);
}


function changeStatus(id, status) {

    const app = applications.find(
        item => item.id === id
    );

    if (!app) return;

    app.status = status;

    localStorage.setItem(
        "nexoraApplications",
        JSON.stringify(applications)
    );

    openAdminPanel();
}


/* =========================
   SECURITY FOR DISPLAY
========================= */

function escapeHTML(text) {

    return String(text || "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
