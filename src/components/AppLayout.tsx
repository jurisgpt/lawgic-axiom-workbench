
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const AppLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
