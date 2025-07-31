export type AssetType = 'texture' | 'model' | 'material' | 'hdri' | 'audio';

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  category: string;
  path: string;
  thumbnail: string;
  preview?: string;
  fileSize: number;
  resolution?: string;
  format: string;
  tags: string[];
  description?: string;
  dateAdded: string;
  lastModified: string;
  isFavorite: boolean;
  metadata: {
    dimensions?: string;
    colorProfile?: string;
    textureMaps?: string[];
    polyCount?: number;
    materials?: string[];
    [key: string]: any;
  };
}

export interface FilterState {
  types: AssetType[];
  categories: string[];
  tags: string[];
  resolution: string | null;
  fileSize: string | null;
}