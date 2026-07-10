/* ================================================= */
/*                 SITE INITIALIZATION               */
/* ================================================= */

console.log("JavaScript Connected Successfully");

/* ================================================= */
/*               LOAD COMPONENTS                     */
/* ================================================= */

async function loadComponent(containerId, filePath) {

    const response = await fetch(filePath);

    const html = await response.text();

    document.getElementById(containerId).innerHTML = html;

    updateCartCounter();

    if (typeof initializeMobileMenu === "function") {
        initializeMobileMenu();
    }

}

/* ================================================= */
/*                CART COUNTER                       */
/* ================================================= */

function updateCartCounter() {

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const totalQuantity = cart.reduce(
        (total, item) =>
            total + Number(item.quantity),
        0
    );

    const cartLink =
        document.getElementById("cartLink");

    if (!cartLink) return;

    if (document.documentElement.lang === "ar") {

        cartLink.textContent =
            "سلة (" + totalQuantity + ")";

    } else {

        cartLink.textContent =
            "Cart (" + totalQuantity + ")";

    }

}

/* ================================================= */
/*              AUTO LOAD COMPONENTS                 */
/* ================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const isMobile = window.innerWidth <= 768;

    if (document.documentElement.lang === "ar") {

        loadComponent(
            "navbar-container",
            isMobile
                ? "../components/navbar_mobile_ar.html"
                : "../components/navbar_ar.html"
        );

        loadComponent(
            "footer-container",
            "../components/footer_ar.html"
        );

        loadComponent(
            "whatsapp-container",
            "../components/whatsapp.html"
        );

    } else {

        loadComponent(
            "navbar-container",
            isMobile
                ? "components/navbar_mobile.html"
                : "components/navbar.html"
        );

        loadComponent(
            "footer-container",
            "components/footer.html"
        );

        loadComponent(
            "whatsapp-container",
            "components/whatsapp.html"
        );

    }

});

// =================================================
// Service Worker Registration
// =================================================

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/red-dragon/sw.js")
            .then(() => {
                console.log("Service Worker Registered");
            })
            .catch((error) => {
                console.error("Service Worker Error:", error);
            });
    });
}