import React from 'react';
import Breadcrumb from './Breadcrumb';

const Breadcrumbs = props => {
  const { breadcrumbs } = props;

  return (
    <ul className='breadcrumbs'>
      {
        breadcrumbs.map((breadcrumb, index) => 
          <Breadcrumb key={index} breadcrumb={breadcrumb} />) 
      }
    </ul>
  );
};

Breadcrumbs.propTypes = {
  breadcrumbs: React.PropTypes.array.isRequired
};

export default Breadcrumbs;
