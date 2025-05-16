# E-Commerce Product Page - Technical Assessment

A modern, interactive product page that showcases a premium e-commerce experience with advanced features and optimizations.

## Project Overview

This project is a frontend technical assessment that demonstrates expertise in:
- Modern Next.js development with TypeScript
- Performance optimization techniques
- Responsive UI/UX design
- Advanced component architecture
- Accessibility implementation

## Features

### Core Features
- **Interactive Product Image Gallery** - with zoom functionality and thumbnail navigation
- **Color/Size Variant Selection** - with real-time updates to the product display
- **Add to Cart Functionality** - with quantity selection and validation
- **Expandable Product Details** - featuring an accordion-style UI for product information
- **Fully Responsive Design** - optimized for all device sizes

### Advanced Feature Implementation
- **Custom Image Lazy Loading with Blur-up Technique** - Progressive image loading with blur placeholders for improved perceived performance
- **State Management with Redux Toolkit** - Centralized state management for cart functionality

### Technical Highlights
- Next.js 15+ with App Router for optimized routing and server components
- TypeScript for type safety and developer experience
- React hooks for component-level state management
- Redux Toolkit for global state management
- Custom component architecture for reusability
- Tailwind CSS for responsive styling
- ShadCN UI components for accessible UI elements
- Performance optimizations for image loading and rendering
- Keyboard navigation support for accessibility
- Responsive design for all device sizes

## Technical Decisions

1. **Next.js with App Router**
   - Using the latest Next.js with App Router for optimized routing and rendering
   - Server components for improved performance where appropriate
   - Client components where interactivity is needed

2. **State Management**
   - Redux Toolkit for global cart state
   - React's useState hooks for component-level state
   - Controlled components pattern for form inputs

3. **Image Loading Strategy**
   - Custom lazy loading solution with blur-up technique
   - IntersectionObserver API for loading images only when they come into view
   - Low-quality image placeholders to improve perceived loading speed
   - Next.js Image component for automatic optimization

4. **Component Architecture**
   - Separated UI components based on functionality (Gallery, Color Selector, Size Selector, etc.)
   - Used composition to create complex UIs from simple components
   - Ensured components are reusable and maintainable

5. **Accessibility**
   - ARIA attributes for interactive elements
   - Keyboard navigation for all interactive components
   - Proper color contrast ratios
   - Semantic HTML elements
   - Focus management for modal dialogs

6. **Performance Optimizations**
   - Route-based code splitting
   - Image optimization with Next.js Image
   - Lazy loading for non-critical components
   - Memoization to prevent unnecessary re-renders

## Project Setup

### Prerequisites
- Node.js 18.17.0 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd e-commerce-product-page
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Building for Production

```bash
npm run build
# or
yarn build
```

Then to start the production server:

```bash
npm run start
# or
yarn start
```

## Future Enhancements

1. Add dark/light mode support
2. Implement analytics tracking for user interactions
3. Add performance monitoring
4. Enhance the add to cart animation
5. Create a full shopping cart experience
6. Add product reviews system
7. Implement a related products section
8. Add product search functionality
9. Implement user authentication
10. Add product wishlist functionality

## Author

Created by Abbas Ali as part of a frontend technical assessment.
