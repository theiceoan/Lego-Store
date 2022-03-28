/* eslint-disable eqeqeq */
export const cartContents = [];
export const dummyIDs = [];
// const cartPriceTotal = [];

export async function arrayOfBricks(e) {
  const brickID = e.target.parentElement.firstChild.dataset.id;
  const response = await fetch('/bricks/' + brickID);
  if (response.ok) {
    const rawDetails = await response.json();
    // console.log(rawDetails.count);
    // rawDetails.count = Number(e.target.nextSibling.value);

    if (dummyIDs.indexOf(rawDetails.id) == -1 && e.target.nextSibling.value > 0) {
      rawDetails.count = Number(e.target.nextSibling.value);
      // console.log(rawDetails);
      cartContents.push(rawDetails);
      dummyIDs.push(rawDetails.id);

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
  addToBasket();
}

function addToBasket() {
  const dropDown = document.querySelector('#my_dropdown');
  dropDown.textContent = '';
  const storedBricks = JSON.parse(window.localStorage.getItem('basket'));
  for (const storedBrick of storedBricks) {
    const img = document.createElement('img');
    const brickDetails = document.createElement('p');
    const cartbrickContainer = document.createElement('div');
    // console.log(storedBrick);
    img.id = storedBrick.id;
    img.src = storedBrick.src;
    cartbrickContainer.append(img);
    brickDetails.setAttribute('style', 'white-space: pre;');
    brickDetails.textContent = `Name: ${storedBrick.name}\r\nPrice: £${(storedBrick.price * storedBrick.count).toFixed(2)}\r\nQuantity: ${storedBrick.count}`;
    cartbrickContainer.append(brickDetails);
    dropDown.append(cartbrickContainer);
  }
}
