import React from 'react';
import Main from '../components/';

import * as api from '../api';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      directoryEntry: [],
      currentFile: {
        title: '',
        __html: ''
      },
      notifications: []
    };

    this.getDirectoryContent = this.getDirectoryContent.bind(this);
    this.traverseToParent = this.traverseToParent.bind(this);
    this.pushNewState = this.pushNewState.bind(this);
    this.getFileContent = this.getFileContent.bind(this);
    this.addNotification = this.addNotification.bind(this);
    this.removeNotification = this.removeNotification.bind(this);
    this.subscribeToSocket = this.subscribeToSocket.bind(this);
  }

  componentDidMount() {
    const initPath = window.location.pathname;

    this.formNewState(initPath)
      .then(newState => {
        window.history.replaceState(newState, null, `${initPath}`);
        window.onpopstate = ({ state }) => this.setState(state);
        this.setState(newState);
      })
      .catch(res => {
        this.addNotification({
          text: `${res.status}: ${res.statusText}`,
          type: 'error'
        });
      });

    this.subscribeToSocket();
  }

  getDirectoryContent(title) {
    this.pushNewState(`${window.location.pathname}${title}/`);
  }

  getFileContent(title) {
    const path = `${window.location.pathname}${title}`;
    const mapToState = response => this.setState(response);

    api.getFile(path)
      .then(mapToState)
      .catch(res => {
        this.addNotification({
          text: `${res.status}: ${res.statusText}`,
          type: 'error'
        });
      });
  }

  subscribeToSocket() {
    const handleMessage = ({ event }) => {
      if (event == 'change') {
        const { currentFile } = this.state;

        this.getFileContent(currentFile.title);
        this.addNotification({
          text: `File ${currentFile.title} changed and was reloaded`, 
          type: 'success'
        });
      }
    };

    const handleError = ({ message }) => {
      this.addNotification(message, 'error');
    };

    api.subscribeToSocket(handleMessage, handleError);
  }

  addNotification(params) {
    const { notifications } = this.state;

    const notification = Object.assign({}, params, {
      id: Date.now()
    });

    setTimeout(() =>
      this.removeNotification(notification.id),
    2500);
   
    this.setState({
      notifications: notifications.concat(notification)
    });
  }

  removeNotification(id) {
    const { notifications } = this.state;

    this.setState({
      notifications: notifications.filter(notif => notif.id != id)
    });
  }

  traverseToParent() {
    const last = /[\w-.]*\/$/;
    const newPath = window.location.pathname.replace(last, '');
    
    this.pushNewState(newPath);
  }

  pushNewState(newPath) {
    this.formNewState(newPath).then(newState => {
      window.history.pushState(newState, null, `${newPath}`);
      this.setState(newState);
    });
  }

  formNewState(newPath) {
    const mapToState = response =>
      Object.assign({}, response, { path: newPath });

    return api.getTree(newPath)
      .then(mapToState)
      .catch(res => {
        this.addNotification({
          text: `${res.status}: ${res.statusText}`,
          type: 'error'
        });
      });
  }

  createBreadcrumbs(path) {
    const matched = `.${path}`.match(/[\w-.]*\//g);

    return matched.map((title, index, splited) => {
      const next = index + 1;

      return {
        url: `/${splited.slice(0, next).join('')}`,
        isLast: (next == splited.length),
        title: title.slice(0, -1)
      };
    });
  }

  render() {
    const {
      notifications,
      directoryEntry,
      currentFile
    } = this.state;

    const breadcrumbs = this.createBreadcrumbs(window.location.pathname);

    return (
      <Main 
        directoryEntry={directoryEntry}
        goTop={this.traverseToParent}
        currentFile={currentFile}
        onDirectoryClick={this.getDirectoryContent}
        onFileClick={this.getFileContent}
        notifications={notifications}
        breadcrumbs={breadcrumbs}
        removeNotification={this.removeNotification}
        isRoot={breadcrumbs.length == 1}
      />
    );
  }
}

export default App;
