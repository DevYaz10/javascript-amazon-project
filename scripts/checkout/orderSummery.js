// Import cart state helpers, product catalog access, delivery data helpers, currency formatting, and date utilities.
import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { getProducts } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.7/esm/index.js";
// dayjs is exported as the default module, so we import it without curly braces.
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
// Render the entire order summary section based on the current cart state.
import { renderPaymentSummary } from "./paymentSummery.js";

export function renderOrderSummery() {
  // Start with an empty string that will accumulate the markup for each cart item.
  let cartSummeryHTML = "";

  // Iterate over each item in the cart, generating its markup and appending it to the total.
  cart.forEach((cartItem) => {
    // Retrieve the product information associated with this cart entry.
    const matchingProduct = getProducts(cartItem.productId);
    // Look up the delivery option currently selected for this item.
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
    const today = dayjs();
    // Compute the formatted delivery date shown to the shopper.
    const deliveryDateFormatted = today
      .add(deliveryOption.deliveryDays, "days")
      .format("dddd, MMMM D");

    // Append the markup for the item, including controls and delivery choices.
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

  // Inject the assembled markup into the order summary container in the DOM.
  const orderSummaryElement = document.querySelector(".js-order-summary");
  orderSummaryElement.innerHTML = cartSummeryHTML;
  // Bind delete handlers so removing an item updates storage and the rendered view.
  orderSummaryElement
    .querySelectorAll(".js-delete-quantity-link")
    .forEach((link) => {
      link.addEventListener("click", () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);
        renderOrderSummery();
        renderPaymentSummary();
      });
    });

  // Bind delivery option handlers so the selected shipping choice is saved and reflected.
  orderSummaryElement
    .querySelectorAll(".js-delivery-option")
    .forEach((element) => {
      element.addEventListener("click", () => {
        // Destructure the identifiers stored in data attributes for readability.
        const { productId, deliveryOptionId } = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummery();
        renderPaymentSummary();
      });
    });
}


// Generate the delivery option markup for a single product line item.
function deliveryOptionsHTML(matchingProduct, cartItem) {
  // Collect the HTML for each delivery option, marking the selected one as checked.
  let html = "";
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    // Compute the date label shown next to each delivery option.
    const deliveryDateFormatted = today
      .add(deliveryOption.deliveryDays, "days")
      .format("dddd, MMMM D");
    // Convert the price into a readable string, treating zero-cost shipping as FREE.
    const priceString =
      deliveryOption.priceCents === 0
        ? "FREE"
        : `$${formatCurrency(deliveryOption.priceCents)}`;
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
    // Build the radio button markup for this delivery option.
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