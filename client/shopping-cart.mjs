/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
// adapted from https://github.com/portsoc/staged-simple-message-board/blob/master/stages/4/client/index.js
export const cartContents = [];
export const dummyIDs = [];
// const cartPriceTotal = [];

export async function addToLocalStorage(e) {
  const brickID = e.target.parentElement.firstChild.dataset.id;
  const response = await fetch('/bricks/' + brickID);
  if (response.ok) {
    const rawDetails = await response.json();
    // brickids is supposed to replace dummyids in the indexof but not working atm
    const brickids = window.localStorage.getItem('brickids');
    // console.log(rawDetails.count);
    // rawDetails.count = Number(e.target.nextSibling.value);

    if (dummyIDs.indexOf(rawDetails.id) == -1 && e.target.nextSibling.value > 0) {
      rawDetails.count = Number(e.target.nextSibling.value);
      // console.log(rawDetails);
      cartContents.push(rawDetails);
      dummyIDs.push(rawDetails.id);
      window.localStorage.setItem('brickids', dummyIDs);

      window.localStorage.setItem('basket', JSON.stringify(cartContents));
    } else if (dummyIDs.indexOf(rawDetails.id) != -1 && e.target.nextSibling.value > 0) {
      // console.log('hello ice');
      // const storedBricks = JSON.parse(window.localStorage.getItem('basket'));
      for (const storedBrick of cartContents) {
        if (storedBrick.id == rawDetails.id) {
          storedBrick.count = Number(storedBrick.count) + Number(e.target.nextSibling.value);
          window.localStorage.setItem('basket', JSON.stringify(cartContents));
          // console.log(storedBrick.count);
        }
        console.log(storedBrick.count);
      }
    }
    // console.log(cartContents);
  } else {
    console.log('failed to send message', response);
  }
  // addToBasket();
  cartTally();
}

function cartTally() {
  const cartCounter = document.querySelector('.total-count');
  const storedBricks = JSON.parse(window.localStorage.getItem('basket'));

  let brickTally = 0;
  for (const storedBrick of storedBricks) {
    brickTally += storedBrick.count;
    cartCounter.textContent = brickTally;
  }
}
