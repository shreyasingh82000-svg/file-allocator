import React from 'react';
import './ComparisonPage.css';

const ComparisonPage = () => {
  const comparisonData = [
    {
      feature: 'Sequential Access',
      contiguous: 'Yes',
      linked: 'Yes',
      indexed: 'Yes'
    },
    {
      feature: 'Direct Access',
      contiguous: 'Excellent',
      linked: 'Difficult',
      indexed: 'Good'
    },
    {
      feature: 'External Fragmentation',
      contiguous: 'Yes',
      linked: 'No',
      indexed: 'No'
    },
    {
      feature: 'File Growth',
      contiguous: 'Difficult',
      linked: 'Easy',
      indexed: 'Easy'
    },
    {
      feature: 'Pointer Overhead',
      contiguous: 'No',
      linked: 'Yes',
      indexed: 'Index Only'
    },
    {
      feature: 'Blocks for File',
      contiguous: 'Data Only',
      linked: 'Data Only',
      indexed: '1 Index + Data'
    },
    {
      feature: 'Access Time',
      contiguous: 'Fast',
      linked: 'Slow (Traversal)',
      indexed: 'Fast'
    },
    {
      feature: 'Space Utilization',
      contiguous: 'High',
      linked: 'Medium (Pointers)',
      indexed: 'Medium (Index)'
    }
  ];

  return (
    <div className="comparison-page">
      <div className="comparison-header">
        <h1>Allocation Methods Comparison</h1>
        <p>Compare features and characteristics of the three file allocation methods</p>
      </div>

      <div className="comparison-table-container">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th className="method-col contiguous">Contiguous</th>
              <th className="method-col linked">Linked</th>
              <th className="method-col indexed">Indexed</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, index) => (
              <tr key={index}>
                <td className="feature-name">{row.feature}</td>
                <td className="method-data contiguous">{row.contiguous}</td>
                <td className="method-data linked">{row.linked}</td>
                <td className="method-data indexed">{row.indexed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="comparison-details">
        <div className="detail-card">
          <h3>Contiguous Allocation</h3>
          <div className="pros">
            <h4>Pros</h4>
            <ul>
              <li>Fastest direct access</li>
              <li>Simple implementation</li>
              <li>No pointer overhead</li>
              <li>Good disk utilization</li>
            </ul>
          </div>
          <div className="cons">
            <h4>Cons</h4>
            <ul>
              <li>External fragmentation</li>
              <li>Difficult file growth</li>
              <li>Allocation failure possible</li>
              <li>Requires compaction</li>
            </ul>
          </div>
        </div>

        <div className="detail-card">
          <h3>Linked Allocation</h3>
          <div className="pros">
            <h4>Pros</h4>
            <ul>
              <li>No external fragmentation</li>
              <li>Easy file growth</li>
              <li>Full disk utilization</li>
              <li>No compaction needed</li>
            </ul>
          </div>
          <div className="cons">
            <h4>Cons</h4>
            <ul>
              <li>Slow direct access</li>
              <li>Pointer overhead</li>
              <li>Lost pointers corruption</li>
              <li>No efficient random access</li>
            </ul>
          </div>
        </div>

        <div className="detail-card">
          <h3>Indexed Allocation</h3>
          <div className="pros">
            <h4>Pros</h4>
            <ul>
              <li>Good direct access</li>
              <li>No external fragmentation</li>
              <li>Efficient file access</li>
              <li>Easy file growth</li>
            </ul>
          </div>
          <div className="cons">
            <h4>Cons</h4>
            <ul>
              <li>Index block overhead</li>
              <li>Index size limitation</li>
              <li>More complex</li>
              <li>Space wasted if small file</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;
