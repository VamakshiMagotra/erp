import React from 'react';

const Loader = ({className}) => {
  return(
    <div className={`d-flex justify-content-center align-items-center ${className}`}>
      <i className="fas fa-spinner fa-spin" />
    </div>
  );
};

export { Loader };