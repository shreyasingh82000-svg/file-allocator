import React, { useContext } from 'react';
import { SimulationContext } from '../context/SimulationContext';
import StatisticsCard from '../components/StatisticsCard';
import DiskGrid from '../components/DiskGrid';
import ActivityLog from '../components/ActivityLog';
import FileTable from '../components/FileTable';
import { analyzeFragmentation } from '../utils/fragmentation';
import './DashboardPage.css';

const DashboardPage = () => {
  const { disk, files, activities, selectedBlock, setSelectedBlock, getStatistics, deleteFile } = useContext(SimulationContext);

  const statistics = getStatistics();
  const fragmentation = analyzeFragmentation(disk);

  const handleBlockClick = (blockNumber) => {
    setSelectedBlock(selectedBlock === blockNumber ? null : blockNumber);
  };

  const getSelectedBlockInfo = () => {
    if (selectedBlock === null) return null;
    const block = disk[selectedBlock];
    return block;
  };

  const selectedBlockInfo = getSelectedBlockInfo();

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Real-time simulation statistics and disk visualization</p>
      </div>

      <StatisticsCard statistics={statistics} />

      <div className="dashboard-grid">
        <div className="section full-width">
          <h2>Disk Visualization</h2>
          <DiskGrid 
            disk={disk} 
            selectedBlock={selectedBlock}
            onBlockClick={handleBlockClick}
          />
          {selectedBlockInfo && (
            <div className="block-info">
              <h3>Block {selectedBlock} Information</h3>
              <p><strong>Status:</strong> {selectedBlockInfo.status}</p>
              {selectedBlockInfo.fileName && (
                <p><strong>File:</strong> {selectedBlockInfo.fileName}</p>
              )}
              {selectedBlockInfo.isIndexBlock && (
                <p><strong>Type:</strong> Index Block</p>
              )}
            </div>
          )}
        </div>

        <div className="section">
          <h2>Fragmentation Analysis</h2>
          <div className="fragmentation-info">
            <div className="frag-item">
              <span>Total Free Blocks</span>
              <strong>{fragmentation.totalFreeBlocks}</strong>
            </div>
            <div className="frag-item">
              <span>Free Regions</span>
              <strong>{fragmentation.numberOfFreeRegions}</strong>
            </div>
            <div className="frag-item">
              <span>Largest Free Region</span>
              <strong>{fragmentation.largestFreeRegion}</strong>
            </div>
            <div className="frag-item">
              <span>Is Fragmented</span>
              <strong>{fragmentation.isHighlyFragmented ? 'Yes' : 'No'}</strong>
            </div>
          </div>
        </div>

        <div className="section full-width">
          <h2>Files ({files.length})</h2>
          <FileTable files={files} onDeleteFile={deleteFile} />
        </div>

        <div className="section full-width">
          <ActivityLog 
            activities={activities}
            onClear={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
