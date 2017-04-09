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

  onFileClick(title) {
    const path = `${this.state.path}/${title}`;

    const mapToState = response => this.setState(response);

    api.getFile(path).then(mapToState, this.handleError);
  }

  onDirectoryClick(title) {
    const newPath = `${this.state.path}/${title}`;

    this.formNewState(newPath).then(newState => {
      window.history.pushState(newState, null, newPath);
    });
  }

  formNewState(newPath) {
    const handleResponse = response => 
      Object.assign({}, response, { path: newPath });

    const passState = newState => {
      this.setState(newState);
      return newState;
    };

    return api.getTree(newPath)
      .then(handleResponse)
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
