import React from 'react';
import TaskCard, { TaskItem } from './TaskCard';

interface TaskGridProps {
  tasks: TaskItem[];
  searchTerm: string;
  onStatusToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

const TaskGrid: React.FC<TaskGridProps> = ({ 
  tasks, 
  searchTerm, 
  onStatusToggle, 
  onDelete 
}) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-9xl mb-8">📋</div>
        <h3 className="text-3xl font-bold text-gray-700 mb-4">
          {searchTerm ? 'No results found' : 'Your task list is empty'}
        </h3>
        <p className="text-gray-500 text-xl max-w-lg mx-auto leading-relaxed">
          {searchTerm 
            ? 'Try adjusting your search terms or filters to find what you\'re looking for' 
            : 'Ready to get productive? Create your first task and start achieving your goals!'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onStatusToggle={onStatusToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskGrid;