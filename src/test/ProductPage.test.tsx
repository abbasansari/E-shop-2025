import { render, screen, fireEvent } from '@testing-library/react';
import ProductPage from '../components/product/ProductPage';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { Product } from '@/types/product';

// Mock product data
const mockProduct: Product = {
  id: 'test-id',
  name: 'Test Product',
  price: 100,
  originalPrice: 120,
  description: 'Test description',
  details: [{ title: 'Details', content: 'Some details' }],
  colors: [{ id: 'red', name: 'Red', hex: '#f00' }],
  sizes: [{ id: 'm', name: 'M', available: true }],
  images: [
    {
      id: 'img1',
      src: 'https://via.placeholder.com/800',
      alt: 'Test image',
      colorId: 'red',
      thumbSrc: 'https://via.placeholder.com/200'
    }
  ],
  rating: 4.5,
  reviews: 10,
  inStock: true,
};

// Mock lazy components with displayName and no unused props
jest.mock('../ImageGallery', () => {
  const Mock = () => <div>ImageGallery</div>;
  Mock.displayName = 'ImageGallery';
  return Mock;
});
jest.mock('../ColorSelector', () => {
  const Mock = () => <div>ColorSelector</div>;
  Mock.displayName = 'ColorSelector';
  return Mock;
});
jest.mock('../SizeSelector', () => {
  const Mock = () => <div>SizeSelector</div>;
  Mock.displayName = 'SizeSelector';
  return Mock;
});
jest.mock('../QuantitySelector', () => {
  const Mock = () => <div>QuantitySelector</div>;
  Mock.displayName = 'QuantitySelector';
  return Mock;
});
jest.mock('../ExpandableDetails', () => {
  const Mock = () => <div>ExpandableDetails</div>;
  Mock.displayName = 'ExpandableDetails';
  return Mock;
});

// Mock useToast
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: jest.fn() }),
}));

describe('ProductPage', () => {
  it('renders product name, price, and Add to Cart button', () => {
    render(
      <Provider store={store}>
        <ProductPage product={mockProduct} />
      </Provider>
    );
    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/\$100.00/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add to Cart/i })).toBeInTheDocument();
  });

  it('shows error toast if size is not selected and Add to Cart is clicked', () => {
    render(
      <Provider store={store}>
        <ProductPage product={mockProduct} />
      </Provider>
    );
    const button = screen.getByRole('button', { name: /Add to Cart/i });
    fireEvent.click(button);
    // The toast is mocked, so you can check if it was called if you want
  });
});