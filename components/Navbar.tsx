
import React, { useState } from 'react';
import { Menu, X, Heart, User, Search } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Vendors', id: 'vendors' },
    { name: 'Planner', id: 'planner' },
    { name: 'Guides', id: 'guides' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-ever-frost">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <button 
              onClick={() => onNavigate('home')}
              className="text-2xl font-normal text-ever-midnight flex items-baseline tracking-tight"
              style={{ fontFamily: 'Jost' }}
            >
              everaftr
              <span className="w-1 h-1 bg-ever-cove rounded-full ml-0.5 mb-1"></span>
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium transition-all tracking-wide ${
                  currentPage === item.id ? 'text-ever-midnight' : 'text-ever-cove hover:text-ever-midnight'
                }`}
              >
                {item.name}
              </button>
            ))}
            <div className="flex items-center space-x-4 border-l pl-8 border-ever-frost">
              <button className="p-2 text-ever-cove hover:text-ever-midnight transition-colors">
                <Search size={20} />
              </button>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-ever-midnight text-white rounded-full text-sm font-medium hover:bg-ever-cove transition-all">
                <User size={16} />
                Sign In
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-ever-midnight p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-ever-frost animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-6 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-4 text-base font-medium ${
                  currentPage === item.id ? 'text-ever-midnight bg-ever-pearl' : 'text-ever-cove'
                }`}
              >
                {item.name}
              </button>
            ))}
            <div className="pt-4 px-4">
              <button className="w-full bg-ever-midnight text-white py-4 rounded-xl font-medium">
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
