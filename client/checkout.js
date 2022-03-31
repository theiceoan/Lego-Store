/* eslint-disable eqeqeq */
const cartContents = [];

function createBasket() {
//   console.log('hello world');
  const legoSection = document.querySelector('#lego_brick_section');
  const storedBricks = JSON.parse(window.localStorage.getItem('basket'));
  console.log(storedBricks);

  for (const storedBrick of storedBricks) {
    cartContents.push(storedBrick);

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

function updateBasket(e) {
  const brickDetails = e.target.previousSibling.lastChild;
  // const storedBricks = JSON.parse(window.localStorage.getItem('basket'));
  for (const storedBrick of cartContents) {
    if (storedBrick.id == e.target.dataset.id && e.target.nextSibling.value > 0) {
      // console.log(cartContents);
      storedBrick.count = Number(storedBrick.count) + Number(e.target.nextSibling.value);
      brickDetails.textContent = `Name: ${storedBrick.name}\r\nPrice: £${(storedBrick.price * storedBrick.count).toFixed(2)}\r\nQuantity: ${storedBrick.count}`;
      // console.log(storedBrick.count);
      window.localStorage.setItem('basket', JSON.stringify(cartContents));
    }
  }
}

function endCheckout() {
  const legoSection = document.querySelector('#lego_brick_section');
  const checkoutButton = document.querySelector('#checkout');

  legoSection.textContent = '';
  checkoutButton.remove();
  window.localStorage.clear();

  const goodbyeMessage = document.createElement('p');
  goodbyeMessage.classList.add = 'goodbye-message';
  goodbyeMessage.textContent = 'Thank You for Shopping with Ice! Confirmation will be Sent to your Email Address';
  legoSection.append(goodbyeMessage);

  setTimeout(function () {
    window.location.href = 'http://localhost:8080/';
  }, 5000);
}

document.querySelector('#checkout').addEventListener('click', endCheckout);

window.addEventListener('load', createBasket);
