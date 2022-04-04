// adapted from https://github.com/portsoc/staged-simple-message-board/commit/stage-5
// import { bricks } from './data-testing.js';
import sqlite from 'sqlite';
// import sqlite3 from 'sqlite3';

async function init() {
  const db = await sqlite.open('./database.sqlite', { verbose: true });
  await db.migrate({ migrationsPath: './migrations-sqlite' });
  return db;
}

// async function init() {
// await open({
// filename: './database.sqlite',
// verbose: true,
// driver: sqlite3.Database,
// }).then((db) => {
// db.migrate({ migrationsPath: './migrations-sqlite' });
// return db;
// });
// }

const dbConn = init();

export async function listBricks() {
  const db = await dbConn;
  return db.all('SELECT * FROM Bricks');
  // return db.all('DROP TABLE Bricks');
}

export async function findBrick(id) {
  const db = await dbConn;
  return db.get('SELECT * FROM Bricks WHERE id = ?', id);
}
