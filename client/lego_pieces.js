// // adapted from https://github.com/portsoc/staged-simple-message-board/blob/master/stages/2/client/index.js
const el = {};
window.localStorage.clear();

function showImages(images, where) {
  for (const image of images) {
    // brick images
    const img = document.createElement('img');
    const imageContainer = document.createElement('div');
    imageContainer.setAttribute('class', 'image_container');
    img.src = image.src;
    img.dataset.name = image.name;
    img.dataset.price = image.price;
    img.dataset.id = image.id;

    // name and price
    const imageDetails = document.createElement('p');
    imageDetails.setAttribute('style', 'white-space: pre;');
    imageDetails.textContent = `Name: ${image.name}\r\nPrice: £${image.price}`;

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

    addToCartButton.addEventListener('click', setUpCart);
    // addToCartButton.addEventListener('click', addToCart);
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
//     button.addEventListener('click', setUpCart);
//   }
// }

async function setUpCart(e) {
  const imageID = e.target.parentElement.firstChild.dataset.id;
  // console.log(e.target);
  const response = await fetch('/images/' + imageID);
  if (response.ok) {
    const detail = await response.json();
    console.log(detail);
    window.localStorage.setItem(e.target.dataset.id, JSON.stringify(detail));
  } else {
    console.log('failed to send message', response);
  }
  const data = JSON.parse(window.localStorage.getItem(e.target.dataset.id));

  if (e.target.nextSibling.value > 0) {
    const img = document.createElement('img');
    const shoppingCartDetails = document.createElement('p');
    const imageContainer = document.createElement('div');
    const dropDown = document.querySelector('#my_dropdown');

    img.src = data.src;
    img.id = data.id;
    imageContainer.append(img);
    dropDown.append(imageContainer);
  }
}
const showCartButton = document.querySelector('.btn');
showCartButton.addEventListener('click', showCart);

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
