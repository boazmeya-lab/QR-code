import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function LandingPage({ onStart }) {
  const showcaseItems = [
    {
      type: 'simple-badge',
      text: 'SCANNE-MOI',
      color: '#000000',
      value: 'https://smartlab.site'
    },
    {
      type: 'banner-left',
      text: 'INSTAGRAM',
      color: '#e1306c',
      value: 'https://instagram.com'
    },
    {
      type: 'speech-right',
      text: 'MENU 🍕',
      color: '#d97706',
      value: 'https://exemple.com/menu'
    },
    {
      type: 'bottom-card',
      text: 'WIFI GRATUIT',
      color: '#2563eb',
      value: 'WIFI:S:SmartLab;T:WPA;P:12345678;;'
    },
    {
      type: 'corners',
      text: 'PROMO -20%',
      color: '#dc2626',
      value: 'https://exemple.com/promo'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-4 md:p-8 w-full max-w-full overflow-x-hidden">
      
      {/* En-tête / Logo SmartLab */}
      <header className="max-w-5xl mx-auto w-full flex justify-between items-center py-2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center font-black text-lg text-white shadow-lg shadow-blue-500/30">
            S
          </div>
          <span className="font-bold text-lg md:text-xl tracking-wide text-white">SmartLab</span>
        </div>
      </header>

      {/* Contenu principal / Hero */}
      <main className="max-w-3xl mx-auto text-center space-y-6 my-auto py-6 w-full px-2">
        
        {/* Badge bienvenue */}
        <div className="inline-flex items-center px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-semibold tracking-wide">
           Bienvenue sur SmartLab
        </div>

        {/* Titre responsive corrigé */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight max-w-full break-words">
          Générez des QR Codes <span className="text-blue-500">professionnels</span> en quelques clics
        </h1>

        {/* Description responsive corrigée */}
        <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto px-2 break-words">
          Créez des QR codes encadrés et personnalisés pour vos liens, Wi-Fi et réseaux sociaux, puis téléchargez-les en HD.
        </p>

        {/* Bouton responsive */}
        <div className="pt-2 px-2">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-base md:text-lg rounded-2xl shadow-xl shadow-blue-600/30 transition active:scale-95 cursor-pointer"
          >
             👽 Créer mon QR code
          </button>
        </div>

        {/* Carrousel d'exemples défilants */}
        <div className="pt-6 w-full max-w-full overflow-hidden">
          <p className="text-[10px] md:text-xs uppercase tracking-widest text-slate-400 font-semibold mb-4">
            Aperçu des styles disponibles
          </p>
          
          <div className="relative w-full overflow-hidden py-2 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-8 before:bg-gradient-to-r before:from-slate-950 before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-8 after:bg-gradient-to-l after:from-slate-950 after:to-transparent">
            <div className="flex gap-4 animate-marquee w-max">
              {[...showcaseItems, ...showcaseItems].map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-lg"
                >
                  <div className="bg-white p-2.5 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                    
                    {item.type === 'simple-badge' && (
                      <div className="relative flex flex-col items-center">
                        <div className="bg-slate-900 text-white font-extrabold text-[8px] uppercase px-2.5 py-0.5 rounded-t-md tracking-widest z-10 -mb-1">
                          {item.text}
                        </div>
                        <div className="p-1.5 bg-white rounded-lg border-2 border-slate-900">
                          <QRCodeSVG value={item.value} size={70} fgColor={item.color} />
                        </div>
                      </div>
                    )}

                    {item.type === 'banner-left' && (
                      <div className="flex items-center border-2 border-slate-900 rounded-xl overflow-hidden bg-slate-900 p-0.5">
                        <div className="px-2 py-1 text-white font-black text-[10px] tracking-wider uppercase text-center max-w-[65px] leading-tight">
                          {item.text}
                        </div>
                        <div className="bg-white p-1 rounded-lg">
                          <QRCodeSVG value={item.value} size={65} fgColor={item.color} />
                        </div>
                      </div>
                    )}

                    {item.type === 'speech-right' && (
                      <div className="flex items-center gap-1.5">
                        <div className="border-2 border-slate-900 p-1 rounded-xl bg-white">
                          <QRCodeSVG value={item.value} size={65} fgColor={item.color} />
                        </div>
                        <div className="relative bg-slate-900 text-white font-black text-[9px] px-2 py-1.5 rounded-lg uppercase text-center max-w-[60px]">
                          {item.text}
                        </div>
                      </div>
                    )}

                    {item.type === 'bottom-card' && (
                      <div className="border-2 border-slate-900 rounded-xl bg-slate-900 overflow-hidden flex flex-col items-center">
                        <div className="bg-white p-1.5 w-full flex justify-center">
                          <QRCodeSVG value={item.value} size={65} fgColor={item.color} />
                        </div>
                        <div className="py-0.5 px-2 text-white font-black text-[10px] tracking-widest uppercase text-center">
                          {item.text}
                        </div>
                      </div>
                    )}

                    {item.type === 'corners' && (
                      <div className="relative p-2.5 flex flex-col items-center">
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-slate-900 rounded-tl-sm" />
                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-slate-900 rounded-tr-sm" />
                        <div className="absolute bottom-5 left-0 w-3 h-3 border-b-2 border-l-2 border-slate-900 rounded-bl-sm" />
                        <div className="absolute bottom-5 right-0 w-3 h-3 border-b-2 border-r-2 border-slate-900 rounded-br-sm" />
                        <QRCodeSVG value={item.value} size={65} fgColor={item.color} />
                        <p className="mt-1 font-black text-[8px] text-slate-900 uppercase tracking-widest">{item.text}</p>
                      </div>
                    )}

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>

      {/* Pied de page */}
      <footer className="text-center text-slate-600 text-[10px] sm:text-xs py-2">
        © 2026 SmartLab — Tous droits réservés.
      </footer>
    </div>
  );
}
