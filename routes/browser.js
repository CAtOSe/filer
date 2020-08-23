const express = require('express');

const router = express.Router();

router.get('/*', (req, res) => {
  res.render('browser', { path: req.path });
});

module.exports = router;
