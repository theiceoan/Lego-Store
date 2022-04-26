// adapted from https://github.com/portsoc/staged-simple-message-board/tree/master/stages/10

import { auth0 } from './auth0.js';
import { showBricks } from './lego-pieces.js';
// import FormData from 'form-data';

function removeContentFrom(what) {
  what.textContent = '';
}

export async function verifyAdminLogin() {
  const isAuthenticated = await auth0.isAuthenticated();
  // console.log(isAuthenticated);

  if (isAuthenticated) {
    createUploadElements();
    setupListeners();
  }
}

function createUploadElements() {
  const legoSection = document.querySelector('#lego-brick-section');
  const headerElement = document.createElement('header');

  const nameInput = document.createElement('input');
  nameInput.id = 'name';
  nameInput.type = 'text';
  nameInput.placeholder = 'Add name of brick here...';
  headerElement.append(nameInput);

  const priceInput = document.createElement('input');
  priceInput.id = 'price';
  priceInput.type = 'number';
  priceInput.placeholder = 'Add price of brick here...';
  headerElement.append(priceInput);

  const stockInput = document.createElement('input');
  stockInput.id = 'stock';
  stockInput.type = 'number';
  stockInput.placeholder = 'Add stock of brick here...';
  headerElement.append(stockInput);

  const descriptionInput = document.createElement('input');
  descriptionInput.id = 'description';
  descriptionInput.type = 'text';
  descriptionInput.placeholder = 'Add description of brick here...';
  headerElement.append(descriptionInput);

  const fileImage = document.createElement('label');
  fileImage.id = 'image';
  fileImage.textContent = 'Image: ';

  const fileUpload = document.createElement('input');
  fileUpload.id = 'image-file';
  fileUpload.type = 'file';
  fileUpload.accept = 'image/png, image/jpeg';
  fileImage.append(fileUpload);

  headerElement.append(fileImage);

  const submitButton = document.createElement('input');
  submitButton.id = 'send';
  submitButton.type = 'submit';
  submitButton.value = 'Send';
  headerElement.append(submitButton);

  legoSection.prepend(headerElement);
}

async function sendBrick() {
  const legoBrickSection = document.querySelector('#lego-brick-section');
  const name = document.querySelector('#name');
  const price = document.querySelector('#price');
  const stock = document.querySelector('#stock');
  const description = document.querySelector('#description');
  // const send = document.querySelector('#send');
  const fileImage = document.querySelector('#image-file');

  const payload = new FormData();
  payload.append('name', name.value);
  payload.append('price', price.value);
  payload.append('stock', stock.value);
  payload.append('count', 0);
  payload.append('src', fileImage.files[0]);
  payload.append('description', description.value);
  console.log(fileImage.files[0]);

  const response = await fetch('bricks', {
    method: 'POST',
    body: payload,
  });

  if (response.ok) {
    name.value = '';
    price.value = '';
    stock.value = '';
    description.value = '';

    const updatedBricks = await response.json();
    removeContentFrom(legoBrickSection);
    showBricks(updatedBricks, legoBrickSection);
  } else {
    console.log('failed to send message', response);
  }
}

// function prepareHandles() {
// el.legobricksection = document.querySelector('#lego-brick-section');
// el.name = document.querySelector('#name');
// el.price = document.querySelector('#price');
// el.stock = document.querySelector('#stock');
// el.description = document.querySelector('#description');
// el.send = document.querySelector('#send');
// el.fileImage = document.querySelector('#image-file');
// }

function setupListeners() {
  document.querySelector('#send').addEventListener('click', sendBrick);
  // window.addEventListener('load', prepareHandles);
}
