import React from 'react';

const DirectoryRow = props => {
  const { handleClick, name } = props;

  return (
    <tr onClick={handleClick.bind(null, name)}>
      <td className='icon'>
        <i className='fa fa-folder-o'></i>
      </td>
      <td className='content'>
        <span>{name}</span>
      </td>
    </tr>
  );
};

DirectoryRow.propTypes = {
  name: React.PropTypes.string.isRequired,
  handleClick: React.PropTypes.func.isRequired
};

export default DirectoryRow;
