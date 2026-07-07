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

    document.getElementById("orderBtn")
        .addEventListener("click", () => {

        const quantity =
            document.getElementById("quantity").textContent;

        let cart =
            JSON.parse(localStorage.getItem("cart")) || [];

        cart.push({
            name: product.name,
            image: document.getElementById("mainImage").src,
            option:
                productKey === "calcium-carbide"
                    ? document.getElementById("productOption").value
                    : "",
            quantity: quantity
        });

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

    });   
    
}

/* ================================================= */
/*            QUANTITY SELECTOR SYSTEM               */
/* ================================================= */

let quantity = 1;

const quantityElement =
    document.getElementById("quantity");

document.getElementById("plusBtn")
    .addEventListener("click", () => {

    quantity++;

    quantityElement.textContent = quantity;

});

document.getElementById("minusBtn")
    .addEventListener("click", () => {

    if (quantity > 1) {

        quantity--;

        quantityElement.textContent = quantity;

    }

});