import React, { useState } from 'react';

export default function Customizer({ onApplyCustom }) {
  const [color, setColor] = useState('#000000');
  const [shape, setShape] = useState('rounded');

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    onApplyCustom({
      dotsOptions: { color: newColor, type: shape },
      cornersSquareOptions: { color: newColor, type: 'extra-rounded' }
    });
  };

  const handleShapeChange = (e) => {
    const newShape = e.target.value;
    setShape(newShape);
    onApplyCustom({
      dotsOptions: { color: color, type: newShape },
      cornersSquareOptions: { color: color, type: 'extra-rounded' }
    });
  };

  return (
    <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Couleur des points :</label>
        <input 
          type="color" 
          value={color} 
          onChange={handleColorChange}
          className="w-full h-10 p-1 bg-white border border-gray-200 rounded-xl cursor-pointer" 
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Forme des motifs :</label>
        <select 
          value={shape} 
          onChange={handleShapeChange}
          className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none"
        >
          <option value="square">Carré classique</option>
          <option value="dots">Points / Cercles</option>
          <option value="rounded">Arrondi</option>
          <option value="classy-rounded">Fluide chic</option>
        </select>
      </div>
    </div>
  );
}
