import React from 'react';
import DirectoryContent from './DirectoryContent';
import FilePreview from './FilePreview';
import ErrorHandler from './ErrorHandler';

const Main = (props) => {
  const { 
    directoryEntry, 
    onDirectoryClick,
    onFileClick,
    errors,
    removeError,
    currentFile
  } = props;

  return (
    <div className='main-container'>
        <ErrorHandler 
          errors={errors} 
          removeError={removeError} 
        />
        <a href='https://github.com/sudodoki/offline-markdown-previewer'><h1>Offline Markdown Previewer</h1></a>
        <DirectoryContent 
          directoryEntry={directoryEntry} 
          onDirectoryClick={onDirectoryClick}
          onFileClick={onFileClick}
        />
        {currentFile.title && <FilePreview currentFile={currentFile} />}
    </div>
  );
};

React.propTypes = {
  directoryEntry: React.PropTypes.array.isRequired,
  errors: React.PropTypes.array.isRequired,
  removeError: React.PropTypes.func.isRequired,
  onDirectoryClick: React.PropTypes.func.isRequired,
  onFileClick: React.PropTypes.func.isRequired,
  currentFile: React.PropTypes.objectOf({
    title: React.PropTypes.string.isRequired,
    __html: React.PropTypes.string.isRequired
  }).isRequired
};

export default Main;
