import React, { useState } from 'react';
import AppHeader from './AppHeader';
import MetricsPanel from './MetricsPanel';
import FilterControls from './FilterControls';
import TaskCreator from './TaskCreator';
import TaskGrid from './TaskGrid';
import { useTaskManager } from '../hooks/useTaskManager';

const CelebelFlow = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('recent');
  const [importance, setImportance] = useState('standard');
  const [isCreatorVisible, setIsCreatorVisible] = useState(false);
  const [taskContent, setTaskContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    addTask,
    deleteTask,
    toggleTaskStatus,
    getProcessedTasks,
    getTaskMetrics
  } = useTaskManager();

  const handleTaskSubmission = () => {
    const error = addTask(taskContent, importance);
    if (error) {
      setErrorMessage(error);
      return;
    }

    setTaskContent('');
    setImportance('standard');
    setIsCreatorVisible(false);
    setErrorMessage('');
  };

  const processedTasks = getProcessedTasks(searchTerm, statusFilter, sortOrder);
  const metrics = getTaskMetrics();
  const progressPercent = metrics.totalCount > 0 ? Math.round((metrics.completedCount / metrics.totalCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <AppHeader 
        appName="CelebelFlow"
        tagline="Transform your productivity with intelligent task management"
      />

      <div className="container mx-auto max-w-6xl px-8 py-12">
        <MetricsPanel 
          metrics={metrics}
          progressPercent={progressPercent}
        />

        <FilterControls
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
        />

        <TaskCreator
          isVisible={isCreatorVisible}
          onToggleVisibility={setIsCreatorVisible}
          taskContent={taskContent}
          onTaskContentChange={setTaskContent}
          importance={importance}
          onImportanceChange={setImportance}
          errorMessage={errorMessage}
          onErrorClear={setErrorMessage}
          onSubmit={handleTaskSubmission}
        />

        <TaskGrid
          tasks={processedTasks}
          searchTerm={searchTerm}
          onStatusToggle={toggleTaskStatus}
          onDelete={deleteTask}
        />
      </div>
    </div>
  );
};

export default CelebelFlow;