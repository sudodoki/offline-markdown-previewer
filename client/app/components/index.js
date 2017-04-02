import React from 'react';
import DirectoryContent from './DirectoryContent';
import ErrorHandler from '../components/ErrorHandler';

const Main = (props) => {
  const { 
    directoryEntry, 
    onDirectoryClick,
    errors,
    removeError
  } = props;

  return (
    <div className='main-container'>
        <ErrorHandler errors={errors} removeError={removeError} />
        <a href='https://github.com/sudodoki/offline-markdown-previewer'><h1>Offline Markdown Previewer</h1></a>
        <DirectoryContent
          directoryEntry={directoryEntry} 
          onDirectoryClick={onDirectoryClick}
        />
    </div>
  );
};

React.propTypes = {
  directoryEntry: React.PropTypes.array,
  errors: React.PropTypes.array,
  removeError: React.PropTypes.func,
  onDirectoryClick: React.PropTypes.func
};

export default Main;
