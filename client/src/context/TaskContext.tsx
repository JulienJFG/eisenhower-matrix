import React, { createContext, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Task, QuadrantType } from '../models/Task';
import { TaskService } from '../services/TaskService';

interface TaskContextType {
  tasks: Task[];
  archivedTasks: Task[];
  addTask: (title: string, description: string, quadrant: QuadrantType, deadline?: Date) => Task;
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'userId'>>) => Task | null;
  deleteTask: (id: string) => boolean;
  archiveTask: (id: string) => boolean;
  unarchiveTask: (id: string) => boolean;
  moveTask: (id: string, quadrant: QuadrantType) => Task | null;
  reorderTasks: (taskId: string, targetQuadrant: QuadrantType, newOrder: number) => boolean;
  searchArchivedTasks: (query: string) => Task[];
  loading: boolean;
}

export const TaskContext = createContext<TaskContextType>({
  tasks: [],
  archivedTasks: [],
  addTask: () => { throw new Error('Not implemented'); },
  updateTask: () => { throw new Error('Not implemented'); },
  deleteTask: () => { throw new Error('Not implemented'); },
  archiveTask: () => { throw new Error('Not implemented'); },
  unarchiveTask: () => { throw new Error('Not implemented'); },
  moveTask: () => { throw new Error('Not implemented'); },
  reorderTasks: () => { throw new Error('Not implemented'); },
  searchArchivedTasks: () => { throw new Error('Not implemented'); },
  loading: true
});

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [archivedTasks, setArchivedTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const taskService = TaskService.getInstance();

  // Charger les tâches au démarrage
  useEffect(() => {
    if (!currentUser) {
      setTasks([]);
      setArchivedTasks([]);
      setLoading(false);
      return;
    }

    // Charger les tâches depuis le service
    const loadTasks = () => {
      setTasks(taskService.getTasks());
      setArchivedTasks(taskService.getArchivedTasks());
      setLoading(false);
    };

    loadTasks();

    // Configurer un intervalle pour vérifier les mises à jour
    const intervalId = setInterval(loadTasks, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentUser]);

  // Ajouter une tâche
  const addTask = (title: string, description: string, quadrant: QuadrantType, deadline?: Date): Task => {
    if (!currentUser) {
      throw new Error('Utilisateur non connecté');
    }

    const newTask = taskService.addTask(title, description, quadrant, currentUser.uid, deadline);
    setTasks(taskService.getTasks());
    return newTask;
  };

  // Mettre à jour une tâche
  const updateTask = (id: string, updates: Partial<Omit<Task, 'id' | 'userId'>>): Task | null => {
    if (!currentUser) {
      throw new Error('Utilisateur non connecté');
    }

    const updatedTask = taskService.updateTask(id, updates);
    setTasks(taskService.getTasks());
    return updatedTask;
  };

  // Supprimer une tâche
  const deleteTask = (id: string): boolean => {
    if (!currentUser) {
      throw new Error('Utilisateur non connecté');
    }

    const result = taskService.deleteTask(id);
    setTasks(taskService.getTasks());
    setArchivedTasks(taskService.getArchivedTasks());
    return result;
  };

  // Archiver une tâche
  const archiveTask = (id: string): boolean => {
    if (!currentUser) {
      throw new Error('Utilisateur non connecté');
    }

    const result = taskService.archiveTask(id);
    setTasks(taskService.getTasks());
    setArchivedTasks(taskService.getArchivedTasks());
    return result;
  };

  // Désarchiver une tâche
  const unarchiveTask = (id: string): boolean => {
    if (!currentUser) {
      throw new Error('Utilisateur non connecté');
    }

    const result = taskService.unarchiveTask(id);
    setTasks(taskService.getTasks());
    setArchivedTasks(taskService.getArchivedTasks());
    return result;
  };

  // Déplacer une tâche vers un autre quadrant
  const moveTask = (id: string, quadrant: QuadrantType): Task | null => {
    if (!currentUser) {
      throw new Error('Utilisateur non connecté');
    }

    const movedTask = taskService.moveTask(id, quadrant);
    setTasks(taskService.getTasks());
    return movedTask;
  };

  // Réordonner les tâches
  const reorderTasks = (taskId: string, targetQuadrant: QuadrantType, newOrder: number): boolean => {
    if (!currentUser) {
      throw new Error('Utilisateur non connecté');
    }

    const result = taskService.reorderTasks(taskId, targetQuadrant, newOrder);
    setTasks(taskService.getTasks());
    return result;
  };

  // Rechercher des tâches archivées
  const searchArchivedTasks = (query: string): Task[] => {
    if (!currentUser) {
      return [];
    }

    return taskService.searchArchivedTasks(query);
  };

  const value = {
    tasks,
    archivedTasks,
    addTask,
    updateTask,
    deleteTask,
    archiveTask,
    unarchiveTask,
    moveTask,
    reorderTasks,
    searchArchivedTasks,
    loading
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};
