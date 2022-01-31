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
};
