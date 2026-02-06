
import React, { useState } from 'react';
import { MatchmakerAnswers, Vendor } from '../types';
import { VENDORS } from '../constants';
import { Sparkles, X, ArrowRight, ArrowLeft, Star, MapPin, CheckCircle, RotateCcw, Heart } from 'lucide-react';

const INITIAL_ANSWERS: MatchmakerAnswers = {
  styles: [],
  budgetTier: null,
  location: null,
  categories: [],
  priority: null,
};

// ─── Quiz step definitions ─────────────────────────────────────────
const STEPS = [
  {
    title: "What's your wedding vibe?",
    subtitle: 'Select all that feel like you.',
    field: 'styles' as const,
    multi: true,
    options: [
      { label: 'Civil', value: 'Civil' },
      { label: 'Church', value: 'Church' },
      { label: 'Garden', value: 'Garden' },
      { label: 'Beach', value: 'Beach' },
      { label: 'Destination', value: 'Destination' },
      { label: 'Intimate', value: 'Intimate' },
    ],
  },
  {
    title: "What's your budget feel?",
    subtitle: 'This helps us find the right price range.',
    field: 'budgetTier' as const,
    multi: false,
    options: [
      { label: '₱ Budget', value: 1 },
      { label: '₱₱ Mid-Range', value: 2 },
      { label: '₱₱₱ Premium', value: 3 },
      { label: '₱₱₱₱ Luxury', value: 4 },
    ],
  },
  {
    title: "Where's the celebration?",
    subtitle: 'Pick your dream location.',
    field: 'location' as const,
    multi: false,
    options: [
      { label: 'Metro Manila (North)', value: 'Metro Manila (North)' },
      { label: 'Metro Manila (South)', value: 'Metro Manila (South)' },
      { label: 'Luzon (North)', value: 'Luzon (North)' },
      { label: 'Luzon (Central)', value: 'Luzon (Central)' },
      { label: 'Tagaytay', value: 'Tagaytay' },
      { label: 'Boracay', value: 'Boracay' },
      { label: 'Bohol', value: 'Bohol' },
      { label: 'Visayas', value: 'Visayas' },
      { label: 'Mindanao', value: 'Mindanao' },
    ],
  },
  {
    title: 'What do you still need?',
    subtitle: "Select the vendors you're looking for.",
    field: 'categories' as const,
    multi: true,
    options: [
      { label: 'Venues', value: 'Venues' },
      { label: 'Caterers', value: 'Caterers' },
      { label: 'Photographers', value: 'Photographers' },
      { label: 'Bridal Gowns', value: 'Bridal Gowns' },
      { label: 'Barongs', value: 'Barongs' },
      { label: 'Rings', value: 'Rings' },
    ],
  },
  {
    title: 'What matters most to you?',
    subtitle: "We'll prioritize results based on this.",
    field: 'priority' as const,
    multi: false,
    options: [
      { label: 'Highest Rated', value: 'rating' },
      { label: 'Most Reviewed', value: 'reviews' },
      { label: 'Budget-Friendly (Sulit)', value: 'budget' },
      { label: 'Verified Vendors', value: 'verified' },
    ],
  },
];

// ─── Matching algorithm ────────────────────────────────────────────
interface ScoredVendor extends Vendor {
  score: number;
}

const getMatches = (answers: MatchmakerAnswers): ScoredVendor[] => {
  return VENDORS
    .map(vendor => {
      let score = 0;

      // Style match
      if (answers.styles.length > 0) {
        const overlap = answers.styles.filter(s => vendor.tags.includes(s)).length;
        if (overlap === 0) return { ...vendor, score: -1 };
        score += overlap * 2;
      }

      // Budget match
      if (answers.budgetTier !== null) {
        if (vendor.budgetTier === answers.budgetTier) {
          score += 3;
        } else if (Math.abs(vendor.budgetTier - answers.budgetTier) === 1) {
          score += 1; // close enough
        }
      }

      // Location match
      if (answers.location !== null) {
        if (vendor.location === answers.location) {
          score += 4;
        }
      }

      // Category match
      if (answers.categories.length > 0) {
        if (!answers.categories.includes(vendor.category)) return { ...vendor, score: -1 };
        score += 2;
      }

      // Priority bonus
      if (answers.priority === 'rating') score += vendor.rating * 2;
      if (answers.priority === 'reviews') score += vendor.reviewCount / 50;
      if (answers.priority === 'budget') score += (5 - vendor.budgetTier) * 2;
      if (answers.priority === 'verified' && vendor.isVerified) score += 5;

      return { ...vendor, score };
    })
    .filter(v => v.score >= 0)
    .sort((a, b) => b.score - a.score);
};

// ─── Component ─────────────────────────────────────────────────────
const Matchmaker: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<MatchmakerAnswers>({ ...INITIAL_ANSWERS });
  const [showResults, setShowResults] = useState(false);
  const [direction, setDirection] = useState<'next' | 'back'>('next');

  const totalSteps = STEPS.length;

  const toggleMulti = (field: 'styles' | 'categories', value: string) => {
    setAnswers(prev => {
      const arr = prev[field] as string[];
      return {
        ...prev,
        [field]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value],
      };
    });
  };

  const setSingle = (field: 'budgetTier' | 'location' | 'priority', value: string | number | null) => {
    setAnswers(prev => ({ ...prev, [field]: prev[field] === value ? null : value }));
  };

  const next = () => {
    if (step < totalSteps - 1) {
      setDirection('next');
      setStep(s => s + 1);
    } else {
      setShowResults(true);
    }
  };

  const back = () => {
    if (showResults) {
      setShowResults(false);
    } else if (step > 0) {
      setDirection('back');
      setStep(s => s - 1);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({ ...INITIAL_ANSWERS });
    setShowResults(false);
    setDirection('next');
  };

  const close = () => {
    setIsOpen(false);
    setTimeout(reset, 300);
  };

  const matches = showResults ? getMatches(answers) : [];

  // Group matches by category
  const grouped: Record<string, ScoredVendor[]> = {};
  matches.forEach(v => {
    if (!grouped[v.category]) grouped[v.category] = [];
    grouped[v.category].push(v);
  });

  const currentStep = STEPS[step];

  const isOptionSelected = (value: string | number): boolean => {
    if (!currentStep) return false;
    const field = currentStep.field;
    if (field === 'styles' || field === 'categories') {
      return (answers[field] as string[]).includes(value as string);
    }
    return answers[field] === value;
  };

  const handleOptionClick = (value: string | number) => {
    const field = currentStep.field;
    if (field === 'styles' || field === 'categories') {
      toggleMulti(field, value as string);
    } else {
      setSingle(field as 'budgetTier' | 'location' | 'priority', value);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[100] bg-ever-midnight text-white pl-5 pr-6 py-4 rounded-full flex items-center gap-3 shadow-2xl hover:bg-ever-cove transition-all group"
          style={{ animation: 'fadeIn 0.5s ease' }}
        >
          <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Find My Dream Team</span>
        </button>
      )}

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[200] bg-white flex flex-col"
          style={{ animation: 'fadeIn 0.3s ease' }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 md:px-12 py-6 border-b border-ever-frost">
            <div className="flex items-center gap-3">
              <Sparkles size={18} className="text-ever-cove" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-ever-midnight">
                {showResults ? 'Your Matches' : `Step ${step + 1} of ${totalSteps}`}
              </span>
            </div>
            <button
              onClick={close}
              className="w-10 h-10 rounded-full bg-ever-pearl flex items-center justify-center text-ever-cove hover:bg-ever-midnight hover:text-white transition-all"
            >
              <X size={18} />
            </button>
          </div>

          {/* Progress bar */}
          {!showResults && (
            <div className="h-0.5 bg-ever-pearl">
              <div
                className="h-full bg-ever-midnight transition-all duration-500 ease-out"
                style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
              />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {!showResults ? (
              /* ── Quiz Step ── */
              <div
                key={step}
                className="max-w-2xl mx-auto px-6 py-16 md:py-24"
                style={{
                  animation: direction === 'next'
                    ? 'slideInRight 0.35s cubic-bezier(0.16,1,0.3,1)'
                    : 'slideInLeft 0.35s cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                <h2 className="text-4xl md:text-5xl font-normal text-ever-midnight tracking-tight mb-4">
                  {currentStep.title}
                </h2>
                <p className="text-ever-cove serif italic text-lg md:text-xl mb-12">
                  {currentStep.subtitle}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentStep.options.map(opt => {
                    const selected = isOptionSelected(opt.value);
                    return (
                      <button
                        key={String(opt.value)}
                        onClick={() => handleOptionClick(opt.value)}
                        className={`px-8 py-5 rounded-2xl text-left font-medium transition-all border ${
                          selected
                            ? 'bg-ever-midnight text-white border-ever-midnight shadow-xl scale-[1.02]'
                            : 'bg-white text-ever-cove border-ever-frost hover:border-ever-cove'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>

                {currentStep.multi && (
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ever-horizon mt-6">
                    You can select multiple options
                  </p>
                )}
              </div>
            ) : (
              /* ── Results ── */
              <div
                className="max-w-6xl mx-auto px-6 py-16 md:py-20"
                style={{ animation: 'slideInRight 0.4s cubic-bezier(0.16,1,0.3,1)' }}
              >
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-normal text-ever-midnight tracking-tight mb-4">
                    Your Dream Team
                  </h2>
                  <p className="text-ever-cove serif italic text-lg md:text-xl">
                    {matches.length > 0
                      ? `We found ${matches.length} ${matches.length === 1 ? 'vendor' : 'vendors'} that match your vision.`
                      : 'No exact matches found — try broadening your preferences.'}
                  </p>
                </div>

                {matches.length > 0 ? (
                  <div className="space-y-16">
                    {Object.entries(grouped).map(([category, vendors]) => (
                      <div key={category}>
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-ever-cove mb-6 border-b border-ever-frost pb-4">
                          {category}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {vendors.map(vendor => (
                            <div
                              key={vendor.id}
                              className="bg-white rounded-[2rem] overflow-hidden border border-ever-frost hover:shadow-xl transition-all group"
                            >
                              <div className="relative h-48 overflow-hidden bg-ever-pearl">
                                <img
                                  src={vendor.imageUrl}
                                  alt={vendor.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                  loading="lazy"
                                />
                                {vendor.isVerified && (
                                  <div className="absolute top-4 right-4 bg-ever-midnight text-white px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                    <CheckCircle size={10} />
                                    <span className="text-[8px] font-bold uppercase tracking-widest">Verified</span>
                                  </div>
                                )}
                                {vendor.budgetTier <= 2 && (
                                  <div className="absolute top-4 left-4 bg-ever-horizon/95 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                    <Sparkles size={10} />
                                    <span className="text-[8px] font-bold uppercase tracking-widest">Sulit</span>
                                  </div>
                                )}
                              </div>
                              <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-ever-cove">{vendor.category}</span>
                                  <div className="flex gap-0.5">
                                    {[1, 2, 3, 4].map(t => (
                                      <span key={t} className={`text-[10px] font-bold ${t <= vendor.budgetTier ? 'text-ever-midnight' : 'text-ever-frost'}`}>₱</span>
                                    ))}
                                  </div>
                                </div>
                                <h4 className="text-xl font-normal text-ever-midnight tracking-tight mb-2">{vendor.name}</h4>
                                <div className="flex items-center gap-1.5 text-ever-cove text-xs mb-3">
                                  <MapPin size={12} />
                                  {vendor.location}
                                </div>
                                <div className="flex flex-wrap gap-1 mb-4">
                                  {vendor.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="text-[7px] font-bold uppercase tracking-widest bg-ever-pearl px-2 py-0.5 rounded text-ever-cove">{tag}</span>
                                  ))}
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-ever-frost">
                                  <div className="flex items-center gap-1">
                                    <Star className="text-ever-cove fill-ever-cove" size={14} />
                                    <span className="text-sm font-bold text-ever-midnight">{vendor.rating}</span>
                                    <span className="text-[9px] text-ever-horizon font-bold">({vendor.reviewCount})</span>
                                  </div>
                                  <button
                                    onClick={() => {
                                      close();
                                      onNavigate('vendors');
                                    }}
                                    className="text-xs font-bold text-ever-midnight hover:underline underline-offset-4 decoration-ever-cove"
                                  >
                                    View
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center bg-ever-pearl rounded-[3rem] border border-dashed border-ever-frost">
                    <Heart className="text-ever-frost mx-auto mb-6" size={40} />
                    <p className="text-ever-cove mb-8 max-w-sm mx-auto">
                      Try selecting fewer filters or broadening your location and budget preferences.
                    </p>
                    <button
                      onClick={reset}
                      className="text-xs font-bold uppercase tracking-widest text-ever-midnight border-b border-ever-midnight pb-1 hover:text-ever-cove hover:border-ever-cove transition-all"
                    >
                      Start Over
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom navigation */}
          <div className="px-6 md:px-12 py-6 border-t border-ever-frost flex justify-between items-center">
            <div>
              {(step > 0 || showResults) && (
                <button
                  onClick={back}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ever-cove hover:text-ever-midnight transition-all"
                >
                  <ArrowLeft size={14} />
                  Back
                </button>
              )}
            </div>

            <div className="flex gap-3">
              {showResults && matches.length > 0 && (
                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-ever-cove border border-ever-frost hover:border-ever-midnight transition-all"
                >
                  <RotateCcw size={14} />
                  Start Over
                </button>
              )}

              {!showResults && (
                <button
                  onClick={next}
                  className="flex items-center gap-2 bg-ever-midnight text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-ever-cove transition-all shadow-lg"
                >
                  {step === totalSteps - 1 ? 'See My Matches' : 'Next'}
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </>
  );
};

export default Matchmaker;
