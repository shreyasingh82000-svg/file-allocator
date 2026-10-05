/**
 * Linked Allocation Algorithm
 * File blocks are scattered across the disk and linked via pointers.
 */

export const allocateLinked = (disk, fileSize, fileName) => {
  const activities = [];
  const allocatedBlocks = [];
  
  activities.push({
    step: "File creation request received",
    description: `File: ${fileName}, Size: ${fileSize} blocks`
  });

  activities.push({
    step: "Searching for free disk blocks",
    description: "Scanning entire disk for available blocks..."
  });

  // Find free blocks (they can be non-consecutive)
  const freeBlocks = [];
  for (let i = 0; i < disk.length; i++) {
    if (disk[i].status === 'FREE') {
      freeBlocks.push(i);
    }
  }

  if (freeBlocks.length < fileSize) {
    activities.push({
      step: "Allocation failed",
      description: `Insufficient free blocks. Need: ${fileSize}, Available: ${freeBlocks.length}`
    });
    return {
      success: false,
      startBlock: -1,
      allocatedBlocks: [],
      activities,
      reason: "Not enough free blocks available"
    };
  }

  // Select required number of blocks
  for (let i = 0; i < fileSize; i++) {
    allocatedBlocks.push(freeBlocks[i]);
    activities.push({
      step: `Block ${i + 1} selected`,
      description: `Block: ${freeBlocks[i]}`
    });
  }

  activities.push({
    step: "Creating pointer chain",
    description: "Linking selected blocks together..."
  });

  // Create pointer chain visualization
  for (let i = 0; i < allocatedBlocks.length - 1; i++) {
    activities.push({
      step: `Creating pointer`,
      description: `${allocatedBlocks[i]} → ${allocatedBlocks[i + 1]}`
    });
  }

  activities.push({
    step: "Final block pointer",
    description: `${allocatedBlocks[allocatedBlocks.length - 1]} → NULL`
  });

  activities.push({
    step: "Updating file allocation table",
    description: `File: ${fileName}, Start: ${allocatedBlocks[0]}, Pointer Chain created`
  });

  activities.push({
    step: "Allocation successful",
    description: `File allocated using Linked method`
  });

  return {
    success: true,
    startBlock: allocatedBlocks[0],
    allocatedBlocks,
    activities,
    method: 'Linked'
  };
};

export const deleteLinkedFile = (disk, file) => {
  const activities = [];
  
  activities.push({
    step: "File deletion request received",
    description: `File: ${file.name}`
  });

  activities.push({
    step: "Locating all allocated blocks",
    description: `Following pointer chain from start block...`
  });

  activities.push({
    step: "Releasing blocks",
    description: `Freeing ${file.allocatedBlocks.length} blocks`
  });

  activities.push({
    step: "Clearing pointers",
    description: "Removing pointer chain"
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
 * File Access - Linked Allocation
 * Must traverse the pointer chain to reach desired block
 */
export const accessLinkedBlock = (file, logicalBlockNumber) => {
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

  steps.push({
    step: "Starting pointer traversal",
    description: `From Start Block: ${file.startBlock}`
  });

  let currentBlock = file.startBlock;
  for (let i = 0; i < logicalBlockNumber; i++) {
    const nextBlock = file.allocatedBlocks[i + 1];
    steps.push({
      step: `Traversal step ${i + 1}`,
      description: `Following pointer: ${currentBlock} → ${nextBlock}`
    });
    currentBlock = nextBlock;
  }

  steps.push({
    step: "Direct access achieved",
    description: `Physical Block: ${currentBlock}`
  });

  return {
    success: true,
    physicalBlock: currentBlock,
    steps
  };
};
