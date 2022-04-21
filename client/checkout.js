/* eslint-disable eqeqeq */
const cartContents = [];
const el = {};

function removeContentFrom(what) {
  what.textContent = '';
}

function createBasket() {
//   console.log('hello world');
  const legoSection = document.querySelector('#lego-brick-section');
  const storedBricks = JSON.parse(window.localStorage.getItem('basket'));
  // console.log(storedBricks);

  for (const storedBrick of storedBricks) {
    cartContents.push(storedBrick);

    const img = document.createElement('img');
    const brickDetails = document.createElement('p');
    brickDetails.classList.add('brick-details');
    const cartbrickContainer = document.createElement('div');

    // icon to remove brick
    const removeBrickIcon = document.createElement('span');
    removeBrickIcon.classList.add = 'remove-brick-icon';
    removeBrickIcon.textContent = 'x';
    removeBrickIcon.addEventListener('click', removeBrick);
    cartbrickContainer.append(removeBrickIcon);

    // console.log(storedBrick);
    img.id = storedBrick.id;
    img.src = storedBrick.src;
    cartbrickContainer.append(img);

    // brickDetails.setAttribute('style', 'white-space: pre;');
    brickDetails.textContent = `Name: ${storedBrick.name}\r\nPrice: £${(storedBrick.price * storedBrick.count).toFixed(2)}\r\nQuantity: ${storedBrick.count}`;
    cartbrickContainer.append(brickDetails);

    const numberDisplay = document.createElement('input');
    numberDisplay.step = 5;
    // numberDisplay.setAttribute('class', 'input-display');
    numberDisplay.classList.add('input-display');
    numberDisplay.value = 0;
    numberDisplay.type = 'number';
    numberDisplay.min = '0';

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add to Cart';
    // addToCartButton.setAttribute('class', 'add-to-cart');
    addToCartButton.classList.add('add-to-cart');
    addToCartButton.dataset.id = img.id;

    legoSection.append(cartbrickContainer);
    legoSection.append(addToCartButton);
    legoSection.append(numberDisplay);

    addToCartButton.addEventListener('click', updateBasket);
    addToCartButton.addEventListener('click', editTotalPrice);
  }
}

function showTotalPrice() {
  const totalPriceElement = document.createElement('p');
  totalPriceElement.id = 'total-price';
  const legoSection = document.querySelector('#lego-brick-section');
  const storedBricks = JSON.parse(window.localStorage.getItem('basket'));

  let totalPrice = 0;
  for (const storedBrick of storedBricks) {
    totalPrice += (storedBrick.price * storedBrick.count);
    totalPriceElement.textContent = `Total Price: £${totalPrice.toFixed(2)}`;
  }
  legoSection.append(totalPriceElement);
}

function editTotalPrice() {
  const totalPriceElement = document.querySelector('#total-price');
  const storedBricks = JSON.parse(window.localStorage.getItem('basket'));
  let totalPrice = 0;

  for (const storedBrick of storedBricks) {
    totalPrice += (storedBrick.price * storedBrick.count);
    totalPriceElement.textContent = `Total Price: £${totalPrice.toFixed(2)}`;
  }
  console.log(totalPriceElement);
}

function basketEmpty() {
  const legoSection = document.querySelector('#lego-brick-section');
  // console.log(legoSection);
  if (legoSection.children.length == 0) {
    legoSection.textContent = 'Cart Empty:( Go Back and add an item';
    legoSection.setAttribute('style', 'font-size: 5em');
    console.log('hello world');
    const checkoutButton = document.querySelector('#checkout');
    checkoutButton.disabled = true;
  }
}

function updateBasket(e) {
  const brickDetails = e.target.previousSibling.lastChild;
  // const storedBricks = JSON.parse(window.localStorage.getItem('basket'));
  for (const storedBrick of cartContents) {
    if (storedBrick.id == e.target.dataset.id && e.target.nextSibling.value > 0) {
      // console.log(cartContents);
      storedBrick.count = Math.round(Number(storedBrick.count) + Number(e.target.nextSibling.value));
      storedBrick.stock = Number(storedBrick.stock) - Number(e.target.nextSibling.value);
      brickDetails.textContent = `Name: ${storedBrick.name}\r\nPrice: £${(storedBrick.price * storedBrick.count).toFixed(2)}\r\nQuantity: ${storedBrick.count}`;
      // console.log(storedBrick.count);
      window.localStorage.setItem('basket', JSON.stringify(cartContents));
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
  const legoSection = document.querySelector('#lego-brick-section');
  const checkoutButton = document.querySelector('#checkout');

  legoSection.textContent = '';
  checkoutButton.remove();
  // window.localStorage.clear();

  const goodbyeMessage = document.createElement('p');
  goodbyeMessage.setAttribute('style', 'font-size: 5em');
  goodbyeMessage.textContent = 'Thank You for Shopping with Ice! Confirmation will be Sent to your Email Address';
  legoSection.append(goodbyeMessage);

  // setTimeout(function () {
    // window.location.href = 'http://localhost:8080/';
  // }, 5000);
}

document.querySelector('#checkout').addEventListener('click', endCheckout);

window.addEventListener('load', createBasket);
window.addEventListener('load', basketEmpty);
window.addEventListener('load', showTotalPrice);
