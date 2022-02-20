// // adapted from https://github.com/portsoc/staged-simple-message-board/blob/master/stages/2/client/index.js
// import { json } from './data-testing.js';

// import { showCart } from './shopping_cart';

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
//     const addToCartButton = document.createElement('button');
//     addToCartButton.textContent = 'Add to Cart';
//     container.appendChild(addToCartButton);

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
  let count = 1;
  for (const image of images) {
    // brick images
    const img = document.createElement('img');
    const imageContainer = document.createElement('div');
    imageContainer.setAttribute('class', 'image_container');
    img.src = image.src;
    img.dataset.name = image.name;
    img.dataset.price = image.price;
    img.dataset.id = 'ID-' + count;
    count += 1;

    // name and price
    const imageDetails = document.createElement('p');
    imageDetails.setAttribute('style', 'white-space: pre;');
    imageDetails.textContent = `Name: ${image.name}\r\nPrice: ${image.price}`;

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


    imageContainer.append(img);
    imageContainer.append(imageDetails);
    imageContainer.append(addToCartButton);
    imageContainer.append(numberDisplay);
    where.append(imageContainer);
  }
}

// event.target.parentelement to get the div
// find the input then add that to the cart
// function showCart() {
//   const addToCartButtons = document.querySelectorAll('.add-to-cart');
//   const totalCount = document.querySelector('.total-count');
//   for (const addToCartButton of addToCartButtons) {
//     addToCartButton.addEventListener('click', function (event) {
//       const brickCounters = document.querySelectorAll('.input_display');
//       for (const brickCounter of brickCounters) {
//         totalCount.textContent = Number(brickCounter.value) + Number(totalCount.textContent);
//       }
//     });
//   }
// }

function addToCart(e) {
  console.log(e.target.value);
  const testing = document.querySelector('.input_display');
  // console.log(testing.value);

  const inputValue = e.target.value;
  const myMap = new Map();
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const totalCount = document.querySelector('.total-count');
  for (const button of addToCartButtons) {
    myMap.set(e.target.id, e.target.value);
    console.log(myMap.get(e.target.id));
    button.addEventListener('click', function (event) {
      console.log(inputValue);
      console.log(event.target);

      // push the value of the event target into an array
      // add all the elements in the array
      // make the total = total count
      // run this every time button is clicked
      event.target.dataset.value = inputValue;
      totalCount.textContent = Number(event.target.dataset.value);
      console.log(totalCount.textContent);
    });
  }
}

function showCart() {
  const inputDisplays = document.querySelectorAll('.input_display');
  for (const display of inputDisplays) {
    display.addEventListener('change', addToCart);
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
  showCart();
}

function prepareHandles() {
  el.legoImageSection = document.querySelector('#lego_image_section');
}

function pageLoaded() {
  prepareHandles();
  loadImages();
}

window.addEventListener('load', pageLoaded);


// array, map or an object
// preference to map
