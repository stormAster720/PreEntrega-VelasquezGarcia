const jsonUrl = './src/data/stock.json';

// Load product data from a JSON file
fetch(jsonUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return response.json();
    })
    .then(dataArray => {
        // Push the fetched JSON products to the products array
        products.push(...dataArray);

        Swal.fire({
            title: 'Por favor espere',
            icon: 'warning',
            html: 'Estamos cargando los productos de nuestro stock, espere unos segundos',
            showCancelButton: false,
            showCloseButton: false,
            didOpen: () => {
                Swal.showLoading();
                // Call the function to render products one by one
                renderProductsOneByOne(products);
            }
        });
    })
    .catch(error => {
        console.error('An error ocurred:', error);
    });

// Function to render products one by one
const renderProductsOneByOne = async (products) => {
    for (const product of products) {
        await new Promise(resolve => {
            setTimeout(() => {
                // Render the current product
                initializeDOM([product]); 
                resolve();
            }, 100);
        });
    }
    Swal.close(); // Close the loading message after all products are rendered
};

const initializeDOM = (products) => {
    // Render products
    renderProducts(products);
    // Retrieve cart info
    retrieveCart();
};