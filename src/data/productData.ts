import { Product } from '@/types/product';

export const mockProduct: Product = {
  id: 'premium-running-shoes',
  name: 'Premium Performance Running Shoes',
  price: 129.99,
  originalPrice: 179.99,
  description: 'Experience ultimate comfort and performance with our premium running shoes designed for serious athletes and casual runners alike. Featuring responsive cushioning, breathable materials, and durable construction for miles of comfort.',
  details: [
    {
      title: 'Product Features',
      content: '• Lightweight, breathable mesh upper\n• Responsive cushioning for impact absorption\n• Durable rubber outsole for excellent traction\n• Removable insole for customized comfort\n• Reflective elements for visibility in low light conditions\n• Weight: 8.5 oz (size 9)'
    },
    {
      title: 'Materials',
      content: 'Upper: 90% recycled polyester mesh, 10% TPU reinforcement\nMidsole: Responsive EVA foam with 20% recycled content\nOutsole: Carbon rubber for durability at high-wear zones\nInsole: Molded EVA with antimicrobial treatment'
    },
    {
      title: 'Fit & Care',
      content: 'Fit: True to size with a secure midfoot and roomy toe box\nCare: Remove dirt with a soft brush or damp cloth. Machine washable (cold, gentle cycle). Air dry away from direct heat.'
    },
    {
      title: 'Sustainability',
      content: 'Made with at least 20% recycled materials by weight, these shoes represent our commitment to reducing environmental impact while delivering premium performance. The upper is constructed with recycled polyester from plastic bottles, and the midsole contains recycled EVA foam.'
    }
  ],
  colors: [
    { id: 'black', name: 'Core Black', hex: '#212121' },
    { id: 'blue', name: 'Electric Blue', hex: '#0066cc' },
    { id: 'red', name: 'Energy Red', hex: '#e63946' },
    { id: 'white', name: 'Cloud White', hex: '#f8f9fa' }
  ],
  sizes: [
    { id: 'us-7', name: 'US 7', available: true },
    { id: 'us-8', name: 'US 8', available: true },
    { id: 'us-9', name: 'US 9', available: true },
    { id: 'us-10', name: 'US 10', available: true },
    { id: 'us-11', name: 'US 11', available: false },
    { id: 'us-12', name: 'US 12', available: true }
  ],
  images: [
    {
      id: 'black-1',
      src: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&auto=format&fit=crop&q=80',
      alt: 'Black running shoes - front view',
      colorId: 'black',
      thumbSrc: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=200&auto=format&fit=crop&q=60'
    },
    {
      id: 'black-2',
      src: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&auto=format&fit=crop&q=80',
      alt: 'Black running shoes - side view',
      colorId: 'black',
      thumbSrc: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&auto=format&fit=crop&q=60'
    },
    {
      id: 'blue-1',
      src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
      alt: 'Blue running shoes - front view',
      colorId: 'blue',
      thumbSrc: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&auto=format&fit=crop&q=60'
    },
    {
      id: 'red-1',
      src: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=80',
      alt: 'Red running shoes - top view',
      colorId: 'red',
      thumbSrc: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=200&auto=format&fit=crop&q=60'
    },
    {
      id: 'white-1',
      src: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80',
      alt: 'White running shoes - side view',
      colorId: 'white',
      thumbSrc: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&auto=format&fit=crop&q=60'
    }
  ],
  rating: 4.8,
  reviews: 124,
  inStock: true
};