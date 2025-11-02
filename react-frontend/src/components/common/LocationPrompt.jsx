import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLocationContext } from '../../contexts/LocationContext';
import LocationSelector from './LocationSelector';
import { MapPin, Navigation, Settings } from 'lucide-react';

const LocationPrompt = ({ isOpen, onClose }) => {
  const { language } = useAuth();
  const { getCurrentLocation, loading } = useLocationContext();
  const [showSelector, setShowSelector] = useState(false);

  const translations = {
    en: {
      title: 'Enable Location Services',
      subtitle: 'Get accurate location-based farming services',
      useGPS: 'Use My GPS Location',
      selectManual: 'Choose City Manually',
      skip: 'Skip for now',
      detecting: 'Getting your location...'
    },
    hi: {
      title: 'स्थान सेवा सक्षम करें',
      subtitle: 'सही स्थान-आधारित कृषि सेवाएं पाएं',
      useGPS: 'मेरा GPS स्थान उपयोग करें',
      selectManual: 'शहर मैनुअल चुनें',
      skip: 'अभी छोड़ें',
      detecting: 'आपका स्थान पता कर रहे हैं...'
    }
  };

  const t = translations[language];

  const handleGPSLocation = async () => {
    try {
      await getCurrentLocation();
      localStorage.setItem('kisanSetuLocationEnabled', 'true');
      onClose();
    } catch (error) {
      console.error('GPS location failed:', error);
      alert(language === 'hi' ? 'GPS स्थान पता नहीं कर सका। कृपया मैनुअल चुनाव करें।' : 'Could not get GPS location. Please select manually.');
    }
  };

  const handleManualSelect = () => {
    setShowSelector(true);
  };

  const handleSelectorClose = () => {
    setShowSelector(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">{t.title}</h2>
            <p className="text-gray-600 text-sm">{t.subtitle}</p>
          </div>

          {loading ? (
            <div className="text-center py-4">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">{t.detecting}</p>
            </div>
          ) : (
            <div className="space-y-3">
              <button
                onClick={handleGPSLocation}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Navigation className="w-4 h-4" />
                {t.useGPS}
              </button>
              <button
                onClick={handleManualSelect}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Settings className="w-4 h-4" />
                {t.selectManual}
              </button>
              <button
                onClick={onClose}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {t.skip}
              </button>
            </div>
          )}
        </div>
      </div>
      
      <LocationSelector 
        isOpen={showSelector} 
        onClose={handleSelectorClose} 
      />
    </>
  );
};

export default LocationPrompt;