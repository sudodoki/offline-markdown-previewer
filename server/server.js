const path = require('path');
const express = require('express');
const tree = require('./tree');
const file = require('./file');
const fileWatcher = require('./fileWatcher');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.static(path.resolve(__dirname, '../client/public')));

app.listen(process.env.npm_package_config_port);

app.get('/api/tree', (req, res) => {
  if (!req.query.path || !req.query.path.trim().length) {
    res.sendStatus(204);
    return;
  }

  tree.getDirectoryContent(req.query.path)
    .then(getRootReadme)
    .then(resBody => res.json(resBody), err => res.status(500).send(err.message));

  function getRootReadme(directoryContent) {
    return file.getRootReadme(directoryContent, req.query.path)
      .then(fileContent => Object.assign({}, directoryContent, fileContent));
  }
});

app.get('/api/file', (req, res) => {
  fileWatcher.subscribe(req.query.path);

  file.getFileContent(req.query.path)
    .then(
      fileContent => res.send(fileContent),
      err => res.send(err.message)
    );
});

console.log(`Listening on ${process.env.npm_package_config_port}`);
