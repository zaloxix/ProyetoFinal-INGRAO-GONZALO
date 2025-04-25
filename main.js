// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, tamaño, precio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const producto = { nombre, tamaño, precio };

    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

// Función para mostrar los productos en la grilla
function mostrarProductos(productos) {
    const container = document.getElementById("productos-container");

    productos.forEach((producto) => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto");

        productoDiv.innerHTML = `
            <h3>${producto.tipo}</h3>
            <p>Tamaño: ${producto.tamaño}</p>
            <p>Color: ${producto.color}</p>
            <p>Tiempo de desarrollo: ${producto.tiempoDeDesarrollo}</p>
            <p>Precio: $${producto.costo}</p>
            <button class="agregar-carrito-btn" data-nombre="${producto.tipo}" data-tamaño="${producto.tamaño}" data-precio="${producto.costo}">Seleccionar</button>
        `;

        container.appendChild(productoDiv);
    });
}

// Función para mostrar los productos en el carrito
function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const carritoLista = document.getElementById("carrito-lista");

    carritoLista.innerHTML = "";  // Limpiar la lista de productos en el carrito

    carrito.forEach((producto) => {
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} - ${producto.tamaño} - $${producto.precio}`;
        carritoLista.appendChild(li);
    });
}

// Evento para agregar productos al carrito cuando se hace clic en el botón
document.getElementById("productos-container").addEventListener("click", (event) => {
    if (event.target.classList.contains("agregar-carrito-btn")) {
        const { nombre, tamaño, precio } = event.target.dataset;
        agregarAlCarrito(nombre, tamaño, precio);
    }
});

// Evento para vaciar el carrito
document.getElementById("vaciar-carrito-btn").addEventListener("click", () => {
    localStorage.removeItem("carrito");
    mostrarCarrito();
});

// Verificar el tema guardado en localStorage al cargar la página
let currentTheme = localStorage.getItem("theme");

if (currentTheme === "oscuro") {
    document.body.style.backgroundColor = "#333";
} else {
    document.body.style.backgroundColor = "#f0f0f0";
}

// Evento para cambiar el tema al hacer clic en el botón
const toggleThemeBtn = document.getElementById("toggle-theme-btn");
toggleThemeBtn.addEventListener("click", () => {
    let currentTheme = localStorage.getItem("theme");

    if (currentTheme === "oscuro") {
        localStorage.setItem("theme", "claro");
        document.body.style.backgroundColor = "#f0f0f0";
    } else {
        localStorage.setItem("theme", "oscuro");
        document.body.style.backgroundColor = "#333";
    }
});

// 🚀 Traer productos desde catalogo.json
fetch('./catalogo.json')
    .then(res => res.json())
    .then(productos => {
        mostrarProductos(productos);
        mostrarCarrito();
    })
    .catch(err => console.error('Error al cargar productos:', err));
