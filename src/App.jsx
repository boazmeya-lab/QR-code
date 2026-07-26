import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import TemplatesGallery from './components/TemplatesGallery';
import QRCodeGenerator from './components/QRCodeGenerator'; // Ou le nom de ton composant éditeur

export default function App() {
  // Navigation: 'home' | 'gallery' | 'editor'
  const [currentView, setCurrentView] = useState('home');
  
  // Modèle sélectionné (s'il y en a un)
  const [selectedPreset, setSelectedPreset] = useState(null);

  // Aller vers l'éditeur personnalisé à zéro
  const handleStartCustom = () => {
    setSelectedPreset(null);
    setCurrentView('editor');
  };

  // Ouvrir la galerie de modèles
  const handleOpenGallery = () => {
    setCurrentView('gallery');
  };

  // Choisir un modèle dans la galerie
  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset);
    setCurrentView('editor');
  };

  // Retour à l'accueil
  const handleBackToHome = () => {
    setCurrentView('home');
  };

  return (
    <div>
      {currentView === 'home' && (
        <LandingPage
          onStartCustom={handleStartCustom}
          onOpenGallery={handleOpenGallery}
        />
      )}

      {currentView === 'gallery' && (
        <TemplatesGallery
          onSelectPreset={handleSelectPreset}
          onBack={handleBackToHome}
        />
      )}

      {currentView === 'editor' && (
        <QRCodeGenerator
          initialPreset={selectedPreset}
          onBack={handleBackToHome}
        />
      )}
    </div>
  );
}
