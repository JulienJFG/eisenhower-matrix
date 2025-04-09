import { Task, QuadrantType, createTask } from '../models/Task';

// Classe de service pour gérer les tâches localement
export class TaskService {
  private tasks: Task[] = [];
  private archivedTasks: Task[] = [];
  private static instance: TaskService;
  private storageKey = 'eisenhower_matrix_tasks';
  private archivedStorageKey = 'eisenhower_matrix_archived_tasks';

  private constructor() {
    this.loadFromLocalStorage();
  }

  // Pattern Singleton pour avoir une seule instance du service
  public static getInstance(): TaskService {
    if (!TaskService.instance) {
      TaskService.instance = new TaskService();
    }
    return TaskService.instance;
  }

  // Charger les tâches depuis le stockage local
  private loadFromLocalStorage(): void {
    try {
      const tasksJson = localStorage.getItem(this.storageKey);
      const archivedTasksJson = localStorage.getItem(this.archivedStorageKey);
      
      if (tasksJson) {
        const parsedTasks = JSON.parse(tasksJson);
        this.tasks = parsedTasks.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          deadline: task.deadline ? new Date(task.deadline) : undefined
        }));
      }
      
      if (archivedTasksJson) {
        const parsedArchivedTasks = JSON.parse(archivedTasksJson);
        this.archivedTasks = parsedArchivedTasks.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          deadline: task.deadline ? new Date(task.deadline) : undefined
        }));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des tâches:', error);
      this.tasks = [];
      this.archivedTasks = [];
    }
  }

  // Sauvegarder les tâches dans le stockage local
  private saveToLocalStorage(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
      localStorage.setItem(this.archivedStorageKey, JSON.stringify(this.archivedTasks));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des tâches:', error);
    }
  }

  // Obtenir toutes les tâches actives
  public getTasks(): Task[] {
    return [...this.tasks];
  }

  // Obtenir toutes les tâches archivées
  public getArchivedTasks(): Task[] {
    return [...this.archivedTasks];
  }

  // Obtenir les tâches par quadrant
  public getTasksByQuadrant(quadrant: QuadrantType): Task[] {
    return this.tasks
      .filter(task => task.quadrant === quadrant)
      .sort((a, b) => a.order - b.order);
  }

  // Ajouter une nouvelle tâche
  public addTask(
    title: string,
    description: string,
    quadrant: QuadrantType,
    userId: string,
    deadline?: Date
  ): Task {
    // Trouver l'ordre le plus élevé dans le quadrant
    const tasksInQuadrant = this.getTasksByQuadrant(quadrant);
    const highestOrder = tasksInQuadrant.length > 0
      ? Math.max(...tasksInQuadrant.map(t => t.order))
      : -1;
    
    // Créer la nouvelle tâche
    const newTask = createTask(title, description, quadrant, userId, deadline);
    newTask.order = highestOrder + 1;
    
    // Ajouter la tâche à la liste
    this.tasks.push(newTask);
    this.saveToLocalStorage();
    
    return newTask;
  }

  // Mettre à jour une tâche existante
  public updateTask(id: string, updates: Partial<Omit<Task, 'id' | 'userId'>>): Task | null {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      return null;
    }
    
    // Mettre à jour la tâche
    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      ...updates
    };
    
    this.saveToLocalStorage();
    return this.tasks[taskIndex];
  }

  // Supprimer une tâche
  public deleteTask(id: string): boolean {
    // Vérifier si la tâche est dans les tâches actives
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
      this.saveToLocalStorage();
      return true;
    }
    
    // Vérifier si la tâche est dans les tâches archivées
    const archivedTaskIndex = this.archivedTasks.findIndex(task => task.id === id);
    if (archivedTaskIndex !== -1) {
      this.archivedTasks.splice(archivedTaskIndex, 1);
      this.saveToLocalStorage();
      return true;
    }
    
    return false;
  }

  // Archiver une tâche
  public archiveTask(id: string): boolean {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      return false;
    }
    
    // Marquer la tâche comme archivée
    const task = { ...this.tasks[taskIndex], archived: true };
    
    // Supprimer de la liste active et ajouter à la liste archivée
    this.tasks.splice(taskIndex, 1);
    this.archivedTasks.push(task);
    
    this.saveToLocalStorage();
    return true;
  }

  // Désarchiver une tâche
  public unarchiveTask(id: string): boolean {
    const archivedTaskIndex = this.archivedTasks.findIndex(task => task.id === id);
    
    if (archivedTaskIndex === -1) {
      return false;
    }
    
    // Marquer la tâche comme non archivée
    const task = { ...this.archivedTasks[archivedTaskIndex], archived: false };
    
    // Supprimer de la liste archivée et ajouter à la liste active
    this.archivedTasks.splice(archivedTaskIndex, 1);
    
    // Trouver l'ordre le plus élevé dans le quadrant
    const tasksInQuadrant = this.getTasksByQuadrant(task.quadrant);
    const highestOrder = tasksInQuadrant.length > 0
      ? Math.max(...tasksInQuadrant.map(t => t.order))
      : -1;
    
    // Mettre à jour l'ordre de la tâche
    task.order = highestOrder + 1;
    
    this.tasks.push(task);
    
    this.saveToLocalStorage();
    return true;
  }

  // Déplacer une tâche vers un autre quadrant
  public moveTask(id: string, targetQuadrant: QuadrantType): Task | null {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      return null;
    }
    
    const task = this.tasks[taskIndex];
    
    // Si la tâche est déjà dans le quadrant cible, ne rien faire
    if (task.quadrant === targetQuadrant) {
      return task;
    }
    
    // Trouver l'ordre le plus élevé dans le quadrant cible
    const tasksInTargetQuadrant = this.getTasksByQuadrant(targetQuadrant);
    const highestOrder = tasksInTargetQuadrant.length > 0
      ? Math.max(...tasksInTargetQuadrant.map(t => t.order))
      : -1;
    
    // Mettre à jour le quadrant et l'ordre de la tâche
    task.quadrant = targetQuadrant;
    task.order = highestOrder + 1;
    
    this.saveToLocalStorage();
    return task;
  }

  // Réordonner les tâches dans un quadrant
  public reorderTasks(taskId: string, targetQuadrant: QuadrantType, newOrder: number): boolean {
    const taskIndex = this.tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex === -1) {
      return false;
    }
    
    const task = this.tasks[taskIndex];
    const sourceQuadrant = task.quadrant;
    
    // Mettre à jour le quadrant de la tâche si nécessaire
    if (sourceQuadrant !== targetQuadrant) {
      task.quadrant = targetQuadrant;
    }
    
    // Mettre à jour l'ordre de la tâche
    task.order = newOrder;
    
    // Réordonner les autres tâches si nécessaire
    this.tasks.forEach(t => {
      if (t.id !== taskId && t.quadrant === targetQuadrant && t.order >= newOrder) {
        t.order += 1;
      }
    });
    
    this.saveToLocalStorage();
    return true;
  }

  // Rechercher des tâches archivées
  public searchArchivedTasks(query: string): Task[] {
    if (!query) {
      return this.archivedTasks;
    }
    
    const lowerCaseQuery = query.toLowerCase();
    
    return this.archivedTasks.filter(task => 
      task.title.toLowerCase().includes(lowerCaseQuery) ||
      task.description.toLowerCase().includes(lowerCaseQuery)
    );
  }
}
