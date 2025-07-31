import React, { useState } from 'react';
import { X, Folder, HardDrive, Search, FolderOpen } from 'lucide-react';

interface PathSelectorProps {
  currentPath: string;
  onPathChange: (path: string) => void;
  onClose: () => void;
}

const PathSelector: React.FC<PathSelectorProps> = ({
  currentPath,
  onPathChange,
  onClose
}) => {
  const [inputPath, setInputPath] = useState(currentPath);
  const [isScanning, setIsScanning] = useState(false);

  const commonPaths = [
    'D:\\Elementos 3D',
    'D:\\Assets',
    'D:\\Biblioteca_3D',
    'C:\\Users\\Documents\\3D Assets',
    'E:\\Texturas',
    'D:\\Modelos'
  ];

  const handleScan = async () => {
    if (!inputPath.trim()) return;
    
    setIsScanning(true);
    
    // Simular proceso de escaneo
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsScanning(false);
    onPathChange(inputPath);
  };

  const handleQuickSelect = (path: string) => {
    setInputPath(path);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <Folder className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">Configurar Ruta de Assets</h2>
              <p className="text-sm text-gray-500">Selecciona la carpeta donde están tus assets 3D</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {/* Path Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ruta de la Carpeta
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HardDrive className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={inputPath}
                onChange={(e) => setInputPath(e.target.value)}
                placeholder="D:\Elementos 3D"
                className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 bg-gray-50"
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Introduce la ruta completa donde están almacenados tus assets 3D
            </p>
          </div>

          {/* Quick Paths */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Rutas Comunes
            </label>
            <div className="grid grid-cols-2 gap-2">
              {commonPaths.map((path, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickSelect(path)}
                  className={`p-3 text-left rounded-lg border transition-colors ${
                    inputPath === path
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <FolderOpen className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700 font-mono">{path}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-2">¿Qué hace el escaneo?</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Analiza recursivamente todas las subcarpetas</li>
              <li>• Genera thumbnails automáticamente</li>
              <li>• Extrae tags de nombres y rutas de archivos</li>
              <li>• Clasifica assets por tipo (texturas, modelos, materiales)</li>
              <li>• Crea base de datos local para búsqueda rápida</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleScan}
              disabled={!inputPath.trim() || isScanning}
              className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isScanning ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Escaneando...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Escanear Carpeta</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathSelector;