import { useState } from 'react';
import { Mic, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useAuth();

  const translations = {
    en: {
      title: 'AI Voice Assistant',
      comingSoon: 'Coming Soon!',
      description: 'Voice-powered farming assistant will be available soon. Ask questions about crops, weather, and farming tips in Hindi or English.',
      features: [
        '🎤 Voice commands in Hindi & English',
        '🌾 Crop health diagnosis',
        '🌤️ Weather updates & farming tips',
        '💰 Market price inquiries',
        '🤖 Smart farming recommendations'
      ]
    },
    hi: {
      title: 'AI आवाज सहायक',
      comingSoon: 'जल्द आ रहा है!',
      description: 'आवाज संचालित कृषि सहायक जल्द ही उपलब्ध होगा। फसल, मौसम और कृषि सुझावों के बारे में हिंदी या अंग्रेजी में प्रश्न पूछें।',
      features: [
        '🎤 हिंदी और अंग्रेजी में आवाज कमांड',
        '🌾 फसल स्वास्थ्य निदान',
        '🌤️ मौसम अपडेट और कृषि सुझाव',
        '💰 बाजार मूल्य पूछताछ',
        '🤖 स्मार्ट कृषि सिफारिशें'
      ]
    }
  };

  const t = translations[language];

  return (
    <>
      {/* Floating AI Assistant Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 z-40 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 min-h-[56px] min-w-[56px] flex items-center justify-center"
      >
        <Mic className="w-6 h-6" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative animate-pulse-slow">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mic className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">{t.title}</h2>
              <div className="text-2xl font-bold text-purple-600 mb-3">{t.comingSoon}</div>
              <p className="text-gray-600 text-sm">{t.description}</p>
            </div>

            <div className="space-y-3">
              {t.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <div className="text-xs text-gray-500">
                {language === 'hi' ? 'जल्द ही लॉन्च होगा!' : 'Launching Soon!'}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;