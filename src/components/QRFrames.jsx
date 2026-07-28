import React from 'react';

export const QRFrame = ({ frameType, color = '#111827', text = 'SCAN ME !', children }) => {
  switch (frameType) {
    case 'card-red':
      return (
        <div className="bg-[#FF0055] p-5 rounded-[28px] flex flex-col items-center justify-center shadow-md max-w-[220px] mx-auto">
          <div className="bg-white p-3 rounded-[20px] w-full flex justify-center">
            {children}
          </div>
          <span className="text-white font-black text-xs tracking-wider uppercase mt-3 mb-1 text-center">
            {text}
          </span>
        </div>
      );

    case 'pill-top-pink':
      return (
        <div className="bg-[#E000FF] p-5 rounded-[32px] flex flex-col items-center justify-center shadow-md max-w-[220px] mx-auto">
          <div className="bg-white p-3 rounded-[24px] w-full flex justify-center">
            {children}
          </div>
          <div className="bg-white text-[#E000FF] font-black text-xs px-4 py-1.5 rounded-full shadow-sm mt-3 uppercase tracking-wider">
            {text}
          </div>
        </div>
      );

    case 'rounded-gradient':
      return (
        <div className="p-1 bg-gradient-to-br from-[#FF3B00] via-[#FF8800] to-[#FF0055] rounded-[32px] shadow-md max-w-[220px] mx-auto">
          <div className="bg-white p-4 rounded-[28px] flex flex-col items-center justify-center">
            <div className="w-full flex justify-center">
              {children}
            </div>
            <span className="text-[#FF3B00] font-black text-xs tracking-wider uppercase mt-3 text-center">
              {text}
            </span>
          </div>
        </div>
      );

    case 'tag-blue':
      return (
        <div className="bg-white border-2 border-[#0052CC] rounded-2xl p-4 shadow-md flex flex-col items-center max-w-[220px] mx-auto">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 w-full flex justify-center">
            {children}
          </div>
          <span className="text-[#0052CC] font-extrabold text-xs tracking-wider uppercase mt-3 text-center">
            {text}
          </span>
        </div>
      );

    case 'simple-badge':
      return (
        <div className="flex flex-col items-center max-w-[220px] mx-auto">
          <div 
            className="text-white font-extrabold text-[10px] uppercase px-4 py-1 rounded-t-xl tracking-widest shadow-sm z-10 -mb-1"
            style={{ backgroundColor: color }}
          >
            {text}
          </div>
          <div className="p-3 bg-white rounded-2xl border-4 shadow-md w-full flex justify-center" style={{ borderColor: color }}>
            {children}
          </div>
        </div>
      );

    case 'banner-left':
      return (
        <div className="flex items-center rounded-2xl overflow-hidden p-1 shadow-md" style={{ backgroundColor: color }}>
          <div className="px-3 py-2 text-white font-black text-xs tracking-wider uppercase text-center max-w-[90px] leading-tight">
            {text}
          </div>
          <div className="bg-white p-2 rounded-xl flex justify-center">{children}</div>
        </div>
      );

    case 'bottom-card':
      return (
        <div className="rounded-2xl overflow-hidden flex flex-col items-center shadow-md max-w-[220px] mx-auto" style={{ backgroundColor: color }}>
          <div className="bg-white p-3 w-full flex justify-center">{children}</div>
          <div className="py-2 px-4 text-white font-black text-xs tracking-widest uppercase text-center">
            {text}
          </div>
        </div>
      );

    case 'corners':
      return (
        <div className="relative p-5 flex flex-col items-center max-w-[220px] mx-auto">
          <div className="absolute top-0 left-0 w-5 h-5 border-t-4 border-l-4 rounded-tl-lg" style={{ borderColor: color }} />
          <div className="absolute top-0 right-0 w-5 h-5 border-t-4 border-r-4 rounded-tr-lg" style={{ borderColor: color }} />
          <div className="absolute bottom-6 left-0 w-5 h-5 border-b-4 border-l-4 rounded-bl-lg" style={{ borderColor: color }} />
          <div className="absolute bottom-6 right-0 w-5 h-5 border-b-4 border-r-4 rounded-br-lg" style={{ borderColor: color }} />
          {children}
          <p className="mt-3 font-black text-[10px] uppercase tracking-widest" style={{ color: color }}>{text}</p>
        </div>
      );

case 'speech-right':
  return (
    <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border-2 border-slate-100 shadow-md max-w-[240px] mx-auto">
      <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
        {children}
      </div>
      <div 
        className="text-white font-black text-xs px-3 py-2 rounded-xl shadow-sm tracking-wide uppercase text-center leading-tight flex-1"
        style={{ backgroundColor: color }}
      >
        {text}
      </div>
    </div>
  );
      
    case 'none':
    default:
      return <>{children}</>;
  }
};

export default QRFrame;
