import React, { useState } from 'react';
import { SimulationProvider } from './context/SimulationContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import SimulatorPage from './pages/SimulatorPage';
import ComparisonPage from './pages/ComparisonPage';
import AccessPage from './pages/AccessPage';
import FragmentationPage from './pages/FragmentationPage';
import LearningPage from './pages/LearningPage';
import QuizPage from './pages/QuizPage';
import VivaPage from './pages/VivaPage';
import AboutPage from './pages/AboutPage';
import './App.css';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onStart={() => setCurrentPage('dashboard')} />;
      case 'dashboard':
        return <DashboardPage />;
      case 'simulator':
        return <SimulatorPage />;
      case 'comparison':
        return <ComparisonPage />;
      case 'access':
        return <AccessPage />;
      case 'fragmentation':
        return <FragmentationPage />;
      case 'learning':
        return <LearningPage />;
      case 'quiz':
        return <QuizPage />;
      case 'viva':
        return <VivaPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="app">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}

function App() {
  return (
    <SimulationProvider>
      <AppContent />
    </SimulationProvider>
  );
}

export default App;
