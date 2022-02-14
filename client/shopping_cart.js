function showCart() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  console.log(addToCartButtons);
  for (const addToCartButton of addToCartButtons) {
    console.log('hello world');
    addToCartButton.addEventListener('click', function () {
      console.log('hello world');
      const numOfBricks = document.querySelector('input_display').value;
      console.log(numOfBricks);
    });
  }
}
