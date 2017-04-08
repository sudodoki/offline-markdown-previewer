import React from 'react';
import FileRow from './FileRow';
import DirectoryRow from './DirectoryRow';

const DirectoryContent = (props) => {
  const { 
    directoryEntry,
    onDirectoryClick,
    onFileClick,
    goTop
  } = props;

  let files = directoryEntry.filter(entry => entry.type == 'file')
    .sort(file => file.name);
  let directories = directoryEntry.filter(entry => entry.type == 'directory')
    .sort(dir => dir.name);

  return (    
    <div className='file-wrap'>
      <table className='files'>
        <tbody>
          <tr onClick={goTop}>
            <td className='icon'>
              <i className='fa fa-level-up'></i>
            </td>
            <td className='content'>
              <span>..</span>
            </td>
          </tr>
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
  ).isRequired,
  onDirectoryClick: React.PropTypes.func.isRequired,
  onFileClick: React.PropTypes.func.isRequired,
  goTop: React.PropTypes.func.isRequired
};

export default DirectoryContent;
