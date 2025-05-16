"use client";

import { useState, useRef } from 'react';
import { ProductImage } from '@/types/product';
import BlurImage from './BlurImage';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ImageGalleryProps {
  images: ProductImage[];
  activeColorId?: string | null;
  className?: string;
  priority?: boolean; // <-- add this
}

const ImageGallery = ({ images, activeColorId, className, priority }: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const zoomContainerRef = useRef<HTMLDivElement>(null);

  // Filter images by color if activeColorId is provided
  const filteredImages = activeColorId 
    ? images.filter(img => !img.colorId || img.colorId === activeColorId)
    : images;

  // Use the first image if the filtered images is empty
  const displayImages = filteredImages.length > 0 ? filteredImages : images;

  // Ensure activeIndex is within bounds
  const safeActiveIndex = Math.min(activeIndex, displayImages.length - 1);
  const activeImage = displayImages[safeActiveIndex];

  const handlePrevious = () => {
    setActiveIndex(prev => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev < displayImages.length - 1 ? prev + 1 : prev));
  };

  const handleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !zoomContainerRef.current) return;

    const { left, top, width, height } = zoomContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      handlePrevious();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    } else if (e.key === 'Escape') {
      setIsZoomed(false);
    }
  };

  return (
    <div 
      className={cn('space-y-4', className)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div 
        className={cn(
          'relative overflow-hidden rounded-lg aspect-square bg-secondary',
          isZoomed ? 'product-image-zoomed' : 'product-image-zoom'
        )}
        onClick={handleZoom}
        onMouseMove={handleMouseMove}
        ref={zoomContainerRef}
      >
        {activeImage && (
          <div 
            className={cn(
              'w-full h-full transition-transform duration-200',
              isZoomed && 'scale-150'
            )}
            style={isZoomed ? { 
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` 
            } : {}}
          >
          <BlurImage
  src={activeImage.src}
  alt={activeImage.alt}
  thumbSrc={activeImage.thumbSrc}
  className="w-full h-full"
  width={800}
  height={800}
  priority={priority && safeActiveIndex === 0}
  forceVisible={priority && safeActiveIndex === 0}
/>
          </div>
        )}
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-2 bg-background/80 backdrop-blur-sm z-10"
          onClick={(e) => {
            e.stopPropagation();
            handleZoom();
          }}
          aria-label={isZoomed ? "Zoom out" : "Zoom in"}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        
        {displayImages.length > 1 && (
          <>
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm",
                safeActiveIndex === 0 && "opacity-50 cursor-not-allowed"
              )}
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              disabled={safeActiveIndex === 0}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm",
                safeActiveIndex === displayImages.length - 1 && "opacity-50 cursor-not-allowed"
              )}
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              disabled={safeActiveIndex === displayImages.length - 1}
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
      
      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {displayImages.map((image, idx) => (
            <button
              key={image.id}
              className={cn(
                'w-16 h-16 rounded border overflow-hidden',
                safeActiveIndex === idx ? 'border-primary' : 'border-muted'
              )}
              onClick={() => setActiveIndex(idx)}
              aria-label={`View ${image.alt}`}
              aria-current={safeActiveIndex === idx}
            >
              <Image 
                src={image.thumbSrc || image.src} 
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
                width={64}
                height={64}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;