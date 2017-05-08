const WebSocket = require('ws');
const chokidar = require('chokidar');

const watcher = chokidar.watch();

const wss = new WebSocket.Server({
  port: 8081
});

let ws = null;

const notify = event => ws.send(JSON.stringify({ event }));

wss.on('connection', connection => ws = connection);

function subscribe(fileTitle) {
  watcher
    .close()
    .add(fileTitle)
    .on('change', () => notify('change'));
}

module.exports = { subscribe };
