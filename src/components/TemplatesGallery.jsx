import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

export const PRESET_TEMPLATES = [
  {
    id: 'badge-classic',
    title: 'Badge Classic',
    category: 'ESSENTIEL',
    frame: 'simple-badge',
    frameText: 'SCANNE-MOI',
    color: '#111827',
    description: 'Style intemporel parfait pour tout type de lien'
  },
  {
    id: 'insta-card',
    title: 'Instagram Pro',
    category: 'RÉSEAUX',
    frame: 'pill-top-pink',
    frameText: 'INSTAGRAM',
    color: '#E000FF',
    description: 'Design néon rose & violet pour réseaux sociaux'
  },
  {
    id: 'web-blue',
    title: 'Site Web Pro',
    category: 'BUSINESS',
    frame: 'tag-blue',
    frameText: 'VISITEZ LE SITE',
    color: '#0052CC',
    description: 'Style épuré bleu roi avec icône web'
  },
  {
    id: 'whatsapp-green',
    title: 'Contact WhatsApp',
    category: 'COMMUNICATION',
    frame: 'corners',
    frameText: 'DISCUTER SUR WA',
    color: '#00B578',
    description: 'Format idéal pour la messagerie WhatsApp'
  },
  {
    id: 'promo-gradient',
    title: 'Offre Promo',
    category: 'COMMERCE',
    frame: 'rounded-gradient',
    frameText: 'PROMO -20%',
    color: '#FF3B00',
    description: 'Contour dégradé attrayant pour attirer les ventes'
  },
  {
    id: 'red-solid',
    title: 'Carte Rouge VIP',
    category: 'ÉVÉNEMENT',
    frame: 'card-red',
    frameText: 'RÉSERVER',
    color: '#FF0055',
    description: 'Carte rouge vif avec texte en bas'
  }
];

export default function TemplatesGallery({ onSelectPreset, onBack }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-8 font-sans">
      <div className="max-w-6xl mx-auto mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
        <div>
          <button
            onClick={onBack}
            className="text-sm font-bold text-[#1D4ED8] hover:underline mb-2 inline-block cursor-pointer"
          >
            ← Retour au générateur
          </button>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Galerie des modèles
          </h1>
          <p className="text-slate-500 text-sm">
            Choisissez un modèle prêt à l'emploi et personnalisez-le en 1 clic.
          </p>
        </div>
        <span className="bg-blue-100 text-[#1D4ED8] text-xs font-bold px-3.5 py-1.5 rounded-full">
          {PRESET_TEMPLATES.length} Modèles
        </span>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRESET_TEMPLATES.map((preset) => (
          <div
            key={preset.id}
            className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition duration-200"
          >
            <div>
              <span className="text-[10px] font-black tracking-wider uppercase bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
                {preset.category}
              </span>

              {/* Aperçu VRAIE COULEUR ET VRAI DESIGN */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex items-center justify-center my-4 min-h-[190px]">
                {preset.frame === 'simple-badge' && (
                  <div className="relative flex flex-col items-center">
                    <div className="bg-slate-900 text-white font-extrabold text-[9px] uppercase px-3 py-0.5 rounded-t-md tracking-widest z-10 -mb-1">
                      {preset.frameText}
                    </div>
                    <div className="p-2 bg-white rounded-xl border-2 border-slate-900 shadow-sm">
                      <QRCodeSVG value="https://smartlab.site" size={80} fgColor={preset.color} />
                    </div>
                  </div>
                )}

                {preset.frame === 'pill-top-pink' && (
                  <div className="bg-gradient-to-b from-[#E000FF] to-[#A000FF] p-3 rounded-[24px] flex flex-col items-center justify-center shadow-md">
                    <div className="bg-white text-[#E000FF] font-black text-[9px] px-3 py-1 rounded-full shadow-sm mb-2 uppercase tracking-wider">
                      {preset.frameText}
                    </div>
                    <div className="bg-white p-2 rounded-[18px] shadow-sm">
                      <QRCodeSVG value="https://smartlab.site" size={75} fgColor={preset.color} />
                    </div>
                  </div>
                )}

                {preset.frame === 'tag-blue' && (
                  <div className="relative bg-white border-b-2 border-x border-[#0052CC] rounded-b-[20px] rounded-t-lg p-3 pt-2 shadow-md flex flex-col items-center overflow-hidden">
                    <div className="w-full bg-gradient-to-r from-[#0052CC] via-[#0266FF] to-[#0052CC] h-1.5 absolute top-0 left-0 right-0" />
                    <span className="text-slate-900 font-extrabold text-[10px] tracking-wider uppercase my-1 text-center">
                      {preset.frameText}
                    </span>
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                      <QRCodeSVG value="https://smartlab.site" size={75} fgColor={preset.color} />
                    </div>
                  </div>
                )}

                {preset.frame === 'corners' && (
                  <div className="relative p-3 flex flex-col items-center">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00B578] rounded-tl-sm" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00B578] rounded-tr-sm" />
                    <div className="absolute bottom-5 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00B578] rounded-bl-sm" />
                    <div className="absolute bottom-5 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00B578] rounded-br-sm" />
                    <QRCodeSVG value="https://smartlab.site" size={75} fgColor={preset.color} />
                    <p className="mt-2 font-black text-[9px] text-[#00B578] uppercase tracking-widest">{preset.frameText}</p>
                  </div>
                )}

                {preset.frame === 'rounded-gradient' && (
                  <div className="p-[2px] bg-gradient-to-br from-[#FF3B00] via-[#FF8800] to-[#FF0055] rounded-[24px] shadow-md">
                    <div className="bg-white p-3 rounded-[22px] flex flex-col items-center">
                      <QRCodeSVG value="https://smartlab.site" size={75} fgColor={preset.color} />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3B00] to-[#FF8800] font-black text-[10px] tracking-wider uppercase mt-1 text-center">
                        {preset.frameText}
                      </span>
                    </div>
                  </div>
                )}

                {preset.frame === 'card-red' && (
                  <div className="bg-gradient-to-b from-[#FF0055] to-[#E6004C] p-3 rounded-[24px] flex flex-col items-center justify-center shadow-md">
                    <div className="bg-white p-2 rounded-[18px] shadow-sm">
                      <QRCodeSVG value="https://smartlab.site" size={75} fgColor={preset.color} />
                    </div>
                    <span className="text-white font-black text-[10px] tracking-wider uppercase mt-2 text-center">
                      {preset.frameText}
                    </span>
                  </div>
                )}
              </div>

              <h3 className="font-bold text-slate-900 text-lg mb-1">{preset.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">{preset.description}</p>
            </div>

            <button
              onClick={() => onSelectPreset(preset)}
              className="w-full py-3 bg-[#1D4ED8] hover:bg-[#1e40af] text-white font-bold text-sm rounded-xl transition shadow-sm cursor-pointer"
            >
              Utiliser ce modèle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
            }
