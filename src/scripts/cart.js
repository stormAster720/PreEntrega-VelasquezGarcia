let subtotal = 0;
let total = 0;

const subtotalDOM = document.getElementById("cart__subtotal");
const totalDOM = document.getElementById("cart__total");

const payCartDOM = document.querySelector(".cart--payButton");
const clearCartDOM = document.querySelector(".cart--clearButton");

//Cart display
const alertDOM = document.getElementById("product__alert");
const alertLink = document.querySelector(".alert-link");

const cartDOM = document.querySelector(".cart");
const cartCloseDOM = document.querySelector(".cart__buttons--close")

//Close cart logic
cartCloseDOM.addEventListener("click", function() {
    cartDOM.style.display = "none";
    });

//Open cart logic
alertLink.addEventListener("click", function() {
cartDOM.style.display = "block";
});


const updateAlert = (product) => {
    alertDOM.textContent = product.name;
}


//An array that keeps track of the products added to the cart
const productsOnCart = [];
//An array that keeps track of the DOM
const containerArray = [];

// modal

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


//An object that represents a DOM item
function DOMItem(productName, container) {
    this.productName = productName;
    this.container = container;
}

const payCart = () => {
    modal.style.display = "block";
    cartDOM.style.display = "none"
    clearCart();
};

//Pay cart logic 

payCartDOM.addEventListener("click",  payCart);


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

    updateAlert(product);
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


const removeFromCart = (product) => {
    subtotal -= product.price * (product.quantity);
    total = (subtotal * 0.15) + subtotal;

    subtotalDOM.textContent = "Subtotal: $" + subtotal.toLocaleString();
    totalDOM.textContent = "Total (tax 15%): $" + total.toLocaleString();
    removeFromDOM(product);
    const index = productsOnCart.indexOf(product);
    productsOnCart[index].quantity = 0;
    productsOnCart.splice(index, 1);

    //Set the values of the cart on the local storage 
    localStorage.setItem('cart', JSON.stringify(productsOnCart));
};

const removeFromDOM = (product) => {
    const index = containerArray.findIndex((current) => current.productName === product.name);
    containerArray[index].container.remove();
    containerArray.splice(index, 1);
};

const retrieveCart = () => {

    const cartJSON = localStorage.getItem('cart');
    const cartItems = JSON.parse(cartJSON);

    cartItems.forEach(item => {
        addToCart(item, item.quantity);
    });
};

