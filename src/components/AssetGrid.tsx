import React from 'react';
import { Heart, Download, Eye, Tag, Clock, HardDrive } from 'lucide-react';
import { Asset } from '../types/Asset';

interface AssetGridProps {
  assets: Asset[];
  viewMode: 'grid' | 'list';
  onAssetSelect: (asset: Asset) => void;
  onToggleFavorite: (assetId: string) => void;
}

const AssetGrid: React.FC<AssetGridProps> = ({
  assets,
  viewMode,
  onAssetSelect,
  onToggleFavorite
}) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getTypeColor = (type: string) => {
    const colors = {
      texture: 'bg-green-50 text-green-600 border-green-200',
      model: 'bg-blue-50 text-blue-600 border-blue-200',
      material: 'bg-purple-50 text-purple-600 border-purple-200',
      hdri: 'bg-yellow-50 text-yellow-600 border-yellow-200',
      audio: 'bg-pink-50 text-pink-600 border-pink-200'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-50 text-gray-600 border-gray-200';
  };

  if (assets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
          <Tag className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-medium text-gray-700 mb-3">No se encontraron assets</h3>
        <p className="text-center max-w-md text-gray-500">
          Intenta ajustar tus filtros o términos de búsqueda para encontrar los assets que necesitas.
        </p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-3">
        {assets.map(asset => (
          <div
            key={asset.id}
            className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-gray-200 transition-all cursor-pointer"
            onClick={() => onAssetSelect(asset)}
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={asset.thumbnail}
                  alt={asset.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-900 truncate">{asset.name}</h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(asset.id);
                    }}
                    className={`p-1 rounded-full transition-colors ${
                      asset.isFavorite 
                        ? 'text-red-500 hover:text-red-600' 
                        : 'text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${asset.isFavorite ? 'fill-current' : ''}`} />
                  </button>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getTypeColor(asset.type)}`}>
                    {asset.type.toUpperCase()}
                  </span>
                  <span className="flex items-center">
                    <HardDrive className="w-4 h-4 mr-1" />
                    {formatFileSize(asset.fileSize)}
                  </span>
                  {asset.resolution && (
                    <span>{asset.resolution}</span>
                  )}
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(asset.dateAdded).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-2">
                  {asset.tags.slice(0, 5).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                  {asset.tags.length > 5 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                      +{asset.tags.length - 5} más
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-gray-500 truncate">{asset.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      {assets.map(asset => (
        <div
          key={asset.id}
          className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300 cursor-pointer"
          onClick={() => onAssetSelect(asset)}
        >
          {/* Thumbnail */}
          <div className="relative aspect-square bg-gray-50 overflow-hidden">
            <img
              src={asset.thumbnail}
              alt={asset.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Overlay actions */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAssetSelect(asset);
                  }}
                  className="p-2 bg-white rounded-xl shadow-lg hover:scale-110 transition-transform"
                >
                  <Eye className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(asset.id);
                  }}
                  className={`p-2 rounded-xl shadow-lg hover:scale-110 transition-transform ${
                    asset.isFavorite 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white text-gray-600'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${asset.isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
            
            {/* Type badge */}
            <div className={`absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-medium border backdrop-blur-sm ${getTypeColor(asset.type)}`}>
              {asset.type.toUpperCase()}
            </div>
            
            {/* Favorite indicator */}
            {asset.isFavorite && (
              <div className="absolute top-3 right-3">
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="p-4">
            <h3 className="font-medium text-gray-900 truncate mb-2 text-sm" title={asset.name}>
              {asset.name}
            </h3>
            
            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
              <span className="truncate text-gray-600">{asset.category}</span>
              <span className="flex-shrink-0">{formatFileSize(asset.fileSize)}</span>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-2">
              {asset.tags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-md"
                >
                  {tag}
                </span>
              ))}
              {asset.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-50 text-gray-400 text-xs rounded-md">
                  +{asset.tags.length - 3}
                </span>
              )}
            </div>
            
            {/* Metadata */}
            {asset.resolution && (
              <div className="text-xs text-gray-400">
                {asset.resolution} • {asset.format}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AssetGrid;