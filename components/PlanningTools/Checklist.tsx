
import React, { useState } from 'react';
import { ChecklistItem } from '../../types';
import { CheckCircle2, Circle, Info, ChevronRight } from 'lucide-react';
import { INITIAL_CHECKLIST } from '../../constants';

const Checklist: React.FC = () => {
  const [tasks, setTasks] = useState<ChecklistItem[]>(INITIAL_CHECKLIST);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
  };

  const completedCount = tasks.filter(t => t.isCompleted).length;
  const progress = (completedCount / tasks.length) * 100;

  return (
    <div className="bg-white rounded-[3rem] p-8 md:p-16 hairline-border">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-md">
          <h3 className="text-4xl font-normal mb-4 text-ever-midnight">Wedding Timeline</h3>
          <p className="text-ever-cove serif italic text-xl">The path from today to your 'ever after'.</p>
        </div>
        
        <div className="w-full md:w-64">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ever-cove">Progress</span>
            <span className="text-xs font-bold text-ever-midnight">{Math.round(progress)}%</span>
          </div>
          <div className="h-0.5 bg-ever-pearl w-full overflow-hidden">
            <div 
              style={{ width: `${progress}%` }} 
              className="h-full bg-ever-midnight transition-all duration-1000 ease-in-out"
            ></div>
          </div>
        </div>
      </div>

      <div className="space-y-20">
        {['12 Months Before', '6 Months Before', '3 Months Before', '1 Month Before'].map(timeline => {
          const timelineTasks = tasks.filter(t => t.timeline === timeline);
          if (timelineTasks.length === 0) return null;

          return (
            <div key={timeline} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-3">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-ever-cove border-b border-ever-frost pb-4">
                  {timeline}
                </h4>
              </div>
              <div className="lg:col-span-9 space-y-4">
                {timelineTasks.map(task => (
                  <div 
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`flex items-center gap-6 p-6 rounded-3xl transition-all cursor-pointer group border ${
                      task.isCompleted ? 'bg-ever-pearl/50 border-ever-pearl' : 'bg-white border-ever-frost hover:border-ever-cove'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {task.isCompleted ? (
                        <CheckCircle2 className="text-ever-cove" size={24} />
                      ) : (
                        <Circle className="text-ever-frost group-hover:text-ever-cove transition-colors" size={24} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className={`text-lg font-medium tracking-tight transition-all ${task.isCompleted ? 'text-ever-horizon line-through' : 'text-ever-midnight'}`}>
                          {task.task}
                        </span>
                        {task.isFilipinoSpecific && (
                          <span className="text-[8px] border border-ever-frost text-ever-cove px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Tradition</span>
                        )}
                      </div>
                      <p className="text-[10px] uppercase tracking-widest text-ever-horizon mt-2">{task.category}</p>
                    </div>
                    <ChevronRight className="text-ever-frost group-hover:translate-x-1 group-hover:text-ever-midnight transition-all" size={18} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Checklist;
