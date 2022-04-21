// adapted from https://github.com/portsoc/staged-simple-message-board/blob/master/stages/8/client/message.js

const el = {};

function getBrickIds() {
  // console.log(window.localStorage.getItem('basket'));
  return window.localStorage.getItem('basket');
}

/** Use fetch to put a JSON message to the server */
async function sendBrick() {
  // const id = getBrickIds();
  const storedBricks = JSON.parse(window.localStorage.getItem('basket'));
  for (const storedBrick of storedBricks) {
    // console.log(storedBrick.id);
    const id = storedBrick.id;
    const payload = { id, name: storedBrick.name, price: storedBrick.price, src: storedBrick.src, description: storedBrick.description, stock: storedBrick.stock };
    console.log('Payload', payload);

    const response = await fetch(`bricks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    // console.log(response.method);
    if (response.ok) {
      // console.log(el.stock);
      // el.stock = '';
      console.log('hello world');
      // const updatedBricks = await response.json();
      // console.log(updatedBricks);
      // showBrick(updatedBricks);
    } else {
      console.log('failed to send message', response);
    }
  }
}

/**
   * Page elements used in the program are
   * setup here for convenience.
   */
function prepareHandles() {
  el.brickList = document.querySelector('#lego-brick-section');
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
