import React from 'react';
import DirectoryContent from './DirectoryContent';

const Main = (props) => {
  const { directoryEntry, onDirectoryClick } = props;

  return (
    <div className='main-container'>
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
  onDirectoryClick: React.PropTypes.func
};

export default Main;
