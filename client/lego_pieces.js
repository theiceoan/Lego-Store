// // adapted from https://github.com/portsoc/staged-simple-message-board/blob/master/stages/2/client/index.js
// import { json } from './data-testing.js';

// // displaying the lego images, item price, and add to cart buttons
// function showIcons(images, where) {
//   for (const image of images) {
//     const itemPrice = Math.random() * 2;

//     // creating the lego images
//     const img = document.createElement('img');
//     img.src = image;
//     img.setAttribute('class', 'lego_image');
//     img.dataset.price = itemPrice.toFixed(2);
//     where.append(img);

//     const container = document.createElement('div');

//     // setting the price of lego pieces
//     const price = document.createElement('p');
//     price.setAttribute('class', 'lego_piece_price');
//     price.textContent = `Price: £${itemPrice.toFixed(2)}`;
//     container.append(price);

//     // displaying input box for quantity of lego pieces user may want to buy
//     const numberDisplay = document.createElement('input');
//     numberDisplay.value = 0;
//     numberDisplay.step = 5;
//     numberDisplay.setAttribute('class', 'display');
//     numberDisplay.type = 'number';
//     numberDisplay.min = '0';
//     container.appendChild(numberDisplay);

//     // add to cart button
//     const addToCart = document.createElement('button');
//     addToCart.textContent = 'Add to Cart';
//     container.appendChild(addToCart);

//     where.append(container);
//   }
// }

// // fetching the json data of the images
// async function loadImages() {
//   const response = await fetch('data.json');
//   let images;
//   if (response.ok) {
//     images = await response.json();
//   } else {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }
//   const legoImageSection = document.querySelector('#lego_image_section');
//   showIcons(images, legoImageSection);
// }

// function pageLoaded() {
//   loadImages();
// }

// window.addEventListener('load', pageLoaded);


const el = {};

function showImages(images, where) {
  for (const image of images) {
    // brick images
    const img = document.createElement('img');
    const imageContainer = document.createElement('div');
    imageContainer.setAttribute('class', 'image_container');
    img.src = image.src;
    img.dataset.name = image.name;
    img.dataset.price = image.price;

    // name and price
    const imageDetails = document.createElement('p');
    imageDetails.setAttribute('style', 'white-space: pre;');
    imageDetails.textContent = `Name: ${image.name}\r\nPrice: ${image.price}`;

    // displaying input box for quantity of lego pieces user may want to buy
    const numberDisplay = document.createElement('input');
    numberDisplay.value = 0;
    numberDisplay.step = 5;
    // numberDisplay.setAttribute('class', 'display');
    numberDisplay.type = 'number';
    numberDisplay.min = '0';

    imageContainer.append(img);
    imageContainer.append(imageDetails);
    imageContainer.append(numberDisplay);
    where.append(imageContainer);
  }
}

async function loadImages() {
  const response = await fetch('images');
  let images;
  if (response.ok) {
    images = await response.json();
  } else {
    images = [{ src: 'failed to load images' }];
  }
  showImages(images, el.legoImageSection);
}

function prepareHandles() {
  el.legoImageSection = document.querySelector('#lego_image_section');
}

function pageLoaded() {
  prepareHandles();
  loadImages();
}

window.addEventListener('load', pageLoaded);
