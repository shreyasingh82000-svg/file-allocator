import React, { useContext, useState } from 'react';
import { SimulationContext } from '../context/SimulationContext';
import { validateLogicalBlock } from '../utils/validation';
import './AccessPage.css';

const AccessPage = () => {
  const { files, accessFileBlock } = useContext(SimulationContext);
  const [selectedFile, setSelectedFile] = useState(files.length > 0 ? files[0].id : '');
  const [logicalBlock, setLogicalBlock] = useState('0');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleAccess = (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!selectedFile) {
      setError('Please select a file');
      return;
    }

    const file = files.find(f => f.id === selectedFile);
    const validation = validateLogicalBlock(logicalBlock, file.size);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    const accessResult = accessFileBlock(selectedFile, parseInt(logicalBlock));
    setResult(accessResult);
  };

  const currentFile = files.find(f => f.id === selectedFile);

  return (
    <div className="access-page">
      <div className="access-header">
        <h1>File Access Simulator</h1>
        <p>Simulate accessing logical blocks and see how the OS finds physical blocks</p>
      </div>

      <div className="access-container">
        <div className="access-form-section">
          <h2>Access Simulation</h2>
          <form onSubmit={handleAccess} className="access-form">
            <div className="form-group">
              <label htmlFor="file">Select File</label>
              <select
                id="file"
                value={selectedFile}
                onChange={(e) => {
                  setSelectedFile(e.target.value);
                  setResult(null);
                  setError('');
                }}
                disabled={files.length === 0}
              >
                <option value="">-- Select a file --</option>
                {files.map(file => (
                  <option key={file.id} value={file.id}>
                    {file.name} ({file.method})
                  </option>
                ))}
              </select>
            </div>

            {currentFile && (
              <div className="file-info">
                <p><strong>File:</strong> {currentFile.name}</p>
                <p><strong>Method:</strong> {currentFile.method}</p>
                <p><strong>Size:</strong> {currentFile.size} blocks</p>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="logicalBlock">Logical Block Number</label>
              <input
                id="logicalBlock"
                type="number"
                value={logicalBlock}
                onChange={(e) => setLogicalBlock(e.target.value)}
                min="0"
                max={currentFile ? currentFile.size - 1 : 0}
                disabled={!currentFile}
              />
              {currentFile && (
                <small>Range: 0 to {currentFile.size - 1}</small>
              )}
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="submit-btn" disabled={!currentFile}>
              Access Block
            </button>
          </form>
        </div>

        {result && (
          <div className="result-section">
            <h2>Access Result</h2>
            <div className={`result-status ${result.success ? 'success' : 'error'}`}>
              {result.success ? '✓ Success' : '✗ Failed'}
            </div>

            {result.success && (
              <div className="result-details">
                <div className="result-item">
                  <span className="label">Physical Block:</span>
                  <span className="value">{result.physicalBlock}</span>
                </div>
                <div className="result-item">
                  <span className="label">Method:</span>
                  <span className="value">{currentFile?.method}</span>
                </div>
              </div>
            )}

            {result.error && (
              <div className="result-error">
                <strong>Error:</strong> {result.error}
              </div>
            )}

            <div className="steps-section">
              <h3>Access Steps</h3>
              <div className="steps-list">
                {result.steps && result.steps.map((step, index) => (
                  <div key={index} className="step-item">
                    <div className="step-header">
                      <span className="step-num">{index + 1}</span>
                      <strong>{step.step}</strong>
                    </div>
                    <div className="step-desc">{step.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {files.length === 0 && (
        <div className="empty-state">
          <p>No files created yet.</p>
          <p>Go to <strong>Simulator</strong> to create files first.</p>
        </div>
      )}
    </div>
  );
};

export default AccessPage;
