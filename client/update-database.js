/* eslint-disable no-undef */
// adapted from https://github.com/portsoc/staged-simple-message-board/blob/master/stages/8/client/message.js

const el = {};

/** Use fetch to put a JSON message to the server */
async function sendUpdatedBricks() {
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
      console.log('update successful!');
    } else {
      console.log('failed to send message', response);
    }
  }
  window.localStorage.clear();
}

export function prepareHandles() {
  el.brickList = document.querySelector('#lego-brick-section');
  el.checkout = document.querySelector('#checkout');
  el.checkout.addEventListener('click', sendUpdatedBricks);
}
