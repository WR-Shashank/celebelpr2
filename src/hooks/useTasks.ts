import { useState } from 'react';
import { Task } from '../components/TaskItem';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const checkTaskInput = (input: string): string => {
    if (!input.trim()) return 'Please enter a task';
    if (input.trim().length < 2) return 'Task too short (minimum 2 characters)';
    if (input.trim().length > 80) return 'Task too long (maximum 80 characters)';
    return '';
  };

  const createTask = (content: string, priority: string): string => {
    const error = checkTaskInput(content);
    if (error) return error;

    const task: Task = {
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      content: content.trim(),
      isDone: false,
      priority,
      timestamp: new Date().toISOString(),
      doneAt: null
    };

    setTasks(prev => [task, ...prev]);
    return '';
  };

  const removeTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const markTaskComplete = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            isDone: !task.isDone,
            doneAt: !task.isDone ? new Date().toISOString() : null
          }
        : task
    ));
  };

  const getFilteredTasks = (
    searchQuery: string, 
    filterType: string, 
    sortMethod: string
  ): Task[] => {
    let filtered = tasks;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(task => 
        task.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (filterType === 'pending') {
      filtered = filtered.filter(task => !task.isDone);
    } else if (filterType === 'done') {
      filtered = filtered.filter(task => task.isDone);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch(sortMethod) {
        case 'oldest':
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        case 'priority':
          const priorityOrder = { urgent: 3, normal: 2, low: 1 };
          return (priorityOrder[b.priority as keyof typeof priorityOrder] || 2) - 
                 (priorityOrder[a.priority as keyof typeof priorityOrder] || 2);
        case 'alphabetical':
          return a.content.localeCompare(b.content);
        default: // newest
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }
    });

    return filtered;
  };

  const getTaskStats = () => {
    return {
      total: tasks.length,
      done: tasks.filter(t => t.isDone).length,
      pending: tasks.filter(t => !t.isDone).length
    };
  };

  return {
    tasks,
    createTask,
    removeTask,
    markTaskComplete,
    getFilteredTasks,
    getTaskStats
  };
};