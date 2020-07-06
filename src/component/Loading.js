import React from 'react'

const Loading = () => {
  return (
    <div className="d-flex align-items-center text-primary">
      <div className="spinner-border" role="status" aria-hidden="true"></div>
      <strong>Loading...</strong>
    </div>
  );
}

export default Loading;