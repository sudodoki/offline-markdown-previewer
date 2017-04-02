const path = require('path');
const express = require('express');
const tree = require('./tree');

const file = require('./file');

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
    .then(
      files => res.json(files),
      err => res.status(500).send(err.message)
    );
});

app.get('/api/file', (req, res) => {
  file.getFileContent(req.query.path).then(
     files => res.send(files),
     err => res.send(err.message)
   );
});

console.log(`Listening on ${process.env.npm_package_config_port}`);
