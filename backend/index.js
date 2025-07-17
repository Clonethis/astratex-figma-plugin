const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let dataStore = [];

app.post('/data', (req, res) => {
  const data = req.body;
  dataStore.push(data);
  res.status(200).send('Data received');
});

app.get('/data', (req, res) => {
  if (dataStore.length > 0) {
    const data = dataStore.shift();
    res.status(200).json(data);
  } else {
    res.status(204).send();
  }
});

app.listen(port, () => {
  console.log(`Backend service listening at http://localhost:${port}`);
});
