
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, User, ChevronDown, Building2, UtensilsCrossed, Camera, Shirt, Gem, ClipboardList, Wallet, HeartHandshake, Users, Mail, BookOpen, Heart, Search } from 'lucide-react';
import { VENDORS } from '../constants';
import { NavigationParams } from '../types';

interface NavbarProps {
  onNavigate: (page: string, params?: NavigationParams) => void;
  currentPage: string;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Venues: <Building2 size={18} />,
  Caterers: <UtensilsCrossed size={18} />,
  Photographers: <Camera size={18} />,
  'Bridal Gowns': <Shirt size={18} />,
  Barongs: <Shirt size={18} />,
  Rings: <Gem size={18} />,
};

const PLANNING_TOOLS = [
  { id: 'checklist', label: 'Checklist', icon: <ClipboardList size={18} />, desc: 'Track your timeline' },
  { id: 'budget', label: 'Budget', icon: <Wallet size={18} />, desc: 'Manage your spend' },
  { id: 'sponsors', label: 'Sponsors', icon: <HeartHandshake size={18} />, desc: 'Ninongs & Ninangs' },
  { id: 'guests', label: 'Guest List', icon: <Users size={18} />, desc: 'RSVPs & seating' },
  { id: 'save-the-date', label: 'Save the Date', icon: <Mail size={18} />, desc: 'Design & share' },
];

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const vendorCounts: Record<string, number> = {};
  VENDORS.forEach(v => {
    vendorCounts[v.category] = (vendorCounts[v.category] || 0) + 1;
  });

  const handleNav = (page: string, params?: NavigationParams) => {
    onNavigate(page, params);
    setActiveDropdown(null);
    setMobileOpen(false);
    setMobileExpanded(null);
  };

  const toggleDropdown = (id: string) => {
    setActiveDropdown(prev => prev === id ? null : id);
  };

  return (
    <nav className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-ever-frost transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center" ref={dropdownRef}>
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="text-2xl font-normal text-ever-midnight flex items-baseline tracking-tight"
            style={{ fontFamily: 'Jost' }}
          >
            everaftr
            <span className="w-1 h-1 bg-ever-blush rounded-full ml-0.5 mb-1"></span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Vendors Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('vendors')}
                className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  currentPage === 'vendors' || activeDropdown === 'vendors'
                    ? 'text-ever-midnight bg-ever-pearl'
                    : 'text-ever-cove hover:text-ever-midnight hover:bg-ever-pearl/50'
                }`}
              >
                Vendors
                <ChevronDown size={14} className={`transition-transform ${activeDropdown === 'vendors' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'vendors' && (
                <div className="absolute top-full left-0 mt-2 w-[420px] bg-white rounded-2xl shadow-2xl border border-ever-frost p-6 animate-reveal" style={{ animationDuration: '0.2s' }}>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {Object.entries(CATEGORY_ICONS).map(([cat, icon]) => (
                      <button
                        key={cat}
                        onClick={() => handleNav('vendors', { category: cat })}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-ever-pearl transition-all text-left group"
                      >
                        <div className="w-10 h-10 bg-ever-pearl rounded-xl flex items-center justify-center text-ever-blush group-hover:bg-ever-blush group-hover:text-white transition-all">
                          {icon}
                        </div>
                        <div>
                          <span className="text-sm font-medium text-ever-midnight block">{cat}</span>
                          <span className="text-[10px] text-ever-cove">{vendorCounts[cat] || 0} vendors</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => handleNav('vendors')}
                    className="w-full py-3 text-center text-xs font-bold uppercase tracking-widest text-ever-blush hover:text-ever-midnight border-t border-ever-frost pt-4 transition-colors"
                  >
                    Browse All Vendors
                  </button>
                </div>
              )}
            </div>

            {/* Planning Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('planning')}
                className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  currentPage === 'planner' || activeDropdown === 'planning'
                    ? 'text-ever-midnight bg-ever-pearl'
                    : 'text-ever-cove hover:text-ever-midnight hover:bg-ever-pearl/50'
                }`}
              >
                Planning
                <ChevronDown size={14} className={`transition-transform ${activeDropdown === 'planning' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'planning' && (
                <div className="absolute top-full left-0 mt-2 w-[320px] bg-white rounded-2xl shadow-2xl border border-ever-frost p-4 animate-reveal" style={{ animationDuration: '0.2s' }}>
                  {PLANNING_TOOLS.map(tool => (
                    <button
                      key={tool.id}
                      onClick={() => handleNav('planner', { tab: tool.id })}
                      className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-ever-pearl transition-all text-left group"
                    >
                      <div className="w-10 h-10 bg-ever-pearl rounded-xl flex items-center justify-center text-ever-cove group-hover:bg-ever-midnight group-hover:text-white transition-all">
                        {tool.icon}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-ever-midnight block">{tool.label}</span>
                        <span className="text-[10px] text-ever-cove">{tool.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Links */}
            <button
              onClick={() => handleNav('guides')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                currentPage === 'guides' ? 'text-ever-midnight bg-ever-pearl' : 'text-ever-cove hover:text-ever-midnight hover:bg-ever-pearl/50'
              }`}
            >
              Guides
            </button>

            {/* Separator + Actions */}
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-ever-frost">
              <button className="flex items-center gap-2 px-5 py-2 bg-ever-midnight text-white rounded-full text-xs font-medium hover:bg-ever-cove transition-all">
                <User size={14} />
                Sign In
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-ever-midnight p-2"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-ever-frost" style={{ animation: 'fadeIn 0.2s ease' }}>
          <div className="px-4 py-4 space-y-1">
            {/* Vendors Accordion */}
            <div>
              <button
                onClick={() => setMobileExpanded(mobileExpanded === 'vendors' ? null : 'vendors')}
                className="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-ever-midnight rounded-xl hover:bg-ever-pearl"
              >
                Vendors
                <ChevronDown size={16} className={`transition-transform ${mobileExpanded === 'vendors' ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded === 'vendors' && (
                <div className="pl-4 space-y-1 mt-1">
                  {Object.keys(CATEGORY_ICONS).map(cat => (
                    <button
                      key={cat}
                      onClick={() => handleNav('vendors', { category: cat })}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-ever-cove hover:text-ever-midnight rounded-lg hover:bg-ever-pearl transition-all"
                    >
                      <span className="text-ever-blush">{CATEGORY_ICONS[cat]}</span>
                      {cat}
                    </button>
                  ))}
                  <button
                    onClick={() => handleNav('vendors')}
                    className="w-full px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-ever-blush text-left"
                  >
                    Browse All
                  </button>
                </div>
              )}
            </div>

            {/* Planning Accordion */}
            <div>
              <button
                onClick={() => setMobileExpanded(mobileExpanded === 'planning' ? null : 'planning')}
                className="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-ever-midnight rounded-xl hover:bg-ever-pearl"
              >
                Planning
                <ChevronDown size={16} className={`transition-transform ${mobileExpanded === 'planning' ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded === 'planning' && (
                <div className="pl-4 space-y-1 mt-1">
                  {PLANNING_TOOLS.map(tool => (
                    <button
                      key={tool.id}
                      onClick={() => handleNav('planner', { tab: tool.id })}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-ever-cove hover:text-ever-midnight rounded-lg hover:bg-ever-pearl transition-all"
                    >
                      {tool.icon}
                      {tool.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Guides */}
            <button
              onClick={() => handleNav('guides')}
              className="flex items-center w-full px-4 py-3 text-base font-medium text-ever-midnight rounded-xl hover:bg-ever-pearl"
            >
              Guides
            </button>

            <div className="pt-3 px-4 border-t border-ever-frost mt-2">
              <button className="w-full bg-ever-midnight text-white py-3 rounded-xl font-medium text-sm">
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
