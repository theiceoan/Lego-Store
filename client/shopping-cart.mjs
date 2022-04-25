/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
// adapted from https://github.com/portsoc/staged-simple-message-board/blob/master/stages/4/client/index.js
export const cartContents = [];
// export const dummyIDs = [];

export function addToCart(brick, brickContainer) {
  console.log(brick, brickContainer);
  const errorMessage = brickContainer.firstChild.nextSibling;
  errorMessage.textContent = '';
  const requestedQuantity = brickContainer.lastChild.valueAsNumber;
  const storedBricks = JSON.parse(window.localStorage.getItem('basket'));
  // console.log(requestedQuantity);

  if (requestedQuantity > brick.stock) {
    errorMessage.textContent = `insufficient stock! Available stock: ${brick.stock}`;
    return;
  }

  if (requestedQuantity <= 0) return;

  if (storedBricks == null) {
    brick.count = Math.ceil(Number(requestedQuantity));
    brick.stock = Number(brick.stock) - Number(brick.count);
    cartContents.push(brick);
    window.localStorage.setItem('basket', JSON.stringify(cartContents));
    cartTally();
  } else {
    const brickIDs = storedBricks.map(b => b.id);

    if (brickIDs.indexOf(brick.id) == -1) {
      brick.count = Math.ceil(Number(requestedQuantity));
      brick.stock = Number(brick.stock) - Number(brick.count);
      storedBricks.push(brick);
      window.localStorage.setItem('basket', JSON.stringify(storedBricks));
    } else {
      for (const storedBrick of storedBricks) {
        if (storedBrick.id == brick.id) {
          storedBrick.count = Number(storedBrick.count) + Math.ceil(Number(requestedQuantity));
          storedBrick.stock = Number(storedBrick.stock) - Math.ceil(Number(requestedQuantity));
          window.localStorage.setItem('basket', JSON.stringify(storedBricks));
        }
      }
    }
    cartTally();
  }
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
