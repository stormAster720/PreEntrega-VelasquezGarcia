let subtotal = 0;
let total = 0;

const subtotalDOM = document.getElementById("cart__subtotal");
const totalDOM = document.getElementById("cart__total");

const payCartDOM = document.querySelector(".cart--payButton");
const clearCartDOM = document.querySelector(".cart--clearButton");

const cartDOM = document.querySelector(".cart");
const cartCloseDOM = document.querySelector(".cart__buttons--close")

const handleCartOpening = () => {
    //Open cart logic
    cartDOM.style.display = "block";
}

//Close cart logic
cartCloseDOM.addEventListener("click", function () {
    cartDOM.style.display = "none";
});


//An array that keeps track of the products on stock
const products = [];

//An array that keeps track of the products added to the cart
const productsOnCart = [];
//An array that keeps track of the DOM
const containerArray = [];

//An object that represents a DOM item
function DOMItem(productName, container) {
    this.productName = productName;
    this.container = container;
}

//Generate order ID after purchase
const generateID = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}


// Async funtion to handle cart payment
const payCart = async () => {
    if (subtotal > 0 || productsOnCart.length > 0) {
        await Swal.fire({
            title: '¡Pago efectuado con éxito!',
            icon: 'success',
            html: `Gracias por su compra, en unos minutos llegará su pedido a su domicilio, su código de confirmación de compra es <strong>${generateID(5).toUpperCase()}</strong>`
            //Clear cart after paying  
        }).then(clearCart())

    } else {
        await Swal.fire({
            title: 'No hay elementos en el carrito',
            text: 'Por favor agregue productos al carrito para procesar su orden.',
            icon: 'warning',
        });
    }
};

//Pay cart logic 
payCartDOM.addEventListener("click", async () => {
    await payCart();
});


const clearCart = () => {
    for (let i = 0; i < productsOnCart.length; i++) {
        subtotal -= productsOnCart[i].price * productsOnCart[i].quantity;
        total = (subtotal * 0.15) + subtotal;

        subtotalDOM.textContent = "Subtotal: $" + subtotal.toLocaleString();
        totalDOM.textContent = "Total (tax 15%): $" + total.toLocaleString();
    }
    productsOnCart.splice(0, productsOnCart.length);

    for (let i = 0; i < containerArray.length; i++) {
        containerArray[i].container.remove();
    }
    containerArray.splice(0, containerArray.length);

    //Set the values of the cart on the local storage 
    localStorage.setItem('cart', JSON.stringify(productsOnCart));
};


clearCartDOM.addEventListener("click", clearCart)

//push a product to the cart and set its quantity
const addToCart = (product, quantity) => {
    if (checkAvailability(product) && !containerArray.some(item => item.productName === product.name)) {
        productsOnCart.push(product);
        addToDOM(product, quantity);
    }

    subtotal += product.price * quantity;
    total = (subtotal * 0.15) + subtotal;

    subtotalDOM.textContent = "Subtotal: $" + subtotal.toLocaleString();
    totalDOM.textContent = "Total (tax 15%): $" + total.toLocaleString();
};

const saveCartToJSON = (product, quantity) => {
    //Set the values of the cart on the local storage 
    updateDOMQuantity(product, quantity)
    localStorage.setItem('cart', JSON.stringify(productsOnCart));
};

const updateDOMQuantity = (product, quantity) => {
    const found = productsOnCart.find(current => current.name === product.name);
    found.quantity += quantity;

    //Get the index of the product on the cart that matches the product name
    const index = productsOnCart.indexOf(found);
    containerArray[index].container.querySelector(".cart__content--element--text p:last-child").textContent = `Cantidad: ${found.quantity}`;
};

const checkAvailability = (product) => {
    const predicate = !productsOnCart.includes(product) ? true : false;
    return predicate;
};

const addToDOM = (product, quantity) => {
    const itemContainer = document.querySelector(".cart__content");

    // Check if the product already exists in the containerArray
    const existingProduct = containerArray.find(item => item.productName === product.name);

    if (existingProduct) {
        // Product already exists in the cart, update the quantity in the DOM
        const quantityElement = existingProduct.container.querySelector(".cart__content--element--text p:last-child");
        const updatedQuantity = Math.max(existingProduct.product.quantity, quantity);
        quantityElement.textContent = `Cantidad: ${updatedQuantity}`;
    } else {
        // Product does not exist in the cart, create a new entry in the DOM
        const container = document.createElement("div");
        container.classList.add("cart__content--element");
        container.innerHTML = `
            <div class="cart__content--element--leftSide">
                <img src="${product.image}" alt="">
                <div class="cart__content--element--text">
                    <p id="productPrice"><strong>${product.name}</strong></p>
                    <p>Precio: $${product.price}</p>
                    <p>Cantidad: ${Math.max(product.quantity, quantity)}</p>
                </div>
            </div>
            <button class="cart--removeElementBtn"> x </button>
        `;

        const removeFromCartBtn = container.querySelector(".cart--removeElementBtn");
        itemContainer.appendChild(container);

        containerArray.push(new DOMItem(product.name, container));

        removeFromCartBtn.addEventListener("click", () => {
            removeFromCart(product);
        });
    }
};


// Remove from cart function
const removeFromCart = async (product) => {
    subtotal -= product.price * product.quantity;
    total = (subtotal * 0.15) + subtotal;

    subtotalDOM.textContent = "Subtotal: $" + subtotal.toLocaleString();
    totalDOM.textContent = "Total (tax 15%): $" + total.toLocaleString();

    try {
        // Assuming Toastify returns a promise
        await Toastify({
            text: `El producto "${product.name}" ha sido removido del carrito`,
            duration: 2000,
            position: "left",
            style: {
                color: "black",
                background: "white",
            },
        }).showToast();

        removeFromDOM(product);
        const index = productsOnCart.indexOf(product);
        productsOnCart[index].quantity = 0;
        productsOnCart.splice(index, 1);

        // Set the values of the cart on the local storage
        localStorage.setItem('cart', JSON.stringify(productsOnCart));
    } catch (error) {
        console.error('Error while removing from cart:', error);
    }
};

const removeFromDOM = (product) => {
    const index = containerArray.findIndex((current) => current.productName === product.name);
    containerArray[index].container.remove();
    containerArray.splice(index, 1);
};

//Get cart info in a asyncronous way
const retrieveCart = async () => {
    try {
        const cartJSON = localStorage.getItem('cart');
        const cartItems = JSON.parse(cartJSON);

        for (const item of cartItems) {
            await addToCart(item, item.quantity);
        }
    } catch (error) {
        console.error('Error retrieving cart:', error);
    }
};



