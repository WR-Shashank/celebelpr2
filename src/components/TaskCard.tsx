import React from 'react';
import { CheckCircle, Circle, X, AlertTriangle, Clock, Zap } from 'lucide-react';

export interface TaskItem {
  id: string;
  content: string;
  isCompleted: boolean;
  importance: string;
  createdAt: string;
  completedAt: string | null;
}

interface TaskCardProps {
  task: TaskItem;
  onStatusToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onStatusToggle, onDelete }) => {
  const getImportanceStyle = (importance: string) => {
    const styleMap = {
      critical: { bg: 'bg-red-100', border: 'border-red-300', text: 'text-red-800', indicator: 'bg-red-500' },
      standard: { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-800', indicator: 'bg-blue-500' },
      minor: { bg: 'bg-gray-100', border: 'border-gray-300', text: 'text-gray-800', indicator: 'bg-gray-500' }
    };
    return styleMap[importance as keyof typeof styleMap] || styleMap.standard;
  };

  const importanceStyle = getImportanceStyle(task.importance);

  return (
    <div
      className={`bg-white rounded-3xl shadow-lg border border-gray-100 p-8 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
        task.isCompleted ? 'opacity-70' : ''
      }`}
    >
      <div className="flex items-start gap-6">
        <button
          onClick={() => onStatusToggle(task.id)}
          className={`flex-shrink-0 w-8 h-8 rounded-full transition-all duration-200 ${
            task.isCompleted
              ? 'text-green-600 hover:text-green-700 transform hover:scale-110'
              : 'text-gray-400 hover:text-green-600 transform hover:scale-110'
          }`}
        >
          {task.isCompleted ? <CheckCircle className="w-8 h-8" /> : <Circle className="w-8 h-8" />}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <p className={`text-xl font-semibold leading-relaxed ${
                task.isCompleted ? 'line-through text-gray-500' : 'text-gray-900'
              }`}>
                {task.content}
              </p>
              
              <div className="flex items-center gap-5 mt-4">
                <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full text-sm font-bold ${importanceStyle.bg} ${importanceStyle.text} ${importanceStyle.border} border-2`}>
                  <div className={`w-3 h-3 rounded-full ${importanceStyle.indicator}`}></div>
                  {task.importance} priority
                </div>
                
                <div className="text-sm text-gray-500 font-medium">
                  Added {new Date(task.createdAt).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                
                {task.isCompleted && task.completedAt && (
                  <div className="text-sm text-green-600 font-bold">
                    ✅ Completed {new Date(task.completedAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                )}
              </div>
            </div>
            
            <button
              onClick={() => onDelete(task.id)}
              className="flex-shrink-0 p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 transform hover:scale-110"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;