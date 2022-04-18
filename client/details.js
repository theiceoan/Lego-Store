async function showBrick() {
  let brickid = window.location.search;
  // console.log(brickid);
  brickid = brickid.slice(1);
  brickid = brickid.split('=');
  brickid = brickid[1];
  // console.log(brickid);

  const response = await fetch(`bricks/${brickid}`);
  const brickDetails = await response.json();
  console.log(brickDetails);
  const legoSection = document.querySelector('#lego-brick-section');
  const brickName = document.querySelector('#brick-name');
  brickName.textContent = brickDetails.name;

  const brickContainer = document.createElement('div');
  brickContainer.classList.add = 'brick-container';

  const img = document.createElement('img');
  img.id = 'image-id';
  img.src = brickDetails.src;

  const brickPrice = document.createElement('p');
  brickPrice.id = 'brick-price';
  brickPrice.textContent = `Price: £${brickDetails.price}`;

  const brickDescription = document.createElement('p');
  brickDescription.id = 'brick-description';
  brickDescription.textContent = `Description: ${brickDetails.description}`;

  brickContainer.append(img);
  brickContainer.append(brickPrice);
  brickContainer.append(brickDescription);
  legoSection.append(brickContainer);
}

window.addEventListener('load', showBrick);
