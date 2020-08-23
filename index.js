require('dotenv').config();
const express = require('express');
const browserRouter = require('./routes/browser');

// Create app with settings
const app = express();
app.set('view engine', 'ejs');

// Public route at /
app.use(express.static('public'));

// Homepage
app.get('/', (req, res) => {
  res.send('Filer works!');
});

// File browser
app.use('/files', browserRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
