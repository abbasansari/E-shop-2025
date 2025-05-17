"use client";

import { ShoppingCart, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import { useTheme } from 'next-themes';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { theme, setTheme } = useTheme();

  const cartItemCount = cartItems.reduce((total, item) => total + item.variant.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">E-Shop</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme toggle button - visible on all devices */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 cursor-pointer" />
            ) : (
              <Moon className="h-5 w-5 cursor-pointer" />
            )}
          </Button>

          {/* Cart button - hidden on mobile */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden md:flex relative cursor-pointer"
          >
            <ShoppingCart className="h-5 w-5 cursor-pointer" />
            <span className="sr-only">Cart</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 rounded-full bg-primary text-primary-foreground text-xs w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Button>

          {/* Mobile menu button - always visible on mobile */}
          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:bg-muted focus:text-foreground md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "md:hidden",
            isMenuOpen ? "block" : "hidden"
          )}
        >
          {/* No menu items */}
        </div>
      </div>
    </header>
  );
};

export default Header;