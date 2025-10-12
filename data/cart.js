export const cart = [];

export function addToCart(productId, productPrice) {
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
      productPrice,
      quantity: 1,
    });
  }
  console.log(cart);
}
// [addToCart](#anchor4)
