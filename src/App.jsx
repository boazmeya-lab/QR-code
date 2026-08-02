import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import * as htmlToImage from 'html-to-image';
import { TEMPLATES } from './data/templates';
import FrameSelector from './components/FrameSelector';
import TemplatesGallery from './components/TemplatesGallery';
import { QRFrame } from './components/QRFrames';

export default function App() {
  const [currentView, setCurrentView] = useState('home');

  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
  const [customColor, setCustomColor] = useState(null);
  const [contentType, setContentType] = useState('url');
  
  const [urlInput, setUrlInput] = useState('https://smartlab.site');
  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [emailInput, setEmailInput] = useState('');

  const [selectedFrame, setSelectedFrame] = useState('simple-badge');
  const [frameText, setFrameText] = useState('SCAN ME !');
  const [customLogo, setCustomLogo] = useState(null);

  const cardRef = useRef(null);

  const handleSelectPreset = (preset) => {
    if (preset.frame) setSelectedFrame(preset.frame);
    if (preset.frameText) setFrameText(preset.frameText);
    if (preset.color) setCustomColor(preset.color);
    setCurrentView('editor');
  };

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

  const fgColor = customColor || selectedTemplate.dotsOptions?.color || '#000000';
  const bgColor = selectedTemplate.backgroundOptions?.color || '#ffffff';

  // Rendu QR réutilisable et sécurisé
  const renderQRCode = (size = 180, overrideColor = null) => (
    <QRFrame 
      frameType={selectedFrame} 
      color={overrideColor || fgColor} 
      text={frameText}
    >
      <QRCodeSVG
        value={getQrData()}
        size={size}
        fgColor={overrideColor || fgColor}
        bgColor={bgColor}
        level="H"
        imageSettings={
          customLogo
            ? {
                src: customLogo,
                x: undefined,
                y: undefined,
                height: Math.round(size * 0.2),
                width: Math.round(size * 0.2),
                excavate: true,
              }
            : undefined
        }
      />
    </QRFrame>
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

  // 2. ÉCRAN D'ACCUEIL
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
              Aperçu en temps réel
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-[#1D4ED8] text-xs font-semibold">
              Modèles personnalisables
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
              Personnaliser soi-même
            </button>
            <button
              onClick={() => setCurrentView('gallery')}
              className="w-full sm:w-auto px-7 py-3.5 bg-gray-100 hover:bg-gray-200 text-[#111827] border border-gray-300 font-bold text-base rounded-2xl transition duration-200 active:scale-95 cursor-pointer"
            >
              Voir les modèles
            </button>
          </div>

          {/* Section Carrousel Aperçu */}
          <div className="pt-6 w-full max-w-full overflow-hidden">
            <p className="text-[11px] uppercase tracking-widest text-gray-500 font-bold mb-4">
              Aperçu des modèles populaires
            </p>
            <div className="relative w-full overflow-hidden py-2 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-8 before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-8 after:bg-gradient-to-l after:from-white after:to-transparent">
              <div className="flex gap-4 animate-marquee w-max">
                {showcaseItems.map((item, index) => (
                  <div key={index} className="bg-[#FAFAFA] p-3 rounded-2xl border border-gray-200 flex flex-col items-center justify-center shrink-0">
                    <QRFrame
                      frameType={item.type}
                      color={item.color}
                      text={item.text}
                    >
                      <QRCodeSVG
                        value={item.value}
                        size={60}
                        fgColor="#000000"
                        bgColor="#ffffff"
                        level="M"
                      />
                    </QRFrame>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        <footer className="text-center text-gray-600 text-[11px] sm:text-xs py-3">
          © 2026 SmartLab - Tous droits réservés.
        </footer>
      </div>
    );
  }

  // 3. ÉCRAN ÉDITEUR
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
            
              {renderQRCode()}
            </div>
             <div ref={cardRef} className="bg-white p-6 rounded-xl flex items-center justify-center">
  {renderQRCode()}
</div>
            <button
              onClick={handleDownload}
              className="mt-6 w-full py-3 px-4 bg-[#1D4ED8] hover:bg-[#1e40af] text-white font-semibold rounded-xl transition shadow-sm cursor-pointer text-center"
            >
              📲 Enregistrer la photo
            </button>
          </div>

          {/* Formulaire */}
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
                </button>
              </div>
            </div>

            {contentType === 'url' && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Lien web ou réseau social</label>
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://instagram.com/moncompte"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            )}

            {contentType === 'wifi' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Nom du réseau Wi-Fi (SSID)</label>
                  <input
                    type="text"
                    value={wifiSsid}
                    onChange={(e) => setWifiSsid(e.target.value)}
                    placeholder="Ex: MonWifiMaison"
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Mot de passe</label>
                  <input
                    type="password"
                    value={wifiPassword}
                    onChange={(e) => setWifiPassword(e.target.value)}
                    placeholder="Mot de passe"
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>
            )}

            {contentType === 'email' && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Adresse E-mail</label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="contact@exemple.com"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">🖼️ Importer un logo central</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleCustomLogoUpload}
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
              />
              {customLogo && (
                <button onClick={() => setCustomLogo(null)} className="mt-1 text-xs text-red-500 hover:underline">
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
          
        

        {/* Thèmes de couleur */}
        <div className="bg-[#FFFFFF] p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-4">🎨 Couleurs & Thèmes</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {TEMPLATES.map((tmpl) => (
      
              <button
                key={tmpl.id}
                onClick={() => {
                  setSelectedTemplate(tmpl);
                  setCustomColor(null);
                }}
                className={`p-3 text-sm font-medium rounded-xl border text-left transition flex items-center justify-between ${selectedTemplate.id === tmpl.id && !customColor ? 'bg-blue-50 border-blue-600 text-blue-900 ring-2 ring-blue-500/20' : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'}`}
              >
                <span>{tmpl.title}</span>
                {selectedTemplate.id === tmpl.id && !customColor && <span className="text-blue-600 text-xs font-bold">✓</span>}
              </button>
            ))}
          </div>
        </div>
      </main>
  );
}
