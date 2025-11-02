import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLocationContext } from '../../contexts/LocationContext';
import { MapPin, X, Check, Navigation } from 'lucide-react';

const LocationService = ({ onLocationUpdate }) => {
  const { language } = useAuth();
  const { location, getCurrentLocation, loading } = useLocationContext();
  const [showPrompt, setShowPrompt] = useState(false);
  const [useGPS, setUseGPS] = useState(true);

  useEffect(() => {
    const locationEnabled = localStorage.getItem('kisanSetuLocationEnabled');
    if (!locationEnabled && !location) {
      setTimeout(() => setShowPrompt(true), 2000);
    }
  }, [location]);



  const handleEnableGPS = async () => {
    localStorage.setItem('kisanSetuLocationEnabled', 'true');
    setShowPrompt(false);
    const newLocation = await getCurrentLocation();
    onLocationUpdate?.(newLocation);
  };

  const handleManualSelect = () => {
    localStorage.setItem('kisanSetuLocationEnabled', 'manual');
    setShowPrompt(false);
    setUseGPS(false);
  };

  const handleDeny = () => {
    localStorage.setItem('kisanSetuLocationEnabled', 'false');
    setShowPrompt(false);
  };

  const translations = {
    en: {
      title: 'Enable Location Services',
      description: 'Get personalized weather, nearby farmers/consumers, and local market prices based on your exact location.',
      benefits: [
        '📍 Accurate GPS location detection',
        '🌤️ Local weather for your area',
        '👥 Find nearby users within 50km', 
        '💰 Regional market prices',
        '🚚 Precise delivery estimates',
        '🏪 Local farmer products'
      ],
      enableGPS: 'Use My Location (GPS)',
      selectManual: 'Choose Manually',
      deny: 'Skip',
      detecting: 'Getting your location...'
    },
    hi: {
      title: 'स्थान सेवा सक्षम करें',
      description: 'अपने सही स्थान के आधार पर व्यक्तिगत मौसम, आस-पास के किसान/उपभोक्ता, और स्थानीय बाजार भाव प्राप्त करें।',
      benefits: [
        '📍 सटीक GPS स्थान पहचान',
        '🌤️ आपके क्षेत्र का मौसम',
        '👥 50 किमी के भीतर उपयोगकर्ता खोजें',
        '💰 क्षेत्रीय बाजार भाव', 
        '🚚 सही डिलीवरी अनुमान',
        '🏪 स्थानीय किसान उत्पाद'
      ],
      enableGPS: 'मेरा स्थान उपयोग करें (GPS)',
      selectManual: 'मैनुअल चुनें',
      deny: 'छोड़ें',
      detecting: 'आपका स्थान पता कर रहे हैं...'
    }
  };

  const t = translations[language];

  if (!showPrompt && !loading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">{t.title}</h2>
          <p className="text-gray-600 text-sm">{t.description}</p>
        </div>

        <div className="space-y-3 mb-6">
          {t.benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-sm text-gray-700">{benefit}</span>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-4">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">{t.detecting}</p>
          </div>
        ) : (
          <div className="space-y-3">
            <button
              onClick={handleEnableGPS}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Navigation className="w-4 h-4" />
              {t.enableGPS}
            </button>
            <button
              onClick={handleManualSelect}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t.selectManual}
            </button>
            <button
              onClick={handleDeny}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {t.deny}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationService;