import React from 'react';
import { Link } from 'react-router-dom';

function Homepage(): React.JSX.Element {
  return (
    <>
      <p>
        homepage
      </p>
      <Link to="/login">Login</Link>
    </>
  );
}

export default Homepage;
