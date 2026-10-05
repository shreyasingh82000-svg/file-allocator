/**
 * LocalStorage Management
 */

const STORAGE_KEY = 'fileAllocatorSimulation';

export const saveSimulation = (simulationData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(simulationData));
    return true;
  } catch (error) {
    console.error('Error saving simulation:', error);
    return false;
  }
};

export const loadSimulation = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading simulation:', error);
    return null;
  }
};

export const clearSimulation = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing simulation:', error);
    return false;
  }
};

export const saveQuizProgress = (progress) => {
  try {
    localStorage.setItem('quizProgress', JSON.stringify(progress));
    return true;
  } catch (error) {
    console.error('Error saving quiz progress:', error);
    return false;
  }
};

export const loadQuizProgress = () => {
  try {
    const data = localStorage.getItem('quizProgress');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading quiz progress:', error);
    return null;
  }
};
