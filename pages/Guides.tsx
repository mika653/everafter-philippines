
import React, { useState } from 'react';
import { ChevronRight, Info, Sparkles, Heart } from 'lucide-react';
import { FILIPINO_TRADITIONS } from '../constants';

const Guides: React.FC = () => {
  const [activeTradition, setActiveTradition] = useState<string | null>(null);

  const articles = [
    {
      title: "Civil Wedding Requirements in the Philippines: A 2024 Guide",
      desc: "Everything you need from Cenomar to Marriage License, explained simply.",
      category: "Legal",
      img: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Modern Minimalist Gowns",
      desc: "Embracing simplicity for your Philippine garden ceremony.",
      category: "Attire",
      img: "https://images.unsplash.com/photo-1595407753234-0882f1e77954?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="mb-24">
        <h1 className="text-6xl font-normal text-ever-midnight mb-6 tracking-tight">The Library</h1>
        <p className="text-ever-cove serif italic text-2xl max-w-2xl">Resources for a meaningful and stress-free Filipino wedding journey.</p>
      </div>

      {/* Traditions Module */}
      <section className="mb-32">
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 mb-12">
          <div className="max-w-md">
            <h2 className="text-4xl font-normal text-ever-midnight serif italic mb-4">Filipino Wedding Traditions</h2>
            <p className="text-ever-cove text-sm leading-relaxed">From the heart of our culture to your special day. Discover the rituals that bind families and generations together.</p>
          </div>
          <div className="hidden md:block h-[1px] flex-1 bg-ever-frost ml-12"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {['Pre-wedding', 'Ceremony', 'Post-wedding'].map(phase => (
            <div key={phase} className="space-y-8">
              <div className="flex items-center gap-3 px-4">
                <Heart size={16} className="text-ever-blush" />
                <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-ever-midnight">{phase}</h3>
              </div>
              <div className="space-y-4">
                {FILIPINO_TRADITIONS.filter(t => t.phase === phase).map(trad => (
                  <div 
                    key={trad.id}
                    onClick={() => setActiveTradition(activeTradition === trad.id ? null : trad.id)}
                    className={`p-8 rounded-[2rem] border transition-all cursor-pointer group ${
                      activeTradition === trad.id 
                      ? 'bg-ever-midnight text-white border-ever-midnight shadow-2xl scale-[1.02]' 
                      : 'bg-white border-ever-frost hover:border-ever-cove hover:bg-ever-pearl/50'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium text-lg tracking-tight">{trad.title}</h4>
                      <ChevronRight className={`transition-transform duration-500 ${activeTradition === trad.id ? 'rotate-90' : 'group-hover:translate-x-1'}`} size={18} />
                    </div>
                    
                    {activeTradition === trad.id && (
                      <div className="mt-8 space-y-8 animate-reveal">
                        <div>
                          <p className="text-sm leading-relaxed opacity-90">{trad.description}</p>
                        </div>

                        <div className="pt-8 border-t border-white/10">
                          <h5 className="text-[9px] font-bold uppercase tracking-[0.3em] mb-4 text-ever-horizon flex items-center gap-2">
                            <Info size={14} />
                            Cultural Significance
                          </h5>
                          <p className="text-sm italic opacity-80 serif leading-relaxed">{trad.significance}</p>
                        </div>

                        {trad.modernTwist && (
                          <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                            <h5 className="text-[9px] font-bold uppercase tracking-[0.3em] mb-3 text-ever-horizon flex items-center gap-2">
                              <Sparkles size={14} className="text-yellow-200" />
                              Modern Interpretation
                            </h5>
                            <p className="text-xs opacity-90 leading-relaxed">{trad.modernTwist}</p>
                          </div>
                        )}

                        <div className="pt-2">
                          <h5 className="text-[9px] font-bold uppercase tracking-[0.3em] mb-4 text-ever-horizon">Practical Tips</h5>
                          <ul className="grid grid-cols-1 gap-3">
                            {trad.tips.map((tip, i) => (
                              <li key={i} className="text-[11px] flex gap-3 leading-relaxed">
                                <span className="text-ever-horizon mt-1">•</span>
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Articles */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
        {articles.map((article, idx) => (
          <div key={idx} className="group relative rounded-[3rem] overflow-hidden h-[600px] cursor-pointer">
            <img src={article.img} alt={article.title} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-ever-midnight/90 via-ever-midnight/20 to-transparent p-12 flex flex-col justify-end text-white">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 text-ever-horizon">{article.category}</span>
              <h3 className="text-4xl font-normal mb-4 serif italic leading-tight tracking-tight">{article.title}</h3>
              <p className="text-ever-frost/80 text-sm mb-10 max-w-xs leading-relaxed">{article.desc}</p>
              <button className="flex items-center gap-3 font-medium text-xs uppercase tracking-widest group-hover:gap-5 transition-all">
                Read Article
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Ask an Expert */}
      <div className="bg-ever-midnight rounded-[4rem] p-16 md:p-32 text-center relative overflow-hidden text-white shadow-2xl">
        <div className="relative z-10">
          <h3 className="text-4xl md:text-5xl font-normal mb-8 serif italic">Planning a heritage wedding?</h3>
          <p className="text-ever-horizon mb-12 max-w-lg mx-auto leading-relaxed text-lg">Our consultants specialize in balancing traditional Filipino values with modern celebrations. Let's make it yours.</p>
          <button className="bg-ever-blush text-white px-14 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-ever-midnight transition-all shadow-xl">
            Book a consultation
          </button>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,100 C30,50 70,50 100,100" fill="white" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Guides;
