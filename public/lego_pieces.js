const brick1 = document.createElement('div');
brick1.className = 'brick_type1';
const holder = document.querySelector('.bricks');
holder.replaceWith(brick1);
console.log(brick1);
