import React from 'react';

const Paginations = () => {
  return (
    <div className="paginations">
      <svg
        width="14"
        height="24"
        viewBox="0 0 14 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M13 1L2 12L13 23" stroke="white" strokeWidth="2" />
      </svg>
      <i>
        <span>1</span>
      </i>
      <i className="active">
        <span className="active">2</span>
      </i>
      <i>
        <span>3</span>
      </i>
      <svg
        width="14"
        height="24"
        viewBox="0 0 14 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L12 12L1 23" stroke="white" strokeWidth="2" />
      </svg>
    </div>
  );
};

export default Paginations;
