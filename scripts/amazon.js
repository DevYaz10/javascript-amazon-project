// Import shared cart helpers and product data for the storefront page.
import  * as cartModule  from "../data/cart.js";
import { products } from "../data/products.js";
// Accumulate product HTML so we can inject it into the DOM in one operation.
let productsHTML = "";

// Render each product card with image, rating, price, and add-to-cart button.
products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
        <div class="product-image-container">
        <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
        ${product.name}
        </div>

        <div class="product-rating-container">
        <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
        <div class="product-rating-count link-primary">
            ${product.rating.count}
        </div>
        </div>

        <div class="product-price">
        ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
        <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
        </div>

        ${product.extrainfoHTML()} 
        
        <!--
        this is called polymorphism (it's when a method has the same name but different implementation)
        it's kinda like using if statement to check the type of the object and then calling the appropriate method
        -->
        
        <div class="product-spacer"></div>

        <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" 
        data-product-id="${product.id}">
        Add to Cart
        </button>
    </div>`; // the "data" attribute above it an HTML attribute that starts with "data-" then any name of choice (kebab-case)
}); // this data attribute is used to attach any information to an element
// [data](#anchor3)
// Inject all product cards into the page at once.
document.querySelector(".js-products-grid").innerHTML = productsHTML;

//# the who add-t-cart function
// Attach click listeners that add the selected product to the cart and update the badge.
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId; 
                                      // [data](anchor3)
    cartModule.addToCart(productId); //$ adding item to the array
    //[addToCart](anchor4)
    
    
    //$ updating the cart sign
    let cartQuantity = 0;
        cartModule.cart.forEach((item) => {
            cartQuantity += item.quantity;
        });
        document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
        console.log(cartQuantity); 

  });
});
