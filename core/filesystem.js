const { promises: fs } = require('fs');

module.exports.listDirectory = async (directoryPath) => {
  try {
    return await fs.readdir(directoryPath);
  } catch (e) {
    return e;
  }
};
