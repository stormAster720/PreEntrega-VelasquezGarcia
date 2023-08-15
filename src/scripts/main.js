const jsonUrl = './src/data/stock.json';

// Load product data from a JSON file
fetch(jsonUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
        }
        return response.json()
    })
    .then(dataArray => {
        // push the fetched JSON products to the products array
        products.push(...dataArray);
        Swal.fire({
            title: 'Por favor espere',
            icon: 'warning',
            html: 'Estamos cargando los productos de nuestro stock, espere unos segundos',
            showCancelButton: false,
            showCloseButton: false,
            timer: 2000,
            didOpen: () => {
                Swal.showLoading()
            },
         
        })

        new Promise((resolve) => {
            setTimeout(() => {
               resolve(initializeDOM(products))
            }, 1000);
        })
    })
    .catch(error => {
        console.error('An error ocurred:', error);
    });

const initializeDOM = (products) => {
    document.addEventListener(`DOMContentLoaded`, renderProducts(products));
    document.addEventListener(`DOMContentLoaded`, retrieveCart());
};