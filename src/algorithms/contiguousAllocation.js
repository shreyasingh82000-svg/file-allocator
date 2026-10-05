 /**
 * Contiguous Allocation Algorithm
 * All blocks belonging to a file are stored consecutively on disk.
 */

export const allocateContiguous = (disk, fileSize, fileName) => {
  const activities = [];
  let startBlock = -1;
  
  activities.push({
    step: "File creation request received",
    description: `File: ${fileName}, Size: ${fileSize} blocks`
  });

  activities.push({
    step: "Searching for free disk blocks",
    description: "Scanning disk for consecutive free blocks..."
  });

  // Find consecutive free blocks
  let consecutiveCount = 0;
  let currentStart = -1;

  for (let i = 0; i < disk.length; i++) {
    if (disk[i].status === 'FREE') {
      if (consecutiveCount === 0) {
        currentStart = i;
      }
      consecutiveCount++;

      if (consecutiveCount === fileSize) {
        startBlock = currentStart;
        break;
      }
    } else {
      consecutiveCount = 0;
      currentStart = -1;
    }
  }

  if (startBlock === -1) {
    activities.push({
      step: "Allocation failed",
      description: "Insufficient consecutive free blocks available"
    });
    return {
      success: false,
      startBlock: -1,
      allocatedBlocks: [],
      activities,
      reason: "No consecutive free blocks found"
    };
  }

  const allocatedBlocks = [];
  for (let i = startBlock; i < startBlock + fileSize; i++) {
    allocatedBlocks.push(i);
  }

  activities.push({
    step: "Suitable consecutive region found",
    description: `Blocks ${startBlock} to ${startBlock + fileSize - 1}`
  });

  activities.push({
    step: "Allocating blocks",
    description: `Marking ${fileSize} blocks as allocated`
  });

  activities.push({
    step: "Updating file allocation table",
    description: `File: ${fileName}, Start: ${startBlock}, Size: ${fileSize}`
  });

  activities.push({
    step: "Allocation successful",
    description: `File allocated using Contiguous method`
  });

  return {
    success: true,
    startBlock,
    allocatedBlocks,
    activities,
    method: 'Contiguous'
  };
};

export const deleteContiguousFile = (disk, file) => {
  const activities = [];
  
  activities.push({
    step: "File deletion request received",
    description: `File: ${file.name}`
  });

  activities.push({
    step: "Locating allocated blocks",
    description: `Start: ${file.startBlock}, Size: ${file.size}`
  });

  activities.push({
    step: "Releasing blocks",
    description: `Freeing ${file.allocatedBlocks.length} blocks`
  });

  activities.push({
    step: "Updating disk",
    description: "Marking blocks as FREE"
  });

  activities.push({
    step: "File successfully deleted",
    description: `${file.allocatedBlocks.length} blocks released`
  });

  return { success: true, activities };
};

/**
 * File Access - Contiguous Allocation
 * Physical Block = Starting Block + Logical Block Number
 */
export const accessContiguousBlock = (file, logicalBlockNumber) => {
  const steps = [];

  steps.push({
    step: "File access request",
    description: `File: ${file.name}, Logical Block: ${logicalBlockNumber}`
  });

  if (logicalBlockNumber >= file.size || logicalBlockNumber < 0) {
    return {
      success: false,
      physicalBlock: -1,
      steps,
      error: "Logical block number out of range"
    };
  }

  const physicalBlock = file.startBlock + logicalBlockNumber;

  steps.push({
    step: "Calculating physical block",
    description: `Physical Block = Start Block + Logical Block Number`
  });

  steps.push({
    step: "Formula application",
    description: `Physical Block = ${file.startBlock} + ${logicalBlockNumber} = ${physicalBlock}`
  });

  steps.push({
    step: "Direct access achieved",
    description: `Physical Block: ${physicalBlock}`
  });

  return {
    success: true,
    physicalBlock,
    steps
  };
};
