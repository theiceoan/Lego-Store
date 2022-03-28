/* eslint-disable eqeqeq */
export const cartContents = [];
export const dummyIDs = [];
// const cartPriceTotal = [];

export async function arrayOfBricks(e) {
  const brickID = e.target.parentElement.firstChild.dataset.id;
  const response = await fetch('/bricks/' + brickID);
  if (response.ok && e.target.nextSibling.value > 0) {
    const rawDetails = await response.json();

    cartContents.push(rawDetails);
    addToLocalStorage();
    console.log(cartContents);
  } else {
    console.log('failed to send message', response);
  }
}

function addToLocalStorage() {
  window.localStorage.setItem('basket', JSON.stringify(cartContents));
}
