import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe("test suite: addToCart", () => {
  it("adds an existing product to the cart", () => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
        return JSON.stringify([{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: "1",
      }])
    });
    loadFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
    expect(cart.length).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
    expect(cart[0].quantity).toEqual(2)
  });

  it("adds a new product to the cart", () => {  //! this test is doomed to failure because there is already default products in the cart when it's empty 
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
        return JSON.stringify([])
    });
    
    loadFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
    expect(cart.length).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
    expect(cart[0].quantity).toEqual(1)
  })
}); //? if it didn't fail try localStorage.clear() in the console

//$ this is a Flakey test: a test that sometimes passes and sometimes fails even if we don't change the code

//? Spies/mocks: spyOn replaces a real method during the test so you control and inspect behavior. callFake lets you return custom data.