
import React, { useState, useEffect } from 'react';
import Checklist from '../components/PlanningTools/Checklist';
import BudgetPlanner from '../components/PlanningTools/BudgetPlanner';
import SponsorManager from '../components/PlanningTools/SponsorManager';
import SaveTheDate from '../components/PlanningTools/SaveTheDate';
import { Calendar, ClipboardList, Wallet, Users, Share2, HeartHandshake, Mail } from 'lucide-react';

interface PlannerProps {
  defaultTab?: string;
}

const Planner: React.FC<PlannerProps> = ({ defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || 'checklist');

  useEffect(() => {
    if (defaultTab) setActiveTab(defaultTab);
  }, [defaultTab]);

  return (
    <div className="bg-ever-pearl min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-10">
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 text-ever-cove mb-4">
              <Calendar size={18} />
              <span className="font-bold text-xs uppercase tracking-[0.3em]">December 15, 2025</span>
            </div>
            <h1 className="text-5xl font-normal text-ever-midnight tracking-tight">Hello, Mark & Sarah</h1>
            <p className="text-ever-cove mt-3 serif italic text-xl">284 days until forever begins in Tagaytay.</p>
          </div>
          <div className="flex gap-3 animate-fade-in" style={{ animationDelay: '0.1s' }}>
             <button className="bg-white px-8 py-4 rounded-2xl border border-ever-frost text-xs font-bold uppercase tracking-widest text-ever-midnight hover:border-ever-midnight transition-all">
               Guest Site
             </button>
             <button className="bg-ever-blush text-white px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-ever-midnight transition-all shadow-lg">
               <Share2 size={14} />
               Invite Partner
             </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-3 mb-12 overflow-x-auto no-scrollbar pb-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {[
            { id: 'checklist', label: 'Checklist', icon: <ClipboardList size={18} /> },
            { id: 'budget', label: 'Budget', icon: <Wallet size={18} /> },
            { id: 'sponsors', label: 'Sponsors', icon: <HeartHandshake size={18} /> },
            { id: 'guests', label: 'Guests', icon: <Users size={18} /> },
            { id: 'save-the-date', label: 'Save the Date', icon: <Mail size={18} /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-10 py-5 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all ${
                activeTab === tab.id 
                ? 'bg-ever-midnight text-white shadow-xl' 
                : 'bg-white text-ever-cove border border-ever-frost hover:border-ever-midnight'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {activeTab === 'checklist' && <Checklist />}
          {activeTab === 'budget' && <BudgetPlanner />}
          {activeTab === 'sponsors' && <SponsorManager />}
          {activeTab === 'save-the-date' && <SaveTheDate />}
          {activeTab === 'guests' && (
             <div className="bg-white rounded-[2rem] p-24 text-center border border-ever-frost">
               <div className="w-24 h-24 bg-ever-pearl rounded-full flex items-center justify-center mx-auto mb-8">
                 <Users className="text-ever-horizon" size={40} />
               </div>
               <h3 className="text-3xl font-normal text-ever-midnight mb-4">Guest List Manager</h3>
               <p className="text-ever-cove serif italic text-lg max-w-md mx-auto mb-10">Start tracking RSVPs, dietary requirements, and table assignments.</p>
               <button className="bg-ever-midnight text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-ever-cove shadow-lg transition-all">
                 Create Your List
               </button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Planner;
