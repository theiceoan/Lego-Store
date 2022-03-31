/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
// // adapted from https://github.com/portsoc/staged-simple-message-board/blob/master/stages/2/client/index.js
import { arrayOfBricks } from './shopping-cart.mjs';
// import { cartContents } from './shopping-cart.mjs';
// import { addToCart } from './shopping-cart.mjs';

const el = {};
// window.localStorage.clear();

// put bricks in loadedBricks
// move bricks into server, create an API
export const loadedBricks = [];

function showBricks(bricks, where) {
  for (const brick of bricks) {
    // bricks
    loadedBricks.push(brick);
    const img = document.createElement('img');
    const brickContainer = document.createElement('div');
    brickContainer.setAttribute('class', 'brick_container');
    img.src = brick.src;
    img.dataset.name = brick.name;
    img.dataset.price = brick.price;
    img.dataset.id = brick.id;

    // brute force - delete everything in basket then repopulate
    // if a brick is the same as a brick already in the basket, update the DOM

    // name and price
    const brickDetails = document.createElement('p');
    brickDetails.setAttribute('style', 'white-space: pre;');
    brickDetails.textContent = `Name: ${brick.name}\r\nPrice: £${brick.price}`;

    // displaying input box for quantity of lego pieces user may want to buy
    const numberDisplay = document.createElement('input');
    numberDisplay.step = 5;
    numberDisplay.setAttribute('class', 'input_display');
    numberDisplay.value = 0;
    numberDisplay.type = 'number';
    numberDisplay.min = '0';

    // add to cart button
    // name and id dataset items
    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.setAttribute('class', 'add-to-cart');
    addToCartButton.dataset.name = img.dataset.name;
    addToCartButton.dataset.price = img.dataset.price;
    addToCartButton.dataset.id = img.dataset.id;


    brickContainer.append(img);
    brickContainer.append(brickDetails);
    brickContainer.append(addToCartButton);
    brickContainer.append(numberDisplay);
    where.append(brickContainer);

    addToCartButton.addEventListener('click', arrayOfBricks);
    // addToCartButton.addEventListener('click', addToBasket);
    // addToCartButton.addEventListener('click', addToCart);
  }
}

// function showCart() {
// document.querySelector('#my_dropdown').classList.toggle('show');
// document.querySelector('#checkout').classList.toggle('show');
// }

async function loadbricks() {
  const response = await fetch('bricks');
  let bricks;
  if (response.ok) {
    bricks = await response.json();
  } else {
    bricks = [{ src: 'failed to load bricks' }];
  }
  showBricks(bricks, el.legobricksection);
  // prepareCart();
}

function prepareHandles() {
  el.legobricksection = document.querySelector('#lego_brick_section');
  // const viewCartButton = document.querySelector('.btn-primary');
  // viewCartButton.addEventListener('click', showCart);
}

function pageLoaded() {
  loadbricks();
  prepareHandles();
}

window.addEventListener('load', pageLoaded);


// array, map or an object
// preference to map
