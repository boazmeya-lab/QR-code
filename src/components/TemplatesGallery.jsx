import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

export const PRESET_TEMPLATES = [
  {
    id: 'badge-classic',
    title: 'Badge Classic',
    category: 'Réseaux & Web',
    frame: 'simple-badge',
    frameText: 'SCANNE-MOI',
    color: '#111827',
  },
  {
    id: 'banner-instagram',
    title: 'Bannière Insta',
    category: 'Réseaux Sociaux',
    frame: 'banner-left',
    frameText: 'INSTAGRAM',
    color: '#e1306c',
  },
  {
    id: 'speech-restaurant',
    title: 'Menu Restaurant',
    category: 'Business',
    frame: 'speech-right',
    frameText: 'MENU 🍕',
    color: '#d97706',
  },
  {
    id: 'bottom-wifi',
    title: 'Connexion Wi-Fi',
    category: 'Pratique',
    frame: 'bottom-card',
    frameText: 'WIFI GRATUIT',
    color: '#1D4ED8',
  },
  {
    id: 'corners-promo',
    title: 'Viseur Promo',
    category: 'Commerce',
    frame: 'corners',
    frameText: 'PROMO -20%',
    color: '#dc2626',
  },
  {
    id: 'banner-website',
    title: 'Visitez le site',
    category: 'Business',
    frame: 'banner-left',
    frameText: 'WEB SITE',
    color: '#2563EB',
  }
];

export default function TemplatesGallery({ onSelectPreset, onBack }) {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111827] p-4 md:p-8 font-sans">
      <header className="max-w-5xl mx-auto flex items-center justify-between pb-6 border-b border-gray-100">
        <button
          onClick={onBack}
          className="text-sm font-semibold text-[#1D4ED8] hover:underline flex items-center gap-1"
        >
          ← Retour à l'accueil
        </button>
        <h1 className="text-xl font-black text-[#111827]">Modèles prêts à l'emploi</h1>
      </header>

      <main className="max-w-5xl mx-auto py-8">
        <p className="text-center text-gray-600 text-sm md:text-base mb-8">
          Choisissez un modèle prédéfini pour lancer directement l'éditeur avec ce style.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {PRESET_TEMPLATES.map((preset) => (
            <div
              key={preset.id}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-between hover:border-[#2563EB] hover:shadow-md transition cursor-pointer"
              onClick={() => onSelectPreset(preset)}
            >
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded-full mb-4">
                {preset.category}
              </span>

              {/* Aperçu QR Code */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col items-center justify-center my-2 shadow-inner">
                {preset.frame === 'simple-badge' && (
                  <div className="relative flex flex-col items-center">
                    <div className="bg-[#111827] text-white font-extrabold text-[9px] uppercase px-2.5 py-0.5 rounded-t-md tracking-widest z-10 -mb-1">
                      {preset.frameText}
                    </div>
                    <div className="p-2 bg-white rounded-lg border-2 border-[#111827]">
                      <QRCodeSVG value="https://smartlab.site" size={100} fgColor={preset.color} />
                    </div>
                  </div>
                )}

                {preset.frame === 'banner-left' && (
                  <div className="flex items-center border-2 border-[#111827] rounded-xl overflow-hidden bg-[#111827] p-0.5">
                    <div className="px-2 py-1 text-white font-black text-[10px] tracking-wider uppercase text-center max-w-[70px] leading-tight">
                      {preset.frameText}
                    </div>
                    <div className="bg-white p-1 rounded-lg">
                      <QRCodeSVG value="https://smartlab.site" size={90} fgColor={preset.color} />
                    </div>
                  </div>
                )}

                {preset.frame === 'speech-right' && (
                  <div className="flex items-center gap-2">
                    <div className="border-2 border-[#111827] p-1.5 rounded-xl bg-white">
                      <QRCodeSVG value="https://smartlab.site" size={90} fgColor={preset.color} />
                    </div>
                    <div className="relative bg-[#111827] text-white font-black text-[9px] px-2 py-1.5 rounded-lg uppercase text-center max-w-[65px]">
                      {preset.frameText}
                    </div>
                  </div>
                )}

                {preset.frame === 'bottom-card' && (
                  <div className="border-2 border-[#111827] rounded-xl bg-[#111827] overflow-hidden flex flex-col items-center">
                    <div className="bg-white p-1.5 w-full flex justify-center">
                      <QRCodeSVG value="https://smartlab.site" size={90} fgColor={preset.color} />
                    </div>
                    <div className="py-1 px-2 text-white font-black text-[10px] tracking-widest uppercase text-center">
                      {preset.frameText}
                    </div>
                  </div>
                )}

                {preset.frame === 'corners' && (
                  <div className="relative p-3 flex flex-col items-center">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#111827] rounded-tl-sm" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#111827] rounded-tr-sm" />
                    <div className="absolute bottom-6 left-0 w-4 h-4 border-b-2 border-l-2 border-[#111827] rounded-bl-sm" />
                    <div className="absolute bottom-6 right-0 w-4 h-4 border-b-2 border-r-2 border-[#111827] rounded-br-sm" />
                    <QRCodeSVG value="https://smartlab.site" size={90} fgColor={preset.color} />
                    <p className="mt-1 font-black text-[9px] text-[#111827] uppercase tracking-widest">{preset.frameText}</p>
                  </div>
                )}
              </div>

              <div className="mt-4 text-center w-full">
                <h3 className="font-bold text-[#111827] text-base">{preset.title}</h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPreset(preset);
                  }}
                  className="mt-3 w-full py-2 bg-[#1D4ED8] hover:bg-[#1e40af] text-white font-bold text-xs rounded-xl shadow-sm transition"
                >
                  Utiliser ce modèle
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
