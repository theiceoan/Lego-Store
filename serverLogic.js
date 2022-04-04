// adapted from https://github.com/portsoc/staged-simple-message-board/commit/stage-5
import { bricks } from './data-testing.js';

export function listBricks() {
  return bricks;
}

export function findBrick(id) {
  for (const brick of bricks) {
    // eslint-disable-next-line eqeqeq
    if (brick.id == id) {
      return brick;
    }
  }
  return null;
}
