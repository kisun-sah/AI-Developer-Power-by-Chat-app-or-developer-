import React from 'react';
import Header from '../component/header';
import Homepage from './Homepage';

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Homepage />
      </main>
    </>
  );
};

export default Layout;