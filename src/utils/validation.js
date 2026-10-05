/**
 * Input Validation Utilities
 */

export const validateFileName = (fileName, existingFiles) => {
  if (!fileName || fileName.trim() === '') {
    return { valid: false, error: 'File name cannot be empty' };
  }

  if (fileName.length > 50) {
    return { valid: false, error: 'File name cannot exceed 50 characters' };
  }

  if (!/^[a-zA-Z0-9._-]+$/.test(fileName)) {
    return { valid: false, error: 'File name can only contain alphanumeric characters, dots, dashes, and underscores' };
  }

  if (existingFiles.some(f => f.name.toLowerCase() === fileName.toLowerCase())) {
    return { valid: false, error: 'A file with this name already exists' };
  }

  return { valid: true };
};

export const validateFileSize = (fileSize, totalBlocks, usedBlocks) => {
  const numSize = parseInt(fileSize);

  if (isNaN(numSize) || numSize < 1) {
    return { valid: false, error: 'File size must be greater than 0' };
  }

  if (numSize > 1000) {
    return { valid: false, error: 'File size cannot exceed 1000 blocks' };
  }

  const availableBlocks = totalBlocks - usedBlocks;
  if (numSize > availableBlocks) {
    return { valid: false, error: `Insufficient free space. Available: ${availableBlocks} blocks, Requested: ${numSize} blocks` };
  }

  return { valid: true };
};

export const validateDiskSize = (diskSize) => {
  const numSize = parseInt(diskSize);

  if (isNaN(numSize) || numSize < 10) {
    return { valid: false, error: 'Disk size must be at least 10 blocks' };
  }

  if (numSize > 1000) {
    return { valid: false, error: 'Disk size cannot exceed 1000 blocks' };
  }

  return { valid: true };
};

export const validateLogicalBlock = (logicalBlock, fileSize) => {
  const numBlock = parseInt(logicalBlock);

  if (isNaN(numBlock) || numBlock < 0) {
    return { valid: false, error: 'Logical block number must be non-negative' };
  }

  if (numBlock >= fileSize) {
    return { valid: false, error: `Logical block number must be less than file size (${fileSize})` };
  }

  return { valid: true };
};
