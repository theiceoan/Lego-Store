// // adapted from https://github.com/portsoc/staged-simple-message-board/blob/master/stages/2/client/index.js
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

const MyMap = new Map();

// rename function
function setUpCart() {
  // console.log(testing.value);
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  for (const button of addToCartButtons) {
    // function should be called add to cart
    button.addEventListener('click', addToCart);
  }
}

function addToCart(e) {
  const totalCount = document.querySelector('.total-count');
  // find the input box next to the button
  // read that value and add it to the cart
  console.log(e.target.nextSibling);

  const inputValue = e.target.nextSibling.value;
  console.log(inputValue);
  console.log(e.target.dataset.id);
  MyMap.set(e.target.dataset.id, inputValue);
  console.log(MyMap);

  // push the value of the event target into an array
  // add all the elements in the array
  // make the total = total count
  // run this every time button is clicked
  console.log(MyMap.get(e.target.dataset.id));
  const count = MyMap.get(e.target.dataset.id);
  // e.target.dataset.value = inputValue;
  totalCount.textContent = Number(totalCount.textContent) + Number(count);
  console.log(totalCount.textContent);
  // a variable that holds the items i am holding, add to that variable when adding to the cart
  // from that variable count how many items
  // array containing objects
}

function showCart(e) {

}

function initiateCart() {
  setUpCart();

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
  initiateCart();
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
