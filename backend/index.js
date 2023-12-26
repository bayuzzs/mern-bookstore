import express from 'express';
import { PORT, mongoDBURL } from './config.js';

const app = express();

app.get('/', (req, res) => {
  return res.status(200).send('Hello World!');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
