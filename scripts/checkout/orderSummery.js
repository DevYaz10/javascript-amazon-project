// Pull in cart state, product catalog, delivery options, formatter, and dayjs helpers.
import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.7/esm/index.js";
//? not using {} is a "Default Export"; it's another way to export something from a file, we use it when export only one thing from a file
import { deliveryOptions } from "../../data/deliveryOptions.js";


export function renderOrderSummery() {
  // Build markup for each item currently in the cart.
  let cartSummeryHTML = "";

  cart.forEach((cartItem) => {
    // Pair the cart item with its product details.
    const matchingProduct = products.find(
      (product) => product.id === cartItem.productId
    );
    // Read the selected delivery option so we can show shipping info.
    const deliveryOption = deliveryOptions.find(
      (option) => option.id === cartItem.deliveryOptionId
    );
    const today = dayjs();
    const deliveryDateFormatted = today
      .add(deliveryOption.deliveryDays, "days")
      .format("dddd, MMMM D");

    cartSummeryHTML += `
    <div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
      <div class="delivery-date">
        Delivery date: ${deliveryDateFormatted}
      </div>
      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">
        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link 
            js-delete-quantity-link 
            link-primary"
            data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>
        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
      `;
  });

  // Paint the assembled markup into the order summary container.
  const orderSummaryElement = document.querySelector(".js-order-summary");
  orderSummaryElement.innerHTML = cartSummeryHTML;
  // Attach delete handlers so removing an item updates storage and the UI.
  orderSummaryElement
    .querySelectorAll(".js-delete-quantity-link")
    .forEach((link) => {
      link.addEventListener("click", () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);
        renderOrderSummery();
      });
    });

  // Attach delivery option handlers to save the selection and refresh the UI.
  orderSummaryElement
    .querySelectorAll(".js-delivery-option")
    .forEach((element) => {
      element.addEventListener("click", () => {
        const { productId, deliveryOptionId } = element.dataset; //? this is a short hand version
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummery();
      });
    });
}


function deliveryOptionsHTML(matchingProduct, cartItem) {
  // Build the list of delivery options with the correct radio selected.
  let html = "";
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDateFormatted = today
      .add(deliveryOption.deliveryDays, "days")
      .format("dddd, MMMM D");
    const priceString =
      deliveryOption.priceCents === 0
        ? "FREE"
        : `$${formatCurrency(deliveryOption.priceCents)}`; //# this thing is like an if statement but you can save it to a variable
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
    html += `
    <div class="delivery-option js-delivery-option"
    data-product-id="${matchingProduct.id}"
    data-delivery-option-id="${deliveryOption.id}">
      <input type="radio"
      ${isChecked ? "checked" : ""}
      class="delivery-option-input"
      name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
          ${deliveryDateFormatted}
          </div>
          <div class="delivery-option-price">
          ${priceString} - Shipping
          </div>
        </div>
    </div>
    `;
  });
  return html;
}

//# Search for MVC MODEL - VIEW - CONTROLLER