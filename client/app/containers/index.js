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
      errors: [],
      path: '?path=.'
    };

    this.getRootReadme = this.getRootReadme.bind(this);
    this.onDirectoryClick = this.onDirectoryClick.bind(this);
    this.traverseToParent = this.traverseToParent.bind(this);
    this.onFileClick = this.onFileClick.bind(this);
    this.getFile = this.getFile.bind(this);
    this.handleError = this.handleError.bind(this);
    this.removeError = this.removeError.bind(this);
  }

  handleError(res) {
    const error = {
      id: Date.now(),
      text: `${res.status}: ${res.statusText}`
    };

    console.error(res);
    
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
    let newPath = this.state.path.split('/');
    
    if (newPath.length == 1 || newPath[newPath.length - 1] == '..') {
      newPath = newPath.concat('..').join('/');
    
    } else {
      newPath.pop();
      newPath = newPath.join('/');
    }

    this.formNewState(newPath).then(newState => {
      window.history.pushState(newState, null, newPath);
    });
  }

  onFileClick(link) {
    this.getFile(this.state.path, link).then(file => this.setState(file));
  }

  getFile(path, title) {
    const newPath = `${path}/${title}`;

    const handleResponse = (response) => {
      return {
        currentFile: {
          title,
          __html: response.content
        }
      };
    };

    return api.getFile(newPath)
      .then(handleResponse, this.handleError);
  }

  getRootReadme(newState) {
    const rootReadme = 'README.md';

    const isReadme = newState.directoryEntry.find(entry => 
      (entry.type == 'file' && entry.name == rootReadme));

    const addFile = file => Object.assign({}, newState, file);

    if (isReadme) {
      return this.getFile(newState.path, rootReadme).then(addFile);
    
    } else {
      return newState;
    }
  }

  onDirectoryClick(link) {
    const newPath = `${this.state.path}/${link}`;

    this.formNewState(newPath).then(newState => {
      window.history.pushState(newState, null, newPath);
    });
  }

  formNewState(newPath) {
    const handleResponse = response => {
      const newState = {
        directoryEntry: response,
        path: newPath
      };

      return newState;
    };

    const passState = newState => {
      this.setState(newState);
      return newState;
    };

    return api.getTree(newPath)
      .then(handleResponse)
      .then(this.getRootReadme)
      .then(passState);
  }

  componentDidMount() {
    const newPath = window.location.search || this.state.path;

    this.formNewState(newPath).then(newState => {
      window.history.replaceState(newState, null, newPath);
      window.onpopstate = ({ state }) => this.setState(state);
    }).catch(this.handleError);
  }

  render() {
    const { errors, directoryEntry, currentFile } = this.state;

    return (
      <Main 
        directoryEntry={directoryEntry}
        goTop={this.traverseToParent}
        onDirectoryClick={this.onDirectoryClick}
        currentFile={currentFile}
        onFileClick={this.onFileClick}
        errors={errors}
        removeError={this.removeError}
      />
    );
  }
}

export default App;
