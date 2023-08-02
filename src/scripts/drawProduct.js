const renderProducts = (data) => {
    const itemContainer = document.querySelector(".catalog__content");
  
    data.forEach((item) => {
      const container = document.createElement("div");
      container.classList.add("catalog__content--item");
      container.innerHTML += `
        <img src="${item.image}" alt="">
        <p id="product__name"> ${item.name} </p>
        <p id="product__price"> $${item.price}</p>
        <p class="catalog--quanity-text"> 1 </p>
  
        <div class="catalog__content--item--buttons">
            <button class="catalog--removeQuantity"> - </button>
            <button class="catalog--addToCart"> Añadir al carrito</button>
            <button class="catalog--addQuantity"> + </button>
        </div>
      `;
  
      // Get the buttons within the container and add event listeners

      let quantity = 1;
      const quantityText = container.querySelector(".catalog--quanity-text");
     

      const addToCartBtn = container.querySelector(".catalog--addToCart");
      const removeQuantityBtn = container.querySelector(".catalog--removeQuantity");
      const addQuantityBtn = container.querySelector(".catalog--addQuantity");
  
      // Add event listeners to the buttons
      addToCartBtn.addEventListener("click", () => {
        // Add logic for the "Añadir al carrito" button
          addToCart(item, quantity);
          saveCartToJSON(item, quantity);
      });
  
      removeQuantityBtn.addEventListener("click", () => {
        // Add logic for the "-" button to decrease quantity
        quantity = Math.max(1, quantity - 1); // Ensure quantity doesn't go below 1
        quantityText.textContent = quantity;

      });
  
      addQuantityBtn.addEventListener("click", () => {
        // Add logic for the "+" button to increase quantity
        quantity += 1;
        quantityText.textContent = quantity;

      });
  
      itemContainer.appendChild(container);
    });
  };