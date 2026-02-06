
import React, { useState } from 'react';
import { Sponsor } from '../../types';
import { Plus, UserCheck, Send, Gift, Trash2 } from 'lucide-react';

const SponsorManager: React.FC = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([
    { id: '1', name: 'Maria Santos', title: 'Dr.', role: 'Principal', invitationSent: true, giftPrepared: false },
    { id: '2', name: 'Jose Rizal Jr.', title: 'Hon.', role: 'Principal', invitationSent: false, giftPrepared: false },
  ]);

  const addSponsor = () => {
    const newSponsor: Sponsor = {
      id: Date.now().toString(),
      name: 'New Sponsor',
      role: 'Principal',
      invitationSent: false,
      giftPrepared: false
    };
    setSponsors([...sponsors, newSponsor]);
  };

  const toggleInvited = (id: string) => {
    setSponsors(sponsors.map(s => s.id === id ? { ...s, invitationSent: !s.invitationSent } : s));
  };

  return (
    <div className="bg-white rounded-[3rem] p-8 md:p-16 hairline-border">
      <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
        <div className="max-w-md">
          <h3 className="text-4xl font-normal mb-4 text-ever-midnight">Ninongs & Ninangs</h3>
          <p className="text-ever-cove serif italic text-xl">Manage your Principal and Secondary Sponsors.</p>
        </div>
        <button onClick={addSponsor} className="flex items-center gap-2 bg-ever-midnight text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-ever-cove transition-all shadow-md">
          <Plus size={18} />
          Add Sponsor
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {sponsors.map(sponsor => (
          <div key={sponsor.id} className="flex flex-col md:flex-row items-center gap-6 p-8 bg-ever-pearl rounded-[2rem] border border-ever-frost group hover:border-ever-cove transition-all">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-ever-cove group-hover:bg-ever-midnight group-hover:text-white transition-all">
              <UserCheck size={24} />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-ever-horizon">{sponsor.title || 'Mr/Ms'}</span>
                <h4 className="text-xl font-normal text-ever-midnight">{sponsor.name}</h4>
              </div>
              <p className="text-xs text-ever-cove uppercase tracking-[0.2em] mt-1">{sponsor.role} Sponsor</p>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => toggleInvited(sponsor.id)}
                className={`p-4 rounded-2xl border transition-all flex items-center gap-3 ${sponsor.invitationSent ? 'bg-ever-midnight text-white border-ever-midnight' : 'bg-white text-ever-cove border-ever-frost hover:border-ever-midnight'}`}
              >
                <Send size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">{sponsor.invitationSent ? 'Invited' : 'Send Invite'}</span>
              </button>
              
              <button className={`p-4 rounded-2xl border transition-all flex items-center gap-3 ${sponsor.giftPrepared ? 'bg-ever-midnight text-white border-ever-midnight' : 'bg-white text-ever-cove border-ever-frost hover:border-ever-midnight'}`}>
                <Gift size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Gift Ready</span>
              </button>
              
              <button className="p-4 text-ever-horizon hover:text-red-400 transition-all">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 p-8 bg-ever-midnight rounded-3xl text-white text-center">
        <p className="serif italic text-lg mb-2">"It takes a village to raise a family, and your sponsors are the first members of that village."</p>
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-ever-horizon">Tradition & Guidance</p>
      </div>
    </div>
  );
};

export default SponsorManager;
