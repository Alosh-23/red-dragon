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

    const button =
        document.querySelector(".menu-toggle");

    const menu =
        document.querySelector(".mobile-menu");

    if (!button || !menu) return;

    button.onclick = () => {

        console.log("Clicked");

        if (menu.classList.contains("active")) {

            menu.classList.remove("active");

        } else {

            menu.classList.add("active");

        }
        
        const links = menu.querySelectorAll("a");

        links.forEach(link => {
            link.addEventListener("click", () => {
                menu.classList.remove("active");
            });
        });

        document.addEventListener("click", (event) => {

            if (
                !menu.contains(event.target) &&
                !button.contains(event.target)
            ) {
                menu.classList.remove("active");
            }

        });

    };

}