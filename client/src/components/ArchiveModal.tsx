import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { Task, QuadrantType, getQuadrantName, formatDate } from '../models/Task';

interface ArchiveModalProps {
  onClose: () => void;
}

const ArchiveModal: React.FC<ArchiveModalProps> = ({ onClose }) => {
  const { archivedTasks, unarchiveTask, deleteTask, searchArchivedTasks } = useContext(TaskContext);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = searchTerm ? searchArchivedTasks(searchTerm) : archivedTasks;



  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-2xl" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Tâches archivées</h2>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="mb-4">
            <input
              type="text"
              className="form-input"
              placeholder="Rechercher des tâches archivées..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? 'Aucune tâche archivée correspondante trouvée' : 'Aucune tâche archivée pour le moment'}
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              {filteredTasks.map(task => (
                <div 
                  key={task.id} 
                  className="bg-white p-4 mb-3 rounded-md shadow-sm border border-gray-100"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      )}
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <span className="mr-3">
                          Quadrant: <span className="font-medium">{getQuadrantName(task.quadrant)}</span>
                        </span>
                        {task.deadline && (
                          <span className="mr-3">
                            Échéance: <span className="font-medium">{formatDate(task.deadline)}</span>
                          </span>
                        )}
                        <span>
                          Archivée: <span className="font-medium">{formatDate(task.createdAt)}</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => unarchiveTask(task.id)}
                        className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                      >
                        Restaurer
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-sm px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArchiveModal;
