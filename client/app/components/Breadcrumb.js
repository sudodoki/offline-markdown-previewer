import React from 'react';

const Breadcrumb = props => {
  const { breadcrumb } = props;
    
  return (
      <li className='breadcrumb'>
          <a href={breadcrumb.url}>{breadcrumb.title}</a>
          {
            !breadcrumb.isLast 
              ? <span className='divider'>/</span>
              : null
          }
      </li>
  );
};

Breadcrumb.propTypes = {
  breadcrumb: React.PropTypes.shape({
    url: React.PropTypes.string.isRequired,
    isLast: React.PropTypes.bool.isRequired,
    title: React.PropTypes.string.isRequired
  }).isRequired
};

export default Breadcrumb;
