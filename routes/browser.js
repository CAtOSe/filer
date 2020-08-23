const path = require('path');
const express = require('express');
const filesystem = require('../core/filesystem');

const router = express.Router();

router.get('/*', async (req, res) => {
  const objectPath = path.join(process.env.FILE_PATH, req.path);
  const object = await filesystem.createObject(objectPath);

  console.log(objectPath);
  console.log(object);

  if (object !== undefined) {
    if (object.type === 'dir') {
      res.render('browser', { path: objectPath });
    } else {
      res.send('file');
    }
  } else {
    res.send('404');
  }
});

module.exports = router;
