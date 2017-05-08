const WebSocket = require('ws');
const chokidar = require('chokidar');

const watcher = chokidar.watch();

const wss = new WebSocket.Server({
  port: 8081
});

let ws = null;

wss.on('connection', connection => ws = connection);

function notify(title, event) {
  const response = JSON.stringify({
    title,
    event
  });
  
  ws.send(response);
}

function subscribe(fileTitle) {
  watcher
    .close()
    .add(fileTitle)
    .on('change', () => notify(fileTitle, 'change'));
}

module.exports = { subscribe };
