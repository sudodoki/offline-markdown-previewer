import React from 'react';

const ErrorMessage = ({ removeError, errorMessage }) => <div className='error' onClick={removeError.bind(null, errorMessage)} >{errorMessage}</div>;

ErrorMessage.propTypes = {
  errorMessage: React.PropTypes.string,
  removeError: React.PropTypes.func.isRequired
};

export default ErrorMessage;
