import React from 'react';
import { Plus, X, AlertTriangle, Zap, Clock } from 'lucide-react';

interface TaskCreatorProps {
  isVisible: boolean;
  onToggleVisibility: (visible: boolean) => void;
  taskContent: string;
  onTaskContentChange: (content: string) => void;
  importance: string;
  onImportanceChange: (importance: string) => void;
  errorMessage: string;
  onErrorClear: (error: string) => void;
  onSubmit: () => void;
}

const TaskCreator: React.FC<TaskCreatorProps> = ({
  isVisible,
  onToggleVisibility,
  taskContent,
  onTaskContentChange,
  importance,
  onImportanceChange,
  errorMessage,
  onErrorClear,
  onSubmit
}) => {
  const getImportanceIcon = (level: string) => {
    const iconMap = {
      critical: <AlertTriangle className="w-5 h-5" />,
      standard: <Zap className="w-5 h-5" />,
      minor: <Clock className="w-5 h-5" />
    };
    return iconMap[level as keyof typeof iconMap] || iconMap.standard;
  };

  const handleReset = () => {
    onToggleVisibility(false);
    onTaskContentChange('');
    onErrorClear('');
    onImportanceChange('standard');
  };

  if (!isVisible) {
    return (
      <div className="text-center mb-10">
        <button
          onClick={() => onToggleVisibility(true)}
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-10 py-5 rounded-2xl hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 shadow-xl hover:shadow-2xl font-bold text-xl flex items-center gap-4 mx-auto transform hover:scale-105"
        >
          <Plus className="w-7 h-7" />
          Add New Task
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mb-10">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-gray-800">Create Task</h3>
        <button
          onClick={handleReset}
          className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <div className="space-y-8">
        <div>
          <label className="block text-base font-bold text-gray-700 mb-3">Task Details</label>
          <textarea
            placeholder="Describe what needs to be done..."
            value={taskContent}
            onChange={(e) => {
              onTaskContentChange(e.target.value);
              if (errorMessage) onErrorClear('');
            }}
            className={`w-full px-6 py-4 bg-gray-50 border-2 rounded-2xl resize-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all duration-200 text-lg ${
              errorMessage ? 'border-red-400 bg-red-50 focus:ring-red-100' : 'border-gray-200'
            }`}
            rows={4}
          />
          {errorMessage && (
            <p className="text-red-600 text-base mt-3 font-semibold">{errorMessage}</p>
          )}
        </div>
        
        <div>
          <label className="block text-base font-bold text-gray-700 mb-4">Importance Level</label>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: 'critical', label: 'Critical', colorClass: 'red' },
              { value: 'standard', label: 'Standard', colorClass: 'blue' },
              { value: 'minor', label: 'Minor', colorClass: 'gray' }
            ].map((level) => (
              <button
                key={level.value}
                onClick={() => onImportanceChange(level.value)}
                className={`p-5 rounded-2xl border-3 transition-all duration-200 font-bold text-lg ${
                  importance === level.value
                    ? `border-${level.colorClass}-500 bg-${level.colorClass}-50 text-${level.colorClass}-700 shadow-lg`
                    : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-center gap-3">
                  {getImportanceIcon(level.value)}
                  {level.label}
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex gap-5 pt-4">
          <button
            onClick={onSubmit}
            className="bg-indigo-600 text-white px-10 py-4 rounded-2xl hover:bg-indigo-700 transition-all duration-200 font-bold text-lg flex items-center gap-3 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-6 h-6" />
            Create Task
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-100 text-gray-700 px-10 py-4 rounded-2xl hover:bg-gray-200 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCreator;