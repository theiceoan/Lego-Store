// import { shoppingCart } from "./cart_structure";

import { shoppingCart } from './cart_structure';

// add item
const addToCart = document.querySelector('.add-to-cart');
addToCart.click(function (event) {
  event.preventDefault();
  const name = addToCart(this).data('name');
  const price = Number(addToCart(this).data('price'));
  const count = document.querySelector('.input_display').value;

  shoppingCart.addItemToCart(name, price, count);
  displayCart();
});
