console.log("mobile.js loaded");

/* ================================================= */
/*                MOBILE FUNCTIONS                   */
/* ================================================= */

/* ================================================= */
/*             DEVICE DETECTION                      */
/* ================================================= */

const isMobile =
    window.innerWidth <= 768;

/* ================================================= */
/*              SCREEN INFO                          */
/* ================================================= */

if (isMobile) {

    console.log("Mobile Device");

} else {

    console.log("Desktop Device");

}

/* ================================================= */
/*               WINDOW RESIZE                       */
/* ================================================= */

window.addEventListener("resize", () => {

    console.log(
        "Screen Width:",
        window.innerWidth
    );

});

/* ================================================= */
/*                MOBILE MENU                        */
/* ================================================= */

function initializeMobileMenu() {

    console.log("Mobile Menu Initialized");

    const button =
        document.querySelector(".menu-toggle");

    const menu =
        document.querySelector(".mobile-menu");

    console.log(button);
    console.log(menu);

    if (!button || !menu) return;

    button.addEventListener("click", () => {

        console.log("Button Clicked");

        menu.classList.toggle("active");

    });

}