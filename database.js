// adapted from https://github.com/portsoc/staged-simple-message-board/commit/stage-5
// import { bricks } from './data-testing.js';
import sqlite from 'sqlite';
// import sqlite3 from 'sqlite3';
import uuid from 'uuid-random';
import fs from 'fs';
import util from 'util';
import path from 'path';

fs.renameAsync = fs.renameAsync || util.promisify(fs.rename);


async function init() {
  const db = await sqlite.open('./database.sqlite', { verbose: true });
  await db.migrate({ migrationsPath: './migrations-sqlite' });
  return db;
}

const dbConn = init();

// we need to be getting hold of the image icon in our page
function addImagePath(brick) {
  if (brick.file) {
    brick.image = '/images/'
  }
}

export async function listBricks() {
  const db = await dbConn;
  return db.all('SELECT * FROM Bricks WHERE stock > 0');
  // return db.all('DROP TABLE Bricks');
}

export async function findBrick(id) {
  const db = await dbConn;
  return db.get('SELECT * FROM Bricks WHERE id = ?', id);
}

export async function editBrickQuantity(updatedBrick) {
  const db = await dbConn;
  // console.log(updatedBrick);

  const id = updatedBrick.id;
  const name = updatedBrick.name;
  // console.log(updatedBrick.name);
  const price = updatedBrick.price;
  const stock = updatedBrick.stock;
  const count = 0;
  const src = updatedBrick.src;
  const description = updatedBrick.description;

  const statement = await db.run('UPDATE Bricks SET name = ? , price = ? , stock = ? , count = ? , src = ? , description = ? WHERE id = ?', [name, price, stock, count, src, description, id]);

  if (statement.changes === 0) throw new Error('brick not found');

  return findBrick(id);
}

export async function addNewBrick(brick) {
  const db = await dbConn;

  const id = uuid();
  const name = brick.name;
  const price = brick.price;
  const stock = brick.stock;
  const count = 0;
  const description = brick.description;

  await db.run('INSERT INTO Bricks VALUES (?, ?, ?, ?, ?, ?)', [id, name, price, stock, count, description]);

  return listBricks();
}
