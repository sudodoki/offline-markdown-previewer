const fs = require('fs');
const remark = require('remark');
const lint = require('remark-lint');
const html = require('remark-html');

function getMarkdown(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, markdown) => {
      if (!err) {
        resolve(markdown.toString('utf-8'));
      } else {
        reject(err.message);
      }
    });
  });
}

function getFileContent() {
  return getMarkdown('./TEST.md').then((markdown) => {
    return new Promise((resolve, reject) => {
      remark().use(lint).use(html).process(markdown, (err, markdownHtml) => {
        if (!err) {
          resolve({
            content: String(markdownHtml)
          });
        } else {
          reject(err.message);
        }
      });
    });
  });
}

module.exports = {
  getFileContent
};
