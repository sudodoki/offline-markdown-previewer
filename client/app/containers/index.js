import React from 'react';
import Main from '../components/';

import * as api from '../api';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      directoryEntry: [],
      errors: [],
      path: '?path=.'
    };

    this.onDirectoryClick = this.onDirectoryClick.bind(this);
    this.handleError = this.handleError.bind(this);
    this.removeError = this.removeError.bind(this);
  }

  handleError(msg) {
    this.setState({
      errors: this.state.errors.concat(msg)
    });
  }

  removeError(text) {
    this.setState({
      errors: this.state.errors.filter(error => error != text)
    });
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
    const { errors, directoryEntry } = this.state;

    return (
      <Main 
        directoryEntry={directoryEntry}
        onDirectoryClick={this.onDirectoryClick}
        errors={errors}
        removeError={this.removeError}
      />
    );
  }
}

export default App;
