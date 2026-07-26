import React from 'react';

export const FRAMES = [
  { id: 'none', label: 'Sans cadre' },
  { id: 'simple-badge', label: 'Badge "SCAN ME!"' },
  { id: 'classic-card', label: 'Carte arrondie + Texte' },
  { id: 'corners', label: 'Viseur / Coins' }
];

export default function FrameSelector({ selectedFrame, onSelectFrame, frameText, setFrameText }) {
  return (
    <div className="space-y-3 border-t border-slate-200 pt-4 mt-4">
      <label className="block text-sm font-semibold text-slate-700">
        🖼️ Style d'encadrement
      </label>
      
      <div className="grid grid-cols-2 gap-2">
        {FRAMES.map((frame) => (
          <button
            key={frame.id}
            onClick={() => onSelectFrame(frame.id)}
            className={`p-2.5 text-xs font-medium rounded-lg border transition ${
              selectedFrame === frame.id
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {frame.label}
          </button>
        ))}
      </div>

      {selectedFrame !== 'none' && (
        <div className="mt-2">
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Texte du cadre
          </label>
          <input
            type="text"
            value={frameText}
            onChange={(e) => setFrameText(e.target.value)}
            placeholder="Ex: SCAN ME !"
            className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}
