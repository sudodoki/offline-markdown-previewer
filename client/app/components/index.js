import React from 'react';
import DirectoryContent from './DirectoryContent';
import FilePreview from './FilePreview';
import ErrorHandler from '../components/ErrorHandler';

const Main = (props) => {
  const { 
    directoryEntry, 
    onDirectoryClick,
    onFileClick,
    errors,
    removeError,
    fileHtml
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
        <FilePreview fileHtml={fileHtml} />
    </div>
  );
};

React.propTypes = {
  directoryEntry: React.PropTypes.array,
  errors: React.PropTypes.array,
  removeError: React.PropTypes.func,
  onDirectoryClick: React.PropTypes.func,
  onFileClick: React.PropTypes.func,
  fileHtml: React.PropTypes.objectOf({
    __html: React.PropTypes.string
  })
};

export default Main;
