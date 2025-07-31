import React from 'react';
import { Filter, X, Tag, Folder, FolderOpen, Image, Box, Palette, Volume2, Sun } from 'lucide-react';
import { Asset, AssetType, FilterState } from '../types/Asset';

interface FilterSidebarProps {
  assets: Asset[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  assets,
  filters,
  onFilterChange
}) => {
  const assetTypeIcons = {
    texture: Image,
    model: Box,
    material: Palette,
    hdri: Sun,
    audio: Volume2
  };

  const assetTypeNames = {
    texture: 'Texturas',
    model: 'Modelos 3D',
    material: 'Materiales',
    hdri: 'HDRI',
    audio: 'Audio'
  };

  // Extract unique values from assets
  const uniqueTypes = Array.from(new Set(assets.map(asset => asset.type)));
  const uniqueCategories = Array.from(new Set(assets.map(asset => asset.category)));
  const allTags = Array.from(new Set(assets.flatMap(asset => asset.tags)));
  const popularTags = allTags.slice(0, 20); // Show most common tags

  const handleTypeToggle = (type: AssetType) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type];
    
    onFilterChange({ ...filters, types: newTypes });
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    
    onFilterChange({ ...filters, tags: newTags });
  };

  const clearAllFilters = () => {
    onFilterChange({
      types: [],
      categories: [],
      tags: [],
      resolution: null,
      fileSize: null
    });
  };

  const hasActiveFilters = filters.types.length > 0 || 
                         filters.categories.length > 0 || 
                         filters.tags.length > 0;

  const getAssetCountForType = (type: AssetType) => {
    return assets.filter(asset => asset.type === type).length;
  };

  const getAssetCountForCategory = (category: string) => {
    return assets.filter(asset => asset.category === category).length;
  };

  return (
    <aside className="w-80 bg-white border-r border-gray-100 h-screen overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-gray-100 rounded-lg flex items-center justify-center">
              <FolderOpen className="w-3 h-3 text-gray-600" />
            </div>
            <h2 className="text-lg font-medium text-gray-900">Filtros</h2>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1 transition-colors"
            >
              <X className="w-3 h-3" />
              <span>Limpiar</span>
            </button>
          )}
        </div>

        {/* Asset Types */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
            <Box className="w-4 h-4 mr-2 text-gray-600" />
            Tipo de Asset
          </h3>
          <div className="space-y-2">
            {uniqueTypes.map(type => {
              const Icon = assetTypeIcons[type];
              const count = getAssetCountForType(type);
              const isSelected = filters.types.includes(type);
              
              return (
                <label
                  key={type}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-gray-50 border border-gray-200' 
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleTypeToggle(type)}
                      className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                    />
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-gray-900' : 'text-gray-500'}`} />
                    <span className={`text-sm ${isSelected ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                      {assetTypeNames[type]}
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-lg ${
                    isSelected ? 'bg-gray-200 text-gray-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {count}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
            <Folder className="w-4 h-4 mr-2 text-gray-600" />
            Categorías
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {uniqueCategories.map(category => {
              const count = getAssetCountForCategory(category);
              const isSelected = filters.categories.includes(category);
              
              return (
                <label
                  key={category}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-gray-50 border border-gray-200' 
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleCategoryToggle(category)}
                      className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                    />
                    <span className={`text-sm ${isSelected ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                      {category}
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-lg ${
                    isSelected ? 'bg-gray-200 text-gray-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {count}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Popular Tags */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
            <Tag className="w-4 h-4 mr-2 text-gray-600" />
            Tags Populares
          </h3>
          <div className="flex flex-wrap gap-2">
            {popularTags.map(tag => {
              const isSelected = filters.tags.includes(tag);
              
              return (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-2 text-xs rounded-lg transition-all ${
                    isSelected
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Estadísticas</h4>
          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex justify-between">
              <span>Total de assets:</span>
              <span className="font-medium text-gray-900">{assets.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Categorías:</span>
              <span className="font-medium text-gray-900">{uniqueCategories.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Tags únicos:</span>
              <span className="font-medium text-gray-900">{allTags.length}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;