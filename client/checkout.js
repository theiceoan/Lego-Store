/* eslint-disable eqeqeq */
import { prepareHandles } from './update-database.js';
const cartContents = [];

function createBasket() {
  const legoSection = document.querySelector('#lego-brick-section');
  const storedBricks = JSON.parse(window.localStorage.getItem('basket'));
  if (storedBricks != null) {
    for (const storedBrick of storedBricks) {
      cartContents.push(storedBrick);

      const cartbrickContainer = document.createElement('div');
      cartbrickContainer.className = 'cart-brick-container checkout-content';

      const errorMessage = document.createElement('p');
      errorMessage.className = 'error-message';
      cartbrickContainer.append(errorMessage);

      const removeBrickIcon = document.createElement('span');
      removeBrickIcon.className = 'remove-brick-icon';
      removeBrickIcon.textContent = 'x';
      removeBrickIcon.addEventListener('click', removeBrick);
      cartbrickContainer.append(removeBrickIcon);

      const img = document.createElement('img');
      img.id = storedBrick.id;
      img.src = storedBrick.src;
      cartbrickContainer.append(img);

      const brickDetails = document.createElement('p');
      brickDetails.className = 'brick-details';
      brickDetails.textContent = `Name: ${storedBrick.name}\r\nPrice: £${(storedBrick.price * storedBrick.count).toFixed(2)}\r\nQuantity: ${storedBrick.count}`;
      cartbrickContainer.append(brickDetails);

      const numberDisplay = document.createElement('input');
      numberDisplay.step = 5;
      numberDisplay.className = 'input-display checkout-content';
      numberDisplay.value = 0;
      numberDisplay.type = 'number';
      numberDisplay.min = '0';

      const addToCartButton = document.createElement('button');
      addToCartButton.textContent = 'Add to Cart';
      addToCartButton.className = 'add-to-cart checkout-content';
      addToCartButton.dataset.id = img.id;

      legoSection.append(cartbrickContainer);
      legoSection.append(addToCartButton);
      legoSection.append(numberDisplay);

      addToCartButton.addEventListener('click', updateBasket);
      addToCartButton.addEventListener('click', editTotalPrice);
    }
  }
}

function showTotalPrice() {
  const totalPriceElement = document.createElement('p');
  totalPriceElement.id = 'total-price';
  totalPriceElement.className = 'checkout-content';
  const legoSection = document.querySelector('#lego-brick-section');
  const storedBricks = JSON.parse(window.localStorage.getItem('basket'));

  let totalPrice = 0;
  if (storedBricks != null) {
    for (const storedBrick of storedBricks) {
      totalPrice += (storedBrick.price * storedBrick.count);
      totalPriceElement.textContent = `Total Price: £${totalPrice.toFixed(2)}`;
    }
    legoSection.append(totalPriceElement);
  }
}

function editTotalPrice() {
  const totalPriceElement = document.querySelector('#total-price');
  const storedBricks = JSON.parse(window.localStorage.getItem('basket'));
  let totalPrice = 0;

  for (const storedBrick of storedBricks) {
    totalPrice += (storedBrick.price * storedBrick.count);
    totalPriceElement.textContent = `Total Price: £${totalPrice.toFixed(2)}`;
  }
}

function handleEmptyBasket() {
  const checkoutElements = document.querySelector('.checkout-content');
  const messageSection = document.querySelector('.goodbye-message');
  if (checkoutElements == null) {
    messageSection.textContent = 'Cart Empty:( Go Back and add an item';
    console.log('hello world');
    const checkoutButton = document.querySelector('#checkout');
    checkoutButton.disabled = true;
  }
}

function updateBasket(e) {
  const brickDetails = e.target.previousSibling.lastChild;
  const errorMessage = e.target.previousSibling.firstChild;
  const brickQuantity = e.target.nextSibling.value;
  for (const storedBrick of cartContents) {
    if (storedBrick.id == e.target.dataset.id && brickQuantity > 0 && storedBrick.stock >= brickQuantity) {
      errorMessage.textContent = '';

      storedBrick.count = Math.round(Number(storedBrick.count) + Number(brickQuantity));
      storedBrick.stock = Number(storedBrick.stock) - Number(brickQuantity);
      brickDetails.textContent = `Name: ${storedBrick.name}\r\nPrice: £${(storedBrick.price * storedBrick.count).toFixed(2)}\r\nQuantity: ${storedBrick.count}`;
      window.localStorage.setItem('basket', JSON.stringify(cartContents));
    } else if (storedBrick.id == e.target.dataset.id && storedBrick.stock < brickQuantity) {
      errorMessage.textContent = `Insufficient stock! Available stock: ${storedBrick.stock}`;
    }
  }
}

// adapted from https://gist.github.com/scottopolis/6e35cf0d53bae81e6161662e6374da04
function removeBrick(e) {
  console.log(e.target.nextSibling.id);
  const storedBricks = JSON.parse(window.localStorage.getItem('basket'));

  const removeIndex = storedBricks.findIndex(item => item.id == e.target.nextSibling.id);
  storedBricks.splice(removeIndex, 1);
  window.localStorage.setItem('basket', JSON.stringify(storedBricks));
  window.location.reload();
}

function endCheckout() {
  const checkoutContent = document.querySelectorAll('.checkout-content');
  const goodbyeMessage = document.querySelector('.goodbye-message');
  const checkoutButton = document.querySelector('#checkout');

  for (const element of checkoutContent) {
    element.remove();
  }
  checkoutButton.remove();
  goodbyeMessage.textContent = 'Thank You for Shopping with Ice! Confirmation will be sent to you email address';
}

function prepEventListeners() {
  window.addEventListener('load', createBasket);
  window.addEventListener('load', handleEmptyBasket);
  window.addEventListener('load', showTotalPrice);
  window.addEventListener('load', prepareHandles);
  document.querySelector('#checkout').addEventListener('click', endCheckout);
}

prepEventListeners();
