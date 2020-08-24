const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');

const router = express.Router();
router.use(fileUpload());

const rootPath = path.resolve(process.env.FILE_PATH);

router.put('/*', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const saveFile = function saveFile(file) {
    const newFilePath = path.join(rootPath, req.path, file.name);
    return new Promise(
      (resolve, reject) => {
        file.mv(newFilePath, (err) => {
          if (err) reject(err);
          resolve(file.name);
        });
      },
    );
  };

  // Single file or multi file upload?
  if (Array.isArray(req.files.file)) {
    // Multiple files
    const saves = [];
    req.files.file.forEach((file) => saves.push(saveFile(file)));

    // Execute queued save requests
    Promise.all(saves)
      .then((values) => {
        // Saved succesfully
        res.send(values.length);
      })
      .catch((err) => res.status(500).send(err));
  } else {
    // Single file
    saveFile(req.files.file)
      .then(() => res.send('1'))
      .catch((err) => res.status(500).send(err));
  }
});

module.exports = router;
