import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'simulator', label: 'Simulator' },
    { id: 'comparison', label: 'Comparison' },
    { id: 'access', label: 'File Access' },
    { id: 'fragmentation', label: 'Fragmentation' },
    { id: 'learning', label: 'Learning' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'viva', label: 'Viva' },
    { id: 'about', label: 'About' }
  ];

  const handleNavigate = (id) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>File Allocator</h1>
          <p className="navbar-subtitle">OS Simulator</p>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-menu-desktop">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`navbar-link ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => handleNavigate(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button className="navbar-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="navbar-menu-mobile">
            {menuItems.map(item => (
              <button
                key={item.id}
                className={`navbar-link-mobile ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => handleNavigate(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
