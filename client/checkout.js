/* eslint-disable eqeqeq */

import { cartContents } from './shopping-cart.mjs';
console.log(cartContents);

function createBasket() {
  const legoSection = document.querySelector('#lego_brick_section');
  //   legoSection.textContent = '';
  const storedBricks = JSON.parse(window.localStorage.getItem('basket'));
  for (const storedBrick of storedBricks) {
    const img = document.createElement('img');
    const brickDetails = document.createElement('p');
    brickDetails.classList.add('brick-details');
    const cartbrickContainer = document.createElement('div');
    // console.log(storedBrick);
    img.id = storedBrick.id;
    img.src = storedBrick.src;
    cartbrickContainer.append(img);

    brickDetails.setAttribute('style', 'white-space: pre;');
    brickDetails.textContent = `Name: ${storedBrick.name}\r\nPrice: £${(storedBrick.price * storedBrick.count).toFixed(2)}\r\nQuantity: ${storedBrick.count}`;
    cartbrickContainer.append(brickDetails);

    const numberDisplay = document.createElement('input');
    numberDisplay.step = 5;
    numberDisplay.setAttribute('class', 'input_display');
    numberDisplay.value = 0;
    numberDisplay.type = 'number';
    numberDisplay.min = '0';

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.setAttribute('class', 'add-to-cart');
    addToCartButton.dataset.id = img.id;

    legoSection.append(cartbrickContainer);
    legoSection.append(addToCartButton);
    legoSection.append(numberDisplay);

    addToCartButton.addEventListener('click', updateBasket);
  }
}

function showCart() {
  const template1 = document.querySelector('#t1');
  const legoSection = document.querySelector('#lego_brick_section');
  const cloned = template1.content.cloneNode(true);
  //   console.log(template1);
  const updateThis = cloned.querySelector('#lego_brick_section');
  updateThis.append(legoSection);
  document.body.textContent = '';
  document.body.append(cloned);
}

const viewCartButton = document.querySelector('.btn-primary');
viewCartButton.addEventListener('click', createBasket);
viewCartButton.addEventListener('click', showCart);

function updateBasket(e) {
//   console.log(e.target.nextSibling);
  const storedBricks = JSON.parse(window.localStorage.getItem('basket'));
  for (const storedBrick of storedBricks) {
    if (storedBrick.id == e.target.dataset.id && e.target.nextSibling.value > 0) {
    //   console.log(storedBrick);
      storedBrick.count = Number(storedBrick.count) + Number(e.target.nextSibling.value);
    //   window.localStorage.setItem('basket', JSON.stringify(cartContents));
    }
  }
}
