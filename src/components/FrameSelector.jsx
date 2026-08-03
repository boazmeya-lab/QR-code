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
      <label className="block text-sm font-semibold text-slate-700">Modèles de cadres</label>
      <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-1">
        {frames.map((frame) => (
          <button
            key={frame.id}
            onClick={() => onSelectFrame(frame.id)}
            className={`p-2 text-xs rounded-lg border text-left transition ${
              selectedFrame === frame.id
                ? 'border-blue-600 bg-blue-50 font-bold text-blue-600'
                : 'border-slate-200 hover:border-slate-300 text-slate-600'
            }`}
          >
            {frame.label}
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
            className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Ex: SCANNEZ-MOI"
          />
        </div>
      )}
    </div>
  );
}
