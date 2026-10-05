/**
 * Indexed Allocation Algorithm
 * A special index block stores addresses of all data blocks for a file.
 */

export const allocateIndexed = (disk, fileSize, fileName) => {
  const activities = [];
  const allocatedBlocks = [];
  let indexBlock = -1;
  
  activities.push({
    step: "File creation request received",
    description: `File: ${fileName}, Size: ${fileSize} blocks`
  });

  activities.push({
    step: "Calculating space requirement",
    description: `1 Index block + ${fileSize} Data blocks = ${fileSize + 1} blocks needed`
  });

  activities.push({
    step: "Searching for free disk blocks",
    description: "Scanning disk for index block and data blocks..."
  });

  // Find free blocks
  const freeBlocks = [];
  for (let i = 0; i < disk.length; i++) {
    if (disk[i].status === 'FREE') {
      freeBlocks.push(i);
    }
  }

  if (freeBlocks.length < fileSize + 1) {
    activities.push({
      step: "Allocation failed",
      description: `Insufficient free blocks. Need: ${fileSize + 1}, Available: ${freeBlocks.length}`
    });
    return {
      success: false,
      indexBlock: -1,
      dataBlocks: [],
      allocatedBlocks: [],
      activities,
      reason: "Not enough free blocks for index and data"
    };
  }

  // Allocate index block
  indexBlock = freeBlocks[0];
  activities.push({
    step: "Allocating index block",
    description: `Index Block: ${indexBlock}`
  });

  // Allocate data blocks
  const dataBlocks = [];
  for (let i = 1; i <= fileSize; i++) {
    dataBlocks.push(freeBlocks[i]);
    activities.push({
      step: `Allocating data block ${i}`,
      description: `Block: ${freeBlocks[i]}`
    });
  }

  allocatedBlocks.push(indexBlock);
  allocatedBlocks.push(...dataBlocks);

  activities.push({
    step: "Writing addresses into index block",
    description: `Storing ${fileSize} data block addresses...`
  });

  for (let i = 0; i < dataBlocks.length; i++) {
    activities.push({
      step: `Address slot ${i}`,
      description: `Index[${i}] = ${dataBlocks[i]}`
    });
  }

  activities.push({
    step: "Updating file allocation table",
    description: `File: ${fileName}, Index Block: ${indexBlock}, Data Blocks: ${dataBlocks.length}`
  });

  activities.push({
    step: "Allocation successful",
    description: `File allocated using Indexed method`
  });

  return {
    success: true,
    indexBlock,
    dataBlocks,
    allocatedBlocks,
    activities,
    method: 'Indexed'
  };
};

export const deleteIndexedFile = (disk, file) => {
  const activities = [];
  
  activities.push({
    step: "File deletion request received",
    description: `File: ${file.name}`
  });

  activities.push({
    step: "Locating index block",
    description: `Index Block: ${file.indexBlock}`
  });

  activities.push({
    step: "Reading address references",
    description: `Found ${file.dataBlocks.length} data block references`
  });

  activities.push({
    step: "Releasing data blocks",
    description: `Freeing ${file.dataBlocks.length} blocks`
  });

  activities.push({
    step: "Releasing index block",
    description: `Freeing index block: ${file.indexBlock}`
  });

  activities.push({
    step: "Updating disk",
    description: "Marking all blocks as FREE"
  });

  activities.push({
    step: "File successfully deleted",
    description: `${file.allocatedBlocks.length} blocks released`
  });

  return { success: true, activities };
};

/**
 * File Access - Indexed Allocation
 * Must look up address in index block first, then access data block
 */
export const accessIndexedBlock = (file, logicalBlockNumber) => {
  const steps = [];

  steps.push({
    step: "File access request",
    description: `File: ${file.name}, Logical Block: ${logicalBlockNumber}`
  });

  if (logicalBlockNumber >= file.dataBlocks.length || logicalBlockNumber < 0) {
    return {
      success: false,
      physicalBlock: -1,
      steps,
      error: "Logical block number out of range"
    };
  }

  steps.push({
    step: "Accessing index block",
    description: `Index Block: ${file.indexBlock}`
  });

  steps.push({
    step: "Looking up address slot",
    description: `Reading address at index[${logicalBlockNumber}]`
  });

  const physicalBlock = file.dataBlocks[logicalBlockNumber];

  steps.push({
    step: "Address retrieved",
    description: `Index[${logicalBlockNumber}] = ${physicalBlock}`
  });

  steps.push({
    step: "Accessing data block",
    description: `Physical Block: ${physicalBlock}`
  });

  steps.push({
    step: "Direct access achieved",
    description: `Data successfully accessed`
  });

  return {
    success: true,
    physicalBlock,
    steps
  };
};
