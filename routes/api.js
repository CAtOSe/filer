const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
const filesystem = require('../core/filesystem');

const router = express.Router();
router.use(fileUpload());

const rootPath = path.resolve(process.env.FILE_PATH);
const rootPathTokens = rootPath.split(path.sep).filter((i) => i.length);

// Path processing middleware
router.all('/*', (req, res, next) => {
  req.virtualPath = decodeURIComponent(req.path);
  req.filerPath = path.join(rootPath, req.virtualPath);

  let filerPathTokens = req.filerPath.split('/');

  // Change path separators for Windows.
  if (path.sep !== '/') req.filerPath = filerPathTokens.join(path.sep);

  // Check if path is inside rootPath
  filerPathTokens = filerPathTokens.filter((i) => i.length);
  if (!rootPathTokens.every((t, i) => filerPathTokens[i] === t)) {
    throw new RangeError('Request is outside the allowed path.');
  }

  next();
});

// GET file and directory objects
router.get('/*', async (req, res) => {
  const obj = await filesystem.createObject(req.filerPath);
  obj.path = req.virtualPath;

  if (obj.type === 'dir') {
    obj.list = await filesystem.listDirectory(req.filerPath);
    res.json(obj);
  } else if (obj.type === 'file') {
    res.json(obj);
  } else {
    // Unknown object type
    throw new TypeError('Unknown object type');
  }
});

// Handle URIError
router.use('/', (err, req, res, next) => {
  if (err instanceof URIError) {
    res.status(400).json({
      statusCode: 400,
      type: err.name,
      message: 'Failed to decode URI.',
    });
    return;
  }
  next(err);
});

// Handle RangeError
router.use('/', (err, req, res, next) => {
  if (err instanceof RangeError) {
    res.status(400).json({
      statusCode: 400,
      type: err.name,
      message: err.message,
    });
    return;
  }
  next(err);
});

// Handle TypeError
router.use('/', (err, req, res, next) => {
  if (err instanceof TypeError) {
    res.status(500).json({
      statusCode: 500,
      type: err.name,
      message: err.message,
    });
    return;
  }
  next(err);
});

// Handle No such file or directory
router.use('/', (err, req, res, next) => {
  if (err.code === 'ENOENT') {
    res.status(404).json({
      statusCode: 404,
      type: err.name,
      message: 'No such file or directory',
    });
    return;
  }
  next(err);
});

// Generic error handling in production
if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line no-unused-vars
  router.use('/', (err, req, res, next) => {
    res.status(500).send('An internal server error has occured.');
  });
}

module.exports = router;
