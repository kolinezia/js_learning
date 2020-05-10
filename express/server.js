/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const storage = require('./storage')();

const PORT = 3000;
const app = express();
app.use(bodyParser.json());

app.get('/books', (req, res) => {
  res.json(storage.get());
});

app.get('/books/:id', (req, res) => {
  const result = storage.find(req.params.id);
  res.send(result);
});

app.post('/books', (req, res) => {

  if (req.body.title && req.body.author) {
    const result = storage.save(req.body);
    res.send(result);
  }
  else {
    res.status(422).send('Title or Author is not found');
  }
});

app.put('/books/:id', (req, res) => {
  const result = storage.update(req.params.id, req.body);
  res.send(result);
});

app.delete('/books/:id', (req, res) => {
  const result = storage.delete(req.params.id);
  res.send(result);
});

app.listen(PORT, () => {
  console.log('Server started...');
});
