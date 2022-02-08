// import { shoppingCart } from "./cart_structure";

import { shoppingCart } from './cart_structure';

// add item
const allCartButtons = document.querySelectorAll('.add-to-cart');
for (const addToCart of allCartButtons) {
  addToCart.addEventListener('click', function (event) {
    event.preventDefault();
    const name = addToCart(this).data('name');
    const price = Number(addToCart(this).data('price'));
    const count = document.querySelector('.input_display').value;
    shoppingCart.addItemToCart(name, price, count);
    displayCart();
  });
}

// clear cart
const clearAllCarts = document.querySelectorAll('.clear-cart');
for (const clearCart of clearAllCarts) {
  clearCart.addEventListener('click', function () {
    shoppingCart.clearCart();
    displayCart();
  });
}

function displayCart() {
  const cartArray = shoppingCart.listCart();
  let output = '';
  for (const item of cartArray) {
    output += '<tr>' +
      '<td>' + cartArray[item].name + '</td>' +
      '<td>(' + cartArray[item].price + ')</td>' +
      "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" +
      cartArray[item].name + '>-</button' +
      "<input type='number' class='item-count form-control' data-name='" +
      cartArray[item].name + "' value='" +
      cartArray[item].count + "'>'" +
      "<button class='plus-item btn btn-primary input-group-addon' data-name=" +
      cartArray[item].name + '>+</button></div></td>' +
      "<td><button class='delete-item btn btn-danger' data-name=" +
      cartArray[item].name + '>X</button></td>' +
      ' = ' +
      '<td>' + cartArray[item].total + '</td>' +
      '</tr>';
  }
  document.querySelector('.show-cart').append(output);
  document.querySelector('.total-cart').append(shoppingCart.totalCart());
  document.querySelector('.total-count').append(shoppingCart.totalCount());
}

// delete item button
document.querySelector('.show-cart').on('click', '.delete-item', function () {
  const showCart = document.querySelector('.show-cart');
  const name = showCart.data('name');
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
});

// -5
document.querySelector('.show-cart').on('click', '.minus-item', function () {
  const showCart = document.querySelector('.show-cart');
  const name = showCart.data('name');
  shoppingCart.removeItemFromCart(name);
  displayCart();
});

// +5
document.querySelector('.show-cart').on('click', '.plus-item', function () {
  const showCart = document.querySelector('.show-cart');
  const name = showCart.data('name');
  shoppingCart.addItemToCart(name);
  displayCart();
});

// item count input
document.querySelector('.show-cart').on('change', '.item-count', function () {
  const showCart = document.querySelector('.show-cart');
  const name = showCart.data('name');
  const count = Number(showCart.value);
  shoppingCart.setCountForItem(name, count);
  displayCart();
});

displayCart();