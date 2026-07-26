import React from 'react';

export default function ModelGrid({ templates, selectedTemplate, onSelectTemplate }) {
  return (
    <div className="mb-6">
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
        3. Choisissez un modèle prédéfini
      </label>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {templates.map((tpl) => {
          const isSelected = selectedTemplate?.id === tpl.id;
          return (
            <div
              key={tpl.id}
              onClick={() => onSelectTemplate(tpl)}
              className={`p-3 rounded-2xl border cursor-pointer text-center transition flex flex-col items-center justify-between gap-2 ${
                isSelected
                  ? 'border-black bg-black text-white shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300 text-gray-800'
              }`}
            >
              <div className="flex justify-between items-center w-full text-[10px]">
                <span className={`px-2 py-0.5 rounded-full font-bold ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'
                }`}>
                  {tpl.badge}
                </span>
              </div>
              <span className="font-bold text-sm my-1">{tpl.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
