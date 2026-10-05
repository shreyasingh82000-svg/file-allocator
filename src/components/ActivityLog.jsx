import React, { useEffect, useRef } from 'react';
import { Trash2 } from 'lucide-react';
import './ActivityLog.css';

const ActivityLog = ({ activities, onClear }) => {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activities]);

  return (
    <div className="activity-log-container">
      <div className="activity-log-header">
        <h3>OS Activity Log</h3>
        <button className="clear-btn" onClick={onClear} title="Clear log">
          <Trash2 size={16} />
        </button>
      </div>
      <div className="activity-log-content">
        {activities.length === 0 ? (
          <p className="empty-log">No activities yet. Create a file to see OS operations.</p>
        ) : (
          activities.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-step">
                <span className="step-number">{index + 1}</span>
                <strong>{activity.step}</strong>
              </div>
              <div className="activity-description">
                {activity.description}
              </div>
            </div>
          ))
        )}
        <div ref={endRef} />
      </div>
    </div>
  );
};

export default ActivityLog;
