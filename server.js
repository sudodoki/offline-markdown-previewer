#!/usr/bin/env node
const path = require('path');
const spawn = require('child_process').spawn;
const http = require('http');
const fs = require('fs');

const cwd = process.cwd()

const executeChild = (file, cb) => {
  const args = ['generate', file];
  const options = {};
  const child = spawn('./preview', args, options);
  var outs = [], errs = [];
  child.stdout.on("data", function(data) {
      outs.push(data);
  });

  child.stderr.on("data", function(data) {
      errs.push(data);
  });

  child.on("close", function(code) {
      if (errs.length > 0 || code !== 0) {
          var err = {
              code: code,
              text: errs.join("")
          };
          cb(err);
      }
      cb(null, outs);
  });
}

http.createServer((req, res) => {
  console.log(req.method + ' ' + req.url);
  if (req.url === '/favicon.ico') { return ;}
  if (req.url === '/vendor/github-markdown-css/github-markdown.css') {
    return res.end(fs.readFileSync(require.resolve('github-markdown-css')));
  }
  executeChild('README.md', (err, data) => {
    // console.log('Err is ', err, ' data is ', data.toString());
    res.end(data.toString());
  })

}).listen(3000, function(){
  console.log('listening');
});
