import React from 'react';
import { CheckCircle, Circle, X, Flame, Clock, Zap } from 'lucide-react';

export interface Task {
  id: string;
  content: string;
  isDone: boolean;
  priority: string;
  timestamp: string;
  doneAt: string | null;
}

interface TaskItemProps {
  task: Task;
  onToggleComplete: (taskId: string) => void;
  onRemoveTask: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onRemoveTask }) => {
  const getPriorityStyle = (priority: string) => {
    const styles = {
      urgent: { bg: 'bg-red-100', border: 'border-red-300', text: 'text-red-800', dot: 'bg-red-500' },
      normal: { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-800', dot: 'bg-blue-500' },
      low: { bg: 'bg-gray-100', border: 'border-gray-300', text: 'text-gray-800', dot: 'bg-gray-500' }
    };
    return styles[priority as keyof typeof styles] || styles.normal;
  };

  const priorityStyle = getPriorityStyle(task.priority);

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-slate-200 p-6 transition-all duration-200 hover:shadow-md ${
        task.isDone ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-start gap-5">
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`flex-shrink-0 w-7 h-7 rounded-full transition-all ${
            task.isDone
              ? 'text-emerald-600 hover:text-emerald-700'
              : 'text-slate-400 hover:text-emerald-600'
          }`}
        >
          {task.isDone ? <CheckCircle className="w-7 h-7" /> : <Circle className="w-7 h-7" />}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className={`text-lg font-medium leading-relaxed ${
                task.isDone ? 'line-through text-slate-500' : 'text-slate-800'
              }`}>
                {task.content}
              </p>
              
              <div className="flex items-center gap-4 mt-3">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${priorityStyle.bg} ${priorityStyle.text} ${priorityStyle.border} border`}>
                  <div className={`w-2 h-2 rounded-full ${priorityStyle.dot}`}></div>
                  {task.priority} priority
                </div>
                
                <div className="text-sm text-slate-500">
                  Created {new Date(task.timestamp).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                
                {task.isDone && task.doneAt && (
                  <div className="text-sm text-emerald-600 font-medium">
                    ✓ Done {new Date(task.doneAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                )}
              </div>
            </div>
            
            <button
              onClick={() => onRemoveTask(task.id)}
              className="flex-shrink-0 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;