import React from 'react';
import ErrorMessage from './ErrorMessage';

const ErrorHandler = (props) => {
  const { 
    errors,
    removeError 
  } = props;

  return (
      <div className='error-handler'>
        {errors.map((error, index) => 
          <ErrorMessage 
            key={index}
            errorMessage={error}
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
