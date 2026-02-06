
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Vendors from './pages/Vendors';
import Planner from './pages/Planner';
import Guides from './pages/Guides';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

const SplashScreen = () => (
  <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center splash-overlay">
    <div className="relative flex items-center justify-center h-32 w-64">
      {/* Symbolic Mark Animation */}
      <div className="absolute ring-left w-16 h-16 border-2 border-ever-midnight rounded-full"></div>
      <div className="absolute ring-right w-16 h-16 border-2 border-ever-midnight rounded-full"></div>
    </div>
    <div className="mt-8 overflow-hidden">
      <div className="text-2xl font-normal text-ever-midnight tracking-[0.2em] animate-fade-in" style={{ animationDelay: '0.5s' }}>
        everaftr
      </div>
      <p className="text-ever-cove serif italic text-sm mt-2 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
        Where forever begins
      </p>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // Allow splash animation to complete
    return () => clearTimeout(timer);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={setCurrentPage} />;
      case 'vendors': return <Vendors />;
      case 'planner': return <Planner />;
      case 'guides': return <Guides />;
      default: return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {showSplash && <SplashScreen />}
      
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      <footer className="bg-ever-pearl border-t border-ever-frost pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
            <div className="md:col-span-5">
              <div className="text-3xl font-normal text-ever-midnight flex items-baseline tracking-tight mb-8" style={{ fontFamily: 'Jost' }}>
                everaftr
                <span className="w-1.5 h-1.5 bg-ever-cove rounded-full ml-0.5 mb-1.5"></span>
              </div>
              <p className="text-ever-cove serif italic text-xl leading-relaxed mb-10 max-w-sm">
                A calm, reassuring presence for couples navigating life's most important moments.
              </p>
              <div className="flex gap-4">
                {[Instagram, Facebook, Twitter, Mail].map((Icon, idx) => (
                  <a key={idx} href="#" className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-ever-cove border border-ever-frost hover:bg-ever-midnight hover:text-white transition-all shadow-sm">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-ever-midnight mb-8">Navigation</h4>
              <ul className="space-y-4 text-sm font-medium text-ever-cove">
                <li><button onClick={() => setCurrentPage('vendors')} className="hover:text-ever-midnight transition-colors">Directory</button></li>
                <li><button onClick={() => setCurrentPage('planner')} className="hover:text-ever-midnight transition-colors">Planning Tools</button></li>
                <li><button onClick={() => setCurrentPage('guides')} className="hover:text-ever-midnight transition-colors">Resources</button></li>
                <li><button className="hover:text-ever-midnight transition-colors">Real Weddings</button></li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-ever-midnight mb-8">Directory</h4>
              <ul className="space-y-4 text-sm font-medium text-ever-cove">
                <li><a href="#" className="hover:text-ever-midnight transition-colors">Venues</a></li>
                <li><a href="#" className="hover:text-ever-midnight transition-colors">Catering</a></li>
                <li><a href="#" className="hover:text-ever-midnight transition-colors">Photography</a></li>
                <li><a href="#" className="hover:text-ever-midnight transition-colors">Wedding Stylists</a></li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-ever-midnight mb-8">Newsletter</h4>
              <p className="text-xs text-ever-cove mb-6 leading-relaxed">Join for serene planning tips and local inspiration.</p>
              <div className="flex border-b border-ever-frost pb-2">
                <input type="email" placeholder="Your email address" className="bg-transparent text-sm w-full outline-none py-2 font-medium" />
                <button className="text-[10px] font-bold uppercase tracking-widest text-ever-midnight">Join</button>
              </div>
            </div>
          </div>
          
          <div className="pt-10 border-t border-ever-frost flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-ever-horizon text-[10px] font-bold uppercase tracking-widest">© 2024 everaftr Philippines. Where forever begins.</p>
            <div className="flex gap-10 text-[10px] font-bold uppercase tracking-widest text-ever-horizon">
              <a href="#" className="hover:text-ever-midnight transition-colors">Privacy</a>
              <a href="#" className="hover:text-ever-midnight transition-colors">Terms</a>
              <a href="#" className="hover:text-ever-midnight transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
