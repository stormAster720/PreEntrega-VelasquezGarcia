//Variables
let clientName = "";
let subtotal = 0;

//Return the user name provided earlier with the first char as uppercase
const returnUserName = () => { return clientName.charAt(0).toUpperCase() + clientName.slice(1) }

//Add a product to cart while also returning the product name
const addToCart = (product) => {

    switch (parseInt(product)) {
        case 1:
            subtotal += 1500;
            return "Papa";
        case 2:
            subtotal += 500;
            return "Cebolla";
        case 3:
            subtotal += 800;
            return "Tomate";
        case 4:
            subtotal += 2000;
            return "Aguacate";
        case 5:
            subtotal += 1700;
            return "Yuca";
        case 6:
            subtotal += 2500;
            return "Doritos";
        case 7:
            subtotal += 2000;
            return "Atún";
        case 8:
            subtotal += 1000;
            return "Agua en botella plastica";
        case 9:
            subtotal += 900;
            return "Jugo en caja";
    }
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
    let productIndex = 0;
    let shoppingCancelled = false;

    alert(`Un gusto, "${returnUserName()}", a continuación le mostramos nuestro catálogo actual de productos.`);

    do {
        // Keep prompting until a valid input is provided
        while (true) {
            productIndex = prompt(`Por favor escriba el número del producto que desea (solo 1 producto a la vez). 
  
        1. Papa ($1500)
        2. Cebolla ($500)
        3. Tomate ($800)
        4. Aguacate ($2000)
        5. Yuca ($1700)
        6. Doritos ($2500)
        7. Atún ($2000)
        8. Agua en botella plástica ($1000)
        9. Jugo en caja ($900)`);

            // Break the loop if the user cancels the prompt
            if (productIndex === null) {
                keepShopping = false;
                shoppingCancelled = true;
                cancelShopping();
                break;
            }

            // Valid input provided, exit the loop
            if (productIndex !== "" && !isNaN(productIndex) && parseInt(productIndex) > 0 && productIndex.toString().length < 2) {
                break;
            }

            //If the input is invalid, just show the error message
            alert("El valor que ingresado no es válido, asegurese de escribir un solo número y recuerde que no se pueden escribir letras letras, así mismo asegurese de no dejar el campo vacío.");
        }

        if (keepShopping) {

            alert(`El producto "${addToCart(productIndex)}" ha sido agregado con exito, su subtotal es $${parseInt(subtotal)}`);
            keepShopping = confirm("¿Desea seguir agregando productos?");
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
    
Gracias por comprar con nosotros, vuelva pronto!`);
}

//Code start

//Welcome message
alert("Bienvenido a la tienda improvisada El Lucho, sientase libre de explorar nuestro catalogo y escoger el producto que desea.");

promptClientName();


