import React from 'react';
import Main from '../components/';

import * as api from '../api';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      directoryEntry: [],
      path: '?path=.'
    };

    this.onDirectoryClick = this.onDirectoryClick.bind(this);
  }

  onDirectoryClick(link) {
    const newPath = `${this.state.path}/${link}`;

    this.formNewState(newPath).then(newState => {
      window.history.pushState(newState, null, newPath);
    });
  }

  formNewState(newPath) {
    return api.getTree(newPath).then(response => {
      const newState = {
        directoryEntry: response,
        path: newPath
      };

      this.setState(newState);
      return newState;
    });
  }

  componentDidMount() {
    const newPath = window.location.search || this.state.path;

    this.formNewState(newPath).then(newState => {
      window.history.replaceState(newState, null, newPath);
      window.onpopstate = event => this.setState(event.state);
    });
  }

  render() {
    return (
      <Main 
        directoryEntry={this.state.directoryEntry}
        onDirectoryClick={this.onDirectoryClick}
      />
    );
  }
}

export default App;
