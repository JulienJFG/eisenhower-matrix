import React, { useState } from 'react';
import { Task, QuadrantType } from '../models/Task';
import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

interface TaskModalProps {
  task?: Task;
  quadrant?: QuadrantType;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, quadrant, onClose }) => {
  const { addTask, updateTask } = useContext(TaskContext);
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [deadline, setDeadline] = useState(
    task?.deadline ? new Date(task.deadline).toISOString().split('T')[0] : ''
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (task) {
        // Mettre à jour une tâche existante
        updateTask(task.id, {
          title,
          description,
          deadline: deadline ? new Date(deadline) : undefined
        });
      } else if (quadrant) {
        // Créer une nouvelle tâche
        addTask(
          title,
          description,
          quadrant,
          deadline ? new Date(deadline) : undefined
        );
      }
      onClose();
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la tâche:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {task ? 'Modifier la tâche' : 'Ajouter une nouvelle tâche'}
          </h2>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="task-title" className="form-label">
                Titre
              </label>
              <input
                id="task-title"
                type="text"
                className="form-input"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Entrez le titre de la tâche"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="task-description" className="form-label">
                Description
              </label>
              <textarea
                id="task-description"
                className="form-input"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Entrez la description de la tâche"
                rows={3}
              />
            </div>
            <div className="form-group">
              <label htmlFor="task-deadline" className="form-label">
                Échéance (optionnel)
              </label>
              <input
                id="task-deadline"
                type="date"
                className="form-input"
                value={deadline}
                onChange={e => setDeadline(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enregistrement...' : task ? 'Mettre à jour' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
