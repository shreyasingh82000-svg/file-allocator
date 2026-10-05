import React, { useContext, useState } from 'react';
import { SimulationContext } from '../context/SimulationContext';
import { clearSimulation, loadSimulation } from '../utils/storage';
import DiskGrid from '../components/DiskGrid';
import FileForm from '../components/FileForm';
import StatisticsCard from '../components/StatisticsCard';
import ActivityLog from '../components/ActivityLog';
import FileTable from '../components/FileTable';
import DiskSizeForm from '../components/DiskSizeForm';
import './SimulatorPage.css';

const SimulatorPage = () => {
  const { 
    disk, 
    files, 
    activities, 
    selectedBlock, 
    setSelectedBlock, 
    createFile, 
    deleteFile, 
    getStatistics, 
    initializeNewDisk,
    resetSimulation
  } = useContext(SimulationContext);

  const [showDiskSizeForm, setShowDiskSizeForm] = useState(false);
  const [lastAction, setLastAction] = useState('');

  const statistics = getStatistics();

  const handleCreateFile = (fileName, fileSize, method) => {
    const result = createFile(fileName, fileSize, method);
    if (result.success) {
      setLastAction(`File '${fileName}' created successfully with ${method} allocation`);
    } else {
      setLastAction(`Failed: ${result.reason}`);
    }
  };

  const handleDeleteFile = (fileId) => {
    const file = files.find(f => f.id === fileId);
    if (file) {
      deleteFile(fileId);
      setLastAction(`File '${file.name}' deleted successfully`);
    }
  };

  const handleResetDisk = (size) => {
    initializeNewDisk(size);
    setShowDiskSizeForm(false);
    setLastAction(`Disk reset to ${size} blocks`);
  };

  const handleResetSimulation = () => {
    if (confirm('Reset simulation? This will delete all files and restore the disk to its initial state.')) {
      resetSimulation();
      setLastAction('Simulation reset');
    }
  };

  const handleLoadDemo = () => {
    // Create a demo scenario
    initializeNewDisk(40);
    setTimeout(() => {
      createFile('SystemFile', 3, 'Contiguous');
      setTimeout(() => {
        createFile('UserData', 4, 'Linked');
        setTimeout(() => {
          createFile('Cache', 2, 'Indexed');
          setLastAction('Demo scenario loaded');
        }, 500);
      }, 500);
    }, 300);
  };

  const handleClearActivities = () => {
    // This would typically clear the activities log
    setLastAction('Activity log cleared');
  };

  const handleBlockClick = (blockNumber) => {
    setSelectedBlock(selectedBlock === blockNumber ? null : blockNumber);
  };

  return (
    <div className="simulator-page">
      <div className="simulator-header">
        <h1>File Allocation Simulator</h1>
        <p>Create, allocate, and manage files with different allocation methods</p>
      </div>

      {lastAction && (
        <div className="action-notification">
          {lastAction}
        </div>
      )}

      <StatisticsCard statistics={statistics} />

      <div className="simulator-controls">
        <button className="control-btn" onClick={() => setShowDiskSizeForm(!showDiskSizeForm)}>
          Change Disk Size
        </button>
        <button className="control-btn" onClick={handleLoadDemo}>
          Load Demo
        </button>
        <button className="control-btn reset" onClick={handleResetSimulation}>
          Reset Simulation
        </button>
      </div>

      {showDiskSizeForm && (
        <DiskSizeForm 
          currentSize={disk.length}
          onConfirm={handleResetDisk}
          onCancel={() => setShowDiskSizeForm(false)}
        />
      )}

      <div className="simulator-grid">
        <div className="section">
          <FileForm
            onCreateFile={handleCreateFile}
            existingFiles={files}
            totalBlocks={disk.length}
            usedBlocks={statistics.usedBlocks}
          />
        </div>

        <div className="section">
          <h2>Disk Visualization</h2>
          <DiskGrid
            disk={disk}
            selectedBlock={selectedBlock}
            onBlockClick={handleBlockClick}
          />
        </div>

        <div className="section">
          <h2>Files ({files.length})</h2>
          <FileTable files={files} onDeleteFile={handleDeleteFile} />
        </div>

        <div className="section">
          <ActivityLog
            activities={activities}
            onClear={handleClearActivities}
          />
        </div>
      </div>
    </div>
  );
};

export default SimulatorPage;
