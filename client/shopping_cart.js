const sessionStorage = require('sessionstorage');

const shoppingCart = function () {
  let cart = [];

  // constructor function
  function Item(price, count) {
    this.price = price;
    this.count = count;
  }

  // saving the carr
  function saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }

  // loading the cart
  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
  }
  if (sessionStorage.getItem('shoppingCart') != null) {
    loadCart();
  }

  // public methods and properties
  const obj = {};

  // add to cart
  obj.addItemToCart = function (price, count) {
    for (const item of cart) {
      if (cart[item].price === price) {
        cart[item].count++;
        saveCart();
        return;
      }
    }
    const item = new Item(price, count);
    cart.push(item);
    saveCart();
  };
  obj.setCountForItem = function(price, count) {
    for (const i of cart) {
      if (cart[i].price === price) {
        cart[i].count = count;
        break;
      }
    }
  };
  obj.removeItemFromCart = function
};
