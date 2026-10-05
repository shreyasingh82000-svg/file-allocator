import React from 'react';
import { Trash2 } from 'lucide-react';
import './FileTable.css';

const FileTable = ({ files, onDeleteFile }) => {
  const handleDelete = (fileId) => {
    if (confirm('Delete this file?')) {
      onDeleteFile(fileId);
    }
  };

  return (
    <div className="file-table-container">
      {files.length === 0 ? (
        <p className="empty-message">No files created yet. Go to Simulator to create files.</p>
      ) : (
        <div className="table-responsive">
          <table className="file-table">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Method</th>
                <th>Size</th>
                <th>Start Block</th>
                <th>Blocks</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id}>
                  <td className="name-col">{file.name}</td>
                  <td className="method-col">
                    <span className={`method-badge ${file.method.toLowerCase()}`}>
                      {file.method}
                    </span>
                  </td>
                  <td>{file.size}</td>
                  <td>{file.startBlock}</td>
                  <td className="blocks-col">
                    <span className="block-list">
                      {file.allocatedBlocks.slice(0, 3).join(', ')}
                      {file.allocatedBlocks.length > 3 && '...'}
                    </span>
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(file.id)}
                      title="Delete file"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FileTable;
