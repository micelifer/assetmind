import { Asset } from '../types/Asset';

export const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'Wood_Planks_Worn_4K',
    type: 'texture',
    category: 'Madera',
    path: '/Texturas_PBR/Madera/Wood_Planks_Worn_4K/',
    thumbnail: 'https://images.pexels.com/photos/129731/pexels-photo-129731.jpeg?auto=compress&cs=tinysrgb&w=400',
    fileSize: 45600000,
    resolution: '4096x4096',
    format: 'JPG',
    tags: ['madera', 'planks', 'worn', 'weathered', 'rústico', 'piso', 'marrón', 'grano', 'natural', 'textura', 'pbr'],
    description: 'Textura PBR de tablones de madera gastados, perfecta para pisos y revestimientos rústicos.',
    dateAdded: '2024-01-15',
    lastModified: '2024-01-15',
    isFavorite: false,
    metadata: {
      dimensions: '4096x4096',
      colorProfile: 'sRGB',
      textureMaps: ['Diffuse', 'Normal', 'Roughness', 'Height']
    }
  },
  {
    id: '2',
    name: 'Office_Chair_Modern',
    type: 'model',
    category: 'Mobiliario',
    path: '/Modelos_3D/Mobiliario/Office_Chair_Modern.fbx',
    thumbnail: 'https://images.pexels.com/photos/586799/pexels-photo-586799.jpeg?auto=compress&cs=tinysrgb&w=400',
    fileSize: 12800000,
    format: 'FBX',
    tags: ['silla', 'oficina', 'moderno', 'ergonómico', 'cuero', 'negro', 'mobiliario', 'trabajo', 'minimalista'],
    description: 'Silla de oficina moderna con diseño ergonómico y materiales de alta calidad.',
    dateAdded: '2024-01-10',
    lastModified: '2024-01-12',
    isFavorite: true,
    metadata: {
      polyCount: 8540,
      materials: ['Leather_Black', 'Metal_Chrome', 'Plastic_Base']
    }
  },
  {
    id: '3',
    name: 'Concrete_Wall_Industrial',
    type: 'texture',
    category: 'Hormigón',
    path: '/Texturas_PBR/Hormigon/Concrete_Wall_Industrial_2K/',
    thumbnail: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=400',
    fileSize: 28400000,
    resolution: '2048x2048',
    format: 'PNG',
    tags: ['hormigón', 'industrial', 'pared', 'gris', 'rugoso', 'urbano', 'moderno', 'arquitectura', 'textura', 'pbr'],
    description: 'Textura de hormigón industrial perfecta para arquitectura moderna y diseño urbano.',
    dateAdded: '2024-01-08',
    lastModified: '2024-01-08',
    isFavorite: false,
    metadata: {
      dimensions: '2048x2048',
      colorProfile: 'sRGB',
      textureMaps: ['Diffuse', 'Normal', 'Roughness', 'AO']
    }
  },
  {
    id: '4',
    name: 'Scandinavian_Table_Birch',
    type: 'model',
    category: 'Mobiliario',
    path: '/Modelos_3D/Mobiliario/Scandinavian_Table_Birch.obj',
    thumbnail: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=400',
    fileSize: 8200000,
    format: 'OBJ',
    tags: ['mesa', 'nórdico', 'escandinavo', 'abedul', 'madera clara', 'minimalista', 'funcional', 'simple', 'natural'],
    description: 'Mesa de estilo escandinavo en madera de abedul, diseño minimalista y funcional.',
    dateAdded: '2024-01-05',
    lastModified: '2024-01-06',
    isFavorite: true,
    metadata: {
      polyCount: 2840,
      materials: ['Birch_Wood', 'Metal_Legs']
    }
  },
  {
    id: '5',
    name: 'Fabric_Linen_Natural',
    type: 'texture',
    category: 'Telas',
    path: '/Texturas_PBR/Telas/Fabric_Linen_Natural_4K/',
    thumbnail: 'https://images.pexels.com/photos/1629781/pexels-photo-1629781.jpeg?auto=compress&cs=tinysrgb&w=400',
    fileSize: 52100000,
    resolution: '4096x4096',
    format: 'TIFF',
    tags: ['tela', 'lino', 'natural', 'beige', 'suave', 'textil', 'nórdico', 'minimalista', 'orgánico', 'textura'],
    description: 'Textura de lino natural en tonos beige, ideal para tapicería y decoración nórdica.',
    dateAdded: '2024-01-03',
    lastModified: '2024-01-03',
    isFavorite: false,
    metadata: {
      dimensions: '4096x4096',
      colorProfile: 'sRGB',
      textureMaps: ['Diffuse', 'Normal', 'Roughness']
    }
  },
  {
    id: '6',
    name: 'Metal_Steel_Brushed',
    type: 'material',
    category: 'Metales',
    path: '/Materiales/Metales/Metal_Steel_Brushed.mtl',
    thumbnail: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=400',
    fileSize: 1200000,
    format: 'MTL',
    tags: ['metal', 'acero', 'cepillado', 'plateado', 'reflectante', 'industrial', 'moderno', 'material', 'acabado'],
    description: 'Material de acero cepillado con propiedades físicas realistas para renders arquitectónicos.',
    dateAdded: '2024-01-01',
    lastModified: '2024-01-02',
    isFavorite: false,
    metadata: {
      roughness: 0.3,
      metallic: 1.0,
      reflectance: 0.9
    }
  },
  {
    id: '7',
    name: 'Sofa_Modular_Fabric',
    type: 'model',
    category: 'Mobiliario',
    path: '/Modelos_3D/Mobiliario/Sofa_Modular_Fabric.blend',
    thumbnail: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=400',
    fileSize: 24500000,
    format: 'BLEND',
    tags: ['sofá', 'modular', 'tela', 'gris', 'cómodo', 'sala', 'moderno', 'acogedor', 'funcional', 'mobiliario'],
    description: 'Sofá modular de 3 plazas con tapicería en tela gris, perfecto para salas de estar modernas.',
    dateAdded: '2023-12-28',
    lastModified: '2023-12-30',
    isFavorite: true,
    metadata: {
      polyCount: 15620,
      materials: ['Fabric_Grey', 'Wood_Frame', 'Metal_Legs']
    }
  },
  {
    id: '8',
    name: 'Marble_Carrara_White',
    type: 'texture',
    category: 'Piedra',
    path: '/Texturas_PBR/Piedra/Marble_Carrara_White_8K/',
    thumbnail: 'https://images.pexels.com/photos/1939485/pexels-photo-1939485.jpeg?auto=compress&cs=tinysrgb&w=400',
    fileSize: 128000000,
    resolution: '8192x8192',
    format: 'EXR',
    tags: ['mármol', 'carrara', 'blanco', 'vetas', 'elegante', 'lujo', 'piedra', 'natural', 'brillante', 'textura'],
    description: 'Textura de mármol Carrara blanco en alta resolución, perfecta para superficies de lujo.',
    dateAdded: '2023-12-25',
    lastModified: '2023-12-25',
    isFavorite: false,
    metadata: {
      dimensions: '8192x8192',
      colorProfile: 'Linear',
      textureMaps: ['Diffuse', 'Normal', 'Roughness', 'Displacement', 'Specular']
    }
  },
  {
    id: '9',
    name: 'City_Rooftop_HDRI',
    type: 'hdri',
    category: 'Iluminación',
    path: '/HDRI/Exteriores/City_Rooftop_HDRI_16K.hdr',
    thumbnail: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=400',
    fileSize: 89300000,
    resolution: '16384x8192',
    format: 'HDR',
    tags: ['hdri', 'ciudad', 'azotea', 'día', 'sol', 'urbano', 'iluminación', 'exterior', 'cielo', 'ambiente'],
    description: 'HDRI de azotea urbana con iluminación natural diurna, ideal para renders arquitectónicos.',
    dateAdded: '2023-12-20',
    lastModified: '2023-12-20',
    isFavorite: true,
    metadata: {
      dimensions: '16384x8192',
      lightingConditions: 'Daylight',
      captureTime: '14:30'
    }
  },
  {
    id: '10',
    name: 'Ambient_Forest_Loop',
    type: 'audio',
    category: 'Ambiente',
    path: '/Audio/Ambiente/Ambient_Forest_Loop.wav',
    thumbnail: 'https://images.pexels.com/photos/957024/pexels-photo-957024.jpeg?auto=compress&cs=tinysrgb&w=400',
    fileSize: 15600000,
    format: 'WAV',
    tags: ['audio', 'ambiente', 'bosque', 'natural', 'relajante', 'pájaros', 'viento', 'loop', 'sonido'],
    description: 'Audio ambiental de bosque en loop, perfecto para escenas naturales y ambientes relajantes.',
    dateAdded: '2023-12-18',
    lastModified: '2023-12-18',
    isFavorite: false,
    metadata: {
      duration: '120s',
      sampleRate: '48kHz',
      bitDepth: '24bit',
      channels: 'Stereo'
    }
  }
];