/* eslint-disable import/no-duplicates */
/* eslint-disable eqeqeq */
// // adapted from https://github.com/portsoc/staged-simple-message-board/blob/master/stages/2/client/index.js
import { addToLocalStorage } from './shopping-cart.mjs';
import { cartContents } from './shopping-cart.mjs';
// import { addToCart } from './shopping-cart.mjs';

const el = {};
window.localStorage.clear();

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
    const shoppingCartDetails = document.createElement('p');
    shoppingCartDetails.setAttribute('style', 'white-space: pre;');
    shoppingCartDetails.textContent = `Name: ${brick.name}\r\nPrice: £${brick.price}`;

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
    brickContainer.append(shoppingCartDetails);
    brickContainer.append(addToCartButton);
    brickContainer.append(numberDisplay);
    where.append(brickContainer);

    addToCartButton.addEventListener('click', addToLocalStorage);
    addToCartButton.addEventListener('click', getBricks);
    // addToCartButton.addEventListener('click', addToCart);
  }
}

// const MyMap = new Map();
// event listeners on buttons
// get the id's of buttons and add them all to an array
// if the id in the array matches brick.id then move object into local storage
const brickIDS = [];

function getBricks(e) {
  // clearCart();
  const brickID = e.target.parentElement.firstChild.dataset.id;
  const dropDown = document.querySelector('#my_dropdown');
  const img = document.createElement('img');
  const shoppingCartDetails = document.createElement('p');
  const cartbrickContainer = document.createElement('div');
  const bricks = Object.keys(window.localStorage);
  for (const brick of bricks) {
    console.log(brick.id);
    if (brick.id == brickID) {
      // attempting to get the bricks in cart to be unique
      console.log(cartContents.indexOf(brick.id));
      console.log(brick);
      brick.count = Number(brick.count) + Number(e.target.nextSibling.value);
      console.log(brick.count);
      console.log(e.target.nextSibling.value);
      img.id = brick.id;
      img.src = brick.src;
      cartbrickContainer.append(img);

      // have an array of id's with not just originals
      shoppingCartDetails.setAttribute('style', 'white-space: pre;');
      shoppingCartDetails.textContent = `Name: ${brick.name}\r\nPrice: £${brick.price * brick.count}\r\nQuantity: ${brick.count}`;
      cartbrickContainer.append(shoppingCartDetails);
      dropDown.append(cartbrickContainer);
    }
  }
}

// function clearCart() {
  // const dropDown = document.querySelector('#my_dropdown');
  // dropDown.innerHTML = '';
// }

function showCart() {
  // console.log(window.localStorage);
  document.querySelector('#my_dropdown').classList.toggle('show');
}

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
  const viewCartButton = document.querySelector('.btn-primary');
  viewCartButton.addEventListener('click', showCart);
}

function pageLoaded() {
  loadbricks();
  prepareHandles();
}

window.addEventListener('load', pageLoaded);


// array, map or an object
// preference to map
