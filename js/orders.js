/* ================================================= */
/*                 ORDERS SYSTEM                     */
/* ================================================= */

/* ================================================= */
/*                LOAD ORDERS                        */
/* ================================================= */

function getOrders() {

    return JSON.parse(
        localStorage.getItem("orders")
    ) || [];

}

/* ================================================= */
/*                SAVE ORDERS                        */
/* ================================================= */

function saveOrders(orders) {

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

}

/* ================================================= */
/*                TOTAL ORDERS                       */
/* ================================================= */

function getOrdersCount() {

    return getOrders().length;

}