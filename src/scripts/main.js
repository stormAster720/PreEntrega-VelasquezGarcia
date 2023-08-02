
//Return the user name provided earlier with the first char as uppercase
const returnUserName = () => { return clientName.charAt(0).toUpperCase() + clientName.slice(1) }

//render store products

const initializeDOM = (products) => {

    document.addEventListener(`DOMContentLoaded`, renderProducts(products));
    document.addEventListener(`DOMContentLoaded`, retrieveCart());
};

initializeDOM(products);