import React from 'react';
import './StatisticsCard.css';

const StatisticsCard = ({ statistics }) => {
  if (!statistics) {
    return null;
  }

  return (
    <div className="statistics-container">
      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Blocks</h4>
          <div className="stat-value">{statistics.totalBlocks}</div>
        </div>
        <div className="stat-card">
          <h4>Used Blocks</h4>
          <div className="stat-value used">{statistics.usedBlocks}</div>
        </div>
        <div className="stat-card">
          <h4>Free Blocks</h4>
          <div className="stat-value free">{statistics.freeBlocks}</div>
        </div>
        <div className="stat-card">
          <h4>Files</h4>
          <div className="stat-value">{statistics.numberOfFiles}</div>
        </div>
        <div className="stat-card">
          <h4>Utilization</h4>
          <div className="stat-value utilization">{statistics.utilization}%</div>
          <div className="utilization-bar">
            <div 
              className="utilization-fill" 
              style={{ width: `${statistics.utilization}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;
