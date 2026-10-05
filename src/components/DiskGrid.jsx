import React from 'react';
import './DiskGrid.css';

const DiskGrid = ({ disk, selectedBlock, onBlockClick }) => {
  const getBlockColor = (block) => {
    if (selectedBlock === block.blockNumber) {
      return 'block-selected';
    }
    
    switch (block.status) {
      case 'FREE':
        return 'block-free';
      case 'INDEX':
        return 'block-index';
      case 'ALLOCATED':
        return 'block-allocated';
      default:
        return 'block-free';
    }
  };

  const getBlocksPerRow = () => {
    if (disk.length <= 20) return 5;
    if (disk.length <= 50) return 10;
    return 15;
  };

  const blocksPerRow = getBlocksPerRow();

  return (
    <div className="disk-grid-container">
      <div 
        className="disk-grid"
        style={{
          gridTemplateColumns: `repeat(${blocksPerRow}, 1fr)`
        }}
      >
        {disk.map((block) => (
          <div
            key={block.blockNumber}
            className={`disk-block ${getBlockColor(block)}`}
            onClick={() => onBlockClick(block.blockNumber)}
            title={`Block ${block.blockNumber}: ${block.status}${block.fileName ? ` - ${block.fileName}` : ''}`}
          >
            <span className="block-number">{block.blockNumber}</span>
            <div className="block-status">
              {block.status === 'FREE' && <span className="status-label">F</span>}
              {block.status === 'ALLOCATED' && <span className="status-label">A</span>}
              {block.status === 'INDEX' && <span className="status-label">I</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiskGrid;
