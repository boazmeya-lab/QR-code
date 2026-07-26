import React from 'react';

export default function FormSelection({ selectedType, formData, setFormData }) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-100">
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
        2. Entrez les informations
      </label>

      {selectedType === 'link' && (
        <input
          type="url"
          name="url"
          value={formData.url || ''}
          onChange={handleChange}
          placeholder="https://ton-site.com"
          className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
      )}

      {selectedType === 'whatsapp' && (
        <div className="space-y-3">
          <input
            type="tel"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            placeholder="Numéro de téléphone (ex: +243...)"
            className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="text"
            name="message"
            value={formData.message || ''}
            onChange={handleChange}
            placeholder="Message prédéfini (optionnel)"
            className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      )}

      {selectedType === 'wifi' && (
        <div className="space-y-3">
          <input
            type="text"
            name="ssid"
            value={formData.ssid || ''}
            onChange={handleChange}
            placeholder="Nom du réseau Wi-Fi (SSID)"
            className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="password"
            name="password"
            value={formData.password || ''}
            onChange={handleChange}
            placeholder="Mot de passe du Wi-Fi"
            className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      )}

      {selectedType === 'vcard' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            placeholder="Nom complet"
            className="p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            placeholder="Adresse Email"
            className="p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      )}
    </div>
  );
}
