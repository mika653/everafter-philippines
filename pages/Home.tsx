
import React from 'react';
import { ArrowRight, Heart, Camera, Map, FileText } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const weddingTypes = [
    { name: 'Civil Wedding', icon: <FileText size={20} />, desc: 'Intimate & meaningful' },
    { name: 'Church Wedding', icon: <Heart size={20} />, desc: 'Traditional & grand' },
    { name: 'Garden / Beach', icon: <Map size={20} />, desc: 'Destination dreams' }
  ];

  const realWeddings = [
    { id: 1, couple: 'Anton & Bianca', location: 'Intramuros, Manila', style: 'Filipiniana Modern', img: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&q=80&w=800' },
    { id: 2, couple: 'Luis & Maya', location: 'Tagaytay Ridge', style: 'Rustic Garden', img: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=800' },
    { id: 3, couple: 'Javy & Sofia', location: 'BGC, Taguig', style: 'Contemporary Chic', img: 'https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?auto=format&fit=crop&q=80&w=800' }
  ];

  return (
    <div className="pb-32">
      {/* Editorial Hero */}
      <section className="relative min-h-[95vh] flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 z-10 space-y-12 animate-reveal">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-ever-cove mb-6 block">Where forever begins • PH</span>
              <h1 className="text-7xl md:text-9xl font-normal leading-[0.85] tracking-tighter text-ever-midnight mb-8" style={{ fontFamily: 'Jost' }}>
                Your wedding,<br />
                <span className="serif italic font-light ml-4 text-ever-blush">your way.</span>
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-ever-cove max-w-md serif italic leading-relaxed">
              From the first <span className="text-ever-midnight border-b border-ever-frost">pamamanhikan</span> to the last dance, plan with peace.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
              <button onClick={() => onNavigate('vendors')} className="flex-1 bg-ever-blush text-white px-8 py-5 rounded-full font-medium text-sm flex items-center justify-between group hover:bg-ever-midnight transition-all shadow-xl">
                Find Suppliers
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
              <button onClick={() => onNavigate('planner')} className="flex-1 bg-white text-ever-midnight border border-ever-frost px-8 py-5 rounded-full font-medium text-sm hover:border-ever-midnight transition-all">
                The Checklist
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl animate-reveal" style={{ animationDelay: '0.2s' }}>
              <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200" alt="Pinoy Wedding" className="w-full h-full object-cover scale-110" />
              <div className="absolute inset-0 bg-ever-midnight/5"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Localized Entry Points */}
      <section className="mt-20 max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {weddingTypes.map((type, i) => (
          <div key={i} className="group cursor-pointer bg-ever-pearl p-8 rounded-[2.5rem] border border-ever-frost hover:bg-white hover:shadow-xl transition-all duration-500">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-ever-blush mb-6 group-hover:bg-ever-blush group-hover:text-white transition-all">
              {type.icon}
            </div>
            <h4 className="text-xl font-normal text-ever-midnight mb-2">{type.name}</h4>
            <p className="text-xs text-ever-cove font-medium tracking-wide uppercase italic">{type.desc}</p>
          </div>
        ))}
      </section>

      {/* Real Weddings Section */}
      <section className="mt-40 max-w-7xl mx-auto px-4">
        <div className="mb-16 flex justify-between items-end">
          <div className="max-w-md">
            <h2 className="text-5xl font-normal text-ever-midnight serif">Real Pinoy Weddings</h2>
            <p className="text-ever-cove mt-4 italic">Get inspired by couples who planned their dream day right here in the Philippines.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {realWeddings.map((w) => (
            <div key={w.id} className="group cursor-pointer">
              <div className="aspect-[3/4] rounded-[3rem] overflow-hidden mb-6 hairline-border relative">
                <img src={w.img} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" loading="lazy" />
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-ever-midnight">
                  {w.style}
                </div>
              </div>
              <h4 className="text-2xl font-normal text-ever-midnight serif italic">{w.couple}</h4>
              <p className="text-xs text-ever-cove mt-1 uppercase tracking-widest">{w.location}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Requirements CTA */}
      <section className="mt-40 mx-4">
        <div className="max-w-7xl mx-auto bg-ever-midnight rounded-[4rem] p-16 md:p-32 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-normal text-white serif mb-8 italic">The PSA & Church Roadmap</h2>
            <p className="text-ever-horizon max-w-xl mx-auto mb-12 text-lg">Don't get lost in paperwork. From your CENOMAR to the Marriage License, we've mapped out the legal steps for you.</p>
            <button onClick={() => onNavigate('guides')} className="bg-ever-blush text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-ever-midnight transition-all">
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
