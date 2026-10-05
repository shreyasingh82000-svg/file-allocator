import React, { useState } from 'react';
import { ArrowRight, Info } from 'lucide-react';
import './HomePage.css';

const HomePage = ({ onStart }) => {
  const [activeTab, setActiveTab] = useState(0);

  const teamMembers = [
    { name: 'Shreya Sanjay Singh Chauhan', prn: '240105231010' },
    { name: 'Pranav Bansode', prn: '240105231033' },
    { name: 'Yash mali', prn: '240105231003' },
    { name: 'Nidhi sugandhi', prn: '240105231026' }
  ];

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="project-title">FILE ALLOCATION METHODS</h1>
          <h2 className="project-subtitle">Interactive Operating System Simulator</h2>
          <p className="project-tag">Operating Systems Project</p>
          
          <p className="project-description">
            An interactive simulator that demonstrates how an Operating System allocates disk space using Contiguous, Linked and Indexed File Allocation methods.
          </p>

          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={onStart}>
              <span>START SIMULATION</span>
              <ArrowRight size={20} />
            </button>
            <button className="btn btn-secondary" onClick={() => window.location.href = '#about'}>
              <Info size={20} />
              <span>ABOUT PROJECT</span>
            </button>
          </div>
        </div>
      </div>

      <div className="team-section">
        <h3>TEAM MEMBERS</h3>
        <div className="team-tabs">
          <div className="tab-buttons">
            {teamMembers.map((member, index) => (
              <button
                key={index}
                className={`tab-btn ${activeTab === index ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                {member.name.split(' ')[0]}
              </button>
            ))}
          </div>
          <div className="tab-content">
            <div className="team-member-card">
              <h4>{teamMembers[activeTab].name}</h4>
              <p className="prn-label">PRN: <strong>{teamMembers[activeTab].prn}</strong></p>
            </div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h3>What You Can Do</h3>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h4>Create Files</h4>
            <p>Create files using different allocation methods</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h4>Real Algorithms</h4>
            <p>Watch actual allocation algorithms in action</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h4>File Access</h4>
            <p>Simulate accessing files and understand lookup</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📉</div>
            <h4>Fragmentation</h4>
            <p>Analyze disk fragmentation and free space</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚖️</div>
            <h4>Comparison</h4>
            <p>Compare all three allocation methods</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h4>Learn & Test</h4>
            <p>Interactive learning, quiz, and viva questions</p>
          </div>
        </div>
      </div>

      <div className="methods-section">
        <h3>Allocation Methods Demonstrated</h3>
        <div className="methods-grid">
          <div className="method-card contiguous">
            <h4>Contiguous Allocation</h4>
            <p>All blocks of a file are stored consecutively on disk</p>
            <ul>
              <li>✓ Fast direct access</li>
              <li>✓ Simple implementation</li>
              <li>✗ External fragmentation</li>
              <li>✗ Difficult file growth</li>
            </ul>
          </div>
          <div className="method-card linked">
            <h4>Linked Allocation</h4>
            <p>File blocks are scattered with pointers linking them</p>
            <ul>
              <li>✓ No external fragmentation</li>
              <li>✓ Easy file growth</li>
              <li>✗ Pointer overhead</li>
              <li>✗ Slow direct access</li>
            </ul>
          </div>
          <div className="method-card indexed">
            <h4>Indexed Allocation</h4>
            <p>An index block stores all data block addresses</p>
            <ul>
              <li>✓ Good direct access</li>
              <li>✓ No external fragmentation</li>
              <li>✗ Index block overhead</li>
              <li>✗ Index size limitation</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h3>Ready to explore?</h3>
        <p>Start the interactive simulator to see how Operating Systems manage disk space</p>
        <button className="btn btn-large" onClick={onStart}>
          ENTER SIMULATOR
        </button>
      </div>
    </div>
  );
};

export default HomePage;
