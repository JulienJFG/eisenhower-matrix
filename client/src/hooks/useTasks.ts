import { useContext } from 'react';
import { TaskContext, QuadrantType } from '../context/TaskContext';

export const useTasks = () => {
  return useContext(TaskContext);
};
