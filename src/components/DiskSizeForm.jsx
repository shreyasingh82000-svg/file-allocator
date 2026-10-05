import React, { useState } from 'react';
import { validateDiskSize } from '../utils/validation';
import './DiskSizeForm.css';

const DiskSizeForm = ({ currentSize, onConfirm, onCancel }) => {
  const [diskSize, setDiskSize] = useState(currentSize.toString());
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const validation = validateDiskSize(diskSize);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    onConfirm(parseInt(diskSize));
  };

  const commonSizes = [20, 30, 40, 50, 100];

  return (
    <div className="disk-size-form-container">
      <div className="disk-size-form-overlay" onClick={onCancel}></div>
      <div className="disk-size-form-dialog">
        <h3>Change Disk Size</h3>
        <p className="form-description">
          Warning: Changing disk size will reset the simulation and delete all current files.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="diskSize">New Disk Size (blocks)</label>
            <input
              id="diskSize"
              type="number"
              value={diskSize}
              onChange={(e) => setDiskSize(e.target.value)}
              min="10"
              max="1000"
              placeholder="20-1000"
            />
          </div>

          <div className="quick-select">
            <label>Quick Select:</label>
            <div className="quick-buttons">
              {commonSizes.map(size => (
                <button
                  key={size}
                  type="button"
                  className={`quick-btn ${diskSize === size.toString() ? 'active' : ''}`}
                  onClick={() => setDiskSize(size.toString())}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-confirm">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DiskSizeForm;
