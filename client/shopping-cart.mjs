/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
// adapted from https://github.com/portsoc/staged-simple-message-board/blob/master/stages/4/client/index.js
export const cartContents = [];
export const dummyIDs = [];
// const cartItemQuantity = [];

export async function addToLocalStorage(e) {
  const brickID = e.target.parentElement.firstChild.dataset.id;
  const response = await fetch('/bricks/' + brickID);
  if (response.ok) {
    const rawDetails = await response.json();
    if (rawDetails.stock > e.target.nextSibling.value) {
    // brickids is supposed to replace dummyids in the indexof but not working atm
      const brickids = window.localStorage.getItem('brickids');
      // console.log(rawDetails.count);
      // rawDetails.count = Number(e.target.nextSibling.value);
      if (brickids == null && rawDetails.stock > rawDetails.count) {
        rawDetails.count = Number(e.target.nextSibling.value);
        rawDetails.stock = Number(rawDetails.stock) - Number(rawDetails.count);
        // cartItemQuantity.push(rawDetails.count);
        dummyIDs.push(rawDetails.id);
        window.localStorage.setItem('brickids', dummyIDs);

        cartContents.push(rawDetails);
        // possibly creating a local storage for the quantity only
        // window.localStorage.setItem('quantity', )
        window.localStorage.setItem('basket', JSON.stringify(cartContents));
      // console.log('hello world');
      } else if (brickids.indexOf(rawDetails.id) == -1 && e.target.nextSibling.value > 0) {
        const storedBricks = JSON.parse(window.localStorage.getItem('basket'));
        rawDetails.count = Number(e.target.nextSibling.value);
        rawDetails.stock = Number(rawDetails.stock) - Number(rawDetails.count);
        // console.log(rawDetails);
        storedBricks.push(rawDetails);
        dummyIDs.push(rawDetails.id);
        window.localStorage.setItem('brickids', dummyIDs);

        window.localStorage.setItem('basket', JSON.stringify(storedBricks));
      } else if (brickids.indexOf(rawDetails.id) != -1 && e.target.nextSibling.value > 0) {
      // console.log('hello ice');
        const storedBricks = JSON.parse(window.localStorage.getItem('basket'));
        for (const storedBrick of storedBricks) {
          if (storedBrick.id == rawDetails.id && storedBrick.stock > e.target.nextSibling.value) {
            storedBrick.count = Number(storedBrick.count) + Number(e.target.nextSibling.value);
            storedBrick.stock = Number(storedBrick.stock) - Number(e.target.nextSibling.value);
            window.localStorage.setItem('basket', JSON.stringify(storedBricks));
          // console.log(storedBrick.count);
          }
          console.log(storedBrick.count);
        }
      }
    } else {
      window.confirm(`There is insufficient stock of the ${rawDetails.name} to process your order. Requested Quantity:${rawDetails.count}, Available Quantity: ${rawDetails.stock}. Please press OK if you would like to add all the available bricks to your shopping cart. Or, press Cancel.`);
      if (window.confirm) {
        rawDetails.count = rawDetails.stock;
        window.localStorage.setItem('basket', JSON.stringify(storedBricks));
      }
    }
    // console.log(cartContents);
  } else {
    console.log('failed to send message', response);
  }
  // addToBasket();
  cartTally();
}

// function cartTally() {
// const cartCounter = document.querySelector('.total-count');
// const storedBricks = JSON.parse(window.localStorage.getItem('basket'));
//
// let brickTally = 0;
// for (const storedBrick of storedBricks) {
// brickTally += storedBrick.count;
// cartCounter.textContent = brickTally;
// }
// }
//

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

//
