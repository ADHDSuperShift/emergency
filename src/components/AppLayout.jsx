import React, { useState, useEffect } from 'react';
import EmergencyCard from './EmergencyCard.jsx';

const provinces = [
  'Limpopo',
  'Gauteng', 
  'Western Cape',
  'Eastern Cape',
  'Northern Cape',
  'Free State',
  'KwaZulu-Natal',
  'Mpumalanga',
  'North West'
];

const AppLayout = () => {
  const [selectedProvince, setSelectedProvince] = useState('');
  const [searchTown, setSearchTown] = useState('');
  const [provinceData, setProvinceData] = useState(null);
  const [filteredServices, setFilteredServices] = useState([]);
  const [availableTowns, setAvailableTowns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadProvinceData = async (province) => {
    setLoading(true);
    setError('');
    try {
      const fileName = province.toLowerCase().replace(/\s+/g, '-');
      const response = await fetch(`/data/${fileName}.json`);
      
      if (!response.ok) {
        throw new Error('Province data not found');
      }
      
      const data = await response.json();
      setProvinceData(data);
      setAvailableTowns(Object.keys(data.towns));
      setSearchTown('');
      setFilteredServices([]);
    } catch (err) {
      setError('Unable to load province data. Please try again.');
      setProvinceData(null);
      setAvailableTowns([]);
    } finally {
      setLoading(false);
    }
  };

  const filterServicesByTown = (townName) => {
    if (!provinceData || !townName) {
      setFilteredServices([]);
      return;
    }

    const matchingTown = Object.keys(provinceData.towns).find(
      town => town.toLowerCase().includes(townName.toLowerCase())
    );

    if (matchingTown) {
      setFilteredServices(provinceData.towns[matchingTown]);
    } else {
      setFilteredServices([]);
    }
  };

  useEffect(() => {
    if (selectedProvince) {
      loadProvinceData(selectedProvince);
    }
  }, [selectedProvince]);

  useEffect(() => {
    filterServicesByTown(searchTown);
  }, [searchTown, provinceData]);

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
  };

  const handleTownSearch = (e) => {
    setSearchTown(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-primary">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <img 
              src="sdb.jpg" 
              alt="SDB logo" 
              className="w-20 h-20 rounded-full object-cover"
            />
            <h1 className="text-xl font-bold text-primary">SA Emergency Numbers</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="bg-primary text-primary-foreground rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-2">Find Emergency Services</h2>
          <p className="text-primary-foreground/80">Quick access to police, fire, ambulance, and hospital numbers across South Africa</p>
        </div>

        {/* Picture Section */}
        <div className="bg-white rounded-lg p-3 sm:p-6 mb-6 shadow-sm">
          <div className="rounded-lg overflow-hidden bg-muted border border-border">
            <img
              src="ChatGPT Image Sep 28, 2025, 04_49_00 PM.png"
              alt="Emergency services illustration"
              className="w-full h-72 sm:h-96 lg:h-[32rem] object-cover"
            />
          </div>
        </div>

        {/* Province and Town Selectors */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:gap-4 space-y-4 sm:space-y-0">
            {/* Province Selector */}
            <div className="flex-1">
              <label htmlFor="province-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select Province
              </label>
              <select
                id="province-select"
                value={selectedProvince}
                onChange={handleProvinceChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">Choose a province...</option>
                {provinces.map(province => (
                  <option key={province} value={province}>{province}</option>
                ))}
              </select>
            </div>

            {/* Town Search */}
            <div className={`flex-1 ${selectedProvince ? "" : "opacity-50"}`}>
              <label htmlFor="town-search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Town/City
              </label>
              <input
                id="town-search"
                type="text"
                value={searchTown}
                onChange={handleTownSearch}
                placeholder="Type town or city name..."
                disabled={!selectedProvince}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>
          
          {/* Available towns display */}
          {selectedProvince && availableTowns.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="text-xs text-gray-600">
                Available: {availableTowns.join(', ')}
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-2 text-gray-600">Loading emergency services...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-4">
            <p className="text-primary">{error}</p>
          </div>
        )}

        {/* Results */}
        {filteredServices.length > 0 && (
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Emergency Services in {searchTown}
            </h3>
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
              {filteredServices.map((service, index) => (
                <div key={index} className="h-full">
                  <EmergencyCard service={service} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {searchTown && selectedProvince && filteredServices.length === 0 && !loading && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-yellow-800 mb-2">No services found</h3>
            <p className="text-yellow-700">
              No emergency services listed for "{searchTown}". 
              <br />
              <strong>Use national emergency number: 10177</strong>
            </p>
          </div>
        )}

        {/* Emergency Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">🚨 Emergency Tips</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• National emergency number: <strong>10177</strong></li>
            <li>• Police emergency: <strong>10111</strong></li>
            <li>• Fire emergency: <strong>10177</strong></li>
            <li>• Medical emergency: <strong>10177</strong></li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-300 mb-2">
            ⚠️ <strong>Disclaimer:</strong> Verify numbers locally. This app is informational only.
          </p>
          <p className="text-xs text-gray-400">
            Always call 10177 for immediate emergency assistance if local numbers are unavailable.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;