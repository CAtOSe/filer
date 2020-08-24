const path = require('path');
const { promises: fs } = require('fs');
const filesize = require('filesize');

/*
  File Object {
    type (string): ['dir' || 'file],
    basename (string): basename with extenstion (file.txt),
    path (string): object path relative to process.env.PATH,
    size (number): *only if type == file* Size of the file in bytes
    hSize (string): *only if type == file* Human readable file size
  }
*/

// Return File Object
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
      size: objectStats.size,
      hSize: filesize(objectStats.size),
    };
  } catch (e) {
    return undefined;
  }
};

// Returns Array of File Object
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
