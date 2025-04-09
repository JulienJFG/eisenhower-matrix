import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task } from '../context/TaskContext';
import { useTasks } from '../hooks/useTasks';
import TaskModal from './TaskModal';

interface TaskItemProps {
  task: Task;
  index: number;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, index }) => {
  const { updateTask, archiveTask, deleteTask } = useTasks();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleComplete = () => {
    updateTask(task.id, { completed: !task.completed });
  };

  const handleArchive = () => {
    archiveTask(task.id);
    setIsMenuOpen(false);
  };

  const handleDelete = () => {
    deleteTask(task.id);
    setIsMenuOpen(false);
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  };

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            className={`task-item ${task.completed ? 'opacity-60' : ''} ${snapshot.isDragging ? 'task-item-dragging' : ''}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="task-header">
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={handleToggleComplete}
                  className="mt-1"
                />
                <h3 className={`task-title ${task.completed ? 'line-through' : ''}`}>
                  {task.title}
                </h3>
              </div>
              <div className="task-actions relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
                
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <button
                      onClick={() => {
                        setIsEditModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleArchive}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Archive
                    </button>
                    <button
                      onClick={handleDelete}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
            
            {task.deadline && (
              <div className="task-meta">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  Due: {formatDate(task.deadline)}
                </span>
              </div>
            )}
          </div>
        )}
      </Draggable>

      {isEditModalOpen && (
        <TaskModal
          task={task}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </>
  );
};

export default TaskItem;
