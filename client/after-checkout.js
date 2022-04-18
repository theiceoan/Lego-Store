// adapted from https://github.com/portsoc/staged-simple-message-board/blob/master/stages/8/client/message.js

const el = {};

function showBrick(brick) {
  el.brick.value = brick.stock;
}

function getBrickIds() {
  console.log(window.localStorage.getItem('basket'));
  return (window.localStorage.getItem('basket'));
}

/** Use fetch to put a JSON message to the server */
async function sendBrick() {
  const id = getBrickIds();
  console.log(id);
  const payload = { id, stock: el.stock.value };
  console.log('Payload', payload);

  const response = await fetch(`bricks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    el.brick.value = '';
    const updatedBricks = await response.json();
    showBrick(updatedBricks);
  } else {
    console.log('failed to send message', response);
  }
}

/**
   * Page elements used in the program are
   * setup here for convenience.
   */
function prepareHandles() {
//   el.message = document.querySelector('#message');
  el.checkout = document.querySelector('#checkout');
}

/**
   * Connect listeners for button clicks,
   * keyboard input, etc.
   */
function addEventListeners() {
  el.checkout.addEventListener('click', sendBrick);
//   el.message.addEventListener('keyup', checkKeys);
}

function pageLoaded() {
  prepareHandles();
  addEventListeners();
}

window.addEventListener('load', pageLoaded);
