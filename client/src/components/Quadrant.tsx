import React from 'react';
import { Task, QuadrantType } from '../models/Task';
import TaskCard from './TaskCard';

interface QuadrantProps {
  title: string;
  description: string;
  type: QuadrantType;
  tasks: Task[];
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onCompleteTask: (taskId: string, completed: boolean) => void;
  onArchiveTask: (taskId: string) => void;
  onDrop: (task: Task) => void;
  className?: string;
}

const Quadrant: React.FC<QuadrantProps> = ({
  title,
  description,
  type,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onCompleteTask,
  onArchiveTask,
  onDrop,
  className
}) => {
  // Gérer le drop d'une tâche dans ce quadrant
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    try {
      const taskData = e.dataTransfer.getData('application/json');
      if (taskData) {
        const droppedTask = JSON.parse(taskData) as Task;
        if (droppedTask.quadrant !== type) {
          onDrop(droppedTask);
        }
      }
    } catch (error) {
      console.error('Erreur lors du drop:', error);
    }
  };

  return (
    <div className={`bg-gray-50 rounded-lg p-4 ${className || ''}`}>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="text-sm text-gray-500">{description}</span>
      </div>
      
      <div 
        className="min-h-[200px] bg-white rounded-lg p-2 border border-gray-200"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {tasks.length === 0 ? (
          <div className="text-gray-400 text-center py-8 text-sm">
            Aucune tâche pour le moment
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              onComplete={onCompleteTask}
              onArchive={onArchiveTask}
            />
          ))
        )}
      </div>
      
      <button
        onClick={onAddTask}
        className="mt-4 flex items-center justify-center w-full py-2 px-4 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Ajouter une tâche
      </button>
    </div>
  );
};

export default Quadrant;
