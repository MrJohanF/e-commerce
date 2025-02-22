import React, { useState } from 'react';
import { Search, Star, MinusCircle, PlusCircle } from 'lucide-react';

const ProductFilters = ({ 
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange
}) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    rating: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'smartphones', label: 'Smartphones' },
    { id: 'laptops', label: 'Laptops' }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
        <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
          Clear All
        </button>
      </div>

      {/* Categories Section */}
      <div className="mb-8">
        <div 
          className="flex items-center justify-between cursor-pointer mb-4"
          onClick={() => toggleSection('categories')}
        >
          <h3 className="font-semibold text-gray-800">Categories</h3>
          {expandedSections.categories ? 
            <MinusCircle className="w-5 h-5 text-gray-400" /> : 
            <PlusCircle className="w-5 h-5 text-gray-400" />
          }
        </div>
        
        {expandedSections.categories && (
          <div className="space-y-3">
            {categories.map((category) => (
              <label 
                key={category.id} 
                className="flex items-center group cursor-pointer"
              >
                <div className="relative flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={category.id}
                    checked={selectedCategory === category.id}
                    onChange={() => setSelectedCategory(category.id)}
                    className="w-5 h-5 border-2 border-gray-300 rounded-full appearance-none cursor-pointer checked:border-purple-600 checked:border-4 transition-all"
                  />
                </div>
                <span className="ml-3 text-gray-700 group-hover:text-gray-900">
                  {category.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Section */}
      <div className="mb-8">
        <div 
          className="flex items-center justify-between cursor-pointer mb-4"
          onClick={() => toggleSection('price')}
        >
          <h3 className="font-semibold text-gray-800">Price Range</h3>
          {expandedSections.price ? 
            <MinusCircle className="w-5 h-5 text-gray-400" /> : 
            <PlusCircle className="w-5 h-5 text-gray-400" />
          }
        </div>
        
        {expandedSections.price && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-600"
                  placeholder="Min"
                />
              </div>
              <span className="text-gray-400">-</span>
              <div className="flex-1">
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-600"
                  placeholder="Max"
                />
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>
        )}
      </div>

      {/* Ratings Section */}
      <div className="mb-8">
        <div 
          className="flex items-center justify-between cursor-pointer mb-4"
          onClick={() => toggleSection('rating')}
        >
          <h3 className="font-semibold text-gray-800">Rating</h3>
          {expandedSections.rating ? 
            <MinusCircle className="w-5 h-5 text-gray-400" /> : 
            <PlusCircle className="w-5 h-5 text-gray-400" />
          }
        </div>
        
        {expandedSections.rating && (
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center group cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 border-2 border-gray-300 rounded cursor-pointer checked:bg-purple-600 checked:border-purple-600 appearance-none transition-colors"
                />
                <span className="ml-3 flex items-center text-gray-700 group-hover:text-gray-900">
                  {Array(rating).fill(null).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  {Array(5-rating).fill(null).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-gray-300"
                    />
                  ))}
                  <span className="ml-2">& Up</span>
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Apply Filters Button */}
      <button className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
        Apply Filters
      </button>
    </div>
  );
};

export default ProductFilters;