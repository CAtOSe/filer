const path = require('path');
const express = require('express');
const filesystem = require('../core/filesystem');

const router = express.Router();

const rootPath = path.resolve(process.env.FILE_PATH);

router.get('/*', async (req, res) => {
  const objectPath = path.join(rootPath, req.path);
  const object = await filesystem.createObject(objectPath);

  if (object !== undefined) {
    // Object exists.
    if (object.type === 'dir') {
      // Object is a directory, prepare a listing
      const dirListing = await filesystem.listDirectory(objectPath);

      res.render('browser', {
        listing: dirListing,
        path: req.path,
      });
    } else {
      // Object is a file, send it directly.
      res.sendFile(req.path, { root: rootPath, dotfiles: 'allow' }, (err) => {
        res.status(500).send(err);
      });
    }
  } else {
    // Object doesn't exist, send 404.
    // TODO: Make 404 page
    res.sendStatus(404);
  }
});

module.exports = router;
