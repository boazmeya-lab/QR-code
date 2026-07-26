import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function LandingPage({ onStart }) {
  const showcaseItems = [
    {
      type: 'simple-badge',
      text: 'SCANNE-MOI',
      color: '#111827',
      value: 'https://smartlab.site'
    },
    {
      type: 'banner-left',
      text: 'INSTAGRAM',
      color: '#1D4ED8',
      value: 'https://instagram.com'
    },
    {
      type: 'speech-right',
      text: 'MENU 🍕',
      color: '#2563EB',
      value: 'https://exemple.com/menu'
    },
    {
      type: 'bottom-card',
      text: 'WIFI GRATUIT',
      color: '#1D4ED8',
      value: 'WIFI:S:SmartLab;T:WPA;P:12345678;;'
    },
    {
      type: 'corners',
      text: 'PROMO -20%',
      color: '#111827',
      value: 'https://exemple.com/promo'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111827] flex flex-col justify-between p-4 md:p-8 w-full max-w-full overflow-x-hidden font-sans">
      
      {/* En-tête / Logo SmartLab */}
      <header className="max-w-5xl mx-auto w-full flex justify-between items-center py-3 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 bg-[#1D4ED8] rounded-xl flex items-center justify-center font-black text-lg text-white shadow-md shadow-blue-500/20">
            S
          </div>
          <span className="font-extrabold text-xl tracking-tight text-[#111827]">SmartLab</span>
        </div>
      </header>

      {/* Contenu principal / Hero */}
      <main className="max-w-3xl mx-auto text-center space-y-6 my-auto py-8 w-full px-2">
        
        {/* Badges des points forts */}
        <div className="flex flex-wrap justify-center gap-2">
          <span className="inline-flex items-center px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-[#2563EB] text-xs font-semibold">
            ⚡ Aperçu en temps réel
          </span>
          <span className="inline-flex items-center px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-[#1D4ED8] text-xs font-semibold">
            🎨 +30 styles personnalisables
          </span>
        </div>

        {/* Titre principal */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight max-w-full break-words text-[#111827]">
          Générez des QR Codes <span className="text-[#2563EB]">professionnels</span> en quelques clics
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto px-2 break-words leading-relaxed">
          Créez des QR codes encadrés et personnalisés pour vos liens, Wi-Fi et réseaux sociaux avec un aperçu instantané, puis téléchargez-les en haute définition.
        </p>

        {/* Bouton principal (#1D4ED8) */}
        <div className="pt-2 px-2">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-4 bg-[#1D4ED8] hover:bg-[#1e40af] text-white font-bold text-base md:text-lg rounded-2xl shadow-lg shadow-blue-700/25 transition duration-200 active:scale-95 cursor-pointer"
          >
            🚀 Créer mon QR code
          </button>
        </div>

        {/* Défilé des QR Codes */}
        <div className="pt-8 w-full max-w-full overflow-hidden">
          <p className="text-[11px] uppercase tracking-widest text-gray-600 font-bold mb-4">
            Aperçu direct parmi +30 combinaisons
          </p>
          
          <div className="relative w-full overflow-hidden py-3 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-10 before:bg-gradient-to-r before:from-[#FFFFFF] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-10 after:bg-gradient-to-l after:from-[#FFFFFF] after:to-transparent">
            <div className="flex gap-4 animate-marquee w-max">
              {[...showcaseItems, ...showcaseItems].map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border border-gray-200 p-4 rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-sm hover:shadow-md transition"
                >
                  <div className="bg-white p-3 rounded-xl border border-gray-200 flex flex-col items-center justify-center shadow-inner">
                    
                    {item.type === 'simple-badge' && (
                      <div className="relative flex flex-col items-center">
                        <div className="bg-[#111827] text-white font-extrabold text-[8px] uppercase px-2.5 py-0.5 rounded-t-md tracking-widest z-10 -mb-1">
                          {item.text}
                        </div>
                        <div className="p-1.5 bg-white rounded-lg border-2 border-[#111827]">
                          <QRCodeSVG value={item.value} size={70} fgColor={item.color} />
                        </div>
                      </div>
                    )}

                    {item.type === 'banner-left' && (
                      <div className="flex items-center border-2 border-[#111827] rounded-xl overflow-hidden bg-[#111827] p-0.5">
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
                        <div className="border-2 border-[#111827] p-1 rounded-xl bg-white">
                          <QRCodeSVG value={item.value} size={65} fgColor={item.color} />
                        </div>
                        <div className="relative bg-[#111827] text-white font-black text-[9px] px-2 py-1.5 rounded-lg uppercase text-center max-w-[60px]">
                          {item.text}
                        </div>
                      </div>
                    )}

                    {item.type === 'bottom-card' && (
                      <div className="border-2 border-[#111827] rounded-xl bg-[#111827] overflow-hidden flex flex-col items-center">
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
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#111827] rounded-tl-sm" />
                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#111827] rounded-tr-sm" />
                        <div className="absolute bottom-5 left-0 w-3 h-3 border-b-2 border-l-2 border-[#111827] rounded-bl-sm" />
                        <div className="absolute bottom-5 right-0 w-3 h-3 border-b-2 border-r-2 border-[#111827] rounded-br-sm" />
                        <QRCodeSVG value={item.value} size={65} fgColor={item.color} />
                        <p className="mt-1 font-black text-[8px] text-[#111827] uppercase tracking-widest">{item.text}</p>
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
      <footer className="text-center text-gray-600 text-[11px] sm:text-xs py-3 border-t border-gray-100">
        © 2026 SmartLab — Tous droits réservés.
      </footer>
    </div>
  );
}
