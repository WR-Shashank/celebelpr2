import React from 'react';
import { Plus, X, Flame, Clock, Zap } from 'lucide-react';

interface TaskFormProps {
  isFormVisible: boolean;
  setIsFormVisible: (visible: boolean) => void;
  newTask: string;
  setNewTask: (task: string) => void;
  taskPriority: string;
  setTaskPriority: (priority: string) => void;
  validationError: string;
  setValidationError: (error: string) => void;
  onCreateTask: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  isFormVisible,
  setIsFormVisible,
  newTask,
  setNewTask,
  taskPriority,
  setTaskPriority,
  validationError,
  setValidationError,
  onCreateTask
}) => {
  const getPriorityIcon = (priority: string) => {
    switch(priority) {
      case 'urgent': return <Flame className="w-4 h-4" />;
      case 'normal': return <Zap className="w-4 h-4" />;
      case 'low': return <Clock className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const resetForm = () => {
    setIsFormVisible(false);
    setNewTask('');
    setValidationError('');
    setTaskPriority('normal');
  };

  if (!isFormVisible) {
    return (
      <div className="text-center mb-8">
        <button
          onClick={() => setIsFormVisible(true)}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium text-lg flex items-center gap-3 mx-auto"
        >
          <Plus className="w-6 h-6" />
          Create New Task
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-slate-800">Add New Task</h3>
        <button
          onClick={resetForm}
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Task Description</label>
          <textarea
            placeholder="What do you need to accomplish?"
            value={newTask}
            onChange={(e) => {
              setNewTask(e.target.value);
              if (validationError) setValidationError('');
            }}
            className={`w-full px-4 py-3 bg-slate-50 border rounded-xl resize-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all ${
              validationError ? 'border-red-400 bg-red-50' : 'border-slate-200'
            }`}
            rows={3}
          />
          {validationError && (
            <p className="text-red-600 text-sm mt-2 font-medium">{validationError}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">Priority Level</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'urgent', label: 'Urgent', color: 'red' },
              { value: 'normal', label: 'Normal', color: 'blue' },
              { value: 'low', label: 'Low', color: 'gray' }
            ].map((priority) => (
              <button
                key={priority.value}
                onClick={() => setTaskPriority(priority.value)}
                className={`p-4 rounded-xl border-2 transition-all font-medium ${
                  taskPriority === priority.value
                    ? `border-${priority.color}-500 bg-${priority.color}-50 text-${priority.color}-700`
                    : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {getPriorityIcon(priority.value)}
                  {priority.label}
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex gap-4 pt-2">
          <button
            onClick={onCreateTask}
            className="bg-emerald-600 text-white px-8 py-3 rounded-xl hover:bg-emerald-700 transition-colors font-medium flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Task
          </button>
          <button
            onClick={resetForm}
            className="bg-slate-100 text-slate-700 px-8 py-3 rounded-xl hover:bg-slate-200 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;