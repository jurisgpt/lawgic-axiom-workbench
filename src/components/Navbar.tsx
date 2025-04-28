
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield } from 'lucide-react';

const NavItem: React.FC<{ to: string; label: string }> = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`px-4 py-2 font-medium rounded-lg transition-colors focus-ring
        ${isActive 
          ? 'bg-indigo-100 text-indigo-700' 
          : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-100'}`
      }
    >
      {label}
    </Link>
  );
};

const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <div className="w-8 h-8 mr-2 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-lg flex items-center justify-center shadow-sm">
            <Shield size={20} className="text-white" />
          </div>
          <Link to="/" className="text-xl font-semibold text-slate-800">
            sLAW Workbench
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-1">
          <NavItem to="/" label="Dashboard" />
          <NavItem to="/cases" label="Cases" />
          <NavItem to="/settings" label="Settings" />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
