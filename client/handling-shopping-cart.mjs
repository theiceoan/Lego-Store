import { cartContents, dummyIDs } from './shopping-cart.mjs';

export async function addNewBrick(e) {
  const brickID = e.target.parentElement.firstChild.dataset.id;
  const response = await fetch('/bricks/' + brickID);
  // if (response.ok) {
  const rawDetails = await response.json();
  // const brickids = window.localStorage.getItem('brickids');
  // if (brickids == null) {
  rawDetails.count = Math.ceil(Number(e.target.nextSibling.value));
  rawDetails.stock = Number(rawDetails.stock) - Number(rawDetails.count);
  // cartItemQuantity.push(rawDetails.count);
  dummyIDs.push(rawDetails.id);
  window.localStorage.setItem('brickids', dummyIDs);
  cartContents.push(rawDetails);
  // possibly creating a local storage for the quantity only
  // window.localStorage.setItem('quantity', )
  window.localStorage.setItem('basket', JSON.stringify(cartContents));
  console.log('hello world');
}
// } else {
// console.log('failed to send message', response);
// }
// }
