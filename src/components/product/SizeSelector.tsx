"use client";

import { ProductSize } from '@/types/product';
import { cn } from '@/lib/utils';

interface SizeSelectorProps {
  sizes: ProductSize[];
  selectedSizeId: string | null;
  onChange: (sizeId: string) => void;
  className?: string;
}

const SizeSelector = ({
  sizes,
  selectedSizeId,
  onChange,
  className
}: SizeSelectorProps) => {
  return (
    <div className={cn('space-y-2', className)}>
      <div className="text-sm font-medium">Size</div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size.id}
            className={cn(
              'min-w-12 h-10 px-3 flex items-center justify-center rounded border',
              selectedSizeId === size.id
                ? 'bg-[rgb(15_23_42)] text-[#F8FAFC] border-primary cursor-pointer'
                : 'bg-background hover:bg-muted/50 border-input cursor-pointer',
              !size.available && 'opacity-50 cursor-not-allowed'
            )}
            onClick={() => size.available && onChange(size.id)}
            disabled={!size.available}
          >
            {size.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;