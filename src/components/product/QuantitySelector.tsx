"use client";

import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

const QuantitySelector = ({
  quantity,
  onChange,
  min = 1,
  max = 10,
  className
}: QuantitySelectorProps) => {
  const decrease = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };
  
  const increase = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };
  
  return (
    <div className={cn('flex items-center', className)}>
      <div className="text-sm font-medium mr-4">Quantity</div>
      <div className="flex items-center border border-input rounded-md overflow-hidden">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-none"
          onClick={decrease}
          disabled={quantity <= min}
        >
          <Minus className="h-3 w-3" />
          <span className="sr-only">Decrease quantity</span>
        </Button>
        
        <span className="w-8 text-center">{quantity}</span>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-none"
          onClick={increase}
          disabled={quantity >= max}
        >
          <Plus className="h-3 w-3" />
          <span className="sr-only">Increase quantity</span>
        </Button>
      </div>
    </div>
  );
};

export default QuantitySelector;