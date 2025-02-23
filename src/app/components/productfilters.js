import React from 'react';
import { Star, Search, X, SlidersHorizontal } from 'lucide-react';

const FilterContent = ({ 
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  isMobile,
  onClose 
}) => {
  return (
    <div className={`bg-white rounded-2xl shadow-sm ${isMobile ? 'h-full' : 'p-4 sticky top-4'}`}>
      {isMobile && (
        <div className="sticky top-0 bg-white p-4 border-b border-gray-100 z-10">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-gray-800">Filters</h2>
            <button 
              onClick={onClose} 
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      )}


      <div className={`${isMobile ? 'p-4' : ''}`}>
        {!isMobile && (
          <div className="border-b border-gray-100 pb-2 mb-4">
            <h2 className="text-lg font-bold text-gray-800">Filters</h2>
          </div>
        )}

        {/* Categories */}
        <div className="mb-4">
          <h3 className="font-medium text-gray-800 mb-2 text-sm">Categories</h3>
          <div className="space-y-1">
            {["all", "smartphones", "laptops"].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full px-3 py-1.5 rounded-lg text-left text-sm transition-all ${
                  selectedCategory === category
                    ? "bg-purple-600 text-white font-medium"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-4">
          <h3 className="font-medium text-gray-800 mb-2 text-sm">Price Range</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-600 focus:border-transparent text-sm"
                  placeholder="Min"
                />
              </div>
              <div className="flex-1 relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-600 focus:border-transparent text-sm"
                  placeholder="Max"
                />
              </div>
            </div>
            <div className="px-1">
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">$0</span>
                <span className="text-xs text-gray-500">$1000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ratings */}
        <div className="mb-4">
          <h3 className="font-medium text-gray-800 mb-2 text-sm">Rating</h3>
          <div className="space-y-1">
            {[5, 4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                className="w-full flex items-center px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-sm"
              >
                <div className="flex items-center flex-1">
                  {Array(5).fill(null).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < rating 
                          ? "fill-yellow-400 text-yellow-400" 
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-700 text-sm">& Up</span>
                </div>
                <span className="text-xs text-gray-500">(123)</span>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`space-y-2 ${isMobile ? 'mt-auto' : ''}`}>
          <button className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
            Apply Filters
          </button>
          <button className="w-full px-3 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductFilters = ({ 
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange
}) => {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  // Handle closing filter drawer when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      const drawer = document.getElementById('filter-drawer');
      const filterButton = document.getElementById('filter-button');
      
      if (drawer && !drawer.contains(event.target) && !filterButton.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen]);

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <FilterContent
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          isMobile={false}
        />
      </div>

      {/* Mobile Filter Button */}
      <button
        id="filter-button"
        className="md:hidden fixed bottom-4 right-4 z-40 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transform transition-all duration-200 hover:scale-105 active:scale-95"
        onClick={() => setIsFilterOpen(true)}
      >
        <SlidersHorizontal className="w-6 h-6" />
      </button>

      {/* Mobile Filter Drawer with Animation */}
      <div 
        className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isFilterOpen ? 'bg-opacity-50' : 'bg-opacity-0'
          }`}
        />
        
        {/* Drawer */}
        <div 
          id="filter-drawer"
          className={`absolute inset-y-0 right-0 w-full max-w-xs bg-white transform transition-transform duration-300 ease-out ${
            isFilterOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <FilterContent
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            isMobile={true}
            onClose={() => setIsFilterOpen(false)}
          />
        </div>
      </div>
    </>
  );
};

export default ProductFilters;