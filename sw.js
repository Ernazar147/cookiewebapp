self.addEventListener("install", event => {
    console.log("Service Worker: Installing...");
    event.waitUntil(
        caches.open("tookie-cookie-v8").then(cache => {
            return cache.addAll([
                "/shop",
                "/index.html",
                "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap",
                "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",
                "https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css",
                "https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css",
                "https://cdn.jsdelivr.net/npm/react@17.0.2/umd/react.production.min.js",
                "https://unpkg.com/react@17.0.2/umd/react.production.min.js",
                "https://cdnjs.cloudflare.com/ajax/libs/react/17.0.2/umd/react.production.min.js",
                "https://cdn.jsdelivr.net/npm/react-dom@17.0.2/umd/react-dom.production.min.js",
                "https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js",
                "https://cdnjs.cloudflare.com/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js",
                "https://cdn.jsdelivr.net/npm/@babel/standalone@7.24.6/babel.min.js",
                "https://unpkg.com/@babel/standalone@7.24.6/babel.min.js",
                "https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.24.6/babel.min.js"
            ]);
        })
    );
});

self.addEventListener("fetch", event => {
    console.log("Service Worker: Fetching", event.request.url);
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).catch(() => {
                return new Response(
                    `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <title>Tookie Cookie: Оффлайн</title>
                        <style>
                            body { font-family: 'Poppins', sans-serif; background: linear-gradient(135deg, #fce4ec, #f8bbd0); color: #d81b60; text-align: center; padding: 50px; }
                            h1 { font-size: 28px; }
                            p { font-size: 20px; }
                            .loader { width: 60px; height: 60px; background: url('https://via.placeholder.com/60?text=🍪') no-repeat center; animation: spin 0.8s linear infinite; margin: 20px auto; }
                            @keyframes spin { to { transform: rotate(360deg); } }
                        </style>
                    </head>
                    <body>
                        <h1>Tookie Cookie 🍪</h1>
                        <p>Ой, кажется, вы оффлайн! 😔</p>
                        <p>Проверьте интернет и попробуйте снова!</p>
                        <div className="loader"></div>
                    </body>
                    </html>
                    `,
                    { headers: { "Content-Type": "text/html" } }
                );
            });
        })
    );
});

self.addEventListener("activate", event => {
    console.log("Service Worker: Activating...");
    const cacheWhitelist = ["tookie-cookie-v8"];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log("Service Worker: Deleting old cache", cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});