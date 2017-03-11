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
  return Promise.all(directoryContent.map(entry => {
    return isFile(path.resolve(directoryPath, entry))
      .then(ifFile => {
        return {
          type: ifFile ? 'file' : 'directory',
          name: entry
        };
      });
  }));
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
  return readDirectory(directoryPath).then(entry => formResponse(entry, directoryPath));
}

module.exports = {
  getDirectoryContent
};
