require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const browserRouter = require('./routes/browser');
const uploadRouter = require('./routes/upload');
const apiRouter = require('./routes/api');

// Create app with settings
const app = express();
app.set('view engine', 'ejs');
app.use(helmet());

// Public route at /
app.use(express.static('public'));

// Homepage
app.get('/', (req, res) => {
  res.render('home');
});

// File browser
app.use('/files', browserRouter);

// File upload
app.use('/files', uploadRouter);

// API
app.use('/api', apiRouter);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${process.env.PORT}`);
});
