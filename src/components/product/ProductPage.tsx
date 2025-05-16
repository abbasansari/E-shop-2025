"use client";

import { useState, Suspense, lazy } from 'react';
import { Product, SelectedVariant } from '@/types/product';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Star } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cart/cartSlice';
import { cn } from '@/lib/utils';

const ImageGallery = lazy(() => import('./ImageGallery'));
const ColorSelector = lazy(() => import('./ColorSelector'));
const SizeSelector = lazy(() => import('./SizeSelector'));
const QuantitySelector = lazy(() => import('./QuantitySelector'));
const ExpandableDetails = lazy(() => import('./ExpandableDetails'));

interface ProductPageProps {
  product: Product;
}

const ProductPage = ({ product }: ProductPageProps) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [selectedVariant, setSelectedVariant] = useState<SelectedVariant>({
    colorId: product.colors.length > 0 ? product.colors[0].id : null,
    sizeId: null,
    quantity: 1,
  });

  const handleColorChange = (colorId: string) => {
    setSelectedVariant(prev => ({ ...prev, colorId }));
  };

  const handleSizeChange = (sizeId: string) => {
    setSelectedVariant(prev => ({ ...prev, sizeId }));
  };

  const handleQuantityChange = (quantity: number) => {
    setSelectedVariant(prev => ({ ...prev, quantity }));
  };

  const handleAddToCart = () => {
    if (!selectedVariant.sizeId) {
      toast({
        title: "Please select a size",
        description: "Select a size before adding to cart.",
        className: "bg-[#EF4444] text-white",
      });
      return;
    }

    dispatch(addToCart({ product, variant: selectedVariant }));

    const selectedColor = product.colors.find(c => c.id === selectedVariant.colorId);
    const selectedSize = product.sizes.find(s => s.id === selectedVariant.sizeId);

    toast({
      title: "Added to cart!",
      description: `${product.name} - ${selectedColor?.name}, Size ${selectedSize?.name}, Qty: ${selectedVariant.quantity}`,
      className: "bg-[#FFFF] text-black",
    });
  };

  const discountPercentage = product.originalPrice 
    ? Math.round((1 - (product.price / product.originalPrice)) * 100) 
    : 0;

  return (
    <div className="container py-8 mx-auto">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
        {/* Product Images */}
        <div>
          <Suspense fallback={<div className="w-full h-96 bg-muted animate-pulse rounded-md" />}>
            <ImageGallery 
              images={product.images} 
              activeColorId={selectedVariant.colorId}
            />
          </Suspense>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Product Name and Rating */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{product.name}</h1>
            <div className="mt-2 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted stroke-muted'}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-end gap-2">
            <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
            {product.originalPrice && (
              <>
                <p className="text-sm line-through text-muted-foreground">
                  ${product.originalPrice.toFixed(2)}
                </p>
                <p className="text-sm font-medium text-green-600">
                  Save {discountPercentage}%
                </p>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-base text-muted-foreground">
            {product.description}
          </p>

          {/* Color Selection */}
          {product.colors.length > 0 && (
            <Suspense fallback={<div className="h-10 bg-muted rounded-md w-32 my-2 animate-pulse" />}>
              <ColorSelector
                colors={product.colors}
                selectedColorId={selectedVariant.colorId}
                onChange={handleColorChange}
              />
            </Suspense>
          )}

          {/* Size Selection */}
          {product.sizes.length > 0 && (
            <Suspense fallback={<div className="h-10 bg-muted rounded-md w-32 my-2 animate-pulse" />}>
              <SizeSelector
                sizes={product.sizes}
                selectedSizeId={selectedVariant.sizeId}
                onChange={handleSizeChange}
              />
            </Suspense>
          )}

          {/* Quantity Selector */}
          <Suspense fallback={<div className="h-10 bg-muted rounded-md w-20 my-2 animate-pulse" />}>
            <QuantitySelector
              quantity={selectedVariant.quantity}
              onChange={handleQuantityChange}
              className="py-2"
            />
          </Suspense>

          {/* Add to Cart */}
          <Button 
            size="lg" 
            className={cn(
              "w-full sm:w-auto flex items-center gap-2 cursor-pointer",
              "text-lg py-6 px-8 my-6",
              product.inStock 
                ? "bg-[rgb(15_23_42)] text-[#F8FAFC] hover:bg-[rgb(15_23_42)]/90"
                : "bg-gray-400 text-gray-100 cursor-not-allowed"
            )}
            style={{
              margin: '24px 0 0',
              padding: '0 32px'
            }}
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-6 w-6" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>

          {/* Divider Line Below Add to Cart - lighter border */}
          <hr className="my-8 border-t-1 border-[#26354b]" />

          {/* Product Details */}
          <div className="mt-8">
            <Suspense fallback={<div className="h-24 bg-muted rounded-md animate-pulse" />}>
              {product.details.map((detail, index) => (
                <ExpandableDetails
                  key={index}
                  title={detail.title}
                  content={detail.content}
                  defaultExpanded={index === 0}
                />
              ))}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;