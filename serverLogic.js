// adapted from https://github.com/portsoc/staged-simple-message-board/commit/stage-5
import { bricks } from './data-testing.js';
import sqlite from 'sqlite';
import sqlite3 from 'sqlite3';

async function init() {
  const db = await sqlite.open('./database.sqlit', { verbose: true });
  await db.migrate({ migrationsPath: './migrations-sqlite' });
  return db;
}

const dbConn = init();

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
