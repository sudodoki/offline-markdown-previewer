import React from 'react';
import FileRow from './FileRow';
import DirectoryRow from './DirectoryRow';

const DirectoryContent = (props) => {
  const { directoryEntry, onDirectoryClick, onFileClick } = props;

  let files = directoryEntry.filter(entry => entry.type == 'file')
    .sort(file => file.name);
  let directories = directoryEntry.filter(entry => entry.type == 'directory')
    .sort(dir => dir.name);

  return (    
    <div className='file-wrap'>
      <table className='files'>
        <tbody>
          {directories.map((dir, index) =>
            <DirectoryRow 
              key={index} 
              {...dir}
              handleClick={onDirectoryClick} 
            />
          )}
          {files.map((file, index) => 
            <FileRow 
              key={index} 
              {...file}
              handleClick={onFileClick} 
            />
          )}
        </tbody>
      </table>
    </div>
  );
};

DirectoryContent.propTypes = {
  directoryEntry: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      type: React.PropTypes.string,
      name: React.PropTypes.string
    })
  ),
  onDirectoryClick: React.PropTypes.func,
  onFileClick: React.PropTypes.func
};

export default DirectoryContent;
