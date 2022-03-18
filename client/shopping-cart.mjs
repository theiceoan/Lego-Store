/* eslint-disable eqeqeq */
export const cartContents = [];

export async function addToCart(e) {
  const brickID = e.target.parentElement.firstChild.dataset.id;
  // console.log(e.target);
  // if the brick is in the basket, then we update the quantity and price
  // stop/return
  // console.log(cartContents.indexOf(e.target.dataset.id));
  // console.log(cartContents);
  if (cartContents.indexOf(e.target.dataset.id) == -1) {
    const response = await fetch('/bricks/' + brickID);
    if (response.ok) {
      const detail = await response.json();
      console.log(detail);
      // window.localStorage.setItem(e.target.dataset.id, JSON.stringify(detail));
      cartContents.push(e.target.dataset.id);
      // console.log(cartContents);
    } else {
      console.log('failed to send message', response);
    }
  }
  // const data = JSON.parse(window.localStorage.getItem(e.target.dataset.id));

  // if (e.target.nextSibling.value > 0) {
  // const img = document.createElement('img');
  // const shoppingCartDetails = document.createElement('p');
  // const brickContainer = document.createElement('div');
  // const dropDown = document.querySelector('#my_dropdown');

  // img.src = data.src;
  // img.id = data.id;
  // brickContainer.append(img);

  // shoppingCartDetails.setAttribute('style', 'white-space: pre;');
  // shoppingCartDetails.textContent = `Name: ${0}\r\nPrice: £${0}`;
  // brickContainer.append(shoppingCartDetails);
  // dropDown.append(brickContainer);
  // }
}
