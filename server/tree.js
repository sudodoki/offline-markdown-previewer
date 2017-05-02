const path = require('path');
const fs = require('fs');

function isFile(content) {
  return new Promise((resolve, reject) => {
    fs.stat(content, (err, stats) => {
      if (err) {
        reject(err);
      }

      resolve(stats.isFile());
    });
  });
}

function formResponse(directoryContent, directoryPath) {
  return extract(directoryContent, directoryPath)
    .then(directoryEntry => ({ directoryEntry }));

  function extract(dirCon, dirPath) {
    return Promise.all(dirCon.map(entry => {
      return isFile(path.resolve(dirPath, entry))
        .then(ifFile => {
          return {
            type: ifFile ? 'file' : 'directory',
            name: entry
          };
        });
    }));
  }
}

function readDirectory(directoryPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, entry) => {
      if (err) {
        reject(err);
      }
      
      resolve(entry);
    });
  });
}

function getDirectoryContent(directoryPath) {
  const normalized = path.normalize(directoryPath);

  return readDirectory(normalized)
    .then(entry => formResponse(entry, normalized));
}

module.exports = {
  getDirectoryContent
};
