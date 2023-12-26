import express from 'express';
import mongoose from 'mongoose';
import booksRouter from './routes/booksRouter.js';
import cors from 'cors';

const { PORT, mongoDBURL, FRONTEND_URL } = process.env;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);
app.use('/books', booksRouter);

app.get('/', (req, res) => {
  return res.status(200).send('Hello World!');
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  })
  .catch((err) => console.log(err));
