import React, { useState, useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { TEMPLATES } from './data/templates';
import ModelGrid from './components/ModelGrid';

// Initialisation de la bibliothèque QR Code
const qrCode = new QRCodeStyling({
  width: 260,
  height: 260,
  type: 'svg',
});

export default function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
  const [qrText, setQrText] = useState(TEMPLATES[0].data);
  const ref = useRef(null);

  // Attacher le canvas / SVG du QR Code au DOM au montage
  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = '';
      qrCode.append(ref.current);
    }
  }, []);

  // Mettre à jour le QR Code à chaque changement de modèle ou d'URL
  useEffect(() => {
    if (!selectedTemplate) return;

    qrCode.update({
      data: qrText || 'https://exemple.com',
      image: selectedTemplate.image,
      dotsOptions: selectedTemplate.dotsOptions,
      backgroundOptions: selectedTemplate.backgroundOptions,
      cornersSquareOptions: selectedTemplate.cornersSquareOptions,
      cornersDotOptions: selectedTemplate.cornersDotOptions,
      imageOptions: selectedTemplate.imageOptions,
    });
  }, [selectedTemplate, qrText]);

  // Quand l'utilisateur clique sur une carte de la grille
  const handleSelectTemplate = (tmpl) => {
    setSelectedTemplate(tmpl);
    setQrText(tmpl.data);
  };

  const handleDownload = () => {
    qrCode.download({ extension: 'png', name: 'qr-code' });
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 text-slate-800">
      <header className="max-w-4xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Générateur de QR Code Pro
        </h1>
        <p className="text-slate-500 mt-2">
          Sélectionnez un style, entrez votre lien et téléchargez votre QR code.
        </p>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">
        {/* Section principale : Aperçu + Formulaire */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Bloc d'affichage du QR Code */}
          <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-slate-100">
            <div ref={ref} className="p-2 bg-white rounded-lg shadow-sm" />
            <button
              onClick={handleDownload}
              className="mt-6 w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition shadow-sm"
            >
              Télécharger le QR Code
            </button>
          </div>

          {/* Formulaire pour modifier le lien */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Modèle actif
              </label>
              <div className="p-3 bg-blue-50 text-blue-800 rounded-lg font-medium border border-blue-100">
                {selectedTemplate?.title}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Lien ou Texte du QR Code
              </label>
              <input
                type="text"
                value={qrText}
                onChange={(e) => setQrText(e.target.value)}
                placeholder="https://votre-lien.com"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Grille des 12 modèles */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <ModelGrid onSelect={handleSelectTemplate} />
        </div>
      </main>
    </div>
  );
}
