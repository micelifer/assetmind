import React, { useState, useMemo, useEffect } from 'react';
import { Search, Settings, Grid, List, Folder, FolderOpen, Image, Box, Palette, Volume2, Sun } from 'lucide-react';
import { auth, db } from './firebase';
import { onAuthStateChanged, signInAnonymously, User } from 'firebase/auth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import AssetGrid from './components/AssetGrid';
import AssetDetails from './components/AssetDetails';
import FilterSidebar from './components/FilterSidebar';
import SearchBar from './components/SearchBar';
import PathSelector from './components/PathSelector';
import { Asset, AssetType, FilterState } from './types/Asset';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(true);
  const [showPathSelector, setShowPathSelector] = useState(false);
  const [currentPath, setCurrentPath] = useState('D:\\Elementos 3D');
  const [filters, setFilters] = useState<FilterState>({
    types: [],
    categories: [],
    tags: [],
    resolution: null,
    fileSize: null
  });

  useEffect(() => {
    signInAnonymously(auth);
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        // Crear consulta a Firestore para obtener assets del usuario
        const assetsQuery = query(
          collection(db, 'assets'),
          where('userId', '==', currentUser.uid)
        );
        
        // Escuchar cambios en tiempo real
        const unsubscribeAssets = onSnapshot(assetsQuery, (snapshot) => {
          const assetsData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          } as Asset));
          setAssets(assetsData);
        });
        
        // Limpiar listener de assets cuando el componente se desmonte
        return () => unsubscribeAssets();
      } else {
        setUser(null);
        setAssets([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const filteredAssets = useMemo(() => {
    return assets.filter(asset => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = asset.name.toLowerCase().includes(query);
        const matchesTags = asset.tags.some(tag => tag.toLowerCase().includes(query));
        const matchesCategory = asset.category.toLowerCase().includes(query);
        const matchesPath = asset.path.toLowerCase().includes(query);
        
        if (!matchesName && !matchesTags && !matchesCategory && !matchesPath) {
          return false;
        }
      }

      // Type filter
      if (filters.types.length > 0 && !filters.types.includes(asset.type)) {
        return false;
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(asset.category)) {
        return false;
      }

      // Tags filter
      if (filters.tags.length > 0) {
        const hasAllTags = filters.tags.every(filterTag => 
          asset.tags.some(assetTag => assetTag.toLowerCase().includes(filterTag.toLowerCase()))
        );
        if (!hasAllTags) return false;
      }

      return true;
    });
  }, [assets, searchQuery, filters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleAssetSelect = (asset: Asset) => {
    setSelectedAsset(asset);
  };

  const handleAssetClose = () => {
    setSelectedAsset(null);
  };

  const toggleFavorite = (assetId: string) => {
    setAssets(prev => prev.map(asset => 
      asset.id === assetId 
        ? { ...asset, isFavorite: !asset.isFavorite }
        : asset
    ));
  };

  const handlePathChange = (newPath: string) => {
    setCurrentPath(newPath);
    setShowPathSelector(false);
    // Aquí se ejecutaría el escaneo del script Python
    console.log('Escaneando nueva ruta:', newPath);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <Box className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-medium text-gray-900">Asset Manager</h1>
                <p className="text-xs text-gray-500 font-mono">{currentPath}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-white shadow-sm text-gray-900' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'list' 
                    ? 'bg-white shadow-sm text-gray-900' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            
            <button
              onClick={() => setShowPathSelector(true)}
              className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-700 transition-colors"
            >
              <Settings className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-lg transition-colors ${
                showFilters 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-700'
              }`}
            >
              <FolderOpen className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        {showFilters && (
          <FilterSidebar
            assets={assets}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="mb-8">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={handleSearch}
              resultCount={filteredAssets.length}
              totalCount={assets.length}
            />
          </div>

          <AssetGrid
            assets={filteredAssets}
            viewMode={viewMode}
            onAssetSelect={handleAssetSelect}
            onToggleFavorite={toggleFavorite}
          />
        </main>
      </div>

      {/* Path Selector Modal */}
      {showPathSelector && (
        <PathSelector
          currentPath={currentPath}
          onPathChange={handlePathChange}
          onClose={() => setShowPathSelector(false)}
        />
      )}

      {/* Asset Details Modal */}
      {selectedAsset && (
        <AssetDetails
          asset={selectedAsset}
          onClose={handleAssetClose}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}

export default App;