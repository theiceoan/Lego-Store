// Adapted from https://github.com/portsoc/staged-simple-message-board/blob/master/stages/3/svr.js
import express from 'express';
import path from 'path';
import url from 'url';

import authConfig from './auth-config.js';
// change name of bricks to dataProduct
import { bricks } from './data-testing.js';

const app = express();
// this will serve the files present in static/ inside this stage
app.use(express.static(path.join(path.dirname(url.fileURLToPath(import.meta.url)), 'client')));

// serve the auth config publicly
app.get('/auth-config', (req, res) => {
  res.json(authConfig);
});

app.get('/bricks', (req, res) => {
  res.json(bricks);
});

app.get('/bricks/:id', (req, res) => {
  // console.table(bricks);
  for (const brick of bricks) {
    // eslint-disable-next-line eqeqeq
    if (brick.id == req.params.id) {
      res.json(brick);
      return;
    }
  }
  // res.status(404).send('No match for that source');
});

// app.post('/bricks', express.json(), (req, res) => {

// })

// start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

// [
//     {
//         "ID": "001",
//         "Name": "Testing",
//         "brick": "lego_pieces/3002.png"
//     }
// ]
