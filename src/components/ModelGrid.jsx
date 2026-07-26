import React from 'react';
import { TEMPLATES } from '../data/templates';

export default function ModelGrid({ onSelect }) {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold mb-4 text-gray-800">🎨 Modèles prédéfinis</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {TEMPLATES.map((tmpl) => (
          <button
            key={tmpl.id}
            onClick={() => onSelect(tmpl)}
            className="p-4 border rounded-xl hover:shadow-md transition bg-white flex flex-col items-center gap-2 text-center border-gray-200 hover:border-blue-500 cursor-pointer"
          >
            {tmpl.image && (
              <img 
                src={tmpl.image} 
                alt={tmpl.title} 
                className="w-10 h-10 object-contain mb-1" 
              />
            )}
            <span className="text-sm font-medium text-gray-700">{tmpl.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
                }
