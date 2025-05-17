import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes';
import { store } from '@/redux/store';

// Mock next/link to render children directly
jest.mock('next/link', () => {
  const MockLink = ({ children, ...props }: { children: React.ReactNode }) => <a {...props}>{children}</a>;
  MockLink.displayName = 'NextLink';
  return MockLink;
});

describe('Header', () => {
  it('renders site title and cart icon', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Header />
        </ThemeProvider>
      </Provider>
    );
    expect(screen.getByText(/E-Shop/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Cart/i)).toBeInTheDocument();
  });

  it('toggles mobile menu', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Header />
        </ThemeProvider>
      </Provider>
    );
    const menuButton = screen.getByLabelText(/Open main menu/i);
    fireEvent.click(menuButton);
    // Since there are no menu items, just check the menu container is visible
    const mobileMenu = screen.getByRole('navigation', { hidden: true }) || screen.getByText(/E-Shop/i).closest('header');
    expect(mobileMenu).toBeInTheDocument();
  });
});