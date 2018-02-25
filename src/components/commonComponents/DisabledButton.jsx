import React from 'react';
import PropTypes from 'prop-types';
import ButtonContainer from './ButtonContainer'

const DisabledButton = ({onClick, buttonText}) => (
  <ButtonContainer>
    <button
      className={'disabledButton'}
      onClick={onClick}
      disabled={true}>{buttonText}
    </button>
  </ButtonContainer>
);

DisabledButton.propTypes = {
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
};

DisabledButton.defaultProps = {
  buttonText: "Button",
  onClick: () => {},
};

export default DisabledButton;