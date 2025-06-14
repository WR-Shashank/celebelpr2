import React from 'react';

interface TaskMetrics {
  totalCount: number;
  completedCount: number;
  activeCount: number;
}

interface MetricsPanelProps {
  metrics: TaskMetrics;
  progressPercent: number;
}

const MetricsPanel: React.FC<MetricsPanelProps> = ({ metrics, progressPercent }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Task Analytics</h2>
        <span className="text-3xl font-extrabold text-indigo-600">{progressPercent}%</span>
      </div>
      
      <div className="relative w-full bg-gray-200 rounded-full h-4 mb-6 overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      
      <div className="grid grid-cols-3 divide-x divide-gray-200">
        <div className="text-center px-4">
          <div className="text-4xl font-extrabold text-gray-900">{metrics.totalCount}</div>
          <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider mt-1">All Items</div>
        </div>
        <div className="text-center px-4">
          <div className="text-4xl font-extrabold text-green-600">{metrics.completedCount}</div>
          <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider mt-1">Finished</div>
        </div>
        <div className="text-center px-4">
          <div className="text-4xl font-extrabold text-orange-500">{metrics.activeCount}</div>
          <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider mt-1">In Progress</div>
        </div>
      </div>
    </div>
  );
};

export default MetricsPanel;