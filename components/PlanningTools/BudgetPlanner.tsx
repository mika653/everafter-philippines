
import React, { useState } from 'react';
import { BudgetItem } from '../../types';
import { INITIAL_BUDGET } from '../../constants';
import { Plus, Trash2, Edit3, Wallet, TrendingUp } from 'lucide-react';

const BudgetPlanner: React.FC = () => {
  const [budget, setBudget] = useState<BudgetItem[]>(INITIAL_BUDGET);
  const totalEstimated = budget.reduce((acc, curr) => acc + curr.estimated, 0);
  const totalActual = budget.reduce((acc, curr) => acc + curr.actual, 0);

  const formatPHP = (val: number) => {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="bg-white rounded-[3rem] p-8 md:p-16 hairline-border">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
        <div className="max-w-md">
          <h3 className="text-4xl font-normal text-ever-midnight mb-4">Budget Tracker</h3>
          <p className="text-ever-cove serif italic text-xl">Honest management for your wedding journey.</p>
        </div>
        <button className="flex items-center gap-2 bg-ever-midnight text-white px-10 py-5 rounded-full text-sm font-medium hover:bg-ever-cove transition-all shadow-xl">
          <Plus size={18} />
          Add Expense
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        {/* Summary Cards */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-ever-pearl p-10 rounded-[2.5rem] border border-ever-frost">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-ever-cove mb-4">Estimated Total</p>
            <p className="text-4xl font-normal text-ever-midnight tracking-tighter">{formatPHP(totalEstimated)}</p>
          </div>
          <div className="bg-ever-midnight p-10 rounded-[2.5rem] border border-ever-midnight text-white shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-ever-frost/60 mb-4">Current Spend</p>
              <p className="text-4xl font-normal tracking-tighter">{formatPHP(totalActual)}</p>
              <div className="mt-6 flex items-center gap-2">
                <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-ever-horizon transition-all duration-1000"
                    style={{ width: `${Math.min((totalActual / totalEstimated) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-ever-frost/80">
                  {Math.round((totalActual / totalEstimated) * 100)}%
                </span>
              </div>
            </div>
            <Wallet className="absolute -bottom-4 -right-4 text-white/5 group-hover:scale-110 transition-transform duration-700" size={140} />
          </div>
        </div>

        {/* Visual Chart Breakdown */}
        <div className="lg:col-span-8 bg-ever-pearl/30 rounded-[2.5rem] p-10 border border-ever-frost">
          <div className="flex items-center gap-3 mb-10">
            <TrendingUp size={18} className="text-ever-cove" />
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-ever-midnight">Visual Breakdown by Category</h4>
          </div>
          
          <div className="space-y-8">
            {budget.map(item => {
              const percentage = (item.actual / (item.estimated || 1)) * 100;
              const isOver = item.actual > item.estimated;
              
              return (
                <div key={item.id} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-medium text-ever-midnight">{item.category}</span>
                    <div className="text-right">
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${isOver ? 'text-red-400' : 'text-ever-cove'}`}>
                        {formatPHP(item.actual)} / {formatPHP(item.estimated)}
                      </span>
                    </div>
                  </div>
                  <div className="relative h-2.5 bg-ever-frost/30 rounded-full overflow-hidden">
                    {/* Estimated Marker Background */}
                    <div className="absolute inset-0 border-r-2 border-ever-frost z-10 opacity-50" style={{ width: '100%' }}></div>
                    
                    {/* Actual Progress Bar */}
                    <div 
                      className={`h-full transition-all duration-1000 ease-out ${isOver ? 'bg-red-300' : 'bg-ever-midnight'}`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                    
                    {/* Over-budget Indicator */}
                    {isOver && (
                      <div 
                        className="h-full bg-red-400 opacity-50 absolute top-0"
                        style={{ left: '100%', width: `${Math.min(percentage - 100, 50)}%` }}
                      ></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-ever-frost">
              <th className="pb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-ever-horizon">Category</th>
              <th className="pb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-ever-horizon text-right">Estimated</th>
              <th className="pb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-ever-horizon text-right">Actual</th>
              <th className="pb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-ever-horizon text-right">Variance</th>
              <th className="pb-8"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ever-pearl">
            {budget.map(item => {
              const diff = item.estimated - item.actual;
              const isOver = diff < 0;
              return (
                <tr key={item.id} className="group hover:bg-ever-pearl/50 transition-all">
                  <td className="py-8">
                    <div className="font-medium text-ever-midnight text-lg tracking-tight">{item.category}</div>
                    {item.notes && <p className="text-[10px] text-ever-cove mt-1 italic">{item.notes}</p>}
                  </td>
                  <td className="py-8 text-right text-ever-cove font-medium">{formatPHP(item.estimated)}</td>
                  <td className="py-8 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-ever-frost text-xs">₱</span>
                      <input 
                        type="number" 
                        className="w-32 text-right border-b border-transparent focus:border-ever-cove outline-none bg-transparent text-ever-midnight font-bold text-lg transition-all"
                        defaultValue={item.actual}
                        onBlur={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          setBudget(prev => prev.map(p => p.id === item.id ? { ...p, actual: val } : p));
                        }}
                      />
                    </div>
                  </td>
                  <td className={`py-8 text-right font-bold text-sm ${isOver ? 'text-red-400' : 'text-ever-cove'}`}>
                    <div className="flex flex-col items-end">
                      <span>{formatPHP(Math.abs(diff))}</span>
                      <span className="text-[8px] uppercase tracking-widest">{isOver ? 'Over Budget' : 'Remaining'}</span>
                    </div>
                  </td>
                  <td className="py-8 text-right opacity-0 group-hover:opacity-100 transition-all pl-6">
                    <div className="flex justify-end gap-4">
                      <button className="p-2 text-ever-horizon hover:text-ever-midnight hover:bg-white rounded-xl transition-all"><Edit3 size={16} /></button>
                      <button className="p-2 text-ever-horizon hover:text-red-400 hover:bg-white rounded-xl transition-all"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="mt-16 p-10 bg-ever-pearl rounded-[2.5rem] border border-dashed border-ever-frost text-center">
        <p className="serif italic text-xl text-ever-cove mb-2">"A budget is telling your money where to go instead of wondering where it went."</p>
        <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-ever-horizon">Financial Stewardship</p>
      </div>
    </div>
  );
};

export default BudgetPlanner;
