import React, { useState, useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import * as htmlToImage from 'html-to-image';
import { TEMPLATES } from './data/templates';
import FrameSelector from './components/FrameSelector';

export default function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
  const [qrText, setQrText] = useState('https://exemple.com');
  const [selectedFrame, setSelectedFrame] = useState('simple-badge');
  const [frameText, setFrameText] = useState('SCAN ME !');
  const [customLogo, setCustomLogo] = useState(null);

  const qrRef = useRef(null);
  const cardRef = useRef(null);
  const qrCodeInstance = useRef(null);

  // Initialisation unique du générateur
  useEffect(() => {
    qrCodeInstance.current = new QRCodeStyling({
      width: 220,
      height: 220,
      type: 'svg', // SVG garantit la compatibilité et le rendu instantané sur iOS
      qrOptions: {
        errorCorrectionLevel: 'H' // Évite d'endommager la lisibilité du QR code
      }
    });

    if (qrRef.current) {
      qrRef.current.innerHTML = '';
      qrCodeInstance.current.append(qrRef.current);
    }
  }, []);

  // Mise à jour dynamique des styles
  useEffect(() => {
    if (!qrCodeInstance.current) return;

    qrCodeInstance.current.update({
      data: qrText || 'https://exemple.com',
      image: customLogo || undefined,
      dotsOptions: selectedTemplate.dotsOptions,
      backgroundOptions: selectedTemplate.backgroundOptions,
      cornersSquareOptions: selectedTemplate.cornersSquareOptions,
      cornersDotOptions: selectedTemplate.cornersDotOptions,
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 4,
        imageSize: 0.25
      }
    });
  }, [selectedTemplate, qrText, customLogo]);

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
        backgroundColor: '#f8fafc'
      });

      const link = document.createElement('a');
      link.download = `qrcode-design.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Erreur lors du téléchargement :', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 text-slate-800">
      <header className="max-w-4xl mx-auto mb-6 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900">Générateur de QR Code Pro</h1>
        <p className="text-slate-500 mt-1">Choisissez un style, personnalisez le texte et téléchargez votre photo.</p>
      </header>

      <main className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Aperçu du rendu avec encadrement */}
          <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-slate-100">
            <div ref={cardRef} className="bg-slate-50 p-6 rounded-xl flex flex-col items-center justify-center">
              <div className="relative flex flex-col items-center justify-center">
                
                {/* Style Badge */}
                {selectedFrame === 'simple-badge' && (
                  <div className="bg-slate-900 text-white font-bold text-xs uppercase px-4 py-1.5 rounded-t-xl tracking-wider shadow-sm z-10 -mb-2">
                    {frameText}
                  </div>
                )}

                {/* Style Viseur */}
                {selectedFrame === 'corners' && (
                  <>
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-slate-900 rounded-tl-lg" />
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-slate-900 rounded-tr-lg" />
                    <div className="absolute bottom-6 left-0 w-6 h-6 border-b-4 border-l-4 border-slate-900 rounded-bl-lg" />
                    <div className="absolute bottom-6 right-0 w-6 h-6 border-b-4 border-r-4 border-slate-900 rounded-br-lg" />
                  </>
                )}

                {/* Conteneur principal */}
                <div
                  className={`p-4 rounded-2xl transition-all ${
                    selectedFrame === 'simple-badge'
                      ? 'border-4 border-slate-900 shadow-md bg-white'
                      : selectedFrame === 'classic-card'
                      ? 'border-2 border-slate-300 shadow-lg bg-white'
                      : 'bg-white'
                  }`}
                >
                  <div ref={qrRef} className="flex justify-center items-center" />
                </div>

                {/* Texte bas */}
                {selectedFrame === 'classic-card' && (
                  <p className="mt-3 font-semibold text-sm text-slate-800 tracking-wide">{frameText}</p>
                )}

                {selectedFrame === 'corners' && (
                  <p className="mt-3 font-bold text-xs text-slate-900 uppercase tracking-widest">{frameText}</p>
                )}
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="mt-4 w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition shadow-sm cursor-pointer text-center"
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
                🖼️ Importer un logo au centre
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

        {/* Galerie des modèles pré-construits */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-4">🎨 Modèles & Styles de QR Code</h2>
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
