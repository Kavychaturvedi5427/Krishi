import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LocationBanner from '../components/common/LocationBanner';
import LocationPrompt from '../components/common/LocationPrompt';

const Landing = () => {
  const { language, setLanguage } = useAuth();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoaded(true);
      // Show location prompt if not enabled
      const locationEnabled = localStorage.getItem('krishiLocationEnabled');
      if (!locationEnabled) {
        setTimeout(() => setShowLocationPrompt(true), 1500);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const translations = {
    en: {
      title: 'KisanSetu',
      subtitle: 'Your Trusted Digital Farming Partner',
      heroTitle: 'Grow Smarter, Earn Better',
      heroSubtitle: 'Join 10,000+ farmers already increasing their income by 40%',
      description: 'Get expert farming advice, real-time weather alerts, fair market prices, and sell directly to buyers - all in one trusted platform.',
      getStarted: 'Start Free Today',
      login: 'Login',
      watchDemo: 'Watch Demo',
      features: 'Why Farmers Choose KisanSetu',
      weatherTitle: 'Smart Weather Alerts',
      weatherDesc: 'Get personalized farming advice based on 7-day weather forecasts',
      marketTitle: 'Fair Price Guarantee',
      marketDesc: 'Sell directly to buyers and get 15-30% better prices than local markets',
      aiTitle: 'Expert Crop Doctor',
      aiDesc: 'Instant crop disease detection and treatment recommendations from agricultural experts',
      dashboardTitle: 'Track Your Success',
      dashboardDesc: 'Monitor crop health, income, and farming efficiency with easy-to-use reports',
      trustTitle: 'Trusted by Farmers Across India',
      testimonial1: '"My income increased by ₹50,000 this season using KisanSetu marketplace"',
      testimonial1Author: '- Ramesh Kumar, Wheat Farmer, Punjab',
      testimonial2: '"The weather alerts saved my tomato crop from unexpected rain"',
      testimonial2Author: '- Priya Devi, Vegetable Farmer, Maharashtra',
      testimonial3: '"Crop disease detection helped me treat my cotton plants early"',
      testimonial3Author: '- Suresh Patel, Cotton Farmer, Gujarat',
      benefitsTitle: 'Real Results for Real Farmers',
      benefit1: 'Increase Income',
      benefit1Desc: 'Earn 15-40% more by selling directly to buyers',
      benefit2: 'Save Crops',
      benefit2Desc: 'Early disease detection prevents 60% crop loss',
      benefit3: 'Reduce Costs',
      benefit3Desc: 'Smart recommendations cut input costs by 25%',
      benefit4: 'Save Time',
      benefit4Desc: 'Get all farming info in one place, save 5+ hours weekly',
      ctaTitle: 'Ready to Transform Your Farming?',
      ctaSubtitle: 'Join thousands of successful farmers. Start your free account today.',
      guarantee: '✓ Free to start ✓ No hidden fees ✓ Cancel anytime',
      footer: '© 2025 KisanSetu | Empowering Indian Farmers Since 2024'
    },
    hi: {
      title: 'किसानसेतु',
      subtitle: 'आपका विश्वसनीय डिजिटल खेती साथी',
      heroTitle: 'स्मार्ट खेती, बेहतर कमाई',
      heroSubtitle: '10,000+ किसान पहले से ही अपनी आय 40% बढ़ा चुके हैं',
      description: 'विशेषज्ञ खेती सलाह, मौसम अलर्ट, उचित बाजार भाव, और सीधे खरीदारों को बेचें - सब एक ही भरोसेमंद प्लेटफॉर्म पर।',
      getStarted: 'आज ही मुफ्त शुरू करें',
      login: 'लॉगिन',
      watchDemo: 'डेमो देखें',
      features: 'किसान क्यों चुनते हैं किसानसेतु',
      weatherTitle: 'स्मार्ट मौसम अलर्ट',
      weatherDesc: '7-दिन के मौसम पूर्वानुमान के आधार पर व्यक्तिगत खेती सलाह पाएं',
      marketTitle: 'उचित मूल्य गारंटी',
      marketDesc: 'सीधे खरीदारों को बेचें और स्थानीय बाजार से 15-30% बेहतर कीमत पाएं',
      aiTitle: 'विशेषज्ञ फसल डॉक्टर',
      aiDesc: 'तुरंत फसल रोग पहचान और कृषि विशेषज्ञों से उपचार सुझाव',
      dashboardTitle: 'अपनी सफलता ट्रैक करें',
      dashboardDesc: 'आसान रिपोर्ट्स के साथ फसल स्वास्थ्य, आय और खेती दक्षता की निगरानी करें',
      trustTitle: 'भारत भर के किसानों का भरोसा',
      testimonial1: '"किसानसेतु मार्केटप्लेस से इस सीजन मेरी आय ₹50,000 बढ़ी"',
      testimonial1Author: '- रमेश कुमार, गेहूं किसान, पंजाब',
      testimonial2: '"मौसम अलर्ट ने मेरी टमाटर की फसल को अचानक बारिश से बचाया"',
      testimonial2Author: '- प्रिया देवी, सब्जी किसान, महाराष्ट्र',
      testimonial3: '"फसल रोग पहचान से मैंने अपने कपास के पौधों का जल्दी इलाज किया"',
      testimonial3Author: '- सुरेश पटेल, कपास किसान, गुजरात',
      benefitsTitle: 'असली किसानों के लिए असली परिणाम',
      benefit1: 'आय बढ़ाएं',
      benefit1Desc: 'सीधे खरीदारों को बेचकर 15-40% अधिक कमाएं',
      benefit2: 'फसल बचाएं',
      benefit2Desc: 'जल्दी रोग पहचान से 60% फसल नुकसान रोकें',
      benefit3: 'लागत कम करें',
      benefit3Desc: 'स्मार्ट सुझावों से इनपुट लागत 25% कम करें',
      benefit4: 'समय बचाएं',
      benefit4Desc: 'एक जगह सभी खेती जानकारी, साप्ताहिक 5+ घंटे बचाएं',
      ctaTitle: 'अपनी खेती को बदलने के लिए तैयार हैं?',
      ctaSubtitle: 'हजारों सफल किसानों से जुड़ें। आज ही अपना मुफ्त खाता शुरू करें।',
      guarantee: '✓ शुरू करना मुफ्त ✓ कोई छुपी फीस नहीं ✓ कभी भी रद्द करें',
      footer: '© 2025 किसानसेतु | 2024 से भारतीय किसानों को सशक्त बना रहे हैं'
    }
  };

  const t = translations[language];

  if (!pageLoaded) {
    return (
      <div className="fixed inset-0 bg-gradient-to-r from-green-600 to-orange-500 flex items-center justify-center z-50">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold">🌾 Krishi</h2>
          <p className="text-lg opacity-90">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 transition-all duration-700 ease-in-out">
      {/* Location Banner */}
      <LocationBanner />
      
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto mobile-px px-4 mobile-py py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 sm:gap-3">
              <img src="/Krishi.png.jpeg" alt="Krishi Logo" className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-contain" />
              <h1 className="text-lg sm:text-2xl font-bold text-green-600">{t.title}</h1>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-2 py-1 sm:px-3 sm:py-2 border border-gray-300 rounded-lg bg-white text-green-600 font-semibold text-sm sm:text-base"
              >
                <option value="en">EN</option>
                <option value="hi">हिं</option>
              </select>
              
              <Link
                to="/login"
                className="bg-green-600 text-white px-3 py-2 sm:px-6 sm:py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm sm:text-base"
              >
                {t.login}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-24 text-center mobile-px bg-gradient-to-br from-green-50 via-white to-orange-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left Content */}
            <div className="flex-1 text-left lg:text-left">
              <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                🌾 Trusted by 10,000+ Farmers
              </div>
              
              <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                {t.heroTitle}
              </h1>
              
              <p className="text-xl sm:text-2xl text-green-600 font-semibold mb-6">
                {t.heroSubtitle}
              </p>
              
              <p className="text-lg text-gray-700 mb-8 max-w-2xl">
                {t.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link
                  to="/register"
                  className="bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-green-700 transition-all duration-300 hover:scale-105 shadow-xl min-h-[56px] flex items-center justify-center"
                >
                  {t.getStarted} →
                </Link>
                <button className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-50 transition-all duration-300 min-h-[56px] flex items-center justify-center">
                  📹 {t.watchDemo}
                </button>
              </div>
              
              <p className="text-sm text-gray-600">{t.guarantee}</p>
            </div>
            
            {/* Right Image */}
            <div className="flex-1 relative">
              <div className="relative bg-gradient-to-br from-green-400 to-green-600 rounded-3xl p-8 shadow-2xl">
                <img src="/Krishi.png.jpeg" alt="KisanSetu Dashboard" className="w-full h-64 sm:h-80 object-cover rounded-2xl shadow-lg" />
                
                {/* Floating Stats */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-lg">
                  <div className="text-2xl font-bold text-green-600">₹50K+</div>
                  <div className="text-sm text-gray-600">Extra Income</div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg">
                  <div className="text-2xl font-bold text-orange-500">95%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto mobile-px px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">{t.benefitsTitle}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'hi' ? 'हजारों किसानों ने पहले से ही अपनी आय और फसल की गुणवत्ता में सुधार देखा है' : 'Thousands of farmers have already seen improvements in their income and crop quality'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <span className="text-3xl text-white">💰</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{t.benefit1}</h3>
              <p className="text-gray-600 text-lg">{t.benefit1Desc}</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <span className="text-3xl text-white">🌱</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{t.benefit2}</h3>
              <p className="text-gray-600 text-lg">{t.benefit2Desc}</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <span className="text-3xl text-white">📉</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{t.benefit3}</h3>
              <p className="text-gray-600 text-lg">{t.benefit3Desc}</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <span className="text-3xl text-white">⏰</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{t.benefit4}</h3>
              <p className="text-gray-600 text-lg">{t.benefit4Desc}</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto mobile-px px-4">
          <h2 className="text-3xl sm:text-5xl font-bold text-center text-gray-900 mb-16">{t.features}</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-start gap-6">
                <div className="bg-blue-100 p-4 rounded-2xl">
                  <span className="text-4xl">🌤️</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{t.weatherTitle}</h3>
                  <p className="text-gray-600 text-lg mb-4">{t.weatherDesc}</p>
                  <div className="text-sm text-blue-600 font-semibold">
                    {language === 'hi' ? '✓ 7-दिन पूर्वानुमान ✓ व्यक्तिगत अलर्ट ✓ फसल सुझाव' : '✓ 7-day forecast ✓ Personal alerts ✓ Crop recommendations'}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-start gap-6">
                <div className="bg-green-100 p-4 rounded-2xl">
                  <span className="text-4xl">💰</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{t.marketTitle}</h3>
                  <p className="text-gray-600 text-lg mb-4">{t.marketDesc}</p>
                  <div className="text-sm text-green-600 font-semibold">
                    {language === 'hi' ? '✓ सीधे खरीदार ✓ बेहतर कीमत ✓ तुरंत भुगतान' : '✓ Direct buyers ✓ Better prices ✓ Instant payment'}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-start gap-6">
                <div className="bg-purple-100 p-4 rounded-2xl">
                  <span className="text-4xl">🩺</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{t.aiTitle}</h3>
                  <p className="text-gray-600 text-lg mb-4">{t.aiDesc}</p>
                  <div className="text-sm text-purple-600 font-semibold">
                    {language === 'hi' ? '✓ तुरंत पहचान ✓ विशेषज्ञ सलाह ✓ उपचार गाइड' : '✓ Instant detection ✓ Expert advice ✓ Treatment guide'}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-start gap-6">
                <div className="bg-orange-100 p-4 rounded-2xl">
                  <span className="text-4xl">📊</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{t.dashboardTitle}</h3>
                  <p className="text-gray-600 text-lg mb-4">{t.dashboardDesc}</p>
                  <div className="text-sm text-orange-600 font-semibold">
                    {language === 'hi' ? '✓ आसान रिपोर्ट्स ✓ आय ट्रैकिंग ✓ फसल विश्लेषण' : '✓ Easy reports ✓ Income tracking ✓ Crop analysis'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto mobile-px px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">{t.trustTitle}</h2>
            <p className="text-xl opacity-90">
              {language === 'hi' ? 'देखें कि अन्य किसान कैसे सफल हो रहे हैं' : 'See how other farmers are succeeding'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-lg mb-4 italic">{t.testimonial1}</p>
              <p className="text-sm opacity-80">{t.testimonial1Author}</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-lg mb-4 italic">{t.testimonial2}</p>
              <p className="text-sm opacity-80">{t.testimonial2Author}</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-lg mb-4 italic">{t.testimonial3}</p>
              <p className="text-sm opacity-80">{t.testimonial3Author}</p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl sm:text-6xl font-bold mb-2">10,000+</div>
              <p className="text-lg opacity-90">{language === 'hi' ? 'सफल किसान' : 'Successful Farmers'}</p>
            </div>
            <div>
              <div className="text-4xl sm:text-6xl font-bold mb-2">₹2Cr+</div>
              <p className="text-lg opacity-90">{language === 'hi' ? 'अतिरिक्त आय' : 'Extra Income Generated'}</p>
            </div>
            <div>
              <div className="text-4xl sm:text-6xl font-bold mb-2">28</div>
              <p className="text-lg opacity-90">{language === 'hi' ? 'राज्य' : 'States Covered'}</p>
            </div>
            <div>
              <div className="text-4xl sm:text-6xl font-bold mb-2">95%</div>
              <p className="text-lg opacity-90">{language === 'hi' ? 'संतुष्टि दर' : 'Satisfaction Rate'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center bg-gradient-to-br from-orange-50 to-green-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              {t.ctaTitle}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t.ctaSubtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                to="/register"
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:from-green-700 hover:to-green-800 transition-all duration-300 hover:scale-105 shadow-xl min-h-[64px] flex items-center justify-center"
              >
                {t.getStarted} 🚀
              </Link>
              <Link
                to="/login"
                className="border-2 border-green-600 text-green-600 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-green-50 transition-all duration-300 min-h-[64px] flex items-center justify-center"
              >
                {t.login}
              </Link>
            </div>
            
            <p className="text-lg text-gray-600 font-semibold">{t.guarantee}</p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-green-500">🔒</span>
                <span className="font-semibold">{language === 'hi' ? 'सुरक्षित डेटा' : 'Secure Data'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-blue-500">📱</span>
                <span className="font-semibold">{language === 'hi' ? 'मोबाइल फ्रेंडली' : 'Mobile Friendly'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-purple-500">🎯</span>
                <span className="font-semibold">{language === 'hi' ? 'विशेषज्ञ सहायता' : 'Expert Support'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/Krishi.png.jpeg" alt="Krishi Logo" className="w-10 h-10 rounded-full object-contain" />
            <h3 className="text-xl font-bold">{t.title}</h3>
          </div>
          <p className="text-gray-400">{t.footer}</p>
        </div>
      </footer>
      
      {/* Location Prompt */}
      <LocationPrompt 
        isOpen={showLocationPrompt} 
        onClose={() => {
          setShowLocationPrompt(false);
          localStorage.setItem('krishiLocationEnabled', 'true');
        }} 
      />
    </div>
  );
};

export default Landing;