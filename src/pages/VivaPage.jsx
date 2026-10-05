import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './VivaPage.css';

const VivaPage = () => {
  const [expandedId, setExpandedId] = useState(0);

  const vivaQuestions = [
    {
      q: 'What is file allocation?',
      a: 'File allocation is the process of assigning disk blocks to files. It determines where file data will be stored and how the OS will track these blocks.'
    },
    {
      q: 'Why is file allocation required?',
      a: 'File allocation is required to: (1) efficiently use disk space, (2) quickly locate files, (3) support file growth, (4) minimize wasted space, and (5) prevent file conflicts.'
    },
    {
      q: 'Explain contiguous allocation with an example.',
      a: 'Contiguous allocation stores all file blocks consecutively. Example: A 5-block file occupies blocks 10, 11, 12, 13, 14. Fast access but suffers from external fragmentation.'
    },
    {
      q: 'What is external fragmentation?',
      a: 'External fragmentation occurs when free disk space is divided into many small regions due to file deletion patterns. There may be enough total free space, but no single large enough contiguous region.'
    },
    {
      q: 'Why does contiguous allocation suffer from external fragmentation?',
      a: 'Contiguous allocation requires consecutive blocks. When files are deleted, it leaves gaps. These gaps may be too small for new file allocation, even though total free space is sufficient.'
    },
    {
      q: 'Explain linked allocation.',
      a: 'Linked allocation stores file blocks scattered anywhere on disk, with each block containing a pointer to the next block. Example: Block 3 → 7 → 19 → 5 → NULL. No external fragmentation occurs.'
    },
    {
      q: 'What is pointer overhead in linked allocation?',
      a: 'Pointer overhead refers to the extra space needed in each block to store the pointer to the next block. This reduces the actual data space in each block, slightly decreasing disk utilization.'
    },
    {
      q: 'Explain indexed allocation.',
      a: 'Indexed allocation uses a special index block that stores addresses of all data blocks. The file\'s data blocks can be anywhere on disk. The index block provides the mapping from logical to physical blocks.'
    },
    {
      q: 'What is an index block?',
      a: 'An index block is a special disk block that stores the disk addresses of all data blocks belonging to a file. One file needs one index block, regardless of file size (in single-level indexing).'
    },
    {
      q: 'Which allocation method supports direct access efficiently?',
      a: 'Contiguous and Indexed allocations support direct access efficiently. Linked allocation does not because it requires pointer traversal to reach any block.'
    },
    {
      q: 'What happens when a file is deleted?',
      a: 'When a file is deleted, the OS removes the file entry from the directory and marks all its blocks as free. These blocks become available for new file allocation.'
    },
    {
      q: 'How does linked allocation locate a file block?',
      a: 'Linked allocation starts from the first block and traverses the pointer chain. To access block N, it must follow N pointers, which is time-consuming for large N values.'
    },
    {
      q: 'How does indexed allocation locate a file block?',
      a: 'Indexed allocation directly accesses the index block and reads the address at the desired index position, then directly accesses the data block. This is very fast.'
    },
    {
      q: 'What is the difference between logical and physical blocks?',
      a: 'Logical blocks are file-specific (0, 1, 2...). Physical blocks are disk-specific absolute addresses. The allocation method defines the mapping between them.'
    },
    {
      q: 'Compare all three allocation methods.',
      a: 'Contiguous: Fast direct access but external fragmentation. Linked: No fragmentation but slow access, pointer overhead. Indexed: Good direct access, no fragmentation but index overhead.'
    }
  ];

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? -1 : id);
  };

  return (
    <div className="viva-page">
      <div className="viva-header">
        <h1>Viva Questions</h1>
        <p>Important questions and answers for understanding file allocation methods</p>
      </div>

      <div className="viva-container">
        {vivaQuestions.map((item, index) => (
          <div key={index} className="viva-card">
            <button
              className="viva-question"
              onClick={() => toggleExpand(index)}
            >
              <div className="question-number">Q{index + 1}</div>
              <h3>{item.q}</h3>
              <span className="expand-icon">
                {expandedId === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </span>
            </button>
            {expandedId === index && (
              <div className="viva-answer">
                <h4>Answer</h4>
                <p>{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="viva-tips">
        <h2>Tips for Viva Preparation</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <h3>Understand Concepts</h3>
            <p>Focus on understanding the core concepts rather than memorization.</p>
          </div>
          <div className="tip-card">
            <h3>Compare Methods</h3>
            <p>Be able to compare and contrast the three allocation methods.</p>
          </div>
          <div className="tip-card">
            <h3>Practical Examples</h3>
            <p>Use examples from the simulator to explain concepts.</p>
          </div>
          <div className="tip-card">
            <h3>Fragmentation Analysis</h3>
            <p>Understand fragmentation and its impact on each method.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VivaPage;
