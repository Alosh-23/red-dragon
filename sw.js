// =================================================
// Red Dragon Service Worker
// Version 1
// =================================================
const CACHE_NAME = "red-dragon-v8";
const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./products.html",
    "./product.html",
    "./cart.html",

    "./manifest.json",

    "./arabic_html/ar_index.html",
    "./arabic_html/ar_products.html",
    "./arabic_html/ar_product.html",
    "./arabic_html/ar_cart.html",

    "./js/admin.js",
    "./js/cart.js",
    "./js/cart_ar.js",
    "./js/home.js",
    "./js/main.js",
    "./js/mobile.js",
    "./js/orders.js",
    "./js/product-details.js",
    "./js/product-details_ar.js",
    "./js/products.js",
    "./js/products_ar.js",

   "./css/cart.css",
    "./css/footer.css",
    "./css/home.css",
    "./css/mobile.css",
    "./css/navbar.css",
    "./css/product-details.css",
    "./css/products.css",
    "./css/style.css",

    "./components/footer.html",
    "./components/footer_ar.html",
    "./components/navbar.html",
    "./components/navbar_ar.html",
    "./components/whatsapp.html",

    "./data/products.json",
    "./data/settings.json",
    
    "./images/Gloves(1).JPG",
    "./images/Gloves(2).JPG",
    "./images/Gloves(3).JPG",
    "./images/Gloves(4).JPG",
    "./images/Gloves(5).JPG",
    "./images/Gloves(6).JPG",
    "./images/Gloves(7).JPG",
    "./images/Gloves(8).JPG",
    "./images/Gloves(9).JPG",
    "./images/Gloves(10).JPG",
    "./images/Gloves(13).JPG",
    "./images/Gloves(14).JPG",
    "./images/Gloves(15).JPG",
    "./images/Gloves(16).JPG",
    "./images/Gloves(17).JPG",
    "./images/Gloves(19).JPG",
    "./images/ordinary protective helmet.JPG",
    "./images/P_B.JPG",
    "./images/protective goggles.JPG",
    "./images/RDR_WWW_logo.PNG",
    "./images/Various sizes of carbon stone.JPG",
    "./images/W_D.JPG",
    "./images/W_D_S.JPG",
    "./images/Aluminum wire.JPG",
    "./images/Cleaning Hammer.JPG",
    "./images/Copper Wire.JPG",
    "./images/Copper_Wiree.JPG",
    "./images/Earth Clamps(DSC_6398).JPG",
    "./images/Earth Clamps(DSC_6400).JPG",
    "./images/Electrode Holder(DSC_6403).JPG",
    "./images/Electronic protective helmet.JPG",

    "./icon-192.JPG",
    "./icon-500.png",

    "./favicon.ico",
    
    "./assets/fonts/SCRIPTBL.TTF",

];

self.addEventListener("install", (event) => {

    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

self.addEventListener("fetch", (event) => {

    event.respondWith(

        fetch(event.request)

            .then((response) => {

                const responseClone =
                    response.clone();

                caches.open(CACHE_NAME)
                    .then((cache) => {
                        cache.put(
                            event.request,
                            responseClone
                        );
                    });

                return response;

            })

            .catch(() => {

                return caches.match(
                    event.request
                );

            })

    );

});

self.addEventListener("activate", (event) => {

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );

    self.clients.claim();
    
});