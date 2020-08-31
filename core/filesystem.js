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
// Can throw IO error
module.exports.createObject = async (filePath) => {
  const objectStats = await fs.stat(filePath);
  if (objectStats.isDirectory()) {
    // Construct object with type: dir
    return {
      type: 'dir',
      basename: path.basename(filePath),
    };
  }

  // Construct object with type: file
  return {
    type: 'file',
    basename: path.basename(filePath),
    size: objectStats.size,
    humanSize: filesize(objectStats.size),
  };
};

// Returns Array of File Object
// Can throw IO error
module.exports.listDirectory = async (directoryPath) => {
  const dirListing = await fs.readdir(directoryPath);
  const objectListing = await Promise.all(
    dirListing.map(
      async (obj) => module.exports.createObject(path.join(directoryPath, obj)),
    ),
  );

  // Sort directories first, then files
  objectListing.sort((a, b) => {
    if (a.type < b.type) return -1; // Works, because 'd' comes before 'f'
    if (a.type > b.type) return 1;
    if (a.type === b.type) {
      // Same type, sort by name
      return a.basename.localeCompare(b.basename, { sensitivity: 'base' });
    }
    return 0;
  });

  return objectListing;
};
