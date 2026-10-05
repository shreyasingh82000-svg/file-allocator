import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './LearningPage.css';

const LearningPage = () => {
  const [expandedId, setExpandedId] = useState(0);

  const learningContent = [
    {
      title: 'What is File Allocation?',
      content: 'File allocation is the process by which an Operating System decides how to store file data on a physical disk. The OS must keep track of which disk blocks belong to which files, and in what order.'
    },
    {
      title: 'Why does an Operating System need file allocation?',
      content: 'The OS needs file allocation to: (1) Efficiently use disk space, (2) Quickly locate files and their data, (3) Support file growth and deletion, (4) Minimize fragmentation, (5) Provide reliable file storage.'
    },
    {
      title: 'What is a disk block?',
      content: 'A disk block is the smallest addressable unit of storage on a disk. When a file is created, the OS allocates one or more blocks to store the file\'s data. The block size is typically 4KB or larger.'
    },
    {
      title: 'What is Contiguous Allocation?',
      content: 'Contiguous allocation stores all blocks of a file in consecutive locations on the disk. Example: A 5-block file might occupy blocks 10, 11, 12, 13, 14. This allows fast sequential and direct access.'
    },
    {
      title: 'What is Linked Allocation?',
      content: 'Linked allocation stores file blocks scattered anywhere on the disk, with each block containing a pointer to the next block. Example: Block 3 → Block 7 → Block 19 → Block 5 → NULL. No external fragmentation occurs.'
    },
    {
      title: 'What is Indexed Allocation?',
      content: 'Indexed allocation uses a special index block that stores the addresses of all data blocks for a file. The file\'s data blocks can be anywhere on disk, and the index block provides the mapping.'
    },
    {
      title: 'What is Fragmentation?',
      content: 'Fragmentation occurs when free disk space is divided into many small regions rather than one large region. External fragmentation affects Contiguous allocation - there may be enough total free space, but no single contiguous region large enough.'
    },
    {
      title: 'What is External Fragmentation?',
      content: 'External fragmentation is the phenomenon where free disk space becomes scattered into many small regions due to file deletion and allocation patterns. It prevents new file allocation even though total free space exists.'
    },
    {
      title: 'What is Sequential Access?',
      content: 'Sequential access means reading or writing a file from the beginning to the end, block by block in order. All three allocation methods support sequential access, but with different performance characteristics.'
    },
    {
      title: 'What is Direct Access?',
      content: 'Direct access (random access) means accessing any block of a file directly without reading previous blocks. Contiguous and Indexed allocations support this efficiently, while Linked allocation requires pointer traversal.'
    },
    {
      title: 'What is an Index Block?',
      content: 'An index block is a special disk block used in indexed allocation that stores the addresses (block numbers) of all data blocks belonging to a file. One file needs one index block regardless of file size (unless multi-level indexing is used).'
    },
    {
      title: 'What is a Pointer?',
      content: 'A pointer is a reference to another disk block\'s address. In linked allocation, each block stores a pointer to the next block in the file. Pointers allow dynamic file structure and eliminate external fragmentation.'
    }
  ];

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? -1 : id);
  };

  return (
    <div className="learning-page">
      <div className="learning-header">
        <h1>Learning Center</h1>
        <p>Understand file allocation concepts and terminology</p>
      </div>

      <div className="concepts-container">
        {learningContent.map((concept, index) => (
          <div key={index} className="concept-card">
            <button
              className="concept-header"
              onClick={() => toggleExpand(index)}
            >
              <h3>{concept.title}</h3>
              <span className="expand-icon">
                {expandedId === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </span>
            </button>
            {expandedId === index && (
              <div className="concept-content">
                <p>{concept.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="summary-section">
        <h2>Quick Summary</h2>
        <div className="summary-grid">
          <div className="summary-card">
            <h3>Contiguous</h3>
            <p><strong>Pros:</strong> Fast, simple</p>
            <p><strong>Cons:</strong> Fragmentation</p>
          </div>
          <div className="summary-card">
            <h3>Linked</h3>
            <p><strong>Pros:</strong> No fragmentation</p>
            <p><strong>Cons:</strong> Slow access</p>
          </div>
          <div className="summary-card">
            <h3>Indexed</h3>
            <p><strong>Pros:</strong> Fast + No fragmentation</p>
            <p><strong>Cons:</strong> Index overhead</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPage;
