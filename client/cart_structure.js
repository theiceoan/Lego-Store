const sessionStorage = require('sessionstorage');

export const shoppingCart = function () {
  let cart = [];

  // constructor function
  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }

  // saving the cart
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
  obj.addItemToCart = function (name, price, count) {
    for (const item of cart) {
      if (cart[item].name === name) {
        cart[item].count++;
        saveCart();
        return;
      }
    }
    const item = new Item(name, price, count);
    cart.push(item);
    saveCart();
  };
  obj.setCountForItem = function (name, count) {
    for (const i of cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };
  obj.removeItemFromCart = function (name) {
    for (const item of cart) {
      if (cart[item].name === name) {
        cart[item].count--;
        if (cart[item].count === 0) {
          cart.splice(item, 1);
        }
        break;
      }
    }
    saveCart();
  };
  // clear cart
  obj.clearCart = function () {
    cart = [];
    saveCart();
  };

  // count cart
  obj.totalCount = function () {
    let totalCount = 0;
    for (const item of cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  };

  // total cart
  obj.totalCart = function () {
    let totalCart = 0;
    for (const item of cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  };

  // list cart
  obj.listCart = function () {
    const cartCopy = [];
    for (const i of cart) {
      const item = cart[i];
      const itemCopy = {};
      for (const p of item) {
        itemCopy[p] = item[p];
      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy);
    }
    return cartCopy;
  };
  return obj;
};