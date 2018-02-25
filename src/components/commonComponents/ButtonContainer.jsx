import React from 'react';

const ButtonContainer = ( props ) => {
  return(
    <div className={'buttonContainer'}>
      {props.children}
    </div>
  )
};

export default ButtonContainer;