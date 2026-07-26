import React from 'react';

export const PRESET_TEMPLATES = [
  {
    id: 'badge-classic',
    title: 'Badge Classic',
    category: 'ESSENTIEL',
    frame: 'simple-badge',
    frameText: 'SCANNE-MOI',
    color: '#111827',
    bgColor: '#ffffff',
    description: 'Style intemporel parfait pour tout type de lien'
  },
  {
    id: 'insta-card',
    title: 'Instagram Pro',
    category: 'RÉSEAUX',
    frame: 'pill-top-pink',
    frameText: 'INSTAGRAM',
    color: '#E000FF',
    bgColor: '#ffffff',
    description: 'Design néon rose & violet pour réseaux sociaux'
  },
  {
    id: 'web-blue',
    title: 'Site Web Pro',
    category: 'BUSINESS',
    frame: 'tag-blue',
    frameText: 'VISITEZ LE SITE',
    color: '#0052CC',
    bgColor: '#ffffff',
    description: 'Style épuré bleu roi avec icône web'
  },
  {
    id: 'whatsapp-green',
    title: 'Contact WhatsApp',
    category: 'COMMUNICATION',
    frame: 'corners',
    frameText: 'DISCUTER SUR WA',
    color: '#00B578',
    bgColor: '#ffffff',
    description: 'Format idéal pour la messagerie WhatsApp'
  },
  {
    id: 'promo-gradient',
    title: 'Offre Promo',
    category: 'COMMERCE',
    frame: 'rounded-gradient',
    frameText: 'PROMO -20%',
    color: '#FF3B00',
    bgColor: '#ffffff',
    description: 'Contour dégradé attrayant pour attirer les ventes'
  },
  {
    id: 'red-solid',
    title: 'Carte Rouge VIP',
    category: 'ÉVÉNEMENT',
    frame: 'card-red',
    frameText: 'RÉSERVER',
    color: '#FF0055',
    bgColor: '#ffffff',
    description: 'Carte rouge vif avec texte en bas'
  },
  {
    id: 'wifi-card',
    title: 'Accès Wi-Fi',
    category: 'PRATIQUE',
    frame: 'bottom-card',
    frameText: 'WIFI GRATUIT',
    color: '#1D4ED8',
    bgColor: '#ffffff',
    description: 'Génération automatique pour bornes et Wi-Fi'
  },
  {
    id: 'menu-restaurant',
    title: 'Menu Restaurant',
    category: 'RESTAURATION',
    frame: 'speech-right',
    frameText: 'MENU 🍕',
    color: '#D97706',
    bgColor: '#ffffff',
    description: 'Affichette idéale pour tables et comptoirs'
  }
];

export default function TemplatesGallery({ onSelectPreset, onBack }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-8 font-sans">
      {/* En-tête */}
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
          {PRESET_TEMPLATES.length} Modèles disponibles
        </span>
      </div>

      {/* Grille de cartes */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRESET_TEMPLATES.map((preset) => (
          <div
            key={preset.id}
            className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition duration-200"
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-black tracking-wider uppercase bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
                  {preset.category}
                </span>
              </div>

              {/* Aperçu visuel simplifié */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 flex items-center justify-center my-4 min-h-[160px]">
                <div
                  className="p-3 rounded-xl border-2 flex flex-col items-center justify-center shadow-inner"
                  style={{ borderColor: preset.color, backgroundColor: '#ffffff' }}
                >
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center font-black text-xs text-white"
                    style={{ backgroundColor: preset.color }}
                  >
                    QR CODE
                  </div>
                  <span
                    className="mt-2 text-[9px] font-extrabold uppercase tracking-wider"
                    style={{ color: preset.color }}
                  >
                    {preset.frameText}
                  </span>
                </div>
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
