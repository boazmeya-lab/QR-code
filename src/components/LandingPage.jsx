import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function LandingPage({ onStart }) {
  // Exemples de QR codes stylisés qui vont défiler
  const showcaseItems = [
    {
      type: 'simple-badge',
      text: 'SCANNE-MOI',
      color: '#000000',
      value: 'https://smartlab.site',
      bgColor: 'bg-emerald-500'
    },
    {
      type: 'banner-left',
      text: 'INSTAGRAM',
      color: '#e1306c',
      value: 'https://instagram.com',
      bgColor: 'bg-purple-600'
    },
    {
      type: 'speech-right',
      text: 'MENU 🍕',
      color: '#d97706',
      value: 'https://exemple.com/menu',
      bgColor: 'bg-amber-500'
    },
    {
      type: 'bottom-card',
      text: 'WIFI GRATUIT',
      color: '#2563eb',
      value: 'WIFI:S:SmartLab;T:WPA;P:12345678;;',
      bgColor: 'bg-blue-600'
    },
    {
      type: 'corners',
      text: 'PROMO -20%',
      color: '#dc2626',
      value: 'https://exemple.com/promo',
      bgColor: 'bg-rose-600'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-6 md:p-12 overflow-x-hidden">
      {/* En-tête / Logo SmartLab */}
      <header className="max-w-5xl mx-auto w-full flex justify-between items-center py-4">
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-black text-xl text-white shadow-lg shadow-blue-500/30">
            S
          </div>
          <span className="font-bold text-xl tracking-wide text-white">SmartLab</span>
        </div>
      </header>

      {/* Contenu principal / Hero */}
      <main className="max-w-4xl mx-auto text-center space-y-8 my-auto py-8">
        <div className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs md:text-sm font-semibold tracking-wide">
          ✨ Bienvenue sur SmartLab
        </div>

        <h1 className="text-3xl md:text-6xl font-black tracking-tight leading-tight">
          Générez des QR Codes <span className="text-blue-500">professionnels</span> en quelques clics
        </h1>

        <p className="text-slate-400 text-base md:text-xl max-w-2xl mx-auto">
          Créez des QR codes encadrés et personnalisés pour vos liens, Wi-Fi et réseaux sociaux, puis téléchargez-les en haute définition.
        </p>

        {/* Bouton d'action principal */}
        <div className="pt-2">
          <button
            onClick={onStart}
            className="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg rounded-2xl shadow-xl shadow-blue-600/30 transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            🚀 Créer mon QR code
          </button>
        </div>

        {/* Carrousel d'exemples de QR Codes défilants */}
        <div className="pt-8">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-6">
            Aperçu des styles disponibles
          </p>
          
          <div className="relative w-full overflow-hidden py-4 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-12 before:bg-gradient-to-r before:from-slate-950 before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-12 after:bg-gradient-to-l after:from-slate-950 after:to-transparent">
            <div className="flex gap-6 animate-marquee w-max">
              {[...showcaseItems, ...showcaseItems].map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-lg"
                >
                  <div className="bg-white p-3 rounded-xl border-2 border-slate-900 flex flex-col items-center justify-center">
                    {item.type === 'simple-badge' && (
                      <div className="relative flex flex-col items-center">
                        <div className="bg-slate-900 text-white font-extrabold text-[9px] uppercase px-3 py-0.5 rounded-t-md tracking-widest z-10 -mb-1">
                          {item.text}
                        </div>
                        <div className="p-2 bg-white rounded-lg border-2 border-slate-900">
                          <QRCodeSVG value={item.value} size={90} fgColor={item.color} />
                        </div>
                      </div>
                    )}

                    {item.type === 'banner-left' && (
                      <div className="flex items-center border-2 border-slate-900 rounded-xl overflow-hidden bg-slate-900 p-0.5">
                        <div className="px-3 py-2 text-white font-black text-xs tracking-wider uppercase text-center max-w-[80px] leading-tight">
                          {item.text}
                        </div>
                        <div className="bg-white p-1.5 rounded-lg">
                          <QRCodeSVG value={item.value} size={80} fgColor={item.color} />
                        </div>
                      </div>
                    )}

                    {item.type === 'speech-right' && (
                      <div className="flex items-center gap-2">
                        <div className="border-2 border-slate-900 p-1.5 rounded-xl bg-white">
                          <QRCodeSVG value={item.value} size={80} fgColor={item.color} />
                        </div>
                        <div className="relative bg-slate-900 text-white font-black text-[10px] px-2.5 py-2 rounded-lg uppercase text-center max-w-[70px]">
                          {item.text}
                        </div>
                      </div>
                    )}

                    {item.type === 'bottom-card' && (
                      <div className="border-2 border-slate-900 rounded-xl bg-slate-900 overflow-hidden flex flex-col items-center">
                        <div className="bg-white p-2 w-full flex justify-center">
                          <QRCodeSVG value={item.value} size={80} fgColor={item.color} />
                        </div>
                        <div className="py-1 px-3 text-white font-black text-xs tracking-widest uppercase text-center">
                          {item.text}
                        </div>
                      </div>
                    )}

                    {item.type === 'corners' && (
                      <div className="relative p-3 flex flex-col items-center">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-slate-900 rounded-tl-md" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-slate-900 rounded-tr-md" />
                        <div className="absolute bottom-6 left-0 w-4 h-4 border-b-2 border-l-2 border-slate-900 rounded-bl-md" />
                        <div className="absolute bottom-6 right-0 w-4 h-4 border-b-2 border-r-2 border-slate-900 rounded-br-md" />
                        <QRCodeSVG value={item.value} size={80} fgColor={item.color} />
                        <p className="mt-2 font-black text-[9px] text-slate-900 uppercase tracking-widest">{item.text}</p>
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
      <footer className="text-center text-slate-600 text-xs py-4">
        © 2026 SmartLab — Tous droits réservés.
      </footer>
    </div>
  );
}
