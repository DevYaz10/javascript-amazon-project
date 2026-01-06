import { renderOrderSummery } from "./checkout/orderSummery.js";
import { renderPaymentSummary } from "./checkout/paymentSummery.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import "../data/cart-class.js";
// import "../data/backend-practice.js";

Promise.all([
  new Promise((resolve) => {
  //? resolve is similar to done() function - let's u control when to go to the next step
  console.log("started loading");
  loadProducts(() => {
    resolve('value1'); //? this value is passed to the next .then() block
    });
  }),
  new Promise((resolve) => {
    loadCart(() => {
      resolve('value2');
    });
  })
])
.then((values) => {
  console.log(values);
  
  renderOrderSummery(); 
  renderPaymentSummary();
})
/*
//$ this is a promise and it runs the function immediately
//? Promise does the same job as the callback function but it's more readable and easier to debug
new Promise((resolve) => {
  //? resolve is similar to done() function - let's u control when to go to the next step
  console.log("started loading");
  loadProducts(() => {
    resolve('value'); //? this value is passed to the next .then() block
  });
})

.then((value) => { //? yes you can share values between .then() blocks
  console.log(value);
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });
})

.then(() => {
  renderOrderSummery();
  renderPaymentSummary();
});
*/

/*
// Render the summary as soon as the checkout page loads.
loadProducts(() => {
  loadCart(() => {
    renderOrderSummery();
    renderPaymentSummary();
  });
});
*/
