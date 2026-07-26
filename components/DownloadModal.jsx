import React, { useState, useEffect } from 'react';

export default function DownloadModal({ isOpen, onClose, onDownload, isProUser, onUpgrade }) {
  const [timeLeft, setTimeLeft] = useState(30);
  const [canDownload, setCanDownload] = useState(false);

  useEffect(() => {
    let timer;
    if (isOpen && !isProUser) {
      setTimeLeft(30);
      setCanDownload(false);
      
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanDownload(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, isProUser]);

  if (!isOpen) return null;

  // Si l'utilisateur a l'abonnement VIP, le téléchargement est immédiat
  if (isProUser) {
    onDownload();
    onClose();
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center shadow-xl border border-gray-100 relative">
        
        {/* Bouton Fermer */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-lg"
        >
          ✕
        </button>

        <div className="mb-3">
          <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            Téléchargement Gratuit
          </span>
        </div>

        <h3 className="text-xl font-extrabold text-gray-900 mb-2">
          Soutenez notre service gratuit
        </h3>
        
        <p className="text-xs text-gray-500 mb-5 leading-relaxed">
          Regardez cette courte annonce de 30 secondes pour télécharger votre QR code en haute définition, ou passez au VIP pour un accès illimité sans pub.
        </p>

        {/* Zone de la vidéo / Lecteur pub */}
        <div className="bg-gray-900 text-white rounded-2xl h-44 flex flex-col items-center justify-center mb-5 relative overflow-hidden shadow-inner">
          <p className="text-[11px] text-gray-400 mb-2 uppercase tracking-widest font-semibold">Annonce vidéo</p>
          {!canDownload ? (
            <div className="text-3xl font-black font-mono text-amber-400">
              ⏳ {timeLeft}s
            </div>
          ) : (
            <div className="text-green-400 font-bold text-sm flex items-center gap-2">
              ✅ Vidéo terminée !
            </div>
          )}
        </div>

        {/* Boutons d'action */}
        <div className="space-y-2.5">
          <button
            disabled={!canDownload}
            onClick={() => {
              onDownload();
              onClose();
            }}
            className={`w-full py-3.5 rounded-xl font-bold text-sm transition ${
              canDownload
                ? 'bg-black text-white hover:bg-gray-800 shadow-lg cursor-pointer'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {canDownload ? 'Télécharger mon QR Code' : `Patientez ${timeLeft}s...`}
          </button>

          <button
            onClick={onUpgrade}
            className="w-full py-3 rounded-xl border border-purple-200 text-purple-700 bg-purple-50 font-semibold text-xs hover:bg-purple-100 transition"
          >
            ⚡ Zap la pub : Passer à l'Abonnement VIP
          </button>
        </div>

      </div>
    </div>
  );
}
