import { useProductStore } from '@/store/useProductStore';
import { Loader, Search } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

function SearchBar() {
  const { fetchSearchProducts, loading } = useProductStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchInputRef = useRef(null);

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    setShowDropdown(newSearchTerm.length > 0); // Show if there's text
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setShowDropdown(false); // Close dropdown if clicked outside the search bar
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchInputRef]);

  useEffect(() => {
    if (searchTerm) {
      const delayDebounceFn = setTimeout(() => {
        fetchSearchProducts(searchTerm)
          .then(results => {
            setSearchResults(results);
          })
          .catch(error => {
            console.error("Error fetching search results:", error);
            setSearchResults([]); // Clear results on error
          });
      }, 300); // Debounce delay (300ms)

      return () => clearTimeout(delayDebounceFn); // Cleanup on unmount/change
    } else {
      setSearchResults([]);  // Clear results when search term is empty
    }
  }, [searchTerm]);

  // JSX for the search bar and results
  return (
    <div className="relative w-[100%] rounded-2xl" ref={searchInputRef}>
      <div className="flex items-center justify-start w-full bg-white rounded-md px-2">
        <Search className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
        <input
          type="text"
          className="w-full px-4 py-2 border flex-grow-1 border-gray-300 rounded-md shadow-sm border-none focus:outline-none  text-black"
          value={searchTerm}
          placeholder="Search products "
          onChange={handleInputChange}
        />
      </div>

      {showDropdown && (searchResults?.length > 0 || loading) && (
        <div className="absolute left-0 mt-2 top-[100%] max-h-64 overflow-auto mobileSearch right-0  text-black bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {loading ? (
            <div className="p-2 bg-green-200 h-16 flex items-center justify-center">
              <Loader className="animate-spin" />
            </div>
          ) : (
            <ul>
              {searchResults.map((product) => (
                <li key={product._id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <Link to={`/product/${product._id}`} className="flex items-center space-x-2 md:space-x-4">
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-10 w-10 md:h-12 md:w-12 object-cover rounded"
                      />
                    )}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800 md:text-base">{product.name}</h3>
                      <p className="text-xs text-gray-600 md:text-sm">NRS. {product.price}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;