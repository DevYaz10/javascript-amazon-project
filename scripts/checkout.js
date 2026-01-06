import { renderOrderSummery } from "./checkout/orderSummery.js";
import { renderPaymentSummary } from "./checkout/paymentSummery.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import "../data/cart-class.js";
// import "../data/backend-practice.js";

loadPageAsync();

//! we won't be using promises anymore, we'll be using async/await
/*
Promise.all([
  loadProductsFetch(),

//! this is the old way of doing it with callbacks
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
*/

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

//# this is an async function that returns a promise (it's like a wrapper for a promise)
//$ shorter and more clean code
async function loadPageAsync() {
  try {

    // throw 'error1';  //$this is manually creating an error (throwing an error to catch)
    //? throwing an error skips the rest of the code in the try block and goes straightto the catch block

    await loadProductsFetch(); //? u can only use await inside an async function
    //? sidenote: the closest function to await MUST be async... u can't use await inside a regular function
    
    const value3 = await new Promise((resolve, reject) => {
      // throw 'error2'; //? try this and u will skip the whole loadCart function
      loadCart(() => {
        // reject('error3'); //? throw does not work in the future that's why we use reject
        resolve('value3'); //? here we can just save the value in a variable i.e. the value3 variable
      });
    })
  } catch (error) {
    console.log("Unexpected error: please try again later.", error);
  } // u can only use try and catch together 
    //$ u use try/catch to handle errors in (stuff that would probably throw an "unexpected" error like API calls)
    //$ API call: it's a request to a server to get some data
    //$ try/catch can be used in normal code too!! 
  
  console.log("load page");
  
  renderOrderSummery();
  renderPaymentSummary();
  
  return 'value2'; //same as resolve('value2')
}

//! the long way of doing it with promises
function loadPage() {
  return new Promise((resolve) => {
    console.log("load page");
  })
  
  .then(() => {
    return loadProductsFetch();
  })
  
  .then(() => {
    resolve('value2'); //same as return 'value2';
  })
}

