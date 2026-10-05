/**
 * Disk Management Utilities
 */

export const createDisk = (size) => {
  const disk = [];
  for (let i = 0; i < size; i++) {
    disk.push({
      blockNumber: i,
      status: 'FREE', // FREE, ALLOCATED, INDEX
      fileId: null,
      fileName: null,
      nextBlock: null,
      isIndexBlock: false
    });
  }
  return disk;
};

export const initializeDisk = (size) => {
  return createDisk(size);
};

export const getBlockStatus = (disk, blockNumber) => {
  if (blockNumber < 0 || blockNumber >= disk.length) {
    return null;
  }
  return disk[blockNumber];
};

export const markBlocksAllocated = (disk, blocks, fileName, fileId, isIndex = false) => {
  blocks.forEach(blockNum => {
    if (blockNum >= 0 && blockNum < disk.length) {
      disk[blockNum].status = isIndex ? 'INDEX' : 'ALLOCATED';
      disk[blockNum].fileName = fileName;
      disk[blockNum].fileId = fileId;
      disk[blockNum].isIndexBlock = isIndex;
    }
  });
};

export const markBlocksFree = (disk, blocks) => {
  blocks.forEach(blockNum => {
    if (blockNum >= 0 && blockNum < disk.length) {
      disk[blockNum].status = 'FREE';
      disk[blockNum].fileId = null;
      disk[blockNum].fileName = null;
      disk[blockNum].nextBlock = null;
      disk[blockNum].isIndexBlock = false;
    }
  });
};

export const calculateStatistics = (disk, files) => {
  const totalBlocks = disk.length;
  const usedBlocks = disk.filter(b => b.status !== 'FREE').length;
  const freeBlocks = totalBlocks - usedBlocks;
  const utilization = ((usedBlocks / totalBlocks) * 100).toFixed(2);

  return {
    totalBlocks,
    usedBlocks,
    freeBlocks,
    utilization: parseFloat(utilization),
    numberOfFiles: files.length
  };
};

export const getFileBlockCounts = (files) => {
  const methodCounts = {
    Contiguous: 0,
    Linked: 0,
    Indexed: 0
  };

  files.forEach(file => {
    methodCounts[file.method] = (methodCounts[file.method] || 0) + 1;
  });

  return methodCounts;
};
