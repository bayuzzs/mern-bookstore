import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoDBURL } from './config.js';

import { Book } from './models/bookModel.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).send('Hello World!');
});

app.get('/books', async (req, res) => {
  try {
    const book = await Book.find({});
    return res.status(200).json({
      count: book.length,
      books: book,
    });
  } catch (error) {
    console.log(error.messsage);
    res.status(500).send({ message: error.message });
  }
});
app.get('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.messsage);
    res.status(500).send({ message: error.message });
  }
});
app.put('/books/:id', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({ message: 'Missing required fields' });
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({ message: 'Book not found' });
    }
    return res.status(200).send({ message: 'Book updated successfully' });
  } catch (error) {
    console.log(error.messsage);
    res.status(500).send({ message: error.message });
  }
});
app.delete('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ message: 'Book not found' });
    }
    return res.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    console.log(error.messsage);
    res.status(500).send({ message: error.message });
  }
});

app.post('/books', async (req, res) => {
  try {
    // required fields
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({ message: 'Missing required fields' });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.messsage);
    res.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  })
  .catch((err) => console.log(err));
