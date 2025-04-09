// Définition des types de quadrants
export enum QuadrantType {
  IMPORTANT_URGENT = 'important-urgent',
  IMPORTANT_NOT_URGENT = 'important-not-urgent',
  NOT_IMPORTANT_URGENT = 'not-important-urgent',
  NOT_IMPORTANT_NOT_URGENT = 'not-important-not-urgent'
}

// Interface pour les tâches
export interface Task {
  id: string;
  title: string;
  description: string;
  quadrant: QuadrantType;
  completed: boolean;
  deadline?: Date;
  createdAt: Date;
  userId: string;
  order: number;
  archived: boolean;
}

// Fonction pour créer une nouvelle tâche
export const createTask = (
  title: string,
  description: string,
  quadrant: QuadrantType,
  userId: string,
  deadline?: Date
): Task => {
  return {
    id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title,
    description,
    quadrant,
    completed: false,
    deadline,
    createdAt: new Date(),
    userId,
    order: 0, // Sera mis à jour lors de l'ajout à un quadrant
    archived: false
  };
};

// Fonction pour obtenir le nom français du quadrant
export const getQuadrantName = (quadrant: QuadrantType): string => {
  switch (quadrant) {
    case QuadrantType.IMPORTANT_URGENT:
      return 'Important & Urgent';
    case QuadrantType.IMPORTANT_NOT_URGENT:
      return 'Important & Non Urgent';
    case QuadrantType.NOT_IMPORTANT_URGENT:
      return 'Non Important & Urgent';
    case QuadrantType.NOT_IMPORTANT_NOT_URGENT:
      return 'Non Important & Non Urgent';
    default:
      return 'Inconnu';
  }
};

// Fonction pour obtenir la description française du quadrant
export const getQuadrantDescription = (quadrant: QuadrantType): string => {
  switch (quadrant) {
    case QuadrantType.IMPORTANT_URGENT:
      return 'À faire en premier';
    case QuadrantType.IMPORTANT_NOT_URGENT:
      return 'Planifier';
    case QuadrantType.NOT_IMPORTANT_URGENT:
      return 'Déléguer';
    case QuadrantType.NOT_IMPORTANT_NOT_URGENT:
      return 'Éliminer';
    default:
      return '';
  }
};

// Fonction pour formater une date en français
export const formatDate = (date?: Date): string => {
  if (!date) return '';
  
  const options: Intl.DateTimeFormatOptions = { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  };
  
  return new Date(date).toLocaleDateString('fr-FR', options);
};
