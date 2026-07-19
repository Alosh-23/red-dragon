/* ================================================= */
/*                LOAD CART DATA                     */
/* ================================================= */

const cart =
    JSON.parse(localStorage.getItem("cart")) || [];
    
/* ================================================= */
/*              CALCULATE TOTAL ITEMS                */
/* ================================================= */
const totalProducts =
    cart.reduce(
        (total, item) =>
            total + Number(item.quantity),
        0
    );

const cartItems =
    document.getElementById("cartItems");

    document.getElementById("totalProducts")
        .textContent =
        "Total Products: " + totalProducts;

/* ================================================= */
/*               DISPLAY CART ITEMS                  */
/* ================================================= */

cart.forEach((item, index) => {

/* ================================================= */
/*               CREATE PRODUCT CARD                 */
/* ================================================= */

    const product = document.createElement("div");

    product.className = "cart-item";

/* ================================================= */
/*                CREATE ACTION BUTTONS              */
/* ================================================= */

    const minusBtn = document.createElement("button");
    minusBtn.textContent = "-";

    const plusBtn = document.createElement("button");
    plusBtn.textContent = "+";

    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "Delete";

/* ================================================= */
/*                DELETE PRODUCT                     */
/* ================================================= */

    deleteBtn.addEventListener("click", () => {

        cart.splice(index, 1);

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        location.reload();

    });

/* ================================================= */
/*                INCREASE QUANTITY                  */
/* ================================================= */

    plusBtn.addEventListener("click", () => {

        item.quantity++;

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        const totalQuantity = cart.reduce(
            (total, item) => total + Number(item.quantity),
                0
        );

        const cartLink =
            document.getElementById("cartLink");

        if (cartLink) {
            cartLink.textContent =
                "Cart (" + totalQuantity + ")";
        }

        location.reload();

    });

/* ================================================= */
/*                DECREASE QUANTITY                  */
/* ================================================= */

    minusBtn.addEventListener("click", () => {

        if (item.quantity > 1) {

            item.quantity--;

        } else {

            cart.splice(index, 1);

        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        const totalQuantity = cart.reduce(
            (total, item) => total + Number(item.quantity),
            0
        );

        const cartLink =
            document.getElementById("cartLink");

        if (cartLink) {
            cartLink.textContent =
                "Cart (" + totalQuantity + ")";
        }

        location.reload();

    });

/* ================================================= */
/*               PRODUCT CARD TEMPLATE               */
/* ================================================= */

    product.innerHTML = `

        <img class="cart-image"
            src="${item.image}"
            alt="${item.name}">

        <div class="cart-info">

            <h3>${item.name}</h3>

            ${item.option ? `<p>Size: ${item.option}</p>` : ""}

            ${item.packSize
            ? `
            <p>Pack Size: ${item.packSize} KG</p>
            <p>Quantity: ${item.quantity} Packs</p>
            <p>Total Weight: ${item.quantity * item.packSize} KG</p>
            `
            : item.unitType === "dozen"
            ? `
            <p>Pack Type: Dozen</p>
            <p>Quantity: ${item.quantity} Dozens</p>
            <p>Total Pairs: ${item.quantity * item.unitSize} Pairs</p>
            `
            : `
            <p class="qty-text">
                Quantity: ${item.quantity}
            </p>
            `
            }

        </div>

    `;

/* ================================================= */
/*              PRODUCT ACTION BUTTONS               */
/* ================================================= */

    const actions = document.createElement("div");

    actions.className = "cart-actions";

    actions.appendChild(minusBtn);

    actions.appendChild(plusBtn);

    actions.appendChild(deleteBtn);
    
    product.appendChild(actions);

    cartItems.appendChild(product);

});

/* ================================================= */
/*                  CLEAR CART                       */
/* ================================================= */

document.getElementById("clearCartBtn")
    .addEventListener("click", () => {

    localStorage.removeItem("cart");

    location.reload();

});

/* ================================================= */
/*              WHATSAPP ORDER SYSTEM                */
/* ================================================= */

document.getElementById("whatsappBtn")
    .addEventListener("click", () => {
    
    const customerName =
        document.getElementById("customerName").value;

    const customerPhone =
        document.getElementById("customerPhone").value;

    const customerCompany =
        document.getElementById("customerCompany").value;

    if (!customerName || !customerPhone) {

        alert(
            "Please enter your name and phone number"
        );

        return;

    }

/* ================================================= */
/*             BUILD WHATSAPP MESSAGE                */
/* ================================================= */

let totalProducts = 0;

let message =
" RED DRAGON\n\n" +

" Name: " +
customerName +
"\n" +

" Phone: " +
customerPhone +
"\n";

if (customerCompany) {

    message +=
        " Company: " +
        customerCompany + "\n";

}

message +=
"\n New Order Request\n\n";

cart.forEach(item => {

    totalProducts += Number(item.quantity);

    message +=
        " " + item.name + "\n";

    if (item.option) {

        message +=
            " Size: " +
            item.option +
            "\n";

    }

if (item.packSize) {

    message +=
        " Pack Size: " +
        item.packSize +
        " KG\n" +

        " Quantity: " +
        item.quantity +
        " Packs\n" +

        " Total Weight: " +
        (item.quantity * item.packSize) +
        " KG\n\n";

} else if (item.unitType === "dozen") {

    message +=
        " Pack Type: Dozen\n" +

        " Quantity: " +
        item.quantity +
        " Dozens\n" +

        " Total Pairs: " +
        (item.quantity * item.unitSize) +
        " Pairs\n\n";

} else {

    message +=
        " Quantity: " +
        item.quantity +
        "\n\n";

}

});

message +=
    " Total Products: " +
    totalProducts +"\n\n" +

    "Please provide quotation and delivery details.\n\n" +

    "Thank you.";

/* ================================================= */
/*               SEND TO WHATSAPP                    */
/* ================================================= */

    window.location.href =
    "https://wa.me/9647515933499?text=" +
    encodeURIComponent(message);

});