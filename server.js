// Adapted from https://github.com/portsoc/staged-simple-message-board/blob/master/stages/3/svr.js
import express from 'express';
import path from 'path';
import url from 'url';

import authConfig from './auth-config.js';
import { images } from './data-testing.js';

const app = express();
// this will serve the files present in static/ inside this stage
app.use(express.static(path.join(path.dirname(url.fileURLToPath(import.meta.url)), 'client')));

// serve the auth config publicly
app.get('/auth-config', (req, res) => {
  res.json(authConfig);
});

app.get('/images', (req, res) => {
  res.json(images);
});

app.get('/images/:id', (req, res) => {
  for (const image of images) {
    if (image.id === req.params.id) {
      res.json(image);
      return;
    }
  }
  res.status(404).send('No match for that source');
});

// app.post('/images', express.json(), (req, res) => {

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
//         "Image": "lego_pieces/3002.png"
//     }
// ]
