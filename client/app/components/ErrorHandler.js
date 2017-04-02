import React from 'react';
import ErrorMessage from './ErrorMessage';

const ErrorHandler = (props) => {
  const { 
    errors,
    removeError 
  } = props;

  return (
      <div className='error-handler'>
        {errors.map(error => 
          <ErrorMessage 
            key={error.id}
            error={error}
            removeError={removeError}
          />)
        }
      </div>
  );
};

ErrorHandler.propTypes = {
  errors: React.PropTypes.array.isRequired,
  removeError: React.PropTypes.func
};

export default ErrorHandler;
