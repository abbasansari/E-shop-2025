export type ProductColor = {
  id: string;
  name: string;
  hex: string;
};

export type ProductSize = {
  id: string;
  name: string;
  available: boolean;
};

export type ProductImage = {
  id: string;
  src: string;
  alt: string;
  colorId?: string;
  thumbSrc?: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  details: Array<{
    title: string;
    content: string;
  }>;
  colors: ProductColor[];
  sizes: ProductSize[];
  images: ProductImage[];
  rating: number;
  reviews: number;
  inStock: boolean;
};

export type SelectedVariant = {
  colorId: string | null;
  sizeId: string | null;
  quantity: number;
};