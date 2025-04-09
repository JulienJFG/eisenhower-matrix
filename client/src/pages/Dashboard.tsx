import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { Task, QuadrantType, getQuadrantName, getQuadrantDescription } from '../models/Task';
import Quadrant from '../components/Quadrant';
import TaskModal from '../components/TaskModal';
import ArchiveModal from '../components/ArchiveModal';

const Dashboard: React.FC = () => {
  const { tasks, moveTask, updateTask, deleteTask, archiveTask } = useContext(TaskContext);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [selectedQuadrant, setSelectedQuadrant] = useState<QuadrantType | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Gérer le déplacement d'une tâche vers un autre quadrant
  const handleTaskDrop = (droppedTask: Task, targetQuadrant: QuadrantType) => {
    if (droppedTask.quadrant !== targetQuadrant) {
      moveTask(droppedTask.id, targetQuadrant);
    }
  };
  
  // Gérer la modification d'une tâche
  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };
  
  // Gérer la suppression d'une tâche
  const handleDeleteTask = (taskId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      deleteTask(taskId);
    }
  };
  
  // Gérer le changement d'état d'une tâche (complétée ou non)
  const handleCompleteTask = (taskId: string, completed: boolean) => {
    updateTask(taskId, { completed });
  };
  
  // Gérer l'archivage d'une tâche
  const handleArchiveTask = (taskId: string) => {
    archiveTask(taskId);
  };

  const openTaskModal = (quadrant: QuadrantType) => {
    setSelectedQuadrant(quadrant);
    setSelectedTask(null);
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
    setSelectedQuadrant(null);
    setSelectedTask(null);
  };

  // Filter tasks by quadrant
  const getTasksByQuadrant = (quadrant: QuadrantType) => {
    return tasks
      .filter(task => task.quadrant === quadrant)
      .sort((a, b) => a.order - b.order);
  };

  return (
    <div className="dashboard-container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Ma Matrice d'Eisenhower</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsArchiveModalOpen(true)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
              <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            Archives
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Quadrant
          title="Important & Urgent"
          description="À faire en premier"
          type={QuadrantType.IMPORTANT_URGENT}
          tasks={getTasksByQuadrant(QuadrantType.IMPORTANT_URGENT)}
          onAddTask={() => openTaskModal(QuadrantType.IMPORTANT_URGENT)}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onCompleteTask={handleCompleteTask}
          onArchiveTask={handleArchiveTask}
          onDrop={(task) => handleTaskDrop(task, QuadrantType.IMPORTANT_URGENT)}
          className="bg-red-50"
        />
        <Quadrant
          title="Important & Non Urgent"
          description="Planifier"
          type={QuadrantType.IMPORTANT_NOT_URGENT}
          tasks={getTasksByQuadrant(QuadrantType.IMPORTANT_NOT_URGENT)}
          onAddTask={() => openTaskModal(QuadrantType.IMPORTANT_NOT_URGENT)}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onCompleteTask={handleCompleteTask}
          onArchiveTask={handleArchiveTask}
          onDrop={(task) => handleTaskDrop(task, QuadrantType.IMPORTANT_NOT_URGENT)}
          className="bg-blue-50"
        />
        <Quadrant
          title="Non Important & Urgent"
          description="Déléguer"
          type={QuadrantType.NOT_IMPORTANT_URGENT}
          tasks={getTasksByQuadrant(QuadrantType.NOT_IMPORTANT_URGENT)}
          onAddTask={() => openTaskModal(QuadrantType.NOT_IMPORTANT_URGENT)}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onCompleteTask={handleCompleteTask}
          onArchiveTask={handleArchiveTask}
          onDrop={(task) => handleTaskDrop(task, QuadrantType.NOT_IMPORTANT_URGENT)}
          className="bg-yellow-50"
        />
        <Quadrant
          title="Non Important & Non Urgent"
          description="Éliminer"
          type={QuadrantType.NOT_IMPORTANT_NOT_URGENT}
          tasks={getTasksByQuadrant(QuadrantType.NOT_IMPORTANT_NOT_URGENT)}
          onAddTask={() => openTaskModal(QuadrantType.NOT_IMPORTANT_NOT_URGENT)}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onCompleteTask={handleCompleteTask}
          onArchiveTask={handleArchiveTask}
          onDrop={(task) => handleTaskDrop(task, QuadrantType.NOT_IMPORTANT_NOT_URGENT)}
          className="bg-green-50"
        />
      </div>

      {isTaskModalOpen && (selectedQuadrant || selectedTask) && (
        <TaskModal
          task={selectedTask || undefined}
          quadrant={selectedQuadrant || undefined}
          onClose={closeTaskModal}
        />
      )}

      {isArchiveModalOpen && (
        <ArchiveModal onClose={() => setIsArchiveModalOpen(false)} />
      )}
    </div>
  );
};

export default Dashboard;
