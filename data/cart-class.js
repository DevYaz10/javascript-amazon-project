//# this is an example of Object-Oriented Programing which makes it easy to make multiple of the same objects
//! but here we will use classes which is a better way to do it

//? Class is basiclly an object generator and it's much cleaner than functions
class Cart {
  cartItems;
  #localStorageKey; //? private property: means it can't be accessed from outside the class
  //  line 88-92

  //? constructor is a special method that is a set up for the class
  constructor(localStorageKey) {
    // set the localStorageKey for each cart
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage(); // makes a private method 
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

    if (!this.cartItems) {
      this.cartItems = [
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
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity++;
    } else {
      this.cartItems.push({
        productId,
        quantity: 1,
        deliveryOptionId: "1",
      });
    }
    this.saveToStorage();
  }

  removeFromCart(productId) {
    this.cartItems = this.cartItems.filter(
      (cartItem) => cartItem.productId !== productId
    );
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }
}

//$ create as many cart "instances" as you need
//? the values inside here will be considered the values for the constructor
const cart = new Cart("cart-oop");
const buisnessCart = new Cart("cart-buisness");

//? now if we try to access the localStorageKey it will throw an error
// console.log(cart.#localStorageKey);
// console.log(buisnessCart.#localStorageKey);
//! this makes it much safer

console.log(cart);
console.log(buisnessCart);
console.log(buisnessCart instanceof Cart);
