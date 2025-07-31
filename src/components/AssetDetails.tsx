import React from 'react';
import { X, Download, Heart, Tag, Calendar, HardDrive, Eye, Share2, Folder, Image, Box, Palette, Sun, Volume2 } from 'lucide-react';
import { Asset } from '../types/Asset';

interface AssetDetailsProps {
  asset: Asset;
  onClose: () => void;
  onToggleFavorite: (assetId: string) => void;
}

const AssetDetails: React.FC<AssetDetailsProps> = ({
  asset,
  onClose,
  onToggleFavorite
}) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      texture: Image,
      model: Box,
      material: Palette,
      hdri: Sun,
      audio: Volume2
    };
    return icons[type as keyof typeof icons] || Image;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      texture: 'bg-green-100 text-green-700 border-green-200',
      model: 'bg-blue-100 text-blue-700 border-blue-200',
      material: 'bg-purple-100 text-purple-700 border-purple-200',
      hdri: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      audio: 'bg-pink-100 text-pink-700 border-pink-200'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const TypeIcon = getTypeIcon(asset.type);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg border ${getTypeColor(asset.type)}`}>
              <TypeIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{asset.name}</h2>
              <p className="text-sm text-gray-600">{asset.category}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleFavorite(asset.id)}
              className={`p-2 rounded-lg transition-colors ${
                asset.isFavorite 
                  ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                  : 'text-gray-400 bg-gray-50 hover:bg-gray-100 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${asset.isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2 rounded-lg text-gray-400 bg-gray-50 hover:bg-gray-100 hover:text-gray-600 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 bg-gray-50 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row max-h-[calc(90vh-80px)]">
          {/* Preview */}
          <div className="lg:w-1/2 p-6 bg-gray-50">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-sm">
              <img
                src={asset.preview || asset.thumbnail}
                alt={asset.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Action buttons */}
            <div className="flex space-x-3 mt-4">
              <button className="flex-1 bg-gray-900 text-white px-4 py-3 rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Descargar</span>
              </button>
              <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>Previsualizar</span>
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="lg:w-1/2 p-6 overflow-y-auto">
            {/* Description */}
            {asset.description && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Descripción</h3>
                <p className="text-gray-700">{asset.description}</p>
              </div>
            )}

            {/* Basic Info */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Información Básica</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600 flex items-center">
                    <Folder className="w-4 h-4 mr-2" />
                    Ruta
                  </span>
                  <span className="text-sm text-gray-900 font-mono text-right max-w-xs truncate">
                    {asset.path}
                  </span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600 flex items-center">
                    <HardDrive className="w-4 h-4 mr-2" />
                    Tamaño
                  </span>
                  <span className="text-sm text-gray-900 font-medium">
                    {formatFileSize(asset.fileSize)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Formato</span>
                  <span className="text-sm text-gray-900 font-medium">{asset.format}</span>
                </div>
                
                {asset.resolution && (
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Resolución</span>
                    <span className="text-sm text-gray-900 font-medium">{asset.resolution}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Añadido
                  </span>
                  <span className="text-sm text-gray-900">
                    {new Date(asset.dateAdded).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Metadata */}
            {Object.keys(asset.metadata).length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Metadatos</h3>
                <div className="space-y-2">
                  {Object.entries(asset.metadata).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between py-1">
                      <span className="text-sm text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </span>
                      <span className="text-sm text-gray-900 text-right">
                        {Array.isArray(value) ? value.join(', ') : String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                Tags ({asset.tags.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {asset.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* AI Analysis Preview (Future feature) */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h3 className="text-sm font-medium text-blue-900 mb-2 flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                Análisis IA (Próximamente)
              </h3>
              <p className="text-sm text-blue-700">
                En la Fase 2, aquí aparecerán los tags automáticos generados por análisis visual IA, 
                análisis de color, detección de patrones y clasificación semántica.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetails;