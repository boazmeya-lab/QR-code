import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import * as htmlToImage from 'html-to-image';
import { TEMPLATES } from './data/templates';
import FrameSelector from './components/FrameSelector';
import TemplatesGallery from './components/TemplatesGallery';

export default function App() {
  // Navigation: 'home' | 'gallery' | 'editor'
  const [currentView, setCurrentView] = useState('home');

  // États du générateur
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
  const [customColor, setCustomColor] = useState(null); // Permet de forcer la couleur du modèle choisi
  const [contentType, setContentType] = useState('url'); // 'url', 'wifi', 'email'
  
  const [urlInput, setUrlInput] = useState('https://smartlab.site');
  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [emailInput, setEmailInput] = useState('');

  const [selectedFrame, setSelectedFrame] = useState('simple-badge');
  const [frameText, setFrameText] = useState('SCAN ME !');
  const [customLogo, setCustomLogo] = useState(null);

  const cardRef = useRef(null);

  // Appliquer un modèle choisi dans la galerie (AVEC LA BONNE COULEUR)
  const handleSelectPreset = (preset) => {
    if (preset.frame) setSelectedFrame(preset.frame);
    if (preset.frameText) setFrameText(preset.frameText);
    if (preset.color) setCustomColor(preset.color); // Applique la couleur exacte du modèle !
    setCurrentView('editor');
  };

  // Construction de la donnée QR Code
  const getQrData = () => {
    if (contentType === 'wifi') {
      if (!wifiSsid) return 'WIFI:S:MonReseau;T:WPA;P:motdepasse;;';
      return `WIFI:S:${wifiSsid};T:WPA;P:${wifiPassword};;`;
    }
    if (contentType === 'email') {
      if (!emailInput) return 'mailto:contact@exemple.com';
      return `mailto:${emailInput}`;
    }
    return urlInput || 'https://smartlab.site';
  };

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

  // Priorité à la couleur personnalisée si sélectionnée depuis la galerie
  const fgColor = customColor || selectedTemplate.dotsOptions?.color || '#000000';
  const bgColor = selectedTemplate.backgroundOptions?.color || '#ffffff';

  const renderQRCode = () => (
    <QRCodeSVG
      value={getQrData()}
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

  // 1. ÉCRAN GALERIE
  if (currentView === 'gallery') {
    return (
      <TemplatesGallery
        onSelectPreset={handleSelectPreset}
        onBack={() => setCurrentView('home')}
      />
    );
  }

  // 2. ÉCRAN D'ACCUEIL (LANDING PAGE)
  if (currentView === 'home') {
    const showcaseItems = [
      { type: 'simple-badge', text: 'SCANNE-MOI', color: '#111827', value: 'https://smartlab.site' },
      { type: 'banner-left', text: 'INSTAGRAM', color: '#1D4ED8', value: 'https://instagram.com' },
      { type: 'speech-right', text: 'MENU 🍕', color: '#2563EB', value: 'https://exemple.com/menu' },
      { type: 'bottom-card', text: 'WIFI GRATUIT', color: '#1D4ED8', value: 'WIFI:S:SmartLab;T:WPA;P:12345678;;' },
      { type: 'corners', text: 'PROMO -20%', color: '#111827', value: 'https://exemple.com/promo' }
    ];

    return (
      <div className="min-h-screen bg-[#FFFFFF] text-[#111827] flex flex-col justify-between p-4 md:p-8 w-full max-w-full overflow-x-hidden font-sans">
        <header className="max-w-5xl mx-auto w-full flex justify-between items-center py-3 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 bg-[#1D4ED8] rounded-xl flex items-center justify-center font-black text-lg text-white shadow-md shadow-blue-500/20">
              S
            </div>
            <span className="font-extrabold text-xl tracking-tight text-[#111827]">SmartLab</span>
          </div>
        </header>

        <main className="max-w-3xl mx-auto text-center space-y-6 my-auto py-8 w-full px-2">
          <div className="flex flex-wrap justify-center gap-2">
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-[#2563EB] text-xs font-semibold">
              ⚡ Aperçu en temps réel
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-[#1D4ED8] text-xs font-semibold">
              🎨 +30 styles personnalisables
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight max-w-full break-words text-[#111827]">
            Générez des QR Codes <span className="text-[#2563EB]">professionnels</span> en quelques clics
          </h1>

          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto px-2 break-words leading-relaxed">
            Créez des QR codes encadrés pour vos liens, Wi-Fi et réseaux sociaux. Personnalisez-les vous-même ou choisissez un modèle prêt à l'emploi.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2 px-2">
            <button
              onClick={() => setCurrentView('editor')}
              className="w-full sm:w-auto px-7 py-3.5 bg-[#1D4ED8] hover:bg-[#1e40af] text-white font-bold text-base rounded-2xl shadow-lg shadow-blue-700/20 transition duration-200 active:scale-95 cursor-pointer"
            >
              ✏️ Personnaliser soi-même
            </button>
            <button
              onClick={() => setCurrentView('gallery')}
              className="w-full sm:w-auto px-7 py-3.5 bg-gray-100 hover:bg-gray-200 text-[#111827] border border-gray-300 font-bold text-base rounded-2xl transition duration-200 active:scale-95 cursor-pointer"
            >
              🎨 Voir les modèles
            </button>
          </div>

          <div className="pt-8 w-full max-w-full overflow-hidden">
            <p className="text-[11px] uppercase tracking-widest text-gray-600 font-bold mb-4">
              Aperçu direct parmi nos modèles
            </p>
            <div className="relative w-full overflow-hidden py-3 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-10 before:bg-gradient-to-r before:from-[#FFFFFF] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-10 after:bg-gradient-to-l after:from-[#FFFFFF] after:to-transparent">
              <div className="flex gap-4 animate-marquee w-max">
                {[...showcaseItems, ...showcaseItems].map((item, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 p-4 rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-sm">
                    <div className="bg-white p-3 rounded-xl border border-gray-200 flex flex-col items-center justify-center shadow-inner">
                      {item.type === 'simple-badge' && (
                        <div className="relative flex flex-col items-center">
                          <div className="bg-[#111827] text-white font-extrabold text-[8px] uppercase px-2.5 py-0.5 rounded-t-md tracking-widest z-10 -mb-1">{item.text}</div>
                          <div className="p-1.5 bg-white rounded-lg border-2 border-[#111827]"><QRCodeSVG value={item.value} size={70} fgColor={item.color} /></div>
                        </div>
                      )}
                      {item.type === 'banner-left' && (
                        <div className="flex items-center border-2 border-[#111827] rounded-xl overflow-hidden bg-[#111827] p-0.5">
                          <div className="px-2 py-1 text-white font-black text-[10px] tracking-wider uppercase text-center max-w-[65px] leading-tight">{item.text}</div>
                          <div className="bg-white p-1 rounded-lg"><QRCodeSVG value={item.value} size={65} fgColor={item.color} /></div>
                        </div>
                      )}
                      {item.type === 'speech-right' && (
                        <div className="flex items-center gap-1.5">
                          <div className="border-2 border-[#111827] p-1 rounded-xl bg-white"><QRCodeSVG value={item.value} size={65} fgColor={item.color} /></div>
                          <div className="relative bg-[#111827] text-white font-black text-[9px] px-2 py-1.5 rounded-lg uppercase text-center max-w-[60px]">{item.text}</div>
                        </div>
                      )}
                      {item.type === 'bottom-card' && (
                        <div className="border-2 border-[#111827] rounded-xl bg-[#111827] overflow-hidden flex flex-col items-center">
                          <div className="bg-white p-1.5 w-full flex justify-center"><QRCodeSVG value={item.value} size={65} fgColor={item.color} /></div>
                          <div className="py-0.5 px-2 text-white font-black text-[10px] tracking-widest uppercase text-center">{item.text}</div>
                        </div>
                      )}
                      {item.type === 'corners' && (
                        <div className="relative p-2.5 flex flex-col items-center">
                          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#111827] rounded-tl-sm" />
                          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#111827] rounded-tr-sm" />
                          <div className="absolute bottom-5 left-0 w-3 h-3 border-b-2 border-l-2 border-[#111827] rounded-bl-sm" />
                          <div className="absolute bottom-5 right-0 w-3 h-3 border-b-2 border-r-2 border-[#111827] rounded-br-sm" />
                          <QRCodeSVG value={item.value} size={65} fgColor={item.color} />
                          <p className="mt-1 font-black text-[8px] text-[#111827] uppercase tracking-widest">{item.text}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        <footer className="text-center text-gray-600 text-[11px] sm:text-xs py-3 border-t border-gray-100">
          © 2026 SmartLab — Tous droits réservés.
        </footer>
      </div>
    );
  }

  // 3. ÉCRAN ÉDITEUR / GÉNÉRATEUR
  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 text-slate-800 font-sans">
      <header className="max-w-4xl mx-auto mb-6 flex justify-between items-center">
        <button
          onClick={() => setCurrentView('home')}
          className="text-sm font-semibold text-[#1D4ED8] hover:underline flex items-center gap-1 cursor-pointer"
        >
          ← Retour à l'accueil
        </button>
        <span className="text-xs font-bold bg-blue-100 text-[#1D4ED8] px-3 py-1 rounded-full">
          Éditeur QR Code
        </span>
      </header>

      <main className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Zone Aperçu */}
          <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-slate-100 min-h-[350px]">
            <div ref={cardRef} className="bg-white p-6 rounded-xl flex items-center justify-center">
              
              {/* Carte Rouge Solid */}
              {selectedFrame === 'card-red' && (
                <div className="bg-gradient-to-b from-[#FF0055] to-[#E6004C] p-5 rounded-[32px] flex flex-col items-center justify-center shadow-xl max-w-[240px]">
                  <div className="bg-white p-4 rounded-[24px] shadow-md w-full flex justify-center">
                    {renderQRCode()}
                  </div>
                  <span className="text-white font-black text-lg tracking-wider uppercase mt-3 mb-1 text-center">
                    {frameText}
                  </span>
                </div>
              )}

              {/* Pilule Haute Rose */}
              {selectedFrame === 'pill-top-pink' && (
                <div className="bg-gradient-to-b from-[#E000FF] to-[#A000FF] p-5 rounded-[36px] flex flex-col items-center justify-center shadow-xl max-w-[240px]">
                  <div className="bg-white text-[#E000FF] font-black text-xs px-5 py-1.5 rounded-full shadow-sm mb-3 uppercase tracking-wider">
                    {frameText}
                  </div>
                  <div className="bg-white p-4 rounded-[28px] shadow-md w-full flex justify-center">
                    {renderQRCode()}
                  </div>
                </div>
              )}

              {/* Contour Dégradé Orange/Rouge */}
              {selectedFrame === 'rounded-gradient' && (
                <div className="p-[3px] bg-gradient-to-br from-[#FF3B00] via-[#FF8800] to-[#FF0055] rounded-[36px] shadow-xl max-w-[240px]">
                  <div className="bg-white p-5 rounded-[33px] flex flex-col items-center justify-center">
                    <div className="p-2 w-full flex justify-center">
                      {renderQRCode()}
                    </div>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3B00] to-[#FF8800] font-black text-lg tracking-wider uppercase mt-3 text-center">
                      {frameText}
                    </span>
                  </div>
                </div>
              )}

              {/* Étiquette Bleue */}
              {selectedFrame === 'tag-blue' && (
                <div className="relative bg-white border-b-4 border-x-2 border-[#0052CC] rounded-b-[32px] rounded-t-xl p-5 pt-3 shadow-xl flex flex-col items-center max-w-[240px] overflow-hidden">
                  <div className="w-full bg-gradient-to-r from-[#0052CC] via-[#0266FF] to-[#0052CC] h-2.5 absolute top-0 left-0 right-0" />
                  <span className="text-slate-900 font-extrabold text-sm tracking-wider uppercase mt-2 mb-3 text-center">
                    {frameText}
                  </span>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 w-full flex justify-center shadow-inner">
                    {renderQRCode()}
                  </div>
                </div>
              )}

              {/* Modèles existants */}
              {selectedFrame === 'banner-left' && (
                <div className="flex items-center border-4 border-slate-900 rounded-2xl overflow-hidden bg-slate-900 p-1">
                  <div className="px-5 py-4 text-white font-black text-lg tracking-wider uppercase text-center max-w-[130px] leading-tight">
                    {frameText}
                  </div>
                  <div className="bg-white p-3 rounded-xl">{renderQRCode()}</div>
                </div>
              )}

              {selectedFrame === 'speech-right' && (
                <div className="flex items-center gap-3">
                  <div className="border-4 border-slate-900 p-3 rounded-2xl bg-white shadow-sm">{renderQRCode()}</div>
                  <div className="relative bg-slate-900 text-white font-black text-sm px-4 py-3 rounded-xl tracking-wide uppercase leading-tight max-w-[120px] text-center">
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-y-8 border-y-transparent border-r-8 border-r-slate-900" />
                    {frameText}
                  </div>
                </div>
              )}

              {selectedFrame === 'bottom-card' && (
                <div className="border-4 border-slate-900 rounded-2xl bg-slate-900 overflow-hidden flex flex-col items-center">
                  <div className="bg-white p-4 w-full flex justify-center">{renderQRCode()}</div>
                  <div className="py-3 px-6 text-white font-black text-lg tracking-widest uppercase text-center">
                    {frameText}
                  </div>
                </div>
              )}

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

              {selectedFrame === 'none' && renderQRCode()}
            </div>

            <button
              onClick={handleDownload}
              className="mt-6 w-full py-3 px-4 bg-[#1D4ED8] hover:bg-[#1e40af] text-white font-semibold rounded-xl transition shadow-sm cursor-pointer text-center"
            >
              📲 Enregistrer la photo
            </button>
          </div>

          {/* Configuration */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">📌 Que voulez-vous partager ?</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setContentType('url')}
                  className={`p-2 text-xs font-medium rounded-lg border transition ${contentType === 'url' ? 'bg-[#1D4ED8] text-white border-[#1D4ED8]' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
                >
                  🌐 Lien / Réseaux
                </button>
                <button
                  onClick={() => setContentType('wifi')}
                  className={`p-2 text-xs font-medium rounded-lg border transition ${contentType === 'wifi' ? 'bg-[#1D4ED8] text-white border-[#1D4ED8]' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
                >
                  📶 Wi-Fi
                </button>
                <button
                  onClick={() => setContentType('email')}
                  className={`p-2 text-xs font-medium rounded-lg border transition ${contentType === 'email' ? 'bg-[#1D4ED8] text-white border-[#1D4ED8]' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
                >
                  ✉️ E-mail
                        </
