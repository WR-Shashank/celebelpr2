import React from 'react';

interface TaskStats {
  total: number;
  done: number;
  pending: number;
}

interface ProgressOverviewProps {
  taskStats: TaskStats;
  completionRate: number;
}

const ProgressOverview: React.FC<ProgressOverviewProps> = ({ taskStats, completionRate }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-800">Progress Overview</h2>
        <div className="text-2xl font-bold text-emerald-600">{completionRate}%</div>
      </div>
      
      <div className="w-full bg-slate-200 rounded-full h-3 mb-4">
        <div 
          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${completionRate}%` }}
        ></div>
      </div>
      
      <div className="grid grid-cols-3 gap-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-slate-800">{taskStats.total}</div>
          <div className="text-sm text-slate-500 uppercase tracking-wide">Total</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-emerald-600">{taskStats.done}</div>
          <div className="text-sm text-slate-500 uppercase tracking-wide">Done</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-amber-600">{taskStats.pending}</div>
          <div className="text-sm text-slate-500 uppercase tracking-wide">Pending</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressOverview;