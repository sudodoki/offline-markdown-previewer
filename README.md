# Offline Readme View [![Build Status](https://travis-ci.org/sudodoki/offline-markdown-previewer.svg?branch=master)](https://travis-ci.org/sudodoki/offline-markdown-previewer)

Viewing your favourite's project README just like if you viewed it in github.

## Motivation

This brings offline support for consulting documentation, in most familiar way (subjectively) to the projects that utilizes Github's Markdown for documentation.

> Why not [Atom github preview](#todo-place-link-here)?

Good question, but issues I ran into with [Atom github preview](#todo-place-link-here) were unreadable fonts and issues with markdown. Hopefully, using ruby gem will lessen the gap between what you see in preview and what gets displayed in github.

## [Setup](setup.md)

## Usage

Actually, should use `bin` in package.json and be just `npm i -g offline-markdown-previewer` && using `preview-cli` from your console.

Right now:

+ Run `./server.js` from root of folder with `README.md`
+ Navigate to [http://localhost:3000/](http://localhost:3000/)
