// Adapted from https://github.com/portsoc/staged-simple-message-board
import express from 'express';
import path from 'path';
import url from 'url';

import authConfig from './auth-config.js';
import * as db from './database.js';

const app = express();
app.use(express.static(path.join(path.dirname(url.fileURLToPath(import.meta.url)), 'client')));

app.get('/auth-config', (_req, res) => {
  res.json(authConfig);
});

async function getBricks(_req, res) {
  res.json(await db.listBricks());
}

async function getBrick(req, res) {
  const result = await db.findBrick(req.params.id);
  if (!result) {
    res.status(404).send('No match for that ID');
    return;
  }
  res.json(result);
}

async function putBrick(req, res) {
  const brick = await db.editBrickQuantity(req.body);
  res.json(brick);
}

function asyncWrap(f) {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}

app.get('/bricks', asyncWrap(getBricks));
app.get('/bricks/:id', asyncWrap(getBrick));
app.put('/bricks/:id', express.json(), asyncWrap(putBrick));


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
