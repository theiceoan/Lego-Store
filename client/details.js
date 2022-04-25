/* eslint-disable no-undef */
async function showBrick() {
  let brickid = window.location.search;
  brickid = brickid.slice(1);
  brickid = brickid.split('=');
  brickid = brickid[1];

  const response = await fetch(`bricks/${brickid}`);
  const brickData = await response.json();

  const legoSection = document.querySelector('#lego-brick-section');

  const brickContainer = document.createElement('div');
  brickContainer.className = 'brick-container';

  const img = document.createElement('img');
  img.id = 'image-id';
  img.src = brickData.src;
  brickContainer.append(img);

  const brickName = document.querySelector('#brick-name');
  brickName.textContent = brickData.name;

  const brickPrice = document.createElement('p');
  brickPrice.id = 'brick-price';
  brickPrice.textContent = `Price: £${brickData.price}`;
  brickContainer.append(brickPrice);

  const brickDescription = document.createElement('p');
  brickDescription.id = 'brick-description';
  brickDescription.textContent = `Description: ${brickData.description}`;
  brickContainer.append(brickDescription);

  legoSection.append(brickContainer);
}

window.addEventListener('load', showBrick);
