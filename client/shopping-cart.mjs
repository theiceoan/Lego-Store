/* eslint-disable eqeqeq */
export const cartContents = [];
export const dummyIDs = [];

export async function addToLocalStorage(e) {
  const brickID = e.target.parentElement.firstChild.dataset.id;
  const response = await fetch('/bricks/' + brickID);
  if (response.ok && e.target.nextSibling.value > 0) {
    const rawDetails = await response.json();

    cartContents.push(rawDetails);
    for (const cartBrick of cartContents) {
      if (cartBrick.id == brickID && dummyIDs.indexOf(rawDetails.id) == -1) {
        window.localStorage.setItem(e.target.dataset.id, JSON.stringify(cartBrick));
        dummyIDs.push(cartBrick.id);
        cartBrick.count = Number(e.target.nextSibling.value);
        console.log(cartBrick.count, cartBrick.name);

        const dropDown = document.querySelector('#my_dropdown');
        const img = document.createElement('img');
        const shoppingCartDetails = document.createElement('p');
        shoppingCartDetails.dataset.id = cartBrick.id;
        shoppingCartDetails.classList.add('cart-details');
        const cartBrickContainer = document.createElement('div');
        const brick = JSON.parse(window.localStorage.getItem(e.target.dataset.id));
        console.log(brick);
        img.id = brick.id;
        img.src = brick.src;
        cartBrickContainer.append(img);
        shoppingCartDetails.setAttribute('style', 'white-space: pre;');
        shoppingCartDetails.textContent = `Name: ${cartBrick.name}\r\nPrice: £${cartBrick.price * cartBrick.count}\r\nQuantity: ${cartBrick.count}`;
        cartBrickContainer.append(shoppingCartDetails);
        dropDown.append(cartBrickContainer);
      } else {
        const shoppingCartDetails = document.querySelectorAll('.cart-details');
        for (const description of shoppingCartDetails) {
          // console.log(description.dataset.id);
          if (description.dataset.id == brickID) {
            cartBrick.count = Number(cartBrick.count) + Number(e.target.nextSibling.value);
            description.textContent = `Name: ${cartBrick.name}\r\nPrice: £${cartBrick.price * cartBrick.count}\r\nQuantity: ${Number(cartBrick.count) + Number(e.target.nextSibling.value)}`;
          }
        }
      }
    }
  } else {
    console.log('failed to send message', response);
  }
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
