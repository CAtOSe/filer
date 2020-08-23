require('dotenv').config();
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Filer works!');
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
