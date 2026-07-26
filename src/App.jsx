import React, { useState, useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import TypeSelector from './components/TypeSelector';
import FormSelection from './components/FormSelection';
import ModelGrid from './components/ModelGrid';
import Customizer from './components/Customizer';
import DownloadModal from './components/DownloadModal';
import { TEMPLATES } from './data/templates';

export default function App() {
  const [selectedType, setSelectedType] = useState('link');
  const [formData, setFormData] = useState({ url: 'https://google.com' });
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
  const [customStyle, setCustomStyle] = useState(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProUser, setIsProUser] = useState(false); // Passer à true pour les abonnés VIP

  const qrRef = useRef(null);
  const qrCode = useRef(null);

  // Initialisation de la librairie QR Code
  useEffect(() => {
    qrCode.current = new QRCodeStyling({
      width: 260,
      height: 260,
      imageOptions: { margin: 6, hideBackgroundDots: true },
      qrOptions: { errorCorrectionLevel: 'H' }
    });

    if (qrRef.current) {
      qrCode.current.append(qrRef.current);
    }
  }, []);

  // Génération de la valeur du QR Code selon le formulaire
  const getQRValue = () => {
    if (selectedType === 'link') return formData.url || 'https://google.com';
    if (selectedType === 'whatsapp') return `https://wa.me/${formData.phone || ''}?text=${encodeURIComponent(formData.message || '')}`;
    if (selectedType === 'wifi') return `WIFI:S:${formData.ssid || ''};T:WPA;P:${formData.password || ''};;`;
    if (selectedType === 'vcard') return `BEGIN:VCARD\nVERSION:3.0\nN:${formData.name || ''}\nEMAIL:${formData.email || ''}\nEND:VCARD`;
    return 'https://google.com';
  };

  // Mettre à jour le rendu du QR Code quand les options changent
  useEffect(() => {
    if (!qrCode.current) return;

    const currentConfig = customStyle || selectedTemplate.config;

    qrCode.current.update({
      data: getQRValue(),
      image: currentConfig.image || '',
      dotsOptions: currentConfig.dotsOptions,
      cornersSquareOptions: currentConfig.cornersSquareOptions,
      cornersDotOptions: currentConfig.cornersDotOptions
    });
  }, [selectedType, formData, selectedTemplate, customStyle]);

  // Sélection d'un modèle prédéfini
  const handleSelectTemplate = (tpl) => {
    setCustomStyle(null);
    setSelectedTemplate(tpl);
  };

  // Téléchargement effectif du fichier
  const handleDownload = () => {
    if (qrCode.current) {
      qrCode.current.download({ name: 'mon-qr-code', extension: 'png' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center items-start">
      <div className="max-w-4xl w-full bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Colonne de gauche : Formulaire & Personnalisation */}
        <div className="md:col-span-2 space-y-2">
          <h1 className="text-2xl font-black text-gray-900 mb-6">
            Générateur de QR Code Pro
          </h1>

          <TypeSelector 
            selectedType={selectedType} 
            onSelectType={setSelectedType} 
          />

          <FormSelection 
            selectedType={selectedType} 
            formData={formData} 
            setFormData={setFormData} 
          />

          <ModelGrid 
            templates={TEMPLATES} 
            selectedTemplate={selectedTemplate} 
            onSelectTemplate={handleSelectTemplate} 
          />

          <details className="mt-4">
            <summary className="cursor-pointer text-xs font-bold text-gray-500 uppercase tracking-wider hover:text-black">
              ⚙️ Mode Personnalisé Sur-Mesure
            </summary>
            <div className="mt-3">
              <Customizer onApplyCustom={setCustomStyle} />
            </div>
          </details>
        </div>

        {/* Colonne de droite : Aperçu & Action */}
        <div className="flex flex-col items-center justify-between bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center">
          <div>
            <h2 className="text-sm font-extrabold text-gray-700 uppercase tracking-wider mb-4">
              Aperçu en direct
            </h2>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 inline-block">
              <div ref={qrRef} />
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full mt-6 bg-black text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-gray-800 transition active:scale-95"
          >
            Télécharger le QR Code
          </button>
        </div>

      </div>

      {/* Modale avec attente de 30s pub / option VIP */}
      <DownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDownload={handleDownload}
        isProUser={isProUser}
        onUpgrade={() => alert("Redirection vers l'abonnement VIP...")}
      />
    </div>
  );
}
