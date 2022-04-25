// // adapted from https://github.com/portsoc/staged-simple-message-board/blob/master/stages/2/client/index.js
import { addToCart } from './shopping-cart.mjs';

const el = {};

function showBricks(bricks, where) {
  for (const brick of bricks) {
    const brickContainer = document.createElement('div');
    brickContainer.className = 'brick-container';

    const img = document.createElement('img');
    img.src = brick.src;
    img.dataset.name = brick.name;
    img.dataset.price = brick.price;
    img.dataset.id = brick.id;
    brickContainer.append(img);

    const brickMessage = document.createElement('p');
    brickMessage.className = 'error-message';
    brickContainer.append(brickMessage);

    // name and price
    const brickDetails = document.createElement('p');
    brickDetails.className = 'all-brick-details';
    brickDetails.textContent = `Name: ${brick.name}\r\nPrice: £${brick.price}`;
    brickContainer.append(brickDetails);

    // add to cart button
    // name and id dataset items
    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.className = 'add-to-cart';
    addToCartButton.dataset.name = img.dataset.name;
    addToCartButton.dataset.price = img.dataset.price;
    addToCartButton.dataset.id = img.dataset.id;
    brickContainer.append(addToCartButton);

    // displaying input box for quantity of lego pieces user may want to buy
    const numberDisplay = document.createElement('input');
    numberDisplay.className = 'input-display';
    numberDisplay.step = 5;
    numberDisplay.value = 0;
    numberDisplay.type = 'number';
    numberDisplay.min = '0';
    brickContainer.append(numberDisplay);

    where.append(brickContainer);

    addToCartButton.addEventListener('click', () => addToCart(brick, brickContainer));
    img.addEventListener('click', viewBrickDescription);
    showLowQuantityMessage(brick, brickContainer);
  }
}

function showLowQuantityMessage(brick, brickContainer) {
  const brickMessage = brickContainer.firstChild.nextSibling;
  if (brick.stock <= 10) {
    brickMessage.textContent = `Quantity at ${brick.stock}, hurry!`;
  }
}

function viewBrickDescription(e) {
  const id = e.target.dataset.id;
  window.location = `details.html?brk=${id}`;
}

export async function loadbricks() {
  const response = await fetch('bricks');
  let bricks;
  if (response.ok) {
    bricks = await response.json();
  } else {
    bricks = [{ src: 'failed to load bricks' }];
  }
  el.legobricksection = document.querySelector('#lego-brick-section');
  showBricks(bricks, el.legobricksection);
}
