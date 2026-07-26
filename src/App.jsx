import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import * as htmlToImage from 'html-to-image';
import { TEMPLATES } from './data/templates';
import FrameSelector from './components/FrameSelector';

export default function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
  const [qrText, setQrText] = useState('https://exemple.com');
  const [selectedFrame, setSelectedFrame] = useState('simple-badge');
  const [frameText, setFrameText] = useState('SCAN ME !');
  const [customLogo, setCustomLogo] = useState(null);

  const cardRef = useRef(null);

  const handleCustomLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setCustomLogo(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const dataUrl = await htmlToImage.toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 3,
        backgroundColor: '#ffffff'
      });

      const link = document.createElement('a');
      link.download = `qrcode-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Erreur téléchargement :', err);
    }
  };

  // Définition de la couleur du QR code selon le modèle
  const fgColor = selectedTemplate.dotsOptions?.color || '#000000';
  const bgColor = selectedTemplate.backgroundOptions?.color || '#ffffff';

  // Composant QR Code réutilisable
  const renderQRCode = () => (
    <QRCodeSVG
      value={qrText || 'https://exemple.com'}
      size={180}
      fgColor={fgColor}
      bgColor={bgColor}
      level="H"
      imageSettings={
        customLogo
          ? {
              src: customLogo,
              x: undefined,
              y: undefined,
              height: 36,
              width: 36,
              excavate: true,
            }
          : undefined
      }
    />
  );

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 text-slate-800">
      <header className="max-w-4xl mx-auto mb-6 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900">Générateur de QR Code Pro</h1>
        <p className="text-slate-500 mt-1">Personnalisez votre QR code et choisissez son encadrement.</p>
      </header>

      <main className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Zone d'aperçu dynamique du cadre */}
          <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-slate-100 min-h-[350px]">
            <div ref={cardRef} className="bg-white p-6 rounded-xl flex items-center justify-center">
              
              {/* STYLE 1: BANNIÈRE À GAUCHE */}
              {selectedFrame === 'banner-left' && (
                <div className="flex items-center border-4 border-slate-900 rounded-2xl overflow-hidden bg-slate-900 p-1">
                  <div className="px-5 py-4 text-white font-black text-lg tracking-wider uppercase text-center max-w-[130px] leading-tight">
                    {frameText}
                  </div>
                  <div className="bg-white p-3 rounded-xl">
                    {renderQRCode()}
                  </div>
                </div>
              )}

              {/* STYLE 2: BULLE / ONGLET À DROITE */}
              {selectedFrame === 'speech-right' && (
                <div className="flex items-center gap-3">
                  <div className="border-4 border-slate-900 p-3 rounded-2xl bg-white shadow-sm">
                    {renderQRCode()}
                  </div>
                  <div className="relative bg-slate-900 text-white font-black text-sm px-4 py-3 rounded-xl tracking-wide uppercase leading-tight max-w-[120px] text-center">
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-y-8 border-y-transparent border-r-8 border-r-slate-900" />
                    {frameText}
                  </div>
                </div>
              )}

              {/* STYLE 3: BLOC BAS (SCAN HERE) */}
              {selectedFrame === 'bottom-card' && (
                <div className="border-4 border-slate-900 rounded-2xl bg-slate-900 overflow-hidden flex flex-col items-center">
                  <div className="bg-white p-4 w-full flex justify-center">
                    {renderQRCode()}
                  </div>
                  <div className="py-3 px-6 text-white font-black text-lg tracking-widest uppercase text-center">
                    {frameText}
                  </div>
                </div>
              )}

              {/* STYLE 4: BADGE SUPÉRIEUR */}
              {selectedFrame === 'simple-badge' && (
                <div className="relative flex flex-col items-center">
                  <div className="bg-slate-900 text-white font-extrabold text-xs uppercase px-5 py-1.5 rounded-t-xl tracking-widest shadow-sm z-10 -mb-2">
                    {frameText}
                  </div>
                  <div className="p-4 bg-white rounded-2xl border-4 border-slate-900 shadow-md">
                    {renderQRCode()}
                  </div>
                </div>
              )}

              {/* STYLE 5: VISEUR / COINS */}
              {selectedFrame === 'corners' && (
                <div className="relative p-6 flex flex-col items-center">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-slate-900 rounded-tl-xl" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-slate-900 rounded-tr-xl" />
                  <div className="absolute bottom-8 left-0 w-8 h-8 border-b-4 border-l-4 border-slate-900 rounded-bl-xl" />
                  <div className="absolute bottom-8 right-0 w-8 h-8 border-b-4 border-r-4 border-slate-900 rounded-br-xl" />
                  {renderQRCode()}
                  <p className="mt-4 font-black text-xs text-slate-900 uppercase tracking-widest">{frameText}</p>
                </div>
              )}

              {/* SANS CADRE */}
              {selectedFrame === 'none' && renderQRCode()}

            </div>

            <button
              onClick={handleDownload}
              className="mt-6 w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition shadow-sm cursor-pointer text-center"
            >
              📲 Enregistrer la photo
            </button>
          </div>

          {/* Formulaire de configuration */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Lien ou Texte du QR Code</label>
              <input
                type="text"
                value={qrText}
                onChange={(e) => setQrText(e.target.value)}
                placeholder="https://votre-lien.com"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                🖼️ Importer un logo central
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleCustomLogoUpload}
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
              />
              {customLogo && (
                <button
                  onClick={() => setCustomLogo(null)}
                  className="mt-1 text-xs text-red-500 hover:underline"
                >
                  Supprimer le logo
                </button>
              )}
            </div>

            <FrameSelector
              selectedFrame={selectedFrame}
              onSelectFrame={setSelectedFrame}
              frameText={frameText}
              setFrameText={setFrameText}
            />
          </div>
        </div>

        {/* Galerie des couleurs / styles */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-4">🎨 Couleurs & Thèmes</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => setSelectedTemplate(tmpl)}
                className={`p-3 text-sm font-medium rounded-xl border text-left transition flex items-center justify-between ${
                  selectedTemplate.id === tmpl.id
                    ? 'bg-blue-50 border-blue-600 text-blue-900 ring-2 ring-blue-500/20'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span>{tmpl.title}</span>
                {selectedTemplate.id === tmpl.id && <span className="text-blue-600 text-xs font-bold">✓</span>}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
