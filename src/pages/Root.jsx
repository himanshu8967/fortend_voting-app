import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Ensure this path is correct

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <main> {/* Adjust pt-16 based on Navbar height */}
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
