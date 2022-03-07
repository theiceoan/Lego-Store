/* eslint-disable eqeqeq */
// // adapted from https://github.com/portsoc/staged-simple-message-board/blob/master/stages/2/client/index.js
const el = {};
window.localStorage.clear();

export const cartContents = [];
// put images in loadedBricks
export let loadedBricks = [];

function showImages(images, where) {
  for (const image of images) {
    // brick images
    loadedBricks.push(image);
    const img = document.createElement('img');
    const imageContainer = document.createElement('div');
    imageContainer.setAttribute('class', 'image_container');
    img.src = image.src;
    img.dataset.name = image.name;
    img.dataset.price = image.price;
    img.dataset.id = image.id;

    // name and price
    const shoppingCartDetails = document.createElement('p');
    shoppingCartDetails.setAttribute('style', 'white-space: pre;');
    shoppingCartDetails.textContent = `Name: ${image.name}\r\nPrice: £${image.price}`;

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
    imageContainer.append(shoppingCartDetails);
    imageContainer.append(addToCartButton);
    imageContainer.append(numberDisplay);
    where.append(imageContainer);

    addToCartButton.addEventListener('click', addToCart);
    addToCartButton.addEventListener('click', getBricks);
  }
}

// const MyMap = new Map();
// event listeners on buttons
// get the id's of buttons and add them all to an array
// if the id in the array matches image.id then move object into local storage
const IMAGEIDS = [];

// function prepareCart() {
//   const addToCartButtons = document.querySelectorAll('.add-to-cart');
//   for (const button of addToCartButtons) {
//     // function should be called add to cart
//     button.addEventListener('click', addToCart);
//   }
// }

// change name to addToCart
async function addToCart(e) {
  const imageID = e.target.parentElement.firstChild.dataset.id;
  // console.log(e.target);
  const response = await fetch('/images/' + imageID);
  if (response.ok) {
    const detail = await response.json();
    console.log(detail);
    // window.localStorage.setItem(e.target.dataset.id, JSON.stringify(detail));
    cartContents.push(e.target.dataset.id);
    console.log(cartContents);
  } else {
    console.log('failed to send message', response);
  }
  // const data = JSON.parse(window.localStorage.getItem(e.target.dataset.id));

  if (e.target.nextSibling.value > 0) {
    const img = document.createElement('img');
    const shoppingCartDetails = document.createElement('p');
    const imageContainer = document.createElement('div');
    const dropDown = document.querySelector('#my_dropdown');

    // img.src = data.src;
    // img.id = data.id;
    // imageContainer.append(img);

    // shoppingCartDetails.setAttribute('style', 'white-space: pre;');
    // shoppingCartDetails.textContent = `Name: ${0}\r\nPrice: £${0}`;
    // imageContainer.append(shoppingCartDetails);
    // dropDown.append(imageContainer);
  }
}
const showCartButton = document.querySelector('.btn');
showCartButton.addEventListener('click', showCart);

function getBricks(e) {
  const imageID = e.target.parentElement.firstChild.dataset.id;
  for (const brick of loadedBricks) {
    // console.log(brick.id);
    if (brick.id == imageID) {
      console.log(brick);
    }
  }
}

function showCart() {
  console.log(window.localStorage);
  document.querySelector('#my_dropdown').classList.toggle('show');
}

// function addToCart(e) {
//   const totalCount = document.querySelector('.total-count');

//   const storedBrick = window.localStorage.getItem(e.target.dataset.id);
//   console.log(e.target, window.localStorage);
// }

async function loadImages() {
  const response = await fetch('images');
  let images;
  if (response.ok) {
    images = await response.json();
  } else {
    images = [{ src: 'failed to load images' }];
  }
  showImages(images, el.legoImageSection);
  // prepareCart();
  // change from showImages to showBricks
}

function prepareHandles() {
  el.legoImageSection = document.querySelector('#lego_image_section');
}

function pageLoaded() {
  loadImages();
  prepareHandles();
}

window.addEventListener('load', pageLoaded);


// array, map or an object
// preference to map
