/* eslint-disable eqeqeq */
export const cartContents = [];
export const dummyIDs = [];
// const cartPriceTotal = [];

export async function arrayOfBricks(e) {
  const brickID = e.target.parentElement.firstChild.dataset.id;
  const response = await fetch('/bricks/' + brickID);
  if (response.ok) {
    const rawDetails = await response.json();
    rawDetails.count = Number(e.target.nextSibling.value);

    if (dummyIDs.indexOf(rawDetails.id) == -1 && e.target.nextSibling.value > 0) {
      cartContents.push(rawDetails);
      dummyIDs.push(rawDetails.id);
      addToLocalStorage();
    } else if (dummyIDs.indexOf(rawDetails.id) != -1 && e.target.nextSibling.value > 0) {
      // console.log('hello ice');
      const storedBricks = JSON.parse(window.localStorage.getItem('basket'));
      for (const storedBrick of storedBricks) {
        if (storedBrick.id == rawDetails.id) {
          // console.log(storedBrick.count);

          storedBrick.count = Number(storedBrick.count) + rawDetails.count;
          window.localStorage.setItem('basket', JSON.stringify(storedBricks));
          console.log(storedBrick.count);
        }
      }
    }
    // console.log(cartContents);
  } else {
    console.log('failed to send message', response);
  }
}

function addToLocalStorage() {
  window.localStorage.setItem('basket', JSON.stringify(cartContents));
}

