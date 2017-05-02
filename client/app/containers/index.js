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
      errors: []
    };

    this.onDirectoryClick = this.onDirectoryClick.bind(this);
    this.traverseToParent = this.traverseToParent.bind(this);
    this.pushNewState = this.pushNewState.bind(this);
    this.onFileClick = this.onFileClick.bind(this);
    this.handleError = this.handleError.bind(this);
    this.removeError = this.removeError.bind(this);
  }

  componentDidMount() {
    const initPath = window.location.pathname;

    this.formNewState(initPath).then(newState => {
      window.history.replaceState(newState, null, `${initPath}`);
      window.onpopstate = ({ state }) => this.setState(state);
      this.setState(newState);
    }).catch(this.handleError);
  }

  handleError(res) {
    const error = {
      id: Date.now(),
      text: `${res.status}: ${res.statusText}`
    };
    
    this.setState({
      errors: this.state.errors.concat(error)
    });
  }

  removeError(id) {
    this.setState({
      errors: this.state.errors.filter(error => error.id != id)
    });
  }

  traverseToParent() {
    const last = /[\w-.]*\/$/;
    const newPath = window.location.pathname.replace(last, '');
    
    this.pushNewState(newPath);
  }

  onDirectoryClick(title) {
    this.pushNewState(`${window.location.pathname}${title}/`);
  }

  onFileClick(title) {
    const path = `${window.location.pathname}${title}`;
    const mapToState = response => this.setState(response);

    api.getFile(path).then(mapToState).catch(this.handleError);
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

    return api.getTree(newPath).then(mapToState).catch(this.handleError);
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
      errors,
      directoryEntry,
      currentFile
    } = this.state;

    const breadcrumbs = this.createBreadcrumbs(window.location.pathname);

    return (
      <Main 
        directoryEntry={directoryEntry}
        goTop={this.traverseToParent}
        onDirectoryClick={this.onDirectoryClick}
        currentFile={currentFile}
        onFileClick={this.onFileClick}
        errors={errors}
        breadcrumbs={breadcrumbs}
        removeError={this.removeError}
        isRoot={breadcrumbs.length == 1}
      />
    );
  }
}

export default App;
