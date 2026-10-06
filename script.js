document.addEventListener("DOMContentLoaded", () => {

```
/* ==================================================
   ELEMENTS
================================================== */

const searchInput =
    document.getElementById("searchInput");

const searchClear =
    document.getElementById("searchClear");

const products =
    Array.from(
        document.querySelectorAll(".product")
    );

const categories =
    Array.from(
        document.querySelectorAll(".category")
    );

const noResults =
    document.getElementById("noResults");

const cartButton =
    document.getElementById("cartButton");

const cartDrawer =
    document.getElementById("cartDrawer");

const drawerClose =
    document.getElementById("drawerClose");

const overlay =
    document.getElementById("overlay");

const cartCount =
    document.getElementById("cartCount");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const loginButton =
    document.getElementById("loginButton");

const loginModal =
    document.getElementById("loginModal");

const modalClose =
    document.getElementById("modalClose");

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const sidebar =
    document.getElementById("sidebar");

const catalogButton =
    document.getElementById("catalogButton");

const viewAllButton =
    document.getElementById("viewAllButton");


/* ==================================================
   STATE
================================================== */

let currentCategory = "all";

let cart = [];

let favorites = new Set();


/* ==================================================
   SEARCH
================================================== */

function filterProducts() {

    const query =
        searchInput.value
            .toLowerCase()
            .trim();

    let visibleCount = 0;

    products.forEach(product => {

        const title =
            (
                product.dataset.title || ""
            ).toLowerCase();

        const category =
            (
                product.dataset.category || ""
            ).toLowerCase();

        const categoryMatch =
            currentCategory === "all" ||
            category === currentCategory;

        const searchMatch =
            !query ||
            title.includes(query) ||
            category.includes(query);

        const visible =
            categoryMatch &&
            searchMatch;

        product.style.display =
            visible ? "" : "none";

        if (visible) {
            visibleCount++;
        }

    });

    noResults.classList.toggle(
        "visible",
        visibleCount === 0
    );

    searchClear.classList.toggle(
        "visible",
        searchInput.value.length > 0
    );
}


searchInput.addEventListener(
    "input",
    filterProducts
);


searchClear.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        currentCategory = "all";

        categories.forEach(category => {
            category.classList.remove("active");
        });

        categories[0].classList.add("active");

        filterProducts();

        searchInput.focus();
    }
);


/* ==================================================
   CATEGORIES
================================================== */

categories.forEach(category => {

    category.addEventListener(
        "click",
        () => {

            categories.forEach(item => {
                item.classList.remove("active");
            });

            category.classList.add("active");

            currentCategory =
                category.dataset.category;

            filterProducts();

            document
                .getElementById("catalog")
                .scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

        }
    );

});


/* ==================================================
   FAVORITES
================================================== */

document
    .querySelectorAll(".favorite-button")
    .forEach((button, index) => {

        button.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                const product =
                    products[index];

                if (
                    favorites.has(index)
                ) {

                    favorites.delete(index);

                    button.classList.remove(
                        "active"
                    );

                    button.textContent = "♡";

                } else {

                    favorites.add(index);

                    button.classList.add(
                        "active"
                    );

                    button.textContent = "♥";

                }

            }
        );

    });


/* ==================================================
   CART
================================================== */

function openCart() {

    cartDrawer.classList.add("active");

    overlay.classList.add("active");

    document.body.style.overflow = "hidden";

}


function closeCart() {

    cartDrawer.classList.remove("active");

    overlay.classList.remove("active");

    document.body.style.overflow = "";

}


cartButton.addEventListener(
    "click",
    openCart
);


drawerClose.addEventListener(
    "click",
    closeCart
);


overlay.addEventListener(
    "click",
    closeCart
);


function updateCartCounter() {

    cartCount.textContent =
        cart.length;

}


function renderCart() {

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">

                    <svg viewBox="0 0 24 24">

                        <path
                            d="M3 4H5L7.5 16H19L21 8H6"
                        />

                        <circle
                            cx="9"
                            cy="20"
                            r="1.5"
                        />

                        <circle
                            cx="18"
                            cy="20"
                            r="1.5"
                        />

                    </svg>

                </div>

                <h3>
                    Корзина пуста
                </h3>

                <p>
                    Добавленные товары появятся здесь
                </p>

            </div>

        `;

        cartTotal.textContent =
            "0 ₸";

        return;
    }


    cartItems.innerHTML =
        cart.map(
            (item, index) => `

                <div
                    style="
                        display:flex;
                        align-items:center;
                        gap:12px;
                        padding:12px;
                        margin-bottom:8px;
                        border:1px solid #e6eee9;
                        border-radius:15px;
                    "
                >

                    <div
                        style="
                            width:50px;
                            height:50px;
                            border-radius:12px;
                            background:#edf7f1;
                            display:flex;
                            align-items:center;
                            justify-content:center;
                            color:#18b950;
                            font-weight:800;
                        "
                    >
                        OM
                    </div>

                    <div style="flex:1">

                        <strong
                            style="
                                display:block;
                                font-size:12px;
                            "
                        >
                            ${item.title}
                        </strong>

                        <span
                            style="
                                color:#9aa59f;
                                font-size:10px;
                            "
                        >
                            0 ₸
                        </span>

                    </div>

                    <button
                        class="remove-cart"
                        data-index="${index}"
                        style="
                            width:28px;
                            height:28px;
                            border-radius:50%;
                            border:0;
                            background:#f2f6f4;
                            cursor:pointer;
                            color:#6d7972;
                        "
                    >
                        ×
                    </button>

                </div>

            `
        )
        .join("");


    document
        .querySelectorAll(".remove-cart")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );

                    cart.splice(index, 1);

                    updateCartCounter();

                    renderCart();

                }
            );

        });


    cartTotal.textContent =
        "0 ₸";

}


document
    .querySelectorAll(".add-cart")
    .forEach((button, index) => {

        button.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                const product =
                    products[index];

                cart.push({
                    title:
                        product.dataset.title ||
                        "Товар"
                });

                updateCartCounter();

                button.classList.add("added");

                button.innerHTML =
                    "<span>✓</span> Добавлено";

                setTimeout(
                    () => {

                        button.classList.remove(
                            "added"
                        );

                        button.innerHTML =
                            "<span>+</span> В корзину";

                    },
                    1200
                );

                renderCart();

            }
        );

    });


/* ==================================================
   LOGIN MODAL
================================================== */

function openLogin() {

    loginModal.classList.add("active");

    document.body.style.overflow = "hidden";

}


function closeLogin() {

    loginModal.classList.remove("active");

    document.body.style.overflow = "";

}


loginButton.addEventListener(
    "click",
    openLogin
);


modalClose.addEventListener(
    "click",
    closeLogin
);


loginModal.addEventListener(
    "click",
    event => {

        if (
            event.target === loginModal
        ) {
            closeLogin();
        }

    }
);


/* ==================================================
   MOBILE SIDEBAR
================================================== */

mobileMenuButton.addEventListener(
    "click",
    () => {

        sidebar.classList.toggle(
            "mobile-open"
        );

    }
);


document
    .querySelectorAll(".side-link")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".side-link"
                    )
                    .forEach(item => {
                        item.classList.remove(
                            "active"
                        );
                    });

                link.classList.add("active");

                sidebar.classList.remove(
                    "mobile-open"
                );

            }
        );

    });


/* ==================================================
   CATALOG BUTTON
================================================== */

catalogButton.addEventListener(
    "click",
    () => {

        document
            .getElementById("catalog")
            .scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

    }
);


viewAllButton.addEventListener(
    "click",
    () => {

        currentCategory = "all";

        searchInput.value = "";

        categories.forEach(category => {
            category.classList.remove("active");
        });

        categories[0].classList.add("active");

        filterProducts();

        document
            .getElementById("catalog")
            .scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

    }
);


/* ==================================================
   HEADER FAVORITES
================================================== */

document
    .getElementById("favoriteHeader")
    .addEventListener(
        "click",
        () => {

            const favoriteProducts =
                products.filter(
                    (_, index) =>
                        favorites.has(index)
                );

            if (
                favoriteProducts.length === 0
            ) {

                alert(
                    "Избранное пока пустое"
                );

                return;

            }

            document
                .getElementById("catalog")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


/* ==================================================
   ESCAPE
================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeCart();

            closeLogin();

            sidebar.classList.remove(
                "mobile-open"
            );

        }

    }
);


/* ==================================================
   INITIAL
================================================== */

filterProducts();

renderCart();
```

});
