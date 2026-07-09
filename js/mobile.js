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

document.addEventListener("click", (event) => {

    const button =
        document.querySelector(".menu-toggle");

    const menu =
        document.querySelector(".mobile-menu");

    if (!button || !menu) return;

    if (event.target === button) {

        menu.classList.toggle("active");

    }

});