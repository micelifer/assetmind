import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Lightbulb } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultCount: number;
  totalCount: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  resultCount,
  totalCount
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = [
    "estilo nórdico",
    "madera rústica",
    "mobiliario moderno",
    "texturas industriales",
    "mármol elegante",
    "iluminación natural",
    "ambiente acogedor",
    "materiales metálicos"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSearchChange(suggestion);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const clearSearch = () => {
    onSearchChange('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(searchQuery.length > 0)}
          placeholder="Busca texturas, modelos, materiales o describe lo que necesitas..."
          className="block w-full pl-11 pr-12 py-4 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 bg-white transition-all"
        />
        
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Results Info */}
      {searchQuery && (
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span>
            <span className="font-medium text-gray-900">{resultCount}</span> de {totalCount} assets encontrados
          </span>
          {resultCount === 0 && (
            <span className="text-gray-400 flex items-center">
              <Lightbulb className="w-4 h-4 mr-1" />
              Prueba términos más generales
            </span>
          )}
        </div>
      )}

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-10 max-h-60 overflow-y-auto">
          <div className="p-4 border-b border-gray-50">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">
              Búsquedas Sugeridas
            </div>
            {suggestions
              .filter(suggestion => 
                suggestion.toLowerCase().includes(searchQuery.toLowerCase()) ||
                searchQuery.length < 2
              )
              .slice(0, 6)
              .map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span className="capitalize">{suggestion}</span>
                </button>
              ))}
          </div>
          
          <div className="p-4 bg-gray-50">
            <div className="text-xs text-gray-500 font-medium flex items-center">
              <Lightbulb className="w-3 h-3 mr-1" />
              Consejo: Usa lenguaje natural como "sala de estar moderna" o "texturas de madera"
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;