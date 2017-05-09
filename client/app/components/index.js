import React from 'react';
import DirectoryContent from './DirectoryContent';
import FilePreview from './FilePreview';
import Notifier from './Notifier';
import Breadcrumbs from './Breadcrumbs';

const Main = props => {
  const { 
    directoryEntry, 
    onDirectoryClick,
    onFileClick,
    notifications,
    removeNotification,
    currentFile,
    breadcrumbs,
    goTop,
    isRoot
  } = props;

  return (
    <div className='main-container'>
      <a className='github-link' href='https://github.com/sudodoki/offline-markdown-previewer'>GitHub</a>
      <h1 className='repohead'>Offline Markdown Previewer</h1>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <DirectoryContent
        goTop={goTop}
        directoryEntry={directoryEntry} 
        onDirectoryClick={onDirectoryClick}
        onFileClick={onFileClick}
        isRoot={isRoot}
      />
      {currentFile.title && <FilePreview currentFile={currentFile} />}
      <Notifier
        notifications={notifications}
        removeNotification={removeNotification} 
      />
    </div>
  );
};

React.propTypes = {
  directoryEntry: React.PropTypes.array.isRequired,
  notifications: React.PropTypes.array.isRequired,
  removeNotification: React.PropTypes.func.isRequired,
  onDirectoryClick: React.PropTypes.func.isRequired,
  onFileClick: React.PropTypes.func.isRequired,
  breadcrumbs: React.PropTypes.array.isRequired,
  goTop: React.PropTypes.func.isRequired,
  currentFile: React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    __html: React.PropTypes.string.isRequired
  }).isRequired,
  isRoot: React.PropTypes.bool.isRequired
};

export default Main;
