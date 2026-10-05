import React, { useContext } from 'react';
import { SimulationContext } from '../context/SimulationContext';
import { analyzeFragmentation, canAllocateContiguous } from '../utils/fragmentation';
import DiskGrid from '../components/DiskGrid';
import './FragmentationPage.css';

const FragmentationPage = () => {
  const { disk, files, selectedBlock, setSelectedBlock } = useContext(SimulationContext);
  const fragmentation = analyzeFragmentation(disk);

  const handleBlockClick = (blockNumber) => {
    setSelectedBlock(selectedBlock === blockNumber ? null : blockNumber);
  };

  return (
    <div className="fragmentation-page">
      <div className="fragmentation-header">
        <h1>Fragmentation Analysis</h1>
        <p>Analyze disk fragmentation and free space distribution</p>
      </div>

      <div className="fragmentation-content">
        <div className="analysis-section">
          <h2>Fragmentation Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Free Blocks</h3>
              <div className="stat-value">{fragmentation.totalFreeBlocks}</div>
              <p className="stat-percent">
                {((fragmentation.totalFreeBlocks / disk.length) * 100).toFixed(1)}% of disk
              </p>
            </div>

            <div className="stat-card">
              <h3>Free Regions</h3>
              <div className="stat-value">{fragmentation.numberOfFreeRegions}</div>
              <p className="stat-label">Separate free areas</p>
            </div>

            <div className="stat-card">
              <h3>Largest Free Region</h3>
              <div className="stat-value">{fragmentation.largestFreeRegion}</div>
              <p className="stat-percent">
                {((fragmentation.largestFreeRegion / disk.length) * 100).toFixed(1)}% of disk
              </p>
            </div>

            <div className="stat-card">
              <h3>Fragmentation Level</h3>
              <div className={`stat-value ${fragmentation.isHighlyFragmented ? 'high' : 'low'}`}>
                {fragmentation.isHighlyFragmented ? 'High' : 'Low'}
              </div>
              <p className="stat-label">Based on free region distribution</p>
            </div>
          </div>
        </div>

        <div className="visualization-section">
          <h2>Disk Visualization</h2>
          <DiskGrid
            disk={disk}
            selectedBlock={selectedBlock}
            onBlockClick={handleBlockClick}
          />
        </div>

        <div className="legend-section">
          <h2>Color Legend</h2>
          <div className="legend-grid">
            <div className="legend-item">
              <div className="legend-color free"></div>
              <span>Free Block</span>
            </div>
            <div className="legend-item">
              <div className="legend-color allocated"></div>
              <span>Allocated Block</span>
            </div>
            <div className="legend-item">
              <div className="legend-color index"></div>
              <span>Index Block</span>
            </div>
          </div>
        </div>

        <div className="free-regions-section">
          <h2>Free Regions Details</h2>
          {fragmentation.freeRegions.length === 0 ? (
            <p className="empty-message">No free regions available.</p>
          ) : (
            <div className="regions-table">
              <table>
                <thead>
                  <tr>
                    <th>Region #</th>
                    <th>Start Block</th>
                    <th>End Block</th>
                    <th>Size (blocks)</th>
                    <th>% of Total Free</th>
                  </tr>
                </thead>
                <tbody>
                  {fragmentation.freeRegions.map((region, index) => (
                    <tr key={index}>
                      <td>#{index + 1}</td>
                      <td>{region.start}</td>
                      <td>{region.end}</td>
                      <td className="size-value">{region.size}</td>
                      <td>
                        {((region.size / fragmentation.totalFreeBlocks) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="analysis-section">
          <h2>Impact Analysis</h2>
          <div className="impact-cards">
            <div className="impact-card">
              <h3>Contiguous Allocation</h3>
              {canAllocateContiguous(disk, 1) ? (
                <p className="success">✓ Can allocate small files</p>
              ) : (
                <p className="error">✗ Cannot allocate even small files</p>
              )}
              {fragmentation.isHighlyFragmented && (
                <p className="warning">⚠ External fragmentation is high</p>
              )}
            </div>

            <div className="impact-card">
              <h3>Linked Allocation</h3>
              <p className="info">✓ No external fragmentation</p>
              <p className="info">✓ Can allocate {fragmentation.totalFreeBlocks} blocks</p>
            </div>

            <div className="impact-card">
              <h3>Indexed Allocation</h3>
              <p className="info">✓ No external fragmentation</p>
              <p className="info">✓ Can allocate {fragmentation.totalFreeBlocks} blocks</p>
            </div>
          </div>
        </div>

        <div className="recommendations-section">
          <h2>Recommendations</h2>
          <div className="recommendations-list">
            {fragmentation.isHighlyFragmented ? (
              <>
                <div className="recommendation-item">
                  <strong>High Fragmentation Detected</strong>
                  <p>Consider using Linked or Indexed allocation methods to avoid external fragmentation.</p>
                </div>
                <div className="recommendation-item">
                  <strong>Defragmentation Needed</strong>
                  <p>For Contiguous allocation, perform disk defragmentation to consolidate free space.</p>
                </div>
              </>
            ) : (
              <div className="recommendation-item">
                <strong>Disk Health Good</strong>
                <p>Fragmentation levels are acceptable. All allocation methods work efficiently.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FragmentationPage;
