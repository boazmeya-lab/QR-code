import React from 'react';

export default function LandingPage({ onStart }) {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between p-6 md:p-12">
      {/* En-tête / Logo SmartLab */}
      <header className="max-w-5xl mx-auto w-full flex justify-between items-center py-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-xl">
            S
          </div>
          <span className="font-bold text-xl tracking-wide text-white">SmartLab</span>
        </div>
      </header>

      {/* Contenu principal / Hero */}
      <main className="max-w-4xl mx-auto text-center space-y-8 my-auto py-12">
        <div className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-semibold tracking-wide">
          ✨ Bienvenue sur SmartLab
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
          Générez des QR Codes <span className="text-blue-500">professionnels</span> en quelques clics
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
          Partagez vos liens, votre réseau Wi-Fi ou vos e-mails avec des encadrements élégants. Téléchargez votre QR Code directement sous forme d'image HD.
        </p>

        {/* Bouton d'action principal */}
        <div className="pt-4">
          <button
            onClick={onStart}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg rounded-2xl shadow-lg shadow-blue-600/30 transition transform hover:-translate-y-0.5 cursor-pointer"
          >
            🚀 Créer mon QR code
          </button>
        </div>

        {/* Fonctionnalités */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 text-left border-t border-slate-800">
          <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-800">
            <div className="text-2xl mb-2">🖼️</div>
            <h3 className="font-bold text-white mb-1">Cadres originaux</h3>
            <p className="text-slate-400 text-sm">Badges, bannières et viseurs stylisés pour capter l'attention.</p>
          </div>

          <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-800">
            <div className="text-2xl mb-2">📲</div>
            <h3 className="font-bold text-white mb-1">Téléchargement Photo</h3>
            <p className="text-slate-400 text-sm">Enregistrement sous forme d'image HD directement dans votre galerie.</p>
          </div>

          <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-800">
            <div className="text-2xl mb-2">📶</div>
            <h3 className="font-bold text-white mb-1">Multi-formats</h3>
            <p className="text-slate-400 text-sm">Lien Web, Réseaux sociaux, Wi-Fi automatique et E-mail.</p>
          </div>
        </div>
      </main>

      {/* Pied de page */}
      <footer className="text-center text-slate-500 text-xs py-4">
        © {new Date().getFullYear()} SmartLab — Tous droits réservés.
      </footer>
    </div>
  );
}
