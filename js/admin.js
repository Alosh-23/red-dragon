/* ================================================= */
/*                 ADMIN PANEL                       */
/* ================================================= */

console.log("Admin Panel Loaded");

/* ================================================= */
/*              DASHBOARD DATA                       */
/* ================================================= */

function getDashboardStats() {

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const orders =
        JSON.parse(localStorage.getItem("orders")) || [];

    return {

        cartItems: cart.length,

        orders: orders.length

    };

}

/* ================================================= */
/*             SHOW STATISTICS                       */
/* ================================================= */

console.log(
    getDashboardStats()
);