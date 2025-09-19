import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const gradientPalette = [
  { start: '#ff9a9e', end: '#fecfef' },
  { start: '#a18cd1', end: '#fbc2eb' },
  { start: '#fad0c4', end: '#ffd1ff' },
  { start: '#ffecd2', end: '#fcb69f' },
  { start: '#cfd9df', end: '#e2ebf0' },
  { start: '#f6d365', end: '#fda085' },
];

const getGradientColors = (id) => {
  
  return gradientPalette[id % gradientPalette.length];
};


const SweetCard = ({ sweet, onPurchase, purchasing }) => {
  const isOutOfStock = sweet.quantity <= 0;
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [quantityError, setQuantityError] = useState('');
  
  const handlePurchaseClick = () => {
    if (isOutOfStock || isPurchasing) return;
    setQuantity(1); 
    setQuantityError('');
    setShowQuantityModal(true);
  };
  
  const handlePurchaseConfirm = async () => {
    if (!quantity || quantity <= 0) {
      setQuantityError('Please enter a valid quantity');
      return;
    }
    
    if (quantity > sweet.quantity) {
      setQuantityError(`Only ${sweet.quantity} kg available`);
      return;
    }
    
    setIsPurchasing(true);
    setShowQuantityModal(false);
    try {
      await onPurchase(sweet.id, quantity);
    } finally {
      setIsPurchasing(false);
    }
  };
  
  const handleQuantityChange = (e) => {
    const value = parseFloat(e.target.value);
    setQuantity(value);
    setQuantityError('');
  };

  return (
    <div className="col-md-4 col-lg-3 mb-4">
      <div className="card h-100 card-sweet "
      style={{
    background: `linear-gradient(135deg, ${getGradientColors(sweet.id).start}, ${getGradientColors(sweet.id).end})`,
    borderRadius: '12px',
    border: '1px solid #0f0101ff',
  }}>
        <div className="card-img-top bg-light d-flex align-items-center justify-content-center" 
             style={{ height: '200px' }}>
          {sweet.image ? (
            <img 
              src={sweet.image} 
              alt={sweet.name}
              className="img-fluid"
              style={{ maxHeight: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div className="text-muted">Sweet Image</div>
          )}
        </div>
        <div className="card-body d-flex flex-column">
          <h6 className="card-title">{sweet.name}</h6>
          <p className="card-text text-muted small">{sweet.description}</p>
          <p className="card-text text-muted">{sweet.category}</p>
          
          <div className="mt-auto">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-bold">₹{sweet.price}/kg</span>
              <span className={`badge ${isOutOfStock ? 'bg-danger' : 'bg-success'}`}>
                {isOutOfStock ? 'Out of Stock' : `${sweet.quantity} kg available`}
              </span>
            </div>
            
            <button
  className={`btn w-100 ${isOutOfStock ? 'btn-secondary disabled' : 'btn-success'}`}
  onClick={handlePurchaseClick}
  disabled={isOutOfStock || isPurchasing}
>

              {isPurchasing ? (
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              ) : null}
              {isOutOfStock ? 'Out of Stock' : isPurchasing ? 'Purchasing...' : 'Purchase'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Quantity Modal */}
      {showQuantityModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"> {sweet.name}</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowQuantityModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Quantity (kg):</label>
                  <input
                    type="number"
                    className={`form-control ${quantityError ? 'is-invalid' : ''}`}
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="0.1"
                    max={sweet.quantity}
                    step="0.1"
                  />
                  {quantityError && <div className="invalid-feedback">{quantityError}</div>}
                </div>
                <div className="alert alert-info">
                  <strong>Available:</strong> {sweet.quantity} kg<br/>
                  <strong>Price:</strong> ₹{sweet.price}/kg<br/>
                  <strong>Total:</strong> ₹{(sweet.price * quantity).toFixed(2)}
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowQuantityModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={handlePurchaseConfirm}
                >
                  Confirm Purchase
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


const SearchAndFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory,
  priceRange,
  setPriceRange,
  stockStatus,
  setStockStatus,
  sortBy,
  setSortBy,
  clearFilters,
  categories,
  sortedSweets,
  totalSweets
}) => {
  const hasActiveFilters = searchTerm || 
                          selectedCategory !== 'All Categories' || 
                          priceRange.min || 
                          priceRange.max || 
                          stockStatus !== 'All Stock';

  return (
    <div className="bg-white shadow-sm p-4 rounded-3 mb-4 border">

      <div className="row align-items-center mb-3">
        <div className="col-md-8">
          <label className="form-label fw-bold">🔍 SEARCH SWEETS:</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by name, description, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-4 text-end">
         <button 
  className={`btn btn-sm ${hasActiveFilters ? 'btn-danger' : 'btn-outline-secondary'}`}
  onClick={clearFilters}
  disabled={!hasActiveFilters}
>
  {hasActiveFilters ? ' Clear Filters' : 'No Filters'}
</button>

{hasActiveFilters && (
  <button className="btn btn-outline-secondary btn-sm ms-2" onClick={clearFilters}>
    ×
  </button>
)}
</div>
      </div>

      <div className="row g-3">
        <div className="col-md-3">
          <label className="form-label fw-bold text-uppercase mb-1">Sweet Category</label>
          <select 
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => {
              if (category === 'All Categories') {
                return <option key={category} value={category}>{category} ({totalSweets})</option>;
              }
              const categoryCount = sortedSweets.filter(sweet => sweet.category === category).length;
              return (
                <option key={category} value={category}>
                  {category} ({categoryCount})
                </option>
              );
            })}
          </select>
          <small className="text-muted">
            💡 Categories are dynamic - new ones can be added anytime!
          </small>
        </div>
        
        <div className="col-md-3">
          <label className="form-label fw-bold"> STOCK STATUS:</label>
          <select 
            className="form-select"
            value={stockStatus}
            onChange={(e) => setStockStatus(e.target.value)}
          >
            <option value="All Stock">All Stock</option>
            <option value="In Stock"> In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>


<div className="col-md-3">
          <label className="form-label fw-bold"> PRICE RANGE (₹):</label>
          <div className="d-flex gap-2">
            <input
              type="number"
              className="form-control"
              placeholder="Min"
              min="0"
              step="0.01"
              value={priceRange.min}
              onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
            />
            <input
              type="number"
              className="form-control"
              placeholder="Max"
              min="0"
              step="0.01"
              value={priceRange.max}
              onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
            />
          </div>
        </div>



        <div className="col-md-3">
          <label className="form-label fw-bold"> SORT BY:</label>
          <select 
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="Name (A-Z)">Name (A-Z)</option>
            <option value="Name (Z-A)">Name (Z-A)</option>
            <option value="Price (Low to High)">Price (Low to High)</option>
            <option value="Price (High to Low)">Price (High to Low)</option>
          </select>
        </div>
      </div>

      <div className="text-center mt-3">
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
             Showing <strong>{sortedSweets.length}</strong> of <strong>{totalSweets}</strong> sweets
          </small>
          {hasActiveFilters && (
            <small className="text-info">
              Filters active
            </small>
          )}
        </div>
      </div>
    </div>
  );
};


const Sidebar = ({ activeSection, setActiveSection, handleLogout, userName }) => {
  return (
    <div className="bg-light" style={{ width: '250px', minHeight: '100vh' }}>
      {/* Top Blue Bar with User Name */}
      <div className="bg-primary text-white p-3"
      style={{
    background: "linear-gradient(135deg, #ff6f61, #ffb347)", // orange-pink gradient
    borderBottom: "2px solid #fff"
  }}
>
        <h5 className="mb-1">WELCOME</h5>
        {userName && (
          <small className="text-light">
             {userName}! 
          </small>
        )}
      </div>
      
      {/* Navigation Links */}
      <div className="p-3">
        <div 
  className={`mb-2 p-2 rounded fw-semibold ${activeSection === 'sweets' ? 'bg-gradient text-white' : 'text-dark'}`}
  style={{
    background: activeSection === 'sweets' 
      ? "linear-gradient(135deg, #ff9a9e, #fecfef)" 
      : "transparent",
    cursor: "pointer"
  }}
  onClick={() => setActiveSection('sweets')}
>
  Sweet Collection
</div>

       
          
        
     
        <div 
          className={`mb-2 p-2 rounded cursor-pointer ${activeSection === 'profile' ? 'bg-primary text-white' : ''}`}
          onClick={() => setActiveSection('profile')}
          style={{ cursor: 'pointer' }}
        >
          Profile
        </div>
        <div 
          className="mt-4 p-2 text-danger"
          onClick={handleLogout}
          style={{ cursor: 'pointer' }}
        >
          Logout
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const CustomerDashboard = () => {
  const [user, setUser] = useState(null);
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [stockStatus, setStockStatus] = useState('All Stock');
  const [sortBy, setSortBy] = useState('Name (A-Z)');
  const [activeSection, setActiveSection] = useState('sweets');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/');
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    
    // Test backend connection first
    testBackendConnection();
  }, [navigate]);

  const testBackendConnection = async () => {
    try {
      console.log('Testing backend connection...');
      
      // Try debug endpoint first
      try {
        const response = await axios.get('http://localhost:8000/api/debug/', {
          timeout: 3000,
          headers: {
            'Content-Type': 'application/json',
          }
        });
        console.log('✅ Debug test successful:', response.data);
        fetchSweets();
        return;
      } catch (debugError) {
        console.log('❌ Debug test failed:', debugError.response?.status, debugError.response?.data);
      }
      
      // Try simple test endpoint
      try {
        const response = await axios.get('http://localhost:8000/api/test-simple/', {
          timeout: 3000,
          headers: {
            'Content-Type': 'application/json',
          }
        });
        console.log('✅ Simple test successful:', response.data);
        fetchSweets();
        return;
      } catch (simpleError) {
        console.log('❌ Simple test failed:', simpleError.response?.status);
      }
      
      // Try DRF test endpoint
      const response = await axios.get('http://localhost:8000/api/test/', {
        timeout: 3000,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log('✅ DRF test successful:', response.data);
      fetchSweets();
    } catch (error) {
      console.error('❌ All backend tests failed:', error);
      if (error.code === 'ECONNABORTED') {
        setError('Backend server is not responding. Please start the backend server.');
      } else if (!error.response) {
        setError('Cannot connect to backend server. Please ensure the backend is running on http://localhost:8000');
      } else {
        setError(`Backend error: ${error.response.status} - ${error.response.data?.message || error.message}`);
      }
    }
  };

  const fetchSweets = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching sweets from backend...');
      
      // Try the simple endpoint first (no authentication)
      try {
        console.log('Trying simple endpoint...');
        const response = await axios.get('http://localhost:8000/api/sweets/simple/', {
          timeout: 5000,
          headers: {
            'Content-Type': 'application/json',
          }
        });
        console.log('✅ Success: Fetched sweets from simple endpoint:', response.data);
        setSweets(response.data.sweets || response.data);
        return;
      } catch (simpleError) {
        console.log('❌ Simple endpoint failed:', simpleError.response?.status, simpleError.response?.data);
      }
      
      
      try {
        console.log('Trying DRF endpoint...');
        const response = await axios.get('http://localhost:8000/api/sweets/public/', {
          timeout: 5000,
          headers: {
            'Content-Type': 'application/json',
          }
        });
        console.log('✅ Success: Fetched sweets from DRF endpoint:', response.data);
        setSweets(response.data);
        return;
      } catch (drfError) {
        console.log('❌ DRF endpoint failed:', drfError.response?.status, drfError.response?.data);
        throw drfError; // Re-throw to be caught by outer catch
      }
    } catch (error) {
      console.error('❌ All endpoints failed:', error);
      console.error('Error details:', error.response?.data);
      console.error('Error status:', error.response?.status);
      
      let errorMessage = 'Failed to load sweets. ';
      if (error.code === 'ECONNABORTED') {
        errorMessage += 'Request timed out.';
      } else if (error.response?.status === 404) {
        errorMessage += 'API endpoint not found.';
      } else if (error.response?.status === 401) {
        errorMessage += 'Authentication required. Please check backend configuration.';
      } else if (error.response?.status === 403) {
        errorMessage += 'Access forbidden. This endpoint requires different permissions.';
      } else if (error.response?.status === 500) {
        errorMessage += 'Server error.';
      } else if (!error.response) {
        errorMessage += 'Cannot connect to server. Please ensure backend is running.';
      } else {
        errorMessage += error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  };

  const handlePurchase = async (sweetId, quantity = 1) => {
    try {
      console.log(`Purchasing ${quantity} kg of sweet with ID: ${sweetId}`);
      
      const response = await axios.post(`http://localhost:8000/api/sweets/${sweetId}/purchase/`, {
        quantity: quantity
      }, {
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log('✅ Purchase successful:', response.data);
      
      
      setSweets(prevSweets => 
        prevSweets.map(sweet => 
          sweet.id === sweetId 
            ? { ...sweet, quantity: response.data.remaining_quantity }
            : sweet
        )
      );
      
     
      alert(`Successfully purchased ${response.data.purchased_quantity} kg! Total: ₹${response.data.total_price.toFixed(2)} | Remaining: ${response.data.remaining_quantity} kg`);
      
    } catch (error) {
      console.error('❌ Purchase failed:', error);
      
      let errorMessage = 'Failed to purchase sweet. ';
      if (error.response?.status === 400) {
        errorMessage += error.response.data?.error || 'Invalid quantity or out of stock.';
      } else if (error.response?.status === 404) {
        errorMessage += 'Sweet not found.';
      } else if (!error.response) {
        errorMessage += 'Cannot connect to server.';
      } else {
        errorMessage += error.response.data?.error || error.message;
      }
      
      alert(errorMessage);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Categories');
    setPriceRange({ min: '', max: '' });
    setStockStatus('All Stock');
    setSortBy('Name (A-Z)');
  };

  const filteredSweets = sweets.filter(sweet => {
    // Search filter - check name, description, and category
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = searchTerm === '' || 
                         sweet.name.toLowerCase().includes(searchLower) ||
                         (sweet.description && sweet.description.toLowerCase().includes(searchLower)) ||
                         sweet.category.toLowerCase().includes(searchLower);
    
   
    const matchesCategory = selectedCategory === 'All Categories' || sweet.category === selectedCategory;
    
    // Price range filter - handle empty values properly
    const minPrice = priceRange.min ? parseFloat(priceRange.min) : null;
    const maxPrice = priceRange.max ? parseFloat(priceRange.max) : null;
    const matchesPrice = (minPrice === null || sweet.price >= minPrice) &&
                        (maxPrice === null || sweet.price <= maxPrice);
    
    
    const matchesStock = stockStatus === 'All Stock' || 
                        (stockStatus === 'In Stock' && sweet.quantity > 0) ||
                        (stockStatus === 'Out of Stock' && sweet.quantity === 0);
    
    return matchesSearch && matchesCategory && matchesPrice && matchesStock;
  });

  const sortedSweets = [...filteredSweets].sort((a, b) => {
    switch (sortBy) {
      case 'Name (A-Z)':
        return a.name.localeCompare(b.name);
      case 'Name (Z-A)':
        return b.name.localeCompare(a.name);
      case 'Price (Low to High)':
        return a.price - b.price;
      case 'Price (High to Low)':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const categories = ['All Categories', ...new Set(sweets.map(sweet => sweet.category).filter(category => category && category.trim()))];

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Left Sidebar */}
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        handleLogout={handleLogout} 
        userName={user?.name || user?.username}
      />

      {/* Main Content Area */}
      <div className="flex-grow-1 p-4">
        {activeSection === 'sweets' && (
          <>
            {/* Header */}
            <div className="mb-4 text-center" style={{ marginTop: '40px' }}>
  <h2 style={{ 
    fontFamily: "'Pacifico'", 
    fontSize: '4.5rem', 
    color: '#fa7b04ff', 
    letterSpacing: '1px' 
  }}>
    Our Sweet Collection
  </h2>
  <p style={{ 
    fontFamily: "'Pacifico'", 
    fontSize: '2rem', 
    color: '#ede8e3ff' 
  }}>
    Creating Smiles, One Sweet treat at a time!!
  </p>
</div>

            {/* Error Display */}
            {error && (
              <div className="alert alert-danger" role="alert">
                <div className="d-flex justify-content-between align-items-center">
                  <span>{error}</span>
                  <button 
                    className="btn btn-outline-danger btn-sm"
                    onClick={testBackendConnection}
                  >
                    Retry Connection
                  </button>
                </div>
              </div>
            )}

            {/* Search and Filter Section */}
            <SearchAndFilter 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              stockStatus={stockStatus}
              setStockStatus={setStockStatus}
              sortBy={sortBy}
              setSortBy={setSortBy}
              clearFilters={clearFilters}
              categories={categories}
              sortedSweets={sortedSweets}
              totalSweets={sweets.length}
            />

                         {/* Sweet Products Grid */}
             <div className="row">
               {sortedSweets.length > 0 ? (
                 sortedSweets.map(sweet => (
                   <SweetCard 
                     key={sweet.id} 
                     sweet={sweet} 
                     onPurchase={handlePurchase}
                   />
                 ))
               ) : (
                 <div className="col-12 text-center">
                   <p className="text-muted">No sweets found matching your criteria.</p>
                 </div>
               )}
             </div>
          </>
        )}

        {activeSection === 'purchases' && (
          <div className="text-center mt-5">
            <h4>My Purchases</h4>
            <p className="text-muted">Your purchase history will appear here</p>
          </div>
        )}

        {activeSection === 'orders' && (
          <div className="text-center mt-5">
            <h4>Orders</h4>
            <p className="text-muted">Your order history will appear here</p>
          </div>
        )}

        {activeSection === 'profile' && (
          <div className="text-center mt-5">
            <h4>Profile</h4>
            <p className="text-muted">Profile settings will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard; 