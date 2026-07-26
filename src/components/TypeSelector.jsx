import React from 'react';

export default function TypeSelector({ selectedType, onSelectType }) {
  const types = [
    { id: 'link', label: '🔗 Lien Web' },
    { id: 'wifi', label: '📶 Wi-Fi' },
    { id: 'whatsapp', label: '💬 WhatsApp' },
    { id: 'vcard', label: '🎴 Contact / vCard' },
  ];

  return (
    <div className="mb-6">
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
        1. Choisissez le type de contenu
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {types.map((type) => (
          <button
            key={type.id}
            onClick={() => onSelectType(type.id)}
            className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition border ${
              selectedType === type.id
                ? 'bg-black text-white border-black shadow-sm'
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
}
