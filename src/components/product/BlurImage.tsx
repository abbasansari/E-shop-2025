import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface BlurImageProps {
  src: string;
  alt: string;
  className?: string;
  thumbSrc?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  forceVisible?: boolean;
}

const BlurImage = ({
  src,
  alt,
  className,
  thumbSrc,
  width,
  height,
  priority,
  forceVisible = false // <-- NEW
}: BlurImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (forceVisible) {
      setIsInView(true);
      return;
    }
    if (!imgRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    });

    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, [forceVisible]);

  return (
    <div
      className={cn(
        'blur-load overflow-hidden',
        isLoaded && 'loaded',
        className
      )}
      style={thumbSrc ? { backgroundImage: `url(${thumbSrc})` } : {}}
      ref={imgRef}
    >
      {(isInView || forceVisible) && (
        <Image
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-opacity"
          width={width || 800}
          height={height || 800}
          onLoad={() => setIsLoaded(true)}
          priority={priority}
        />
      )}
    </div>
  );
};

export default BlurImage;