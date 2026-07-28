import React from 'react';

/**
 * Composant de cadre SVG dynamique pour QR Code
 * @param {string} frameType - Modèle ('cat-header', 'paw-print', 'cat-ears', 'dog-bone', 'cat-bottom', 'paw-border', 'speech-bubble', 'minimal-cat', 'cat-face', 'classic')
 * @param {string} color - Couleur principale du cadre (Hex ou RGB)
 * @param {string} text - Texte personnalisé à afficher sous le QR code
 * @param {React.ReactNode} children - Le QR Code généré
 */
export const QRFrame = ({ 
  frameType = 'cat-header', 
  color = '#2563eb', 
  text = 'SCANNE-MOI', 
  children 
}) => {

  const renderFrameSvg = () => {
    switch (frameType) {

      // 1. CHAT EN HAUT
      case 'cat-header':
        return (
          <svg viewBox="0 0 300 360" width="300" height="360" style={{ display: 'block' }}>
            <path d="M 110 50 L 125 15 L 145 45 Z" fill={color} />
            <path d="M 190 50 L 175 15 L 155 45 Z" fill={color} />
            <path d="M 120 48 L 130 25 L 142 45 Z" fill="#FFE4E1" />
            <path d="M 180 48 L 170 25 L 158 45 Z" fill="#FFE4E1" />
            <rect x="15" y="45" width="270" height="270" rx="20" fill="none" stroke={color} strokeWidth="6" />
            <text x="150" y="342" textAnchor="middle" fill={color} fontSize="16" fontWeight="bold" fontFamily="sans-serif">{text}</text>
          </svg>
        );

      // 2. PATTE D'ANIMAL (Coussinets au-dessus)
      case 'paw-print':
        return (
          <svg viewBox="0 0 300 360" width="300" height="360" style={{ display: 'block' }}>
            <circle cx="100" cy="25" r="12" fill={color} />
            <circle cx="133" cy="15" r="12" fill={color} />
            <circle cx="167" cy="15" r="12" fill={color} />
            <circle cx="200" cy="25" r="12" fill={color} />
            <rect x="15" y="45" width="270" height="270" rx="24" fill="none" stroke={color} strokeWidth="6" />
            <text x="150" y="342" textAnchor="middle" fill={color} fontSize="16" fontWeight="bold" fontFamily="sans-serif">{text}</text>
          </svg>
        );

      // 3. CHAT QUI REGARDE EN BAS (Peek-a-boo)
      case 'cat-bottom':
        return (
          <svg viewBox="0 0 300 360" width="300" height="360" style={{ display: 'block' }}>
            <rect x="15" y="15" width="270" height="270" rx="20" fill="none" stroke={color} strokeWidth="6" />
            {/* Tête de chat en bas */}
            <path d="M 110 285 Q 150 270 190 285 L 200 330 L 100 330 Z" fill={color} />
            <polygon points="115,285 105,260 130,280" fill={color} />
            <polygon points="185,285 195,260 170,280" fill={color} />
            <circle cx="135" cy="295" r="3" fill="#FFF" />
            <circle cx="165" cy="295" r="3" fill="#FFF" />
            <text x="150" y="352" textAnchor="middle" fill={color} fontSize="14" fontWeight="bold" fontFamily="sans-serif">{text}</text>
          </svg>
        );

      // 4. CADRE OS DE CHIEN / NICHE
      case 'dog-bone':
        return (
          <svg viewBox="0 0 300 360" width="300" height="360" style={{ display: 'block' }}>
            <circle cx="100" cy="25" r="10" fill={color} />
            <circle cx="115" cy="20" r="10" fill={color} />
            <circle cx="185" cy="20" r="10" fill={color} />
            <circle cx="200" cy="25" r="10" fill={color} />
            <rect x="105" y="17" width="90" height="12" fill={color} />
            <rect x="15" y="45" width="270" height="270" rx="16" fill="none" stroke={color} strokeWidth="6" />
            <text x="150" y="342" textAnchor="middle" fill={color} fontSize="16" fontWeight="bold" fontFamily="sans-serif">{text}</text>
          </svg>
        );

      // 5. BULLE DE DIALOGUE (Chat parle)
      case 'speech-bubble':
        return (
          <svg viewBox="0 0 300 360" width="300" height="360" style={{ display: 'block' }}>
            <rect x="15" y="15" width="270" height="260" rx="20" fill="none" stroke={color} strokeWidth="6" />
            {/* Pointe de la bulle */}
            <polygon points="130,275 150,300 170,275" fill={color} />
            <rect x="50" y="305" width="200" height="40" rx="10" fill={color} />
            <text x="150" y="330" textAnchor="middle" fill="#FFFFFF" fontSize="15" fontWeight="bold" fontFamily="sans-serif">{text}</text>
          </svg>
        );

      // 6. PETITES EMPREINTES SUR LES BORDS
      case 'paw-border':
        return (
          <svg viewBox="0 0 300 360" width="300" height="360" style={{ display: 'block' }}>
            <rect x="15" y="15" width="270" height="270" rx="20" fill="none" stroke={color} strokeWidth="6" />
            {/* Petite patte coin haut-gauche */}
            <circle cx="35" cy="35" r="6" fill={color} />
            <circle cx="30" cy="24" r="2.5" fill={color} />
            <circle cx="36" cy="22" r="2.5" fill={color} />
            <circle cx="42" cy="25" r="2.5" fill={color} />
            {/* Petite patte coin bas-droite */}
            <circle cx="265" cy="265" r="6" fill={color} />
            <circle cx="260" cy="254" r="2.5" fill={color} />
            <circle cx="266" cy="252" r="2.5" fill={color} />
            <circle cx="272" cy="255" r="2.5" fill={color} />
            <text x="150" y="332" textAnchor="middle" fill={color} fontSize="16" fontWeight="bold" fontFamily="sans-serif">{text}</text>
          </svg>
        );

      // 7. OREILLES DE CHAT INTÉGRÉES SUR LE CADRE
      case 'cat-ears':
        return (
          <svg viewBox="0 0 300 360" width="300" height="360" style={{ display: 'block' }}>
            <path d="M 40 45 L 60 10 L 95 45 Z" fill={color} />
            <path d="M 260 45 L 240 10 L 205 45 Z" fill={color} />
            <rect x="15" y="45" width="270" height="270" rx="20" fill="none" stroke={color} strokeWidth="6" />
            <text x="150" y="342" textAnchor="middle" fill={color} fontSize="16" fontWeight="bold" fontFamily="sans-serif">{text}</text>
          </svg>
        );

      // 8. TÊTE DE CHAT SILHOUETTE GÉANTE
      case 'cat-face':
        return (
          <svg viewBox="0 0 300 360" width="300" height="360" style={{ display: 'block' }}>
            <path d="M 30 100 L 70 20 L 120 70 Q 150 60 180 70 L 230 20 L 270 100 Q 290 180 270 260 Q 150 310 30 260 Z" fill="none" stroke={color} strokeWidth="6" />
            <text x="150" y="335" textAnchor="middle" fill={color} fontSize="16" fontWeight="bold" fontFamily="sans-serif">{text}</text>
          </svg>
        );

      // 9. STYLE CHAT MINIMALISTE
      case 'minimal-cat':
        return (
          <svg viewBox="0 0 300 360" width="300" height="360" style={{ display: 'block' }}>
            <rect x="15" y="15" width="270" height="270" rx="30" fill="none" stroke={color} strokeWidth="6" />
            {/* Moustaches minimalistes sur les côtés */}
            <line x1="0" y1="140" x2="15" y2="135" stroke={color} strokeWidth="3" strokeLinecap="round" />
            <line x1="0" y1="150" x2="15" y2="150" stroke={color} strokeWidth="3" strokeLinecap="round" />
            <line x1="285" y1="135" x2="300" y2="140" stroke={color} strokeWidth="3" strokeLinecap="round" />
            <line x1="285" y1="150" x2="300" y2="150" stroke={color} strokeWidth="3" strokeLinecap="round" />
            <text x="150" y="330" textAnchor="middle" fill={color} fontSize="16" fontWeight="bold" fontFamily="sans-serif">{text}</text>
          </svg>
        );

      // 10. CLASSIQUE MODERNE (Default)
      case 'classic':
      default:
        return (
          <svg viewBox="0 0 300 360" width="300" height="360" style={{ display: 'block' }}>
            <rect x="15" y="15" width="270" height="270" rx="16" fill="none" stroke={color} strokeWidth="6" />
            <rect x="70" y="300" width="160" height="36" rx="8" fill={color} />
            <text x="150" y="323" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="bold" fontFamily="sans-serif">{text}</text>
          </svg>
        );
    }
  };

  // Calcul du décalage pour centrer le QR code selon le modèle
  const getTopOffset = () => {
    if (['cat-header', 'paw-print', 'dog-bone', 'cat-ears'].includes(frameType)) return '60px';
    if (frameType === 'cat-face') return '65px';
    return '30px';
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block', width: '300px', height: '360px' }}>
      {/* Rendu du cadre SVG */}
      {renderFrameSvg()}

      {/* Emplacement du QR Code */}
      <div
        style={{
          position: 'absolute',
          top: getTopOffset(),
          left: '30px',
          width: '240px',
          height: '240px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </div>
    </div>
  );
};
