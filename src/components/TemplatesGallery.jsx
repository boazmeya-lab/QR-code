import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QRFrame } from './QRFrame';

export default function TemplatesGallery({ onSelectPreset, onBack }) {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 text-slate-800">
      <header className="max-w-5xl mx-auto mb-8 flex justify-between items-center">
        <div>
          <button onClick={onBack} className="text-sm font-semibold text-[#1D4ED8] hover:underline mb-2 block">
            ← Retour au générateur
          </button>
          <h1 className="text-3xl font-black text-slate-900">Galerie des modèles</h1>
          <p className="text-slate-500 text-sm">Choisissez un modèle prêt à l'emploi et personnalisez-le en 1 clic.</p>
        </div>
        <span className="bg-blue-100 text-[#1D4ED8] font-bold text-xs px-3 py-1.5 rounded-full">
          {TEMPLATES.length} Modèles
        </span>
      </header>

      <main className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLATES.map((tmpl) => (
          <div key={tmpl.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
                {tmpl.category}
              </span>
              <div className="my-6 flex justify-center items-center min-h-[160px] bg-slate-50 p-4 rounded-xl border border-slate-100">
                <QRFrame frameType={tmpl.frame} color={tmpl.color} text={tmpl.frameText}>
                  <QRCodeSVG value="https://smartlab.site" size={100} fgColor={tmpl.color} bgColor="#ffffff" level="M" />
                </QRFrame>
              </div>
              <h3 className="font-bold text-lg text-slate-900">{tmpl.title}</h3>
              <p className="text-slate-500 text-xs mt-1 mb-4">{tmpl.description}</p>
            </div>
            <button
              onClick={() => onSelectPreset(tmpl)}
              className="w-full py-2.5 bg-[#1D4ED8] hover:bg-[#1e40af] text-white font-bold text-sm rounded-xl transition"
            >
              Utiliser ce modèle
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}
