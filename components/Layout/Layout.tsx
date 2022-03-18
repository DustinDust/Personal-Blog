import React from 'react';
import Header from './Header';

const Layout: React.FC = (props) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
};
export default Layout;
