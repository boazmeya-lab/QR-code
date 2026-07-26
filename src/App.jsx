import React, { useState, useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { TEMPLATES } from './data/templates';
import ModelGrid from './components/ModelGrid';
import FrameSelector from './components/FrameSelector';

const qrCode = new QRCodeStyling({
  width: 240,
  height: 240,
  type: 'canvas',
});

export default function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
  const [qrText, setQrText] = useState(TEMPLATES[0].data);
  const [selectedFrame, setSelectedFrame] = useState('simple-badge');
  const [frameText, setFrameText] = useState('SCAN ME !');
  const [fileInfo, setFileInfo] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = '';
      qrCode.append(ref.current);
    }
  }, []);

  useEffect(() => {
    if (!selectedTemplate) return;

    qrCode.update({
      data: qrText || 'https://exemple.com',
      image: selectedTemplate.image || undefined,
      dotsOptions: selectedTemplate.dotsOptions,
      backgroundOptions: selectedTemplate.backgroundOptions,
      cornersSquareOptions: selectedTemplate.cornersSquareOptions,
      cornersDotOptions: selectedTemplate.cornersDotOptions,
      imageOptions: selectedTemplate.imageOptions,
    });
  }, [selectedTemplate, qrText]);

  const handleSelectTemplate = (tmpl) => {
    setSelectedTemplate(tmpl);
    setQrText(tmpl.data);
    setFileInfo('');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setQrText(fileUrl);
      setFileInfo(`Fichier : ${file.name}`);
    }
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
          Créez, personnalisez et encadrez vos QR codes.
        </p>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Zone d'affichage avec cadre dynamique */}
          <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-slate-100">
            
            {/* Rendu du cadre autour du QR Code */}
            <div className="relative flex flex-col items-center justify-center p-4">
              
              {/* Style 1 : Badge supérieur */}
              {selectedFrame === 'simple-badge' && (
                <div className="bg-slate-900 text-white font-bold text-xs uppercase px-4 py-1.5 rounded-t-xl tracking-wider shadow-sm z-10 -mb-2">
                  {frameText}
                </div>
              )}

              {/* Style 2 : Viseur (coins) */}
              {selectedFrame === 'corners' && (
                <>
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-slate-900 rounded-tl-lg" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-slate-900 rounded-tr-lg" />
                  <div className="absolute bottom-6 left-0 w-6 h-6 border-b-4 border-l-4 border-slate-900 rounded-bl-lg" />
                  <div className="absolute bottom-6 right-0 w-6 h-6 border-b-4 border-r-4 border-slate-900 rounded-br-lg" />
                </>
              )}

              {/* Conteneur principal du QR Code */}
              <div
                className={`p-4 bg-white rounded-2xl transition-all ${
                  selectedFrame === 'simple-badge'
                    ? 'border-4 border-slate-900 shadow-md'
                    : selectedFrame === 'classic-card'
                    ? 'border-2 border-slate-300 shadow-lg'
                    : ''
                }`}
              >
                <div ref={ref} />
              </div>

              {/* Style 3 : Texte sous la carte */}
              {selectedFrame === 'classic-card' && (
                <p className="mt-3 font-semibold text-sm text-slate-800 tracking-wide">
                  {frameText}
                </p>
              )}

              {/* Texte sous le viseur */}
              {selectedFrame === 'corners' && (
                <p className="mt-3 font-bold text-xs text-slate-900 uppercase tracking-widest">
                  {frameText}
                </p>
              )}
            </div>

            <button
              onClick={handleDownload}
              className="mt-6 w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition shadow-sm cursor-pointer"
            >
              Télécharger le QR Code
            </button>
          </div>

          {/* Formulaire de configuration */}
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
                Lien ou Texte
              </label>
              <input
                type="text"
                value={qrText}
                onChange={(e) => {
                  setQrText(e.target.value);
                  setFileInfo('');
                }}
                placeholder="https://votre-lien.com"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                📁 Importer Photo / Vidéo
              </label>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
              {fileInfo && <p className="text-xs text-green-600 mt-1 font-medium">{fileInfo}</p>}
            </div>

            {/* Sélecteur de cadre */}
            <FrameSelector
              selectedFrame={selectedFrame}
              onSelectFrame={setSelectedFrame}
              frameText={frameText}
              setFrameText={setFrameText}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <ModelGrid onSelect={handleSelectTemplate} />
        </div>
      </main>
    </div>
  );
}
