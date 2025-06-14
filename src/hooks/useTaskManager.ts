import { useState,useEffect } from 'react';
import { TaskItem } from '../components/TaskCard';

export const useTaskManager = () => {
  // const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const validateTaskInput = (input: string): string => {
    if (!input.trim()) return 'Task description is required';
    if (input.trim().length < 3) return 'Task description must be at least 3 characters';
    if (input.trim().length > 120) return 'Task description cannot exceed 120 characters';
    return '';
  };

  const addTask = (content: string, importance: string): string => {
    const validationError = validateTaskInput(content);
    if (validationError) return validationError;

    const newTask: TaskItem = {
      id: `task_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
      content: content.trim(),
      isCompleted: false,
      importance,
      createdAt: new Date().toISOString(),
      completedAt: null
    };

    setTasks(previousTasks => [newTask, ...previousTasks]);
    return '';
  };

  const deleteTask = (taskId: string) => {
    setTasks(previousTasks => previousTasks.filter(task => task.id !== taskId));
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks(previousTasks => previousTasks.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            isCompleted: !task.isCompleted,
            completedAt: !task.isCompleted ? new Date().toISOString() : null
          }
        : task
    ));
  };

  const getProcessedTasks = (
    searchTerm: string, 
    statusFilter: string, 
    sortOrder: string
  ): TaskItem[] => {
    let processedTasks = tasks;

    if (searchTerm) {
      processedTasks = processedTasks.filter(task => 
        task.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter === 'active') {
      processedTasks = processedTasks.filter(task => !task.isCompleted);
    } else if (statusFilter === 'completed') {
      processedTasks = processedTasks.filter(task => task.isCompleted);
    }

    processedTasks.sort((taskA, taskB) => {
      switch(sortOrder) {
        case 'oldest':
          return new Date(taskA.createdAt).getTime() - new Date(taskB.createdAt).getTime();
        case 'importance':
          const importanceRanking = { critical: 3, standard: 2, minor: 1 };
          return (importanceRanking[taskB.importance as keyof typeof importanceRanking] || 2) - 
                 (importanceRanking[taskA.importance as keyof typeof importanceRanking] || 2);
        case 'name':
          return taskA.content.localeCompare(taskB.content);
        default:
          return new Date(taskB.createdAt).getTime() - new Date(taskA.createdAt).getTime();
      }
    });

    return processedTasks;
  };

  const getTaskMetrics = () => {
    return {
      totalCount: tasks.length,
      completedCount: tasks.filter(task => task.isCompleted).length,
      activeCount: tasks.filter(task => !task.isCompleted).length
    };
  };
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return {
    tasks,
    addTask,
    deleteTask,
    toggleTaskStatus,
    getProcessedTasks,
    getTaskMetrics
  };
};