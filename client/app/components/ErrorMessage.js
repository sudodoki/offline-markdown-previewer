import React from 'react';

const ErrorMessage = ({ removeError, error }) => <div className='error' onClick={removeError.bind(null, error.id)} >{error.text}</div>;

ErrorMessage.propTypes = {
  error: React.PropTypes.object,
  removeError: React.PropTypes.func.isRequired
};

export default ErrorMessage;
