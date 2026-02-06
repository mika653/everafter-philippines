
import React, { useState, useEffect } from 'react';
import { VENDORS } from '../constants';
import { Search, MapPin, Star, CheckCircle, Video, X, Sparkles, RotateCcw, ChevronDown, Map as MapIcon, Info, Heart } from 'lucide-react';
import { Vendor } from '../types';

interface VendorsProps {
  defaultCategory?: string;
  defaultLocation?: string;
}

const Vendors: React.FC<VendorsProps> = ({ defaultCategory, defaultLocation }) => {
  const [activeCategory, setActiveCategory] = useState(defaultCategory || 'All');
  const [budgetFilters, setBudgetFilters] = useState<number[]>([]);
  const [locationFilters, setLocationFilters] = useState<string[]>(defaultLocation ? [defaultLocation] : []);
  const [styleFilters, setStyleFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTour, setSelectedTour] = useState<string | null>(null);
  const [isLocationExpanded, setIsLocationExpanded] = useState(!!defaultLocation);

  useEffect(() => {
    if (defaultCategory) setActiveCategory(defaultCategory);
    if (defaultLocation) {
      setLocationFilters([defaultLocation]);
      setIsLocationExpanded(true);
    }
  }, [defaultCategory, defaultLocation]);
  
  const categories = ['All', 'Venues', 'Caterers', 'Photographers', 'Bridal Gowns', 'Barongs', 'Rings'];
  
  const weddingStyles = ['Civil', 'Church', 'Garden', 'Beach', 'Destination', 'Intimate'];

  const regions = [
    { title: 'Metro Manila', items: ['Metro Manila (North)', 'Metro Manila (South)'] },
    { title: 'Luzon', items: ['Luzon (North)', 'Luzon (Central)', 'Tagaytay'] },
    { title: 'Visayas & Mindanao', items: ['Visayas', 'Mindanao', 'Boracay', 'Bohol'] }
  ];

  const toggleBudgetFilter = (tier: number) => {
    setBudgetFilters(prev => 
      prev.includes(tier) 
        ? prev.filter(t => t !== tier) 
        : [...prev, tier]
    );
  };

  const toggleLocationFilter = (loc: string) => {
    setLocationFilters(prev => 
      prev.includes(loc) 
        ? prev.filter(l => l !== loc) 
        : [...prev, loc]
    );
  };

  const toggleStyleFilter = (style: string) => {
    setStyleFilters(prev => 
      prev.includes(style) 
        ? prev.filter(s => s !== style) 
        : [...prev, style]
    );
  };

  const clearFilters = () => {
    setActiveCategory('All');
    setBudgetFilters([]);
    setLocationFilters([]);
    setStyleFilters([]);
    setSearchQuery('');
  };

  const filteredVendors = VENDORS.filter(v => {
    const categoryMatch = activeCategory === 'All' || v.category === activeCategory;
    const budgetMatch = budgetFilters.length === 0 || budgetFilters.includes(v.budgetTier);
    const locationMatch = locationFilters.length === 0 || locationFilters.includes(v.location);
    const styleMatch = styleFilters.length === 0 || styleFilters.some(s => v.tags.includes(s));
    const searchMatch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       v.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       v.category.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && budgetMatch && locationMatch && styleMatch && searchMatch;
  });

  const isAnyFilterActive = activeCategory !== 'All' || budgetFilters.length > 0 || locationFilters.length > 0 || styleFilters.length > 0 || searchQuery !== '';

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h1 className="text-5xl font-normal text-ever-midnight mb-4 tracking-tight">The Directory</h1>
          <p className="text-ever-cove serif italic text-xl">Curated partners for your Philippine wedding.</p>
        </div>
        {isAnyFilterActive && (
          <button 
            onClick={clearFilters}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ever-cove hover:text-ever-midnight transition-all border-b border-transparent hover:border-ever-midnight pb-1"
          >
            <RotateCcw size={14} />
            Reset Filters
          </button>
        )}
      </div>

      {/* Advanced Filters */}
      <div className="space-y-6 mb-16">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-ever-cove" size={20} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, category, or specific location..." 
              className="w-full pl-14 pr-6 py-4.5 bg-ever-pearl border border-ever-frost rounded-3xl outline-none focus:border-ever-midnight transition-all"
            />
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-8 py-4 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat 
                  ? 'bg-ever-midnight text-white shadow-lg' 
                  : 'bg-white text-ever-cove border border-ever-frost hover:border-ever-midnight'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Wedding Style Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ever-horizon self-center mr-4">Wedding Style:</span>
          {weddingStyles.map(style => (
            <button
              key={style}
              onClick={() => toggleStyleFilter(style)}
              className={`px-6 py-2.5 rounded-full text-xs font-medium transition-all border flex items-center gap-2 ${
                styleFilters.includes(style)
                ? 'bg-ever-horizon text-white border-ever-horizon shadow-md'
                : 'bg-white text-ever-cove border-ever-frost hover:border-ever-cove'
              }`}
            >
              <Heart size={12} className={styleFilters.includes(style) ? 'fill-white' : ''} />
              {style === 'Intimate' ? 'Intimate Wedding' : style}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Multi-Select Budget Filter */}
          <div className="lg:col-span-5 p-8 bg-ever-pearl rounded-[2.5rem] border border-ever-frost flex flex-col justify-center">
            <div className="flex flex-col mb-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ever-midnight mb-1">Budget Preference</span>
              <span className="text-xs text-ever-cove">Select tiers to match your budget plan</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {[
                { label: '₱', value: 1, desc: 'Budget' },
                { label: '₱₱', value: 2, desc: 'Mid' },
                { label: '₱₱₱', value: 3, desc: 'Premium' },
                { label: '₱₱₱₱', value: 4, desc: 'Luxury' }
              ].map(tier => (
                <button
                  key={tier.value}
                  onClick={() => toggleBudgetFilter(tier.value)}
                  className={`flex-1 py-4 rounded-2xl transition-all border flex flex-col items-center justify-center ${
                    budgetFilters.includes(tier.value)
                    ? 'bg-ever-midnight border-ever-midnight text-white shadow-xl translate-y-[-2px]'
                    : 'bg-white border-ever-frost text-ever-cove hover:border-ever-midnight'
                  }`}
                >
                  <span className="text-lg font-bold tracking-tighter">{tier.label}</span>
                  <span className={`text-[8px] font-bold uppercase tracking-widest ${budgetFilters.includes(tier.value) ? 'text-ever-horizon' : 'text-ever-horizon/60'}`}>
                    {tier.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* New Enhanced Location Filter */}
          <div className="lg:col-span-7 p-8 bg-ever-pearl rounded-[2.5rem] border border-ever-frost">
            <div className="flex justify-between items-start mb-6">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ever-midnight mb-1">Service Area</span>
                <span className="text-xs text-ever-cove">Filter by Philippine regions & destinations</span>
              </div>
              <button 
                onClick={() => setIsLocationExpanded(!isLocationExpanded)}
                className="p-2 hover:bg-white rounded-full transition-all text-ever-cove"
              >
                <ChevronDown size={20} className={`transition-transform duration-300 ${isLocationExpanded ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-500 overflow-hidden ${isLocationExpanded ? 'max-h-[600px] opacity-100' : 'max-h-[120px] opacity-100'}`}>
              {regions.map(region => (
                <div key={region.title} className="space-y-3">
                  <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] text-ever-horizon pb-2 border-b border-ever-frost/50">{region.title}</h4>
                  <div className="flex flex-col gap-2">
                    {region.items.map(loc => (
                      <button
                        key={loc}
                        onClick={() => toggleLocationFilter(loc)}
                        className={`text-left px-4 py-2.5 rounded-xl text-xs font-medium transition-all border ${
                          locationFilters.includes(loc)
                          ? 'bg-ever-midnight text-white border-ever-midnight shadow-md'
                          : 'bg-white text-ever-cove border-ever-frost hover:border-ever-horizon'
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {(locationFilters.length > 0 || styleFilters.length > 0) && (
              <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-ever-frost/50">
                <span className="text-[9px] font-bold uppercase tracking-widest text-ever-horizon mr-2 self-center">Active Filters:</span>
                {styleFilters.map(style => (
                  <span key={style} className="bg-ever-horizon/20 text-ever-midnight px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-2">
                    {style}
                    <button onClick={() => toggleStyleFilter(style)}><X size={10} /></button>
                  </span>
                ))}
                {locationFilters.map(loc => (
                  <span key={loc} className="bg-ever-frost/30 text-ever-midnight px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-2">
                    {loc}
                    <button onClick={() => toggleLocationFilter(loc)}><X size={10} /></button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-8 flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-widest text-ever-cove">
          Showing {filteredVendors.length} {filteredVendors.length === 1 ? 'Supplier' : 'Suppliers'}
        </p>
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-ever-pearl rounded-full border border-ever-frost">
           <Info size={12} className="text-ever-cove" />
           <span className="text-[9px] font-bold uppercase tracking-widest text-ever-cove">Look for <span className="text-ever-midnight">Sulit Picks</span> for high-value options</span>
        </div>
      </div>

      {/* Vendor Grid */}
      {filteredVendors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredVendors.map(vendor => (
            <div key={vendor.id} className="group bg-white rounded-[3rem] overflow-hidden border border-ever-frost hover:shadow-2xl transition-all duration-700 flex flex-col">
              <div className="relative h-72 overflow-hidden bg-ever-pearl">
                <img 
                  src={vendor.imageUrl} 
                  alt={vendor.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale-[0.3] group-hover:grayscale-0" 
                  loading="lazy"
                />
                
                {/* Featured / Sulit Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  {vendor.budgetTier <= 2 && (
                    <div className="bg-ever-horizon/95 backdrop-blur text-white px-4 py-2 rounded-full flex items-center gap-2 border border-white/20 shadow-xl transform -rotate-1">
                      <Sparkles size={12} className="text-ever-frost animate-pulse" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em]">Sulit Pick</span>
                    </div>
                  )}
                  {['Boracay', 'Tagaytay', 'Bohol'].includes(vendor.location) && (
                    <div className="bg-ever-midnight/90 backdrop-blur text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-md">
                      <MapIcon size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Top Destination</span>
                    </div>
                  )}
                  {vendor.tags.includes('Intimate') && (
                    <div className="bg-white/90 backdrop-blur text-ever-midnight px-4 py-2 rounded-full flex items-center gap-2 shadow-sm border border-ever-frost">
                      <Heart size={10} className="text-ever-horizon fill-ever-horizon" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Intimate Choice</span>
                    </div>
                  )}
                </div>

                {vendor.virtualTourUrl && (
                  <button 
                    onClick={() => setSelectedTour(vendor.virtualTourUrl || null)}
                    className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-5 py-2.5 rounded-full flex items-center gap-2 text-ever-midnight hover:bg-white transition-all shadow-lg"
                  >
                    <Video size={16} />
                    <span className="text-xs font-bold">Virtual Tour</span>
                  </button>
                )}
                
                {vendor.isVerified && (
                  <div className="absolute top-6 right-6 bg-ever-midnight text-white px-4 py-2 rounded-full flex items-center gap-2">
                    <CheckCircle size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Verified</span>
                  </div>
                )}
              </div>
              <div className="p-10 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ever-cove">{vendor.category}</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4].map(t => (
                      <span key={t} className={`text-xs font-bold ${t <= vendor.budgetTier ? 'text-ever-midnight' : 'text-ever-frost'}`}>₱</span>
                    ))}
                  </div>
                </div>
                <h3 className="text-3xl font-normal mb-3 text-ever-midnight tracking-tight">{vendor.name}</h3>
                <div className="flex items-center gap-2 text-ever-cove text-sm mb-4">
                  <MapPin size={14} />
                  {vendor.location}
                </div>
                
                <div className="flex flex-wrap gap-1 mb-8">
                  {vendor.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[8px] font-bold uppercase tracking-widest bg-ever-pearl px-2 py-1 rounded text-ever-cove">{tag}</span>
                  ))}
                </div>
                
                <div className="mt-auto flex items-center justify-between pt-8 border-t border-ever-frost">
                  <div className="flex items-center gap-1.5">
                    <Star className="text-ever-cove fill-ever-cove" size={16} />
                    <span className="text-sm font-bold text-ever-midnight">{vendor.rating}</span>
                    <span className="text-[10px] text-ever-horizon font-bold uppercase">({vendor.reviewCount})</span>
                  </div>
                  <button className="text-sm font-bold text-ever-blush hover:underline underline-offset-8 decoration-ever-blush">Inquire Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-40 text-center bg-ever-pearl rounded-[4rem] border border-dashed border-ever-frost">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <Search className="text-ever-frost" size={32} />
          </div>
          <h3 className="text-3xl font-normal text-ever-midnight mb-4 serif italic">No matches found</h3>
          <p className="text-ever-cove max-w-sm mx-auto mb-10">Try adjusting your style, location, or budget filters to find more suppliers matching your vision.</p>
          <button 
            onClick={clearFilters}
            className="text-xs font-bold uppercase tracking-widest text-ever-midnight border-b border-ever-midnight pb-1 hover:text-ever-cove hover:border-ever-cove transition-all"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Virtual Tour Modal */}
      {selectedTour && (
        <div className="fixed inset-0 z-[100] bg-ever-midnight/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden">
            <button 
              onClick={() => setSelectedTour(null)}
              className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
            >
              <X size={24} />
            </button>
            <iframe 
              src={selectedTour} 
              className="w-full h-full border-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs text-center w-full px-4">
              Navigating Virtual Tour: Use mouse or touch to explore the venue.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vendors;
