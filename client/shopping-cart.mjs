/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
// adapted from https://github.com/portsoc/staged-simple-message-board/blob/master/stages/4/client/index.js
export const cartContents = [];
export const dummyIDs = [];

export async function addToLocalStorage(brick, brickContainer) {
  const brickID = e.target.parentElement.firstChild.dataset.id;
  const brickQuantity = e.target.nextSibling.valueAsNumber;
  const errorMessage = e.target.parentElement.firstChild.nextSibling;
  errorMessage.textContent = '';
  const response = await fetch('/bricks/' + brickID);
  if (response.ok) {
    const brickData = await response.json();
    // preventing user adding more bricks than available
    if (brickData.stock >= brickQuantity) {
      const brickids = window.localStorage.getItem('brickids');

      // first brick to be added
      if (brickids == null) {
        brickData.count = Math.ceil(Number(brickQuantity));
        brickData.stock = Number(brickData.stock) - Number(brickData.count);
        // cartItemQuantity.push(brickData.count);
        dummyIDs.push(brickData.id);
        window.localStorage.setItem('brickids', dummyIDs);

        cartContents.push(brickData);
        // possibly creating a local storage for the quantity only
        // window.localStorage.setItem('quantity', )
        window.localStorage.setItem('basket', JSON.stringify(cartContents));

        // new bricks
      } else if (brickids.indexOf(brickData.id) == -1 && brickQuantity > 0 && brickData.stock >= brickQuantity) {
        const storedBricks = JSON.parse(window.localStorage.getItem('basket'));
        brickData.count = Math.ceil(Number(brickQuantity));
        brickData.stock = Number(brickData.stock) - Number(brickData.count);
        storedBricks.push(brickData);
        dummyIDs.push(brickData.id);
        window.localStorage.setItem('brickids', dummyIDs);

        window.localStorage.setItem('basket', JSON.stringify(storedBricks));
        // editing bricks already in cart
      } else if (brickids.indexOf(brickData.id) != -1 && brickQuantity > 0 && brickData.stock > brickQuantity) {
        const storedBricks = JSON.parse(window.localStorage.getItem('basket'));
        for (const storedBrick of storedBricks) {
          if (storedBrick.id == brickData.id && storedBrick.stock >= brickQuantity) {
            storedBrick.count = Number(storedBrick.count) + Math.ceil(Number(brickQuantity));
            storedBrick.stock = Number(storedBrick.stock) - Math.ceil(Number(brickQuantity));
            window.localStorage.setItem('basket', JSON.stringify(storedBricks));
          // console.log(storedBrick.count);
          } else if (storedBrick.stock < brickQuantity) {
            console.log('no ways');
            errorMessage.textContent = `insufficient stock! Available stock: ${brickData.stock}`;
          }
          console.log(storedBrick.count);
        }
      }
    } else {
      errorMessage.textContent = `insufficient stock! Available stock: ${brickData.stock}`;
    }
  } else {
    console.log('failed to send message', response);
  }
  cartTally();
}

function cartTally() {
  let brickTally = 0;
  const cartCounter = document.querySelector('.total-count');
  const storedBricks = JSON.parse(window.localStorage.getItem('basket'));

  if (storedBricks == null) {
    console.log('hello world');
    cartCounter.textContent = 0;
  } else {
    for (const storedBrick of storedBricks) {
      brickTally += storedBrick.count;
      cartCounter.textContent = brickTally;
    }
  }
}

window.addEventListener('load', cartTally);

// const bricks = [ ... { id: ... }, ...]
// const brickIDs = bricks.map(b => b.id);
