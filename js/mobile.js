console.log("mobile.js loaded");

/* ================================================= */
/*             DEVICE DETECTION                       */
/* ================================================= */

const isMobile =
    window.innerWidth <= 768;

/* ================================================= */
/*               SCREEN INFO                          */
/* ================================================= */

if (isMobile) {

    console.log("Mobile Device");

} else {

    console.log("Desktop Device");

}

/* ================================================= */
/*              WINDOW RESIZE                         */
/* ================================================= */

window.addEventListener("resize", () => {

    console.log(
        "Screen Width:",
        window.innerWidth
    );

});

/* ================================================= */
/*               MOBILE MENU                          */
/* ================================================= */

function initializeMobileMenu() {

    const button =
        document.querySelector(".menu-toggle");

    const menu =
        document.querySelector(".mobile-menu");

    if (!button || !menu) return;

    // فتح وإغلاق القائمة
    button.onclick = (event) => {

        event.stopPropagation();

        console.log("Clicked");

        menu.classList.toggle("active");

    };

    // إغلاق القائمة عند الضغط على رابط
    const links = menu.querySelectorAll("a");

    links.forEach(link => {

        link.addEventListener("click", () => {

            menu.classList.remove("active");

        });

    });

    // منع الضغط داخل القائمة من إغلاقها
    menu.addEventListener("click", (event) => {

        event.stopPropagation();

    });

    // إغلاق القائمة عند الضغط خارجها
    document.addEventListener("click", () => {

        menu.classList.remove("active");

    });

}