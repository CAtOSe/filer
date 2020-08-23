const path = require('path');
const { promises: fs } = require('fs');

module.exports.createObject = async (filePath) => {
  try {
    const objectStats = await fs.stat(filePath);
    if (objectStats.isDirectory()) {
      // Construct object with type: dir
      return {
        type: 'dir',
        basename: path.basename(filePath),
        path: filePath,
      };
    }

    // Construct object with type: file
    return {
      type: 'file',
      basename: path.basename(filePath),
      path: filePath,
    };
  } catch (e) {
    return undefined;
  }
};

module.exports.listDirectory = async (directoryPath) => {
  try {
    const dirListing = await fs.readdir(directoryPath);
    const objectListing = await Promise.all(
      dirListing.map(
        async (obj) => module.exports.createObject(path.join(directoryPath, obj)),
      ),
    );
    return objectListing;
  } catch (e) {
    return undefined;
  }
};
