/**
 * 🖥 Sistema de Gestión de Productos completo usando arrays en memoria.
 * No hay base de datos real.
 * Incluye búsqueda, limpieza de resultados,
 * mostrar todo y pruebas unitarias.
 * 
 */


/**
 * Array principal de productos.
 * Simula nuestra base de datos.
 * @type {Array<{id:number, name:string, price:number, quantity:number}>}
 */
let products = [
    { id: 1, name: "Portatil", price: 1200, quantity: 5 },
    { id: 2, name: "Raton", price: 25, quantity: 20 },
    { id: 3, name: "Teclado", price: 45, quantity: 15 },
    { id: 4, name: "Monitor", price: 250, quantity: 5 },
    { id: 5, name: "Webcam", price: 40, quantity: 20 },
    { id: 6, name: "Auriculares", price: 65, quantity: 15 },
    { id: 7, name: "Cable USB", price: 15, quantity: 5 },
    { id: 8, name: "Modem", price: 75, quantity: 20 },
    { id: 9, name: "Pendrive", price: 25, quantity: 15 }
];

/**
 Genera el siguiente ID disponible automáticamente.
 * @type {number}
 */
let currentId = Math.max(...products.map(p => p.id)) + 1;


/**
 * Renderiza la tabla en pantalla.
 * Si no recibe parámetro, muestra todos los productos.
 *
 * @param {Array<{id:number, name:string, price:number, quantity:number}>} [productList=products]
 * Lista de productos a mostrar.
 */
function renderTable(productList = products) {

    const tbody = document.querySelector("#productTable tbody");
    tbody.innerHTML = "";

    productList.forEach(product => {
        const row = `
            <tr>
                <td>${product.name}</td>
                <td>${new Intl.NumberFormat('es-ES', {
                    style: 'currency',
                    currency: 'EUR'
                }).format(product.price)}</td>
                <td>${product.quantity}</td>
                <td>
                    <button onclick="editProduct(${product.id})">Editar</button>
                    <button onclick="deleteProduct(${product.id})">Eliminar</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}


/**
 * Guarda un producto.
 * Si tiene ID → actualiza.
 * Si no → crea uno nuevo.
 *
 * @returns {void}
 */
function saveProduct() {

    const id = document.getElementById("productId").value;
    const name = document.getElementById("name").value;
    const price = parseFloat(document.getElementById("price").value);
    const quantity = parseInt(document.getElementById("quantity").value);

    if (!name || isNaN(price) || isNaN(quantity)) {
        alert("Complete todos los campos correctamente");
        return;
    }

    if (id) {
        updateProduct(parseInt(id), name, price, quantity);
    } else {
        products.push({ id: currentId++, name, price, quantity });
    }

    clearForm();
    renderTable();
}


/**
 * Carga los datos del producto en el formulario para editar.
 *
 * @param {number} id - ID del producto a editar.
 * @returns {void}
 */
function editProduct(id) {

    const product = products.find(p => p.id === id);

    if (product) {
        document.getElementById("productId").value = product.id;
        document.getElementById("name").value = product.name;
        document.getElementById("price").value = product.price;
        document.getElementById("quantity").value = product.quantity;
    }
}


/**
 * Actualiza un producto existente usando .map().
 *
 * @param {number} id - ID del producto.
 * @param {string} newName - Nuevo nombre.
 * @param {number} newPrice - Nuevo precio.
 * @param {number} newQuantity - Nueva cantidad.
 * @returns {void}
 */
function updateProduct(id, newName, newPrice, newQuantity) {

    products = products.map(product =>
        product.id === id
            ? { ...product, name: newName, price: newPrice, quantity: newQuantity }
            : product
    );
}


/**
 * Elimina un producto por su ID.
 *
 * @param {number} id - ID del producto a eliminar.
 * @returns {void}
 */
function deleteProduct(id) {

    products = products.filter(product => product.id !== id);
    renderTable();
}


/**
 * Filtra productos por nombre.
 * No distingue mayúsculas/minúsculas.
 *
 * @returns {void}
 */
function filterProducts() {

    const searchTerm = document.getElementById("searchInput").value.toLowerCase();

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
    );

    renderTable(filtered);
}


/**
 * Limpia el campo de búsqueda y deja la tabla vacía.
 *
 * @returns {void}
 */
function clearSearch() {

    document.getElementById("searchInput").value = "";

    const tbody = document.querySelector("#productTable tbody");
    tbody.innerHTML = "";
}


/**
 * Muestra todos los productos nuevamente.
 *
 * @returns {void}
 */
function showAllProducts() {
    renderTable();
}


/**
 * Limpia el formulario después de guardar o editar.
 *
 * @returns {void}
 */
function clearForm() {
    document.getElementById("productId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("quantity").value = "";
}


/* =====================================================
   🧪 PRUEBAS UNITARIAS
===================================================== */

/**
 * Prueba que agregar producto aumente el array.
 */
function testAddProduct() {

    const initialLength = products.length;
    products.push({ id: 9999, name: "Test", price: 10, quantity: 1 });

    console.assert(
        products.length === initialLength + 1,
        "❌ Error al agregar producto"
    );
}


/**
 * Prueba que modificar producto cambie los valores.
 */
function testUpdateProduct() {

    updateProduct(9999, "TestModificado", 20, 5);

    const product = products.find(p => p.id === 9999);

    console.assert(
        product.name === "TestModificado",
        "❌ Error al modificar producto"
    );
}


/**
 * Prueba que eliminar producto lo quite del array.
 */
function testDeleteProduct() {

    deleteProduct(9999);

    const product = products.find(p => p.id === 9999);

    console.assert(
        product === undefined,
        "❌ Error al eliminar producto"
    );
}


/**
 * Prueba que el filtrado devuelva resultados correctos.
 */
function testFilterProducts() {

    const result = products.filter(p =>
        p.name.toLowerCase().includes("raton")
    );

    console.assert(
        result.length > 0,
        "❌ Error en filtrado"
    );
}


/**
 * Ejecuta todas las pruebas unitarias.
 */
function runTests() {
    console.log("🚀 Ejecutando pruebas unitarias...");
    testAddProduct();
    testUpdateProduct();
    testDeleteProduct();
    testFilterProducts();
    console.log("✅ Pruebas finalizadas");
}

runTests();

document.addEventListener("DOMContentLoaded", renderTable);