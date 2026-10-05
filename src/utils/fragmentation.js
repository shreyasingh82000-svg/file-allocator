/**
 * Fragmentation Analysis Utilities
 */

export const analyzeFragmentation = (disk) => {
  let totalFreeBlocks = 0;
  let freeRegions = [];
  let currentRegionStart = -1;
  let currentRegionSize = 0;

  for (let i = 0; i < disk.length; i++) {
    if (disk[i].status === 'FREE') {
      totalFreeBlocks++;
      if (currentRegionStart === -1) {
        currentRegionStart = i;
        currentRegionSize = 1;
      } else {
        currentRegionSize++;
      }
    } else {
      if (currentRegionStart !== -1) {
        freeRegions.push({
          start: currentRegionStart,
          size: currentRegionSize,
          end: currentRegionStart + currentRegionSize - 1
        });
        currentRegionStart = -1;
        currentRegionSize = 0;
      }
    }
  }

  if (currentRegionStart !== -1) {
    freeRegions.push({
      start: currentRegionStart,
      size: currentRegionSize,
      end: currentRegionStart + currentRegionSize - 1
    });
  }

  const largestFreeRegion = freeRegions.length > 0 
    ? Math.max(...freeRegions.map(r => r.size))
    : 0;

  const fragmentation = freeRegions.length === 0 ? 0 : freeRegions.length - 1;
  const fragmentationPercent = freeRegions.length > 0 
    ? ((fragmentation / totalFreeBlocks) * 100).toFixed(2)
    : 0;

  return {
    totalFreeBlocks,
    numberOfFreeRegions: freeRegions.length,
    largestFreeRegion,
    freeRegions,
    fragmentation,
    fragmentationPercent,
    isHighlyFragmented: largestFreeRegion < totalFreeBlocks / 3
  };
};

export const canAllocateContiguous = (disk, fileSize) => {
  const frag = analyzeFragmentation(disk);
  return frag.largestFreeRegion >= fileSize;
};
