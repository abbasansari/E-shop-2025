import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, SelectedVariant } from '@/types/product';

export type CartItem = {
  product: Product;
  variant: SelectedVariant;
  id: string; // Composite ID for the cart item
};

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
};

// Helper function to generate a unique ID for the cart item
const createCartItemId = (product: Product, variant: SelectedVariant): string => {
  return `${product.id}-${variant.colorId || 'default'}-${variant.sizeId || 'default'}`;
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; variant: SelectedVariant }>) => {
      const { product, variant } = action.payload;
      const cartItemId = createCartItemId(product, variant);
      
      // Check if item with same variant exists
      const existingItemIndex = state.items.findIndex(item => item.id === cartItemId);
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        state.items[existingItemIndex].variant.quantity += variant.quantity;
      } else {
        // Add new item
        state.items.push({
          product,
          variant: { ...variant },
          id: cartItemId,
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === id);
      
      if (itemIndex >= 0 && quantity > 0) {
        state.items[itemIndex].variant.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart, toggleCart } =
  cartSlice.actions;

export default cartSlice.reducer;