// Adapted from https://github.com/portsoc/staged-simple-message-board/blob/master/stages/3/svr.js
import express from 'express';
import path from 'path';
import url from 'url';

import authConfig from './auth-config.js';
// import { bricks } from './data-testing.js';
import * as sl from './serverLogic.js';

const app = express();
// this will serve the files present in static/ inside this stage
app.use(express.static(path.join(path.dirname(url.fileURLToPath(import.meta.url)), 'client')));

// serve the auth config publicly
app.get('/auth-config', (req, res) => {
  res.json(authConfig);
});

function getBricks(req, res) {
  res.json(sl.listBricks());
}

function getBrick(req, res) {
  const result = sl.findBrick(req.params.id);
  if (!result) {
    res.status(404).send('No match for that ID');
    return;
  }
  res.json(result);
}

app.get('/bricks', getBricks);
app.get('/bricks/:id', getBrick);

// app.post('/bricks', express.json(), (req, res) => {

// })

// start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
