import React, { createContext, useContext, ReactNode } from 'react';
import imagenesData from '../../imagenes.json';

export interface ImageItem {
  id: string;
  tag: string;
  descripcion: string;
  link: string;
}

interface ImagesContextType {
  images: ImageItem[];
  getImageById: (id: string) => ImageItem | undefined;
  getImagesByTag: (tag: string) => ImageItem[];
}

const ImagesContext = createContext<ImagesContextType | undefined>(undefined);

export const ImagesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const images = imagenesData.imagenes as ImageItem[];

  const getImageById = (id: string) => {
    return images.find(img => img.id === id);
  };

  const getImagesByTag = (tag: string) => {
    return images.filter(img => img.tag === tag);
  };

  return (
    <ImagesContext.Provider value={{ images, getImageById, getImagesByTag }}>
      {children}
    </ImagesContext.Provider>
  );
};

export const useImages = () => {
  const context = useContext(ImagesContext);
  if (context === undefined) {
    throw new Error('useImages must be used within an ImagesProvider');
  }
  return context;
};
