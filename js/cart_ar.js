/* ================================================= */
/*                 CART DATA LOAD                    */
/* ================================================= */

const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

/* ================================================= */
/*             CART SUMMARY CALCULATION              */
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
        "عدد المنتجات: " + totalProducts;

/* ================================================= */
/*              DISPLAY CART PRODUCTS                */
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

    deleteBtn.textContent = "حذف";

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
/*               INCREASE QUANTITY                   */
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
                "سلة (" + totalQuantity + ")";
       }

        location.reload();

    });

/* ================================================= */
/*               DECREASE QUANTITY                   */
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
            "سلة (" + totalQuantity + ")";
        }

        location.reload();

    });

/* ================================================= */
/*             PRODUCT CARD TEMPLATE                 */
/* ================================================= */

    product.innerHTML = `

        <img class="cart-image"
            src="${item.image}"
            alt="${item.name}">

        <div class="cart-info">

            <h3>${item.name}</h3>

            ${item.option ? `<p>الحجم: ${item.option}</p>` : ""}

            <p class="qty-text">
                الكمية: ${item.quantity}
            </p>

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

/* ================================================= */
/*             CUSTOMER INFORMATION                  */
/* ================================================= */

     const customerName =
        document.getElementById("customerName").value;

    const customerPhone =
        document.getElementById("customerPhone").value;

    const customerCompany =
        document.getElementById("customerCompany").value;   

    if (!customerName || !customerPhone) {

        alert(
            "يرجى إدخال الاسم ورقم الهاتف"
        );

        return;

    }

    let totalProducts = 0;

/* ================================================= */
/*             BUILD WHATSAPP MESSAGE                */
/* ================================================= */
    
let message =
" التنين الأحمر\n\n" +

" الاسم: " +
customerName +
"\n" +

" الهاتف: " +
customerPhone +
"\n";

if (customerCompany) {

    message +=
        " الشركة: " +
        customerCompany + "\n";

}

message +=
"\n طلب جديد\n\n";

cart.forEach(item => {

    totalProducts += Number(item.quantity);

    message +=
        " " + item.name + "\n";

    if (item.option) {

        message +=
            " الحجم: " +
            item.option +
            "\n";

    }

    message +=
        " الكمية: " +
        item.quantity +
        "\n\n";

});

message +=
    " إجمالي المنتجات: " +
    totalProducts +
    "\n\n" +

    "يرجى تزويدي بالسعر ومدة التجهيز والتوصيل.\n\n" +

    "شكراً لكم.";

/* ================================================= */
/*               SEND TO WHATSAPP                    */
/* ================================================= */

    window.location.href =
    "https://wa.me/9647515933499?text=" +
    encodeURIComponent(message);

});