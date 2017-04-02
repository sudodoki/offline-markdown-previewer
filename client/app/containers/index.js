import React from 'react';
import Main from '../components/';

import * as api from '../api';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      directoryEntry: [],
      fileHtml: {
        __html: ''
      },
      errors: [],
      path: '?path=.'
    };

    this.onDirectoryClick = this.onDirectoryClick.bind(this);
    this.onFileClick = this.onFileClick.bind(this);
    this.handleError = this.handleError.bind(this);
    this.removeError = this.removeError.bind(this);
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

  onFileClick(link) {
    const newPath = `${this.state.path}/${link}`;

    const handleResponse = (response) => {
      this.setState({
        fileHtml: {
          __html: response.content
        }
      });
    };

    api.getFile(newPath)
      .then(handleResponse, this.handleError);
  }

  onDirectoryClick(link) {
    const newPath = `${this.state.path}/${link}`;

    this.formNewState(newPath).then(newState => {
      window.history.pushState(newState, null, newPath);
    });
  }

  formNewState(newPath) {
    const handleResponse = (response) => {
      const newState = {
        directoryEntry: response,
        path: newPath
      };

      this.setState(newState);
      return newState;
    };

    return api.getTree(newPath)
      .then(handleResponse, this.handleError);
  }

  componentDidMount() {
    const newPath = window.location.search || this.state.path;

    this.formNewState(newPath).then(newState => {
      window.history.replaceState(newState, null, newPath);
      window.onpopstate = event => this.setState(event.state);
    });
  }

  render() {
    const { errors, directoryEntry, fileHtml } = this.state;

    return (
      <Main 
        directoryEntry={directoryEntry}
        onDirectoryClick={this.onDirectoryClick}
        fileHtml={fileHtml}
        onFileClick={this.onFileClick}
        errors={errors}
        removeError={this.removeError}
      />
    );
  }
}

export default App;
