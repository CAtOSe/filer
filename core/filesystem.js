const { promises: fs } = require('fs');

module.exports.listDirectory = async (directoryPath) => {
  let dirListing;

  try {
    dirListing = await fs.readdir(directoryPath);
    return dirListing;
  } catch (e) {
    return e;
  }
};
