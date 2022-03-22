/* eslint-disable eqeqeq */
export const cartContents = [];

export async function addToLocalStorage(e) {
  const brickID = e.target.parentElement.firstChild.dataset.id;
  // console.log(e.target);
  // if the brick is in the basket, then we update the quantity and price
  // stop/return
  // console.log(cartContents.indexOf(e.target.dataset.id));
  // console.log(cartContents);
  const response = await fetch('/bricks/' + brickID);
  if (response.ok) {
    const rawDetails = await response.json();
    rawDetails.count = Number(rawDetails.count) + Number(e.target.nextSibling.value);
    // console.log(rawDetails.count);
    window.localStorage.setItem(e.target.dataset.id, JSON.stringify(rawDetails));
    // cartContents.push(e.target.dataset.id);
    // console.log(cartContents);
    // addToCart();
  } else {
    console.log('failed to send message', response);
  }
  const dropDown = document.querySelector('#my_dropdown');
  const img = document.createElement('img');
  const shoppingCartDetails = document.createElement('p');
  const cartBrickContainer = document.createElement('div');
  const brick = JSON.parse(window.localStorage.getItem(e.target.dataset.id));
  console.log(brick);
  img.id = brick.id;
  img.src = brick.src;
  cartBrickContainer.append(img);
  shoppingCartDetails.setAttribute('style', 'white-space: pre;');
  shoppingCartDetails.textContent = `Name: ${brick.name}\r\nPrice: £${brick.price * brick.count}\r\nQuantity: ${brick.count}`;
  cartBrickContainer.append(shoppingCartDetails);
  dropDown.append(cartBrickContainer);
}

// function addToCart() {
// console.log('hello world');
// const dropDown = document.querySelector('#my_dropdown');
// const img = document.createElement('img');
// const shoppingCartDetails = document.createElement('p');
// const cartBrickContainer = document.createElement('div');
// for (let i = 0; i < window.localStorage.length; i++) {
//
// const brick = JSON.parse(window.localStorage.getItem(window.localStorage.key(i)));
// console.log(brick.id);
// }
// }
//
