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
  directoryEntry: React.PropTypes.array,
  errors: React.PropTypes.array,
  removeError: React.PropTypes.func,
  onDirectoryClick: React.PropTypes.func,
  onFileClick: React.PropTypes.func,
  currentFile: React.PropTypes.objectOf({
    title: React.PropTypes.string,
    __html: React.PropTypes.string
  })
};

export default Main;
