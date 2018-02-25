import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ( {errorMessage} ) => {

  return(
    <div className={'errorMessageWrapper'}>
      <span className={'errorMessage'}>{errorMessage}</span>
    </div>
  )
};

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string,
};

ErrorMessage.defaultProps = {
  errorMessage: '',
};

export default ErrorMessage;