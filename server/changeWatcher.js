const chokidar = require('chokidar');
const file = require('./file');

function subscribe(notify) {
  chokidar
    .watch('.')
    .on('change', filePath => {
      if (file.isEqual(filePath)) {
        notify('change');
      }
    });
}

module.exports = { subscribe };
