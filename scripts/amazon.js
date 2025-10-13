import  * as cartModule  from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
let productsHTML = "";

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
            src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
            ${product.rating.count}
        </div>
        </div>

        <div class="product-price">
        $${formatCurrency(product.priceCents)}
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
document.querySelector(".js-products-grid").innerHTML = productsHTML;

//# the who add-t-cart function
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
