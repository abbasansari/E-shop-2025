"use client";

import { ProductColor } from '@/types/product';
import { cn } from '@/lib/utils';

interface ColorSelectorProps {
  colors: ProductColor[];
  selectedColorId: string | null;
  onChange: (colorId: string) => void;
  className?: string;
}

const ColorSelector = ({
  colors,
  selectedColorId,
  onChange,
  className
}: ColorSelectorProps) => {
  return (
    <div className={cn('space-y-2', className)}>
      <div className="text-sm font-medium">Color</div>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color.id}
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center p-0.5',
              selectedColorId === color.id ? 'ring-2 ring-primary ring-offset-2' : ''
            )}
            onClick={() => onChange(color.id)}
            aria-label={color.name}
            title={color.name}
          >
            <span 
              className="w-full h-full rounded-full" 
              style={{ backgroundColor: color.hex }}
            ></span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;