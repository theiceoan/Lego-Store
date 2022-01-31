// adapted from https://github.com/portsoc/staged-simple-message-board/blob/master/stages/2/client/index.js

// displaying the lego images, item price, and add to cart buttons
function showIcons(images, where) {
  for (const image of images) {
    const itemPrice = Math.random() * 2;

    // creating the lego images
    const img = document.createElement('img');
    img.src = image;
    img.setAttribute('class', 'lego_image');
    img.dataset.price = itemPrice.toFixed(2);
    where.append(img);

    const container = document.createElement('div');

    // setting the price of lego pieces
    const price = document.createElement('p');
    price.setAttribute('class', 'lego_piece_price');
    price.textContent = `Price: £${itemPrice.toFixed(2)}`;
    container.append(price);

    // displaying input box for quantity of lego pieces user may want to buy
    const numberDisplay = document.createElement('input');
    numberDisplay.value = 0;
    numberDisplay.step = 5;
    numberDisplay.setAttribute('class', 'display');
    numberDisplay.type = 'number';
    numberDisplay.min = '0';
    container.appendChild(numberDisplay);

    // add to cart button
    const addToCart = document.createElement('button');
    addToCart.textContent = 'Add to Cart';
    container.appendChild(addToCart);

    where.append(container);
  }
}

// fetching the json data of the images
async function loadImages() {
  const response = await fetch('data.json');
  let images;
  if (response.ok) {
    images = await response.json();
  } else {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const legoImageSection = document.querySelector('#lego_image_section');
  showIcons(images, legoImageSection);
}

function pageLoaded() {
  loadImages();
}

window.addEventListener('load', pageLoaded);
