// adapted from https://github.com/portsoc/staged-simple-message-board/blob/master/stages/2/client/index.js
function showImages(images, where) {
  for (const image of images) {
    const img = document.createElement('img');
    img.src = image;
    img.setAttribute('class', 'lego_image');
    where.append(img);

    let brickCount = 0;
    const button = document.createElement('button');
    button.textContent = 'Add bricks';
    button.setAttribute('class', 'buttons');
    button.addEventListener('click', function () {
      brickCount += 5;
      button.textContent = `Number of Bricks: ${brickCount} `;
    });
    where.append(button);
  }
}

async function loadImages() {
  const response = await fetch('data.json');
  let images;
  if (response.ok) {
    images = await response.json();
  } else {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const legoImageSection = document.querySelector('#lego_image_section');
  showImages(images, legoImageSection);
}

function pageLoaded() {
  loadImages();
}

window.addEventListener('load', pageLoaded);
