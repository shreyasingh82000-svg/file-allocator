import React, { createContext, useState, useCallback, useEffect } from 'react';
import { 
  initializeDisk, 
  markBlocksAllocated, 
  markBlocksFree, 
  calculateStatistics 
} from '../utils/diskManager';
import { 
  allocateContiguous, 
  deleteContiguousFile, 
  accessContiguousBlock 
} from '../algorithms/contiguousAllocation';
import { 
  allocateLinked, 
  deleteLinkedFile, 
  accessLinkedBlock 
} from '../algorithms/linkedAllocation';
import { 
  allocateIndexed, 
  deleteIndexedFile, 
  accessIndexedBlock 
} from '../algorithms/indexedAllocation';
import { saveSimulation, loadSimulation } from '../utils/storage';

export const SimulationContext = createContext();

export const SimulationProvider = ({ children }) => {
  const [disk, setDisk] = useState(() => {
    const savedData = loadSimulation();
    return savedData?.disk || initializeDisk(50);
  });

  const [files, setFiles] = useState(() => {
    const savedData = loadSimulation();
    return savedData?.files || [];
  });

  const [activities, setActivities] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);

  // Auto-save on changes
  useEffect(() => {
    saveSimulation({ disk, files });
  }, [disk, files]);

  // Get file by ID
  const getFileById = useCallback((fileId) => {
    return files.find(f => f.id === fileId);
  }, [files]);

  // Create file with specified allocation method
  const createFile = useCallback((fileName, fileSize, method) => {
    let result;

    if (method === 'Contiguous') {
      result = allocateContiguous(disk, fileSize, fileName);
    } else if (method === 'Linked') {
      result = allocateLinked(disk, fileSize, fileName);
    } else if (method === 'Indexed') {
      result = allocateIndexed(disk, fileSize, fileName);
    }

    if (result.success) {
      const newDisk = [...disk];
      const fileId = `file_${Date.now()}`;

      if (method === 'Contiguous') {
        markBlocksAllocated(newDisk, result.allocatedBlocks, fileName, fileId);
      } else if (method === 'Linked') {
        markBlocksAllocated(newDisk, result.allocatedBlocks, fileName, fileId);
      } else if (method === 'Indexed') {
        markBlocksAllocated(newDisk, [result.indexBlock], fileName, fileId, true);
        markBlocksAllocated(newDisk, result.dataBlocks, fileName, fileId);
      }

      const newFile = {
        id: fileId,
        name: fileName,
        size: fileSize,
        method,
        startBlock: result.startBlock,
        allocatedBlocks: result.allocatedBlocks,
        indexBlock: result.indexBlock || null,
        dataBlocks: result.dataBlocks || [],
        createdAt: new Date()
      };

      setDisk(newDisk);
      setFiles([...files, newFile]);
      setActivities(result.activities);

      return { success: true, file: newFile, activities: result.activities };
    } else {
      setActivities(result.activities);
      return { success: false, activities: result.activities, reason: result.reason };
    }
  }, [disk, files]);

  // Delete file
  const deleteFile = useCallback((fileId) => {
    const fileToDelete = files.find(f => f.id === fileId);
    if (!fileToDelete) return { success: false };

    let result;
    if (fileToDelete.method === 'Contiguous') {
      result = deleteContiguousFile(disk, fileToDelete);
    } else if (fileToDelete.method === 'Linked') {
      result = deleteLinkedFile(disk, fileToDelete);
    } else if (fileToDelete.method === 'Indexed') {
      result = deleteIndexedFile(disk, fileToDelete);
    }

    const newDisk = [...disk];
    markBlocksFree(newDisk, fileToDelete.allocatedBlocks);
    if (fileToDelete.indexBlock !== null) {
      markBlocksFree(newDisk, [fileToDelete.indexBlock]);
    }

    setDisk(newDisk);
    setFiles(files.filter(f => f.id !== fileId));
    setActivities(result.activities);

    return { success: true, activities: result.activities };
  }, [disk, files]);

  // Access file block
  const accessFileBlock = useCallback((fileId, logicalBlockNumber) => {
    const file = files.find(f => f.id === fileId);
    if (!file) return { success: false };

    let result;
    if (file.method === 'Contiguous') {
      result = accessContiguousBlock(file, logicalBlockNumber);
    } else if (file.method === 'Linked') {
      result = accessLinkedBlock(file, logicalBlockNumber);
    } else if (file.method === 'Indexed') {
      result = accessIndexedBlock(file, logicalBlockNumber);
    }

    setActivities(result.steps);
    return result;
  }, [files]);

  // Initialize disk with new size
  const initializeNewDisk = useCallback((size) => {
    const newDisk = initializeDisk(size);
    setDisk(newDisk);
    setFiles([]);
    setActivities([]);
    setSelectedBlock(null);
    return newDisk;
  }, []);

  // Reset disk
  const resetSimulation = useCallback(() => {
    const newDisk = initializeDisk(disk.length);
    setDisk(newDisk);
    setFiles([]);
    setActivities([]);
    setSelectedBlock(null);
  }, [disk.length]);

  // Get statistics
  const getStatistics = useCallback(() => {
    return calculateStatistics(disk, files);
  }, [disk, files]);

  return (
    <SimulationContext.Provider value={{
      disk,
      files,
      activities,
      selectedBlock,
      setSelectedBlock,
      createFile,
      deleteFile,
      accessFileBlock,
      initializeNewDisk,
      resetSimulation,
      getStatistics
    }}>
      {children}
    </SimulationContext.Provider>
  );
};
