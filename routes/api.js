const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
const filesystem = require('../core/filesystem');

const router = express.Router();
router.use(fileUpload());

const rootPath = path.resolve(process.env.FILE_PATH);

// Path processing middleware
router.all('/*', (req, res, next) => {
  console.log(req.path);
  req.filerPath = decodeURIComponent(req.path);
  next();
});

// GET file and directory objects
router.get('/*', async (req, res) => {
  console.log(req.filerPath);
  res.send('OK');
});

router.use('/', (err, req, res, next) => {
  if (err instanceof URIError) {
    res.status(400).json({
      statusCode: 400,
      type: 'URIError',
      message: 'Failed to decode URI.',
    });
    return;
  }
  next(err);
});

module.exports = router;
