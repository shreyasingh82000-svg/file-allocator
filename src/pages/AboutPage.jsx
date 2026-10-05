import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  const teamMembers = [
    { name: 'Shreya Sanjay Singh Chauhan', prn: '240105231010' },
    { name: 'Pranav Bansode', prn: '240105231033' },
    { name: 'Yash mali', prn: '240105231003' },
    { name: 'Nidhi sugandhi', prn: '240105231026' }
  ];

  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>File Allocation Methods</h1>
        <h2>Interactive Operating System Simulator</h2>
        <p className="tagline">Operating Systems Project</p>
      </div>

      <div className="about-sections">
        <section className="about-section">
          <h3>Project Title</h3>
          <p>
            <strong>File Allocation Methods – Interactive Operating System Simulator</strong>
          </p>
        </section>

        <section className="about-section">
          <h3>Subject</h3>
          <p>Operating Systems</p>
        </section>

        <section className="about-section">
          <h3>Project Purpose</h3>
          <p>
            This application was developed to provide an interactive understanding of how Operating Systems allocate and manage disk space. Rather than passive learning through presentations or textbooks, students can actively create files, allocate blocks, and observe the algorithms in real-time.
          </p>
        </section>

        <section className="about-section">
          <h3>Methods Demonstrated</h3>
          <ul className="methods-list">
            <li><strong>Contiguous Allocation:</strong> All file blocks stored consecutively</li>
            <li><strong>Linked Allocation:</strong> File blocks scattered with pointer chain</li>
            <li><strong>Indexed Allocation:</strong> Index block stores all data block addresses</li>
          </ul>
        </section>

        <section className="about-section">
          <h3>Key Features</h3>
          <div className="features-list">
            <div className="feature-item">✓ Interactive disk simulation</div>
            <div className="feature-item">✓ User-defined disk size</div>
            <div className="feature-item">✓ Real allocation algorithms</div>
            <div className="feature-item">✓ File creation and deletion</div>
            <div className="feature-item">✓ File access simulation</div>
            <div className="feature-item">✓ Fragmentation analysis</div>
            <div className="feature-item">✓ Method comparison</div>
            <div className="feature-item">✓ Educational content</div>
            <div className="feature-item">✓ Interactive quiz</div>
            <div className="feature-item">✓ Viva questions</div>
            <div className="feature-item">✓ Responsive design</div>
            <div className="feature-item">✓ LocalStorage persistence</div>
          </div>
        </section>

        <section className="about-section">
          <h3>Technology Stack</h3>
          <div className="tech-stack">
            <div className="tech-item">
              <strong>Frontend:</strong>
              <p>React, JavaScript/TypeScript, HTML5, CSS3</p>
            </div>
            <div className="tech-item">
              <strong>Build Tool:</strong>
              <p>Vite</p>
            </div>
            <div className="tech-item">
              <strong>Storage:</strong>
              <p>Browser LocalStorage</p>
            </div>
            <div className="tech-item">
              <strong>Architecture:</strong>
              <p>Component-based, Context API for state management</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h3>Hardware Requirements</h3>
          <p>
            <strong>Only a laptop/computer with a web browser is required.</strong> No external hardware, servers, microcontrollers, or laboratory equipment needed.
          </p>
          <p>The entire simulation runs locally in your browser.</p>
        </section>

        <section className="about-section">
          <h3>Getting Started</h3>
          <div className="getting-started">
            <div className="step">
              <strong>Step 1:</strong> Navigate to the Simulator
            </div>
            <div className="step">
              <strong>Step 2:</strong> Create files with different allocation methods
            </div>
            <div className="step">
              <strong>Step 3:</strong> Observe OS operations in real-time
            </div>
            <div className="step">
              <strong>Step 4:</strong> Analyze fragmentation and performance
            </div>
            <div className="step">
              <strong>Step 5:</strong> Learn and test your knowledge
            </div>
          </div>
        </section>

        <section className="about-section full-width">
          <h3>Project Team</h3>
          <div className="team-section">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member">
                <h4>{member.name}</h4>
                <p>PRN: {member.prn}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-section">
          <h3>Learning Outcomes</h3>
          <p>After using this simulator, you should understand:</p>
          <ul className="learning-outcomes">
            <li>How operating systems manage disk space</li>
            <li>The advantages and disadvantages of each allocation method</li>
            <li>How fragmentation affects system performance</li>
            <li>The difference between logical and physical block addressing</li>
            <li>Sequential vs. direct file access performance</li>
            <li>Real-world trade-offs in system design</li>
          </ul>
        </section>

        <section className="about-section">
          <h3>Application Structure</h3>
          <div className="structure-info">
            <p><strong>Pages:</strong></p>
            <ul>
              <li>Home - Project overview and team information</li>
              <li>Dashboard - Real-time statistics and disk visualization</li>
              <li>Simulator - Main interactive file allocation interface</li>
              <li>Comparison - Detailed comparison of three methods</li>
              <li>File Access - Simulate block access and traversal</li>
              <li>Fragmentation - Analyze disk fragmentation</li>
              <li>Learning - Concepts and terminology</li>
              <li>Quiz - Test your knowledge</li>
              <li>Viva - Important questions and answers</li>
              <li>About - This page</li>
            </ul>
          </div>
        </section>
      </div>

      <div className="about-footer">
        <p>
          Thank you for using the File Allocation Methods Interactive Simulator.
        </p>
        <p className="footer-note">
          This project demonstrates that complex operating system concepts can be made interactive and accessible through web-based simulation.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
