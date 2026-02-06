
import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Heart, Camera, Map, FileText, Search, Building2, UtensilsCrossed, Shirt, Gem, Star, MapPin, ClipboardList, Wallet, HeartHandshake, Users, Mail, ChevronRight, CheckCircle, Sparkles } from 'lucide-react';
import { NavigationParams } from '../types';
import { VENDORS, VENDOR_CATEGORIES, ALL_LOCATIONS, POPULAR_SEARCHES, FILIPINO_TRADITIONS } from '../constants';

interface HomeProps {
  onNavigate: (page: string, params?: NavigationParams) => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Venues: <Building2 size={24} />,
  Caterers: <UtensilsCrossed size={24} />,
  Photographers: <Camera size={24} />,
  'Bridal Gowns': <Shirt size={24} />,
  Barongs: <Shirt size={24} />,
  Rings: <Gem size={24} />,
};

const HERO_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1529634597503-139d3726fed5?auto=format&fit=crop&q=80&w=1600', alt: 'Happy couple at their wedding' },
  { url: 'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?auto=format&fit=crop&q=80&w=1600', alt: 'Two brides celebrating their love' },
  { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1600', alt: 'Wedding couple embracing' },
  { url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1600', alt: 'Two grooms on their wedding day' },
  { url: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&q=80&w=1600', alt: 'Couple sharing a tender moment' },
];

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [searchCategory, setSearchCategory] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [heroIndex, setHeroIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setHeroIndex(prev => (prev + 1) % HERO_IMAGES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const vendorCounts: Record<string, number> = {};
  VENDORS.forEach(v => {
    vendorCounts[v.category] = (vendorCounts[v.category] || 0) + 1;
  });

  const featuredVendors = [...VENDORS]
    .filter(v => v.isVerified)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  const spotlightTraditions = FILIPINO_TRADITIONS.filter(t =>
    ['t1', 't3', 't4'].includes(t.id)
  );

  const realWeddings = [
    { id: 1, couple: 'Anton & Bianca', location: 'Intramuros, Manila', style: 'Filipiniana Modern', img: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&q=80&w=800' },
    { id: 2, couple: 'Luis & Maya', location: 'Tagaytay Ridge', style: 'Rustic Garden', img: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=800' },
    { id: 3, couple: 'Javy & Sofia', location: 'BGC, Taguig', style: 'Contemporary Chic', img: 'https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?auto=format&fit=crop&q=80&w=800' }
  ];

  const planningTools = [
    { id: 'checklist', label: 'Checklist', icon: <ClipboardList size={24} />, desc: 'Track your wedding timeline' },
    { id: 'budget', label: 'Budget', icon: <Wallet size={24} />, desc: 'Manage your wedding spend' },
    { id: 'sponsors', label: 'Sponsors', icon: <HeartHandshake size={24} />, desc: 'Organize Ninongs & Ninangs' },
    { id: 'guests', label: 'Guest List', icon: <Users size={24} />, desc: 'Track RSVPs & seating' },
    { id: 'save-the-date', label: 'Save the Date', icon: <Mail size={24} />, desc: 'Design & share your card' },
  ];

  const handleSearch = () => {
    const params: NavigationParams = {};
    if (searchCategory) params.category = searchCategory;
    if (searchLocation) params.location = searchLocation;
    onNavigate('vendors', params);
  };

  return (
    <div className="pb-32">
      {/* ─── Section A: Hero with Image Carousel ─── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background Carousel */}
        {HERO_IMAGES.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: heroIndex === i ? 1 : 0 }}
          >
            <img
              src={img.url}
              alt={img.alt}
              className="w-full h-full object-cover scale-105"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ever-midnight/80 via-ever-midnight/70 to-ever-midnight/85" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center w-full py-20 animate-reveal">
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/90 mb-6 block" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>Where forever begins &bull; PH</span>
          <h1 className="text-5xl md:text-7xl font-normal leading-[0.9] tracking-tighter text-white mb-6" style={{ fontFamily: 'Jost', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
            Plan your dream<br />
            <span className="serif italic font-light text-ever-blush">Filipino wedding.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-xl mx-auto serif italic leading-relaxed mb-12" style={{ textShadow: '0 1px 10px rgba(0,0,0,0.3)' }}>
            Find venues, suppliers, and planning tools for your perfect day.
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl md:rounded-full shadow-2xl p-2 flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="w-full appearance-none bg-ever-pearl rounded-xl md:rounded-full px-5 py-4 text-sm font-medium text-ever-midnight outline-none cursor-pointer"
              >
                <option value="">All Categories</option>
                {VENDOR_CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>
            <div className="relative flex-1">
              <select
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full appearance-none bg-ever-pearl rounded-xl md:rounded-full px-5 py-4 text-sm font-medium text-ever-midnight outline-none cursor-pointer"
              >
                <option value="">All Locations</option>
                {ALL_LOCATIONS.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            <button
              onClick={handleSearch}
              className="bg-ever-blush text-white px-8 py-4 rounded-xl md:rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:bg-ever-midnight transition-all shadow-lg"
            >
              <Search size={16} />
              Search
            </button>
          </div>

          {/* Popular Searches */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 self-center mr-1">Popular:</span>
            {POPULAR_SEARCHES.map((ps, i) => (
              <button
                key={i}
                onClick={() => onNavigate('vendors', { category: ps.category, location: ps.location })}
                className="px-4 py-1.5 bg-white/10 backdrop-blur rounded-full text-xs font-medium text-white/80 border border-white/20 hover:bg-white/20 hover:text-white transition-all"
              >
                {ps.label}
              </button>
            ))}
          </div>

          {/* Carousel Indicators */}
          <div className="mt-10 flex justify-center gap-2">
            {HERO_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroIndex(i)}
                className={`h-1 rounded-full transition-all duration-500 ${heroIndex === i ? 'w-8 bg-ever-blush' : 'w-2 bg-white/30 hover:bg-white/50'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section B: Browse by Category ─── */}
      <section className="max-w-6xl mx-auto px-4 -mt-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {VENDOR_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onNavigate('vendors', { category: cat.id })}
              className="group bg-white p-5 rounded-2xl border border-ever-frost hover:shadow-xl hover:border-ever-blush transition-all text-center"
            >
              <div className="w-12 h-12 bg-ever-pearl rounded-xl flex items-center justify-center mx-auto mb-3 text-ever-blush group-hover:bg-ever-blush group-hover:text-white transition-all">
                {CATEGORY_ICONS[cat.id]}
              </div>
              <h4 className="text-sm font-medium text-ever-midnight mb-0.5">{cat.label}</h4>
              <p className="text-[10px] text-ever-cove font-medium">{vendorCounts[cat.id] || 0} vendors</p>
            </button>
          ))}
        </div>
      </section>

      {/* ─── Section C: Featured Vendors ─── */}
      <section className="mt-24 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-normal text-ever-midnight tracking-tight">Top-Rated Vendors</h2>
            <p className="text-ever-cove mt-2 serif italic">Verified and loved by Filipino couples.</p>
          </div>
          <button
            onClick={() => onNavigate('vendors')}
            className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ever-blush hover:text-ever-midnight transition-colors"
          >
            See All
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4">
          {featuredVendors.map(vendor => (
            <div
              key={vendor.id}
              onClick={() => onNavigate('vendors', { category: vendor.category })}
              className="flex-shrink-0 w-[280px] bg-white rounded-2xl overflow-hidden border border-ever-frost hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="relative h-44 overflow-hidden bg-ever-pearl">
                <img
                  src={vendor.imageUrl}
                  alt={vendor.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                {vendor.isVerified && (
                  <div className="absolute top-3 right-3 bg-ever-midnight text-white px-2.5 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle size={10} />
                    <span className="text-[8px] font-bold uppercase tracking-widest">Verified</span>
                  </div>
                )}
                {vendor.budgetTier <= 2 && (
                  <div className="absolute top-3 left-3 bg-ever-horizon/90 text-white px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Sparkles size={10} />
                    <span className="text-[8px] font-bold uppercase tracking-widest">Sulit</span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-ever-cove">{vendor.category}</span>
                <h4 className="text-lg font-medium text-ever-midnight mt-1 mb-1.5 tracking-tight">{vendor.name}</h4>
                <div className="flex items-center gap-1.5 text-ever-cove text-xs mb-3">
                  <MapPin size={12} />
                  {vendor.location}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-ever-frost">
                  <div className="flex items-center gap-1">
                    <Star className="text-ever-cove fill-ever-cove" size={14} />
                    <span className="text-sm font-bold text-ever-midnight">{vendor.rating}</span>
                    <span className="text-[9px] text-ever-horizon font-bold">({vendor.reviewCount})</span>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4].map(t => (
                      <span key={t} className={`text-[10px] font-bold ${t <= vendor.budgetTier ? 'text-ever-midnight' : 'text-ever-frost'}`}>&#8369;</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => onNavigate('vendors')}
          className="md:hidden mt-6 w-full py-4 text-center text-xs font-bold uppercase tracking-widest text-ever-blush border border-ever-frost rounded-2xl hover:border-ever-blush transition-all"
        >
          See All Vendors
        </button>
      </section>

      {/* ─── Section D: Planning Tools Hub ─── */}
      <section className="mt-32 bg-ever-midnight py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-normal text-white tracking-tight">Your Planning Dashboard</h2>
            <p className="text-ever-horizon mt-3 serif italic text-lg">Everything you need to plan, in one place.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {planningTools.map(tool => (
              <button
                key={tool.id}
                onClick={() => onNavigate('planner', { tab: tool.id })}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 text-left hover:bg-white/10 hover:border-white/20 transition-all group"
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-ever-blush mb-4 group-hover:bg-ever-blush group-hover:text-white transition-all">
                  {tool.icon}
                </div>
                <h4 className="text-white font-medium mb-1">{tool.label}</h4>
                <p className="text-ever-horizon text-xs leading-relaxed">{tool.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section E: Filipino Traditions Spotlight ─── */}
      <section className="mt-32 max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-normal text-ever-midnight serif italic">Honor Your Heritage</h2>
            <p className="text-ever-cove mt-2 text-sm max-w-md">Discover the traditions that make Filipino weddings uniquely beautiful.</p>
          </div>
          <button
            onClick={() => onNavigate('guides')}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ever-blush hover:text-ever-midnight transition-colors"
          >
            Explore All Traditions
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {spotlightTraditions.map(trad => (
            <div
              key={trad.id}
              onClick={() => onNavigate('guides')}
              className="bg-white rounded-2xl p-8 border border-ever-frost hover:shadow-xl hover:border-ever-blush transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2 mb-4">
                <Heart size={14} className="text-ever-blush" />
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-ever-cove">{trad.phase}</span>
              </div>
              <h4 className="text-xl font-medium text-ever-midnight mb-3 tracking-tight">{trad.title}</h4>
              <p className="text-sm text-ever-cove leading-relaxed line-clamp-3">{trad.description}</p>
              <div className="mt-5 flex items-center gap-1 text-xs font-bold text-ever-blush group-hover:gap-2 transition-all">
                Learn more <ChevronRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Section F: Real Weddings ─── */}
      <section className="mt-32 max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-normal text-ever-midnight serif">Real Pinoy Weddings</h2>
          <p className="text-ever-cove mt-2 italic">Get inspired by couples who planned their dream day in the Philippines.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {realWeddings.map((w) => (
            <div key={w.id} className="group cursor-pointer">
              <div className="aspect-[3/4] rounded-[2rem] overflow-hidden mb-5 relative border border-ever-frost">
                <img src={w.img} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" loading="lazy" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest text-ever-midnight">
                  {w.style}
                </div>
              </div>
              <h4 className="text-xl font-normal text-ever-midnight serif italic">{w.couple}</h4>
              <p className="text-[10px] text-ever-cove mt-1 uppercase tracking-widest">{w.location}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Section G: Legal Guide CTA ─── */}
      <section className="mt-32 mx-4">
        <div className="max-w-7xl mx-auto bg-ever-midnight rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-normal text-white serif mb-6 italic">The PSA & Church Roadmap</h2>
            <p className="text-ever-horizon max-w-xl mx-auto mb-10 text-lg">From your CENOMAR to the Marriage License, we have mapped out every legal step for you.</p>
            <button onClick={() => onNavigate('guides')} className="bg-ever-blush text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-ever-midnight transition-all">
              View Legal Guide
            </button>
          </div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 border border-white/5 rounded-full"></div>
        </div>
      </section>
    </div>
  );
};

export default Home;
