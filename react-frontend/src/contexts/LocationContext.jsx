import { createContext, useContext, useState, useEffect } from 'react';
import { getLocationFromIP } from '../utils/locationUtils';

const LocationContext = createContext();

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationContext must be used within LocationProvider');
  }
  return context;
};

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedLocation = localStorage.getItem('kisanSetuLocation');
    const locationEnabled = localStorage.getItem('kisanSetuLocationEnabled');
    
    if (savedLocation && locationEnabled === 'true') {
      try {
        const parsed = JSON.parse(savedLocation);
        if (parsed.city && parsed.state) {
          setLocation(parsed);
          return;
        }
      } catch (error) {
        console.error('Invalid saved location:', error);
      }
    }
    
    // Set default location if no valid saved location
    const defaultLocation = {
      latitude: 28.6139,
      longitude: 77.2090,
      city: 'Delhi',
      state: 'Delhi',
      country: 'India',
      pincode: '110001',
      district: 'Delhi'
    };
    
    setLocation(defaultLocation);
  }, []);

  const updateLocation = (newLocation) => {
    setLocation(newLocation);
    localStorage.setItem('kisanSetuLocation', JSON.stringify(newLocation));
  };

  const getCurrentLocation = async () => {
    setLoading(true);
    try {
      // Get GPS coordinates first
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
          }
        );
      });

      const { latitude, longitude } = position.coords;
      
      // Reverse geocode to get city/state
      try {
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );
        const data = await response.json();
        
        const locationData = {
          latitude,
          longitude,
          city: data.city || data.locality || data.principalSubdivision || 'Unknown',
          state: data.principalSubdivision || 'Unknown',
          country: data.countryName || 'India',
          pincode: data.postcode || '000000',
          district: data.localityInfo?.administrative?.[2]?.name || data.city || 'Unknown'
        };
        
        updateLocation(locationData);
        return locationData;
      } catch (geocodeError) {
        // Fallback with coordinates only
        const basicLocation = {
          latitude,
          longitude,
          city: 'GPS Location',
          state: 'Detected',
          country: 'India',
          pincode: '000000',
          district: 'GPS Area'
        };
        updateLocation(basicLocation);
        return basicLocation;
      }
    } catch (error) {
      console.error('GPS location failed:', error);
      // IP-based fallback
      try {
        const locationData = await getLocationFromIP();
        updateLocation(locationData);
        return locationData;
      } catch (ipError) {
        // Final fallback
        const defaultLocation = {
          latitude: 28.6139,
          longitude: 77.2090,
          city: 'Delhi',
          state: 'Delhi',
          country: 'India',
          pincode: '110001',
          district: 'Delhi'
        };
        updateLocation(defaultLocation);
        return defaultLocation;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocationContext.Provider value={{
      location,
      loading,
      updateLocation,
      getCurrentLocation,
      hasLocation: !!location
    }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;