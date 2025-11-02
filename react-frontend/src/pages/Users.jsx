import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { usersAPI } from '../services/api';
import MobileNav from '../components/common/MobileNav';
import { Users, ArrowLeft, User, Mail, Phone, Calendar, Shield } from 'lucide-react';

const UsersPage = () => {
  const { user, language } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      
      // Check if user is admin
      if (user?.user_type !== 'admin') {
        setAccessDenied(true);
        setLoading(false);
        return;
      }
      
      const response = await usersAPI.getAllUsers();
      setUsers(response.data || []);
    } catch (error) {
      console.error('Error loading users:', error);
      if (error.response?.status === 403) {
        setAccessDenied(true);
      }
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const translations = {
    en: {
      title: 'Registered Users',
      subtitle: 'All users registered on Kisan Setu platform',
      totalUsers: 'Total Users',
      farmers: 'Farmers',
      consumers: 'Consumers',
      vendors: 'Vendors',
      admins: 'Admins',
      noUsers: 'No users found',
      loading: 'Loading users...',
      joinedOn: 'Joined on',
      active: 'Active',
      inactive: 'Inactive',
      accessDenied: 'Access Denied',
      adminOnly: 'This page is only accessible to administrators.',
      backToDashboard: 'Back to Dashboard'
    },
    hi: {
      title: 'पंजीकृत उपयोगकर्ता',
      subtitle: 'किसान सेतु प्लेटफॉर्म पर पंजीकृत सभी उपयोगकर्ता',
      totalUsers: 'कुल उपयोगकर्ता',
      farmers: 'किसान',
      consumers: 'उपभोक्ता',
      vendors: 'विक्रेता',
      admins: 'प्रशासक',
      noUsers: 'कोई उपयोगकर्ता नहीं मिला',
      loading: 'उपयोगकर्ता लोड हो रहे हैं...',
      joinedOn: 'शामिल हुए',
      active: 'सक्रिय',
      inactive: 'निष्क्रिय',
      accessDenied: 'पहुंच अस्वीकृत',
      adminOnly: 'यह पेज केवल प्रशासकों के लिए उपलब्ध है।',
      backToDashboard: 'डैशबोर्ड पर वापस'
    }
  };

  const t = translations[language];

  const getUserTypeIcon = (userType) => {
    switch (userType) {
      case 'farmer': return '👨‍🌾';
      case 'consumer': return '👨‍💼';
      case 'vendor': return '🏪';
      case 'admin': return '👑';
      default: return '👤';
    }
  };

  const getUserTypeColor = (userType) => {
    switch (userType) {
      case 'farmer': return 'bg-green-100 text-green-800';
      case 'consumer': return 'bg-blue-100 text-blue-800';
      case 'vendor': return 'bg-purple-100 text-purple-800';
      case 'admin': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    total: users.length,
    farmers: users.filter(u => u.user_type === 'farmer').length,
    consumers: users.filter(u => u.user_type === 'consumer').length,
    vendors: users.filter(u => u.user_type === 'vendor').length,
    admins: users.filter(u => u.user_type === 'admin').length
  };

  return (
    <div className="min-h-screen bg-gray-50 safe-area-top">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-green-600 safe-area-top">
        <div className="max-w-7xl mx-auto mobile-px px-4 sm:px-6 mobile-py py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4 flex-1">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-green-600 hover:text-green-700 font-semibold min-h-[44px] min-w-[44px] flex items-center justify-center sm:justify-start"
              >
                <ArrowLeft className="w-5 h-5 sm:mr-2" />
                <span className="hidden sm:inline">Dashboard</span>
              </button>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-green-600">{t.title}</h1>
                <p className="text-xs sm:text-sm text-gray-600">{t.subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto mobile-px px-4 sm:px-6 py-4 sm:py-6">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 mb-6">
          <div className="bg-white rounded-xl mobile-card p-3 sm:p-4 text-center shadow-lg">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-xs sm:text-sm text-gray-600">{t.totalUsers}</div>
          </div>
          <div className="bg-white rounded-xl mobile-card p-3 sm:p-4 text-center shadow-lg">
            <div className="text-2xl sm:text-3xl font-bold text-green-600">{stats.farmers}</div>
            <div className="text-xs sm:text-sm text-gray-600">{t.farmers}</div>
          </div>
          <div className="bg-white rounded-xl mobile-card p-3 sm:p-4 text-center shadow-lg">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600">{stats.consumers}</div>
            <div className="text-xs sm:text-sm text-gray-600">{t.consumers}</div>
          </div>
          <div className="bg-white rounded-xl mobile-card p-3 sm:p-4 text-center shadow-lg">
            <div className="text-2xl sm:text-3xl font-bold text-orange-600">{stats.vendors}</div>
            <div className="text-xs sm:text-sm text-gray-600">{t.vendors}</div>
          </div>
          <div className="bg-white rounded-xl mobile-card p-3 sm:p-4 text-center shadow-lg">
            <div className="text-2xl sm:text-3xl font-bold text-red-600">{stats.admins}</div>
            <div className="text-xs sm:text-sm text-gray-600">{t.admins}</div>
          </div>
        </div>

        {/* Users List */}
        <div className="bg-white rounded-xl shadow-lg">
          {accessDenied ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-red-600 mb-2">{t.accessDenied}</h3>
              <p className="text-gray-600 mb-4">{t.adminOnly}</p>
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                {t.backToDashboard}
              </button>
            </div>
          ) : loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-3 text-gray-600">{t.loading}</span>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">{t.noUsers}</h3>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {users.map((user, index) => (
                <div key={user.id || index} className="mobile-card p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl flex-shrink-0">
                        {user.full_name ? user.full_name.charAt(0).toUpperCase() : '?'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                            {user.full_name || 'Unknown User'}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUserTypeColor(user.user_type)}`}>
                            {getUserTypeIcon(user.user_type)} {user.user_type}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                            <User className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            <span className="truncate">{user.username}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                            <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            <span className="truncate">{user.email}</span>
                          </div>
                          {user.phone && (
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                              <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <span>{user.phone}</span>
                            </div>
                          )}
                          {user.created_at && (
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <span>{t.joinedOn} {new Date(user.created_at).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      <div className={`w-3 h-3 rounded-full ${user.is_active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="text-xs text-gray-500 hidden sm:inline">
                        {user.is_active ? t.active : t.inactive}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden pb-20">
        <MobileNav />
      </div>
    </div>
  );
};

export default UsersPage;