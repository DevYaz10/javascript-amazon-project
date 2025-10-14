// Load the persisted cart so product and checkout pages stay in sync.
export let cart = JSON.parse(localStorage.getItem("cart"));

// Seed a starter cart when nothing is saved yet so the UI has sample items.
if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: "1",
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: "2",
    },
  ];
}

// Write the latest cart state back to localStorage.
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add a product or increment its quantity, then persist the update.
export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity++;
  } else {
    cart.push({
      productId,
      quantity: 1,
      deliveryOptionId: "1",
    });
  }
  saveToStorage();
}
// [addToCart](#anchor4)

// Remove a product from the cart and persist the result.
export function removeFromCart(productId) {
  cart = cart.filter((cartItem) => cartItem.productId !== productId);
  saveToStorage();
}

//! this is a trashy & long way of doing the filter function
// export function removeFromCart(productId) {
//   const newCart = [];

//   cart.forEach((cartItem) => {
//     if (cartItem.productId !== productId) {
//       newCart.push(cartItem);
//     }
//   });

//   cart = newCart
// }

// [removeFromCart](#anchor5)

// Record the selected delivery option for a product and sync storage.
export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}
