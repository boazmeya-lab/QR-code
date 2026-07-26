import React, { useState } from 'react';
import { TEMPLATES } from './data/templates';
import ModelGrid from './components/ModelGrid';

export default function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);

  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-800">
      <header className="max-w-4xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Générateur de QR Code Pro
        </h1>
        <p className="text-slate-500 mt-2">
          Créez et personnalisez vos QR codes en quelques clics.
        </p>
      </header>

      <main className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="mb-6 p-4 bg-slate-100 rounded-xl text-center">
          <p className="text-sm font-semibold text-slate-600">Modèle sélectionné :</p>
          <p className="text-lg font-bold text-blue-600">{selectedTemplate?.title}</p>
        </div>

        <ModelGrid onSelect={(tmpl) => setSelectedTemplate(tmpl)} />
      </main>
    </div>
  );
}
