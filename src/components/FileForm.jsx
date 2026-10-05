import React, { useState } from 'react';
import { validateFileName, validateFileSize } from '../utils/validation';
import './FileForm.css';

const FileForm = ({ onCreateFile, existingFiles, totalBlocks, usedBlocks, disabled }) => {
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [method, setMethod] = useState('Contiguous');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate file name
    const fileNameValidation = validateFileName(fileName, existingFiles);
    if (!fileNameValidation.valid) {
      setError(fileNameValidation.error);
      return;
    }

    // Validate file size
    const fileSizeValidation = validateFileSize(fileSize, totalBlocks, usedBlocks);
    if (!fileSizeValidation.valid) {
      setError(fileSizeValidation.error);
      return;
    }

    // Create file
    onCreateFile(fileName, parseInt(fileSize), method);
    setFileName('');
    setFileSize('');
    setMethod('Contiguous');
    setSuccess('File created successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const availableBlocks = totalBlocks - usedBlocks;

  return (
    <div className="file-form-container">
      <h3>Create New File</h3>
      <form onSubmit={handleSubmit} className="file-form">
        <div className="form-group">
          <label htmlFor="fileName">File Name</label>
          <input
            id="fileName"
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="e.g., StudentData"
            disabled={disabled}
            maxLength="50"
          />
        </div>

        <div className="form-group">
          <label htmlFor="fileSize">File Size (blocks)</label>
          <input
            id="fileSize"
            type="number"
            value={fileSize}
            onChange={(e) => setFileSize(e.target.value)}
            placeholder="1-1000"
            min="1"
            max="1000"
            disabled={disabled}
          />
          <small>Available: {availableBlocks} blocks</small>
        </div>

        <div className="form-group">
          <label htmlFor="method">Allocation Method</label>
          <select
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            disabled={disabled}
          >
            <option value="Contiguous">Contiguous Allocation</option>
            <option value="Linked">Linked Allocation</option>
            <option value="Indexed">Indexed Allocation</option>
          </select>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <button 
          type="submit" 
          className="submit-btn"
          disabled={disabled || availableBlocks === 0}
        >
          Create File
        </button>
      </form>
    </div>
  );
};

export default FileForm;
