#!/usr/bin/env node

const path = require('path');
const express = require('express');
const WebSocket = require('ws');

const tree = require('./tree');
const file = require('./file');
const changeWatcher = require('./changeWatcher');

const wss = new WebSocket.Server({
  port: process.env.npm_package_config_ws_port
});

wss.on('connection', ws => {
  const notifier = payload => {
    ws.send(JSON.stringify(payload));
  };

  const watcher = changeWatcher.subscribe(notifier);

  ws.on('close', () => {
    changeWatcher.unsubscribe(watcher);
  });
});

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.static(path.resolve(__dirname, '../client/public')));

app.listen(process.env.npm_package_config_http_port);

app.get('/api/tree', (req, res) => {
  if (!req.query.path || !req.query.path.trim().length) {
    res.sendStatus(204);
    return;
  }

  tree.getDirectoryContent(req.query.path)
    .then(getRootReadme)
    .then(
      resBody => res.json(resBody), 
      err => res.status(500).send(err.message)
    );

  function getRootReadme(directoryContent) {
    return file.getRootReadme(directoryContent, req.query.path)
      .then(fileContent => Object.assign({}, directoryContent, fileContent));
  }
});

app.get('/api/file', (req, res) => {
  file.getFileContent(req.query.path)
    .then(
      fileContent => res.send(fileContent),
      err => res.send(err.message)
    );
});

console.log(`Listening on ${process.env.npm_package_config_http_port}`);
