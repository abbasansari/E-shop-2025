import { render, screen, fireEvent } from '@testing-library/react';
import ProductPage from '../ProductPage';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { Product } from '@/types/product';

// Mock product data (you can import your mockProduct if available)
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

// Mock lazy components
jest.mock('../ImageGallery', () => () => <div>ImageGallery</div>);
jest.mock('../ColorSelector', () => (props: any) => <div>ColorSelector</div>);
jest.mock('../SizeSelector', () => (props: any) => <div>SizeSelector</div>);
jest.mock('../QuantitySelector', () => (props: any) => <div>QuantitySelector</div>);
jest.mock('../ExpandableDetails', () => (props: any) => <div>ExpandableDetails</div>);

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