import React from 'react';

export default function FrameSelector({ selectedFrame, onSelectFrame, frameText, setFrameText }) {
  const frames = [
    { id: 'none', label: 'Aucun' },
    { id: 'simple-badge', label: 'Badge classique' },
    { id: 'card-red', label: 'Carte Rouge Solid' },
    { id: 'pill-top-pink', label: 'Pilule Haute Rose' },
    { id: 'rounded-gradient', label: 'Contour Dégradé' },
    { id: 'tag-blue', label: 'Étiquette Bleue' },
    { id: 'banner-left', label: 'Bannière Gauche' },
    { id: 'speech-right', label: 'Bulle Droite' },
    { id: 'bottom-card', label: 'Carte Basse' },
    { id: 'corners', label: 'Coins Stylisés' },
  ];

  return (
    <div className="space-y-3 pt-2">
      <label className="block text-sm font-semibold text-slate-700">🖼️ Modèle du cadre</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {frames.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => onSelectFrame(f.id)}
            className={`p-2.5 text-xs font-medium rounded-xl border text-left transition ${
              selectedFrame === f.id
                ? 'bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {selectedFrame !== 'none' && (
        <div className="pt-2">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Texte du cadre</label>
          <input
            type="text"
            value={frameText}
            onChange={(e) => setFrameText(e.target.value)}
            placeholder="SCAN ME !"
            className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
    </div>
  );
}
