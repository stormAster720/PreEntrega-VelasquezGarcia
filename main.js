//Variables
let clientName = "";
let subtotal = 0;

//Return the user name provided earlier with the first char as uppercase
const returnUserName = () => { return clientName.charAt(0).toUpperCase() + clientName.slice(1) }

//An array that contains the products added to the cart
const productsInCart = [];

//Add a product to cart while also returning the product name
const addToCart = (productName) => {
    const product = products.find(current => current.name.toLowerCase() === productName.toLowerCase() || current.id === parseInt(productName));
    productsInCart.push(product);
    subtotal += product.price;
};

//returns true if the product name or id exists in the product stock
const getProductFromStock = (product) => {
    const productFound = products.some(current => current.name.toLowerCase() === product.toLowerCase() || current.id === parseInt(product))
    return productFound;
}

//Self explanatory
const promptClientName = () => {
    while (clientName === "") {
        clientName = prompt("Antes de comenzar, ¿podria decirnos su nombre? asi nos resultara mas sencillo referirnos a usted.");

        if (clientName !== "") {
            showProductCatalog();
        } else {
            alert("El nombre que ha ingresado no es válido, por favor asegurese de no dejar el campo vacio.");
        }
    }
}

//Self explanatory
const showProductCatalog = () => {
    let keepShopping = true;
    let promptedProduct = 0;
    let shoppingCancelled = false;

    alert(`Un gusto, "${returnUserName()}", a continuación le mostramos nuestro catálogo actual de productos.`);

    //Map all the products into a string and display it inside the prompt as an option
    let promptOptions = products.map((product, index) => `${index + 1}. ${product.name} ($${product.price})`).join("\n");

    do {
        // Keep prompting until a valid input is provided
        while (true) {
            promptedProduct = prompt(`Por favor escriba el nombre del producto que desea o el numero del producto (solo 1 producto a la vez).

${promptOptions}
0. Pagar los elementos del carrito (su subtotal actual es $${subtotal})`);

            // Break the loop if the user cancels the prompt
            if (promptedProduct === null) {
                keepShopping = false;
                shoppingCancelled = true;
                cancelShopping();
                break;
            }

            // Valid input provided, exit the loop
            if (promptedProduct !== "" && getProductFromStock(promptedProduct) || promptedProduct == 0) {
                break;
            }

            //If the input is invalid, just show the error message
            alert("El valor que ingresado no es válido, asegurese de escribir un nombre o numero de producto valido, así mismo asegurese de no dejar el campo vacío.");
        }

        //Adds a product to the cart and retrieves it's last value on the added products array to display it
        if (keepShopping && promptedProduct != 0) {
            addToCart(promptedProduct);
            alert(`El producto "${productsInCart[productsInCart.length - 1].name}" ha sido agregado con exito, su subtotal es $${parseInt(subtotal)}`);
            keepShopping = confirm("¿Desea seguir agregando productos?");
        } else
            //If the user writes 0, it will trigger a payment condition
            if (promptedProduct == 0) {
                if (subtotal <= 0) {
                    alert(`No tiene nada pendiente por pagar, por favor agregue productos al carrito`);
                } else {
                    //If the user has products added to the cart, then let him decide if he wants to pay for them right away
                    if (confirm(`¿Esta seguro de que quiere pagar sus productos ahora mismo?`)) {
                        break;
                    }
                }
            }
    } while (keepShopping);

    if (!shoppingCancelled) {
        concludeShopping();
    }
}
//Show a cancel alert when a user clicks the cancel button
const cancelShopping = () => {
    alert("La compra ha sido cancelada, por favor recargue el sitio para empezar de nuevo.");
}

//Performs the calculation of the total taking in account a tax value 
const concludeShopping = () => {

    //Calc taxes (15%)
    let total = subtotal * 0.15;
    total += subtotal;

    alert(`Señor / Señora "${returnUserName()}", su subtotal es $${subtotal} y aplicando el iva (15%), su total es $${total}. 
    
Gracias por comprar con nosotros ¡vuelva pronto!`);
}

//Code start

//Welcome message
alert("Bienvenido a la tienda improvisada El Lucho, sientase libre de explorar nuestro catalogo y escoger el producto que desea.");

promptClientName();


