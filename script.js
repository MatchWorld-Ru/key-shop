let cart = 0;


/* CART */

function addToCart() {

    cart++;

    const counter = document.getElementById("cartCount");

    counter.textContent = cart;

    counter.style.display = "flex";

    showToast("Товар добавлен в корзину 🛒");
}


/* TOAST */

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}


/* CATALOG */

function openCatalog() {

    document
        .getElementById("catalogOverlay")
        .classList.add("open");

    document.body.style.overflow = "hidden";
}


function closeCatalog() {

    document
        .getElementById("catalogOverlay")
        .classList.remove("open");

    document.body.style.overflow = "";
}


/* SEARCH */

function searchProducts() {

    const input =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();

    const cards =
        document.querySelectorAll(".product-card");

    cards.forEach(card => {

        const title =
            card
                .querySelector("h3")
                .textContent
                .toLowerCase();

        if (title.includes(input)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });
}


/* SCROLL */

function scrollToProducts() {

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* FAVORITES */

document.querySelectorAll(".favorite").forEach(button => {

    button.addEventListener("click", function () {

        if (this.textContent === "♡") {

            this.textContent = "♥";

            this.style.color = "#ff4757";

            showToast("Добавлено в избранное ❤️");

        } else {

            this.textContent = "♡";

            this.style.color = "";

            showToast("Удалено из избранного");

        }

    });

});


/* SORT */

document.querySelectorAll(".sort").forEach(button => {

    button.addEventListener("click", function () {

        document
            .querySelectorAll(".sort")
            .forEach(btn => btn.classList.remove("active"));

        this.classList.add("active");

        showToast("Сортировка: " + this.textContent);

    });

});


/* ESC CLOSE */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeCatalog();

    }

});


/* PAGE LOAD ANIMATION */

window.addEventListener("load", () => {

    document
        .querySelectorAll(".product-card")
        .forEach((card, index) => {

            card.style.animationDelay =
                `${index * 0.08}s`;

        });

});
