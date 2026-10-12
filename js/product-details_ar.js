/* ================================================= */
/*           LOAD PRODUCT FROM URL                   */
/* ================================================= */

const params = new URLSearchParams(window.location.search);

const productKey = params.get("product");

const product = products[productKey];

/* ================================================= */
/*        DISPLAY PRODUCT INFORMATION                */
/* ================================================= */

if (product) {
    
    const option =
        document.getElementById("productOption");

    if (productKey === "calcium-carbide") {
        option.style.display = "block";
    }

    document.title = product.name + " - التنين الأحمر";

    document.getElementById("productName").textContent = product.name;

    document.getElementById("mainImage").src = product.images[0];

    const thumbnailsContainer =
        document.getElementById("thumbnails");

/* ================================================= */
/*              IMAGE GALLERY SYSTEM                 */
/* ================================================= */

    product.images.forEach(image => {

        const img = document.createElement("img");

        img.src = image;

        img.className = "thumbnail";
        if (image === product.images[0]) {
            img.classList.add("active");
        }

        img.addEventListener("click", () => {

            document.getElementById("mainImage").src = image;

            document
                .querySelectorAll(".thumbnail")
                .forEach(t => t.classList.remove("active"));
                
                const option =
                    document.getElementById("productOption");

                if (productKey === "calcium-carbide") {

                    if (image.includes("W_D.JPG")) {

                        option.style.display = "inline-block";
                        option.value = "100KG";

                    }

                    else if (image.includes("W_D_S.JPG")) {

                        option.style.display = "inline-block";
                        option.value = "50KG";

                    }

                    else {

                        option.style.display = "none";

                    }

                }

            img.classList.add("active");

        });  

        thumbnailsContainer.appendChild(img);

    });

/* ================================================= */
/*                ADD TO CART SYSTEM                 */
/* ================================================= */

const orderBtn = document.getElementById("orderBtn");
const originalOrderBtnText = orderBtn.textContent.trim();
let orderBtnTimeout;

orderBtn.addEventListener("click", () => {

    const quantity = document.getElementById("quantity").value;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        name: product.name,
        image: document.getElementById("mainImage").src,
        option:
            productKey === "calcium-carbide"
                ? document.getElementById("productOption").value
                : "",
        quantity: quantity,
        packSize:
            productKey === "copper-wire" ||
            productKey === "aluminum-wire"
                ? 5
                : null,
        unitType: product.unitType || null,
        unitSize: product.unitSize || null
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    // تحديث عداد السلة إن كان موجودًا
    const cartLink = document.getElementById("cartLink");

    if (cartLink) {
        const totalQuantity = cart.reduce(
            (total, item) => total + Number(item.quantity),
            0
        );

        cartLink.textContent = "السلة (" + totalQuantity + ")";
    }

    // إظهار تأكيد الإضافة
    orderBtn.textContent = "تمت الإضافة إلى السلة ✓";
    orderBtn.classList.add("added-to-cart");

    clearTimeout(orderBtnTimeout);

    orderBtnTimeout = setTimeout(() => {
        orderBtn.textContent = originalOrderBtnText;
        orderBtn.classList.remove("added-to-cart");
    }, 2000);

}); 
    
}
