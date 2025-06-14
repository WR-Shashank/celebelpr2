import React from 'react';
import { Search } from 'lucide-react';

interface FilterControlsProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  statusFilter: string;
  onStatusFilterChange: (filter: string) => void;
  sortOrder: string;
  onSortOrderChange: (order: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortOrder,
  onSortOrderChange
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mb-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 relative">
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
          <input
            type="text"
            placeholder="Find your tasks..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all duration-200 text-lg"
          />
        </div>
        
        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 outline-none text-lg font-medium"
          >
            <option value="all">Show All</option>
            <option value="active">Active Only</option>
            <option value="completed">Completed Only</option>
          </select>
          
          <select
            value={sortOrder}
            onChange={(e) => onSortOrderChange(e.target.value)}
            className="px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 outline-none text-lg font-medium"
          >
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest First</option>
            <option value="importance">By Importance</option>
            <option value="name">Alphabetical</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;