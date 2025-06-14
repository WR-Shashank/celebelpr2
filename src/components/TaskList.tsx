import React from 'react';
import TaskItem, { Task } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  searchQuery: string;
  onToggleComplete: (taskId: string) => void;
  onRemoveTask: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  searchQuery, 
  onToggleComplete, 
  onRemoveTask 
}) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-8xl mb-6">💼</div>
        <h3 className="text-2xl font-semibold text-slate-700 mb-3">
          {searchQuery ? 'No matching tasks' : 'No tasks available'}
        </h3>
        <p className="text-slate-500 text-lg max-w-md mx-auto">
          {searchQuery 
            ? 'Try different search terms or check your filters' 
            : 'Start by creating your first task to get organized!'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onRemoveTask={onRemoveTask}
        />
      ))}
    </div>
  );
};

export default TaskList;