async function addNewBrick(e) {
  const brickID = e.target.parentElement.firstChild.dataset.id;
  const response = await fetch('/bricks/' + brickID);
  if (response.ok) {
    const rawDetails = await response.json();
    
  }
}
