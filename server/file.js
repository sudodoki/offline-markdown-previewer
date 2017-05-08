const fs = require('fs');
const remark = require('remark');
const lint = require('remark-lint');
const html = require('remark-html');
const path = require('path');

let currentFilePath = '';

function isEqual(another) {
  return path.resolve(another) == currentFilePath;
}

function getUTF8String(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, fileContent) => {
      if (err) {
        reject(err.message);
      }

      resolve(fileContent.toString('utf-8'));
    });
  });
}

function formResponse(content, filePath) {
  return Promise.resolve({
    currentFile: {
      title: filePath.split('/').pop(),
      __html: content
    }
  });
}

function applyRemark(markdown) {
  return new Promise((resolve, reject) => {
    remark()
      .use(lint)
      .use(html)
      .process(markdown, (err, markdownHtml) => {
        if (err) {
          reject(err.message);
        }

        resolve(String(markdownHtml));
      });
  });
}

function getFileContent(filePath) {
  currentFilePath = path.resolve(filePath);

  if (path.extname(filePath) == '.md') {
    return getUTF8String(filePath)
      .then(applyRemark)
      .then(content => formResponse(content, filePath));
  }

  return getUTF8String(filePath)
    .then(content => formResponse(content, filePath));
}

function getRootReadme(directory, directoryPath) {
  const rootReadme = 'README.md';

  const isReadme = directory.directoryEntry.find(entry => 
    (entry.type == 'file' && entry.name == rootReadme));

  return isReadme
    ? getFileContent(`${directoryPath}/${rootReadme}`)
    : Promise.resolve({});
}

module.exports = {
  getFileContent,
  getRootReadme,
  isEqual
};
