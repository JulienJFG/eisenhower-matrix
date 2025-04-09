import React from 'react';
import { Task, formatDate } from '../models/Task';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onComplete: (taskId: string, completed: boolean) => void;
  onArchive: (taskId: string) => void;
  draggable?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onEdit, 
  onDelete, 
  onComplete, 
  onArchive,
  draggable = true
}) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('application/json', JSON.stringify(task));
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div 
      className={`p-3 mb-2 rounded-lg shadow-sm border-l-4 ${
        task.completed 
          ? 'bg-gray-100 border-gray-400 opacity-70' 
          : 'bg-white border-blue-500'
      }`}
      draggable={draggable}
      onDragStart={handleDragStart}
      data-task-id={task.id}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onComplete(task.id, !task.completed)}
            className="mt-1 h-4 w-4 text-blue-600 rounded"
          />
          <div className={task.completed ? 'line-through text-gray-500' : ''}>
            <h3 className="font-medium">{task.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
            
            {task.deadline && (
              <p className="text-xs text-gray-500 mt-1">
                Échéance: {formatDate(task.deadline)}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex space-x-1">
          <button 
            onClick={() => onEdit(task)}
            className="text-gray-500 hover:text-blue-500 p-1"
            title="Modifier"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          
          <button 
            onClick={() => onArchive(task.id)}
            className="text-gray-500 hover:text-yellow-500 p-1"
            title="Archiver"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </button>
          
          <button 
            onClick={() => onDelete(task.id)}
            className="text-gray-500 hover:text-red-500 p-1"
            title="Supprimer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
