import { renderOrderSummery } from "./checkout/orderSummery.js";
import { renderPaymentSummary } from "./checkout/paymentSummery.js";
import { loadProducts } from "../data/products.js";
// import "../data/cart-class.js";
// import "../data/backend-practice.js";

// Render the summary as soon as the checkout page loads.
loadProducts(() => {
    renderOrderSummery();
    renderPaymentSummary();
});
