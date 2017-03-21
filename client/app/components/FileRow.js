import React from 'react';

const FileRow = (props) => {
  const { handleClick, name } = props;

  return (
    <tr onClick={handleClick}>
      <td className='icon'>
        <i className='fa fa-file-text-o'></i>
      </td>
      <td className='content'>
        <span>{name}</span>
      </td>
    </tr>
  );
};

FileRow.propTypes = {
  name: React.PropTypes.string.isRequired,
  handleClick: React.PropTypes.func.isRequired
};

export default FileRow;
