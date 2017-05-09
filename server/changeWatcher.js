const chokidar = require('chokidar');
const path = require('path');


function subscribe(notify) {
  return chokidar
    .watch('.')
    .on('change', filePath => notify({
      path: path.resolve(filePath),
      event: 'change'
    }));
}

function unsubscribe(chokidarWatcher) {
  chokidarWatcher.close();
}

module.exports = { subscribe, unsubscribe };
