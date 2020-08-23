const path = require('path');
const { promises: fs } = require('fs');

exports.listDirectory = async (dirPath) => {
  const directoryPath = path.join('./aaaa/', dirPath);
  let dirListing;

  try {
    dirListing = await fs.readdir(directoryPath);
  } catch (e) {
    console.error(e);
    return;
  }

  if (dirListing !== undefined) {
    console.log(dirListing);
  } else {
    console.error('dirListing is undefined');
  }
};
