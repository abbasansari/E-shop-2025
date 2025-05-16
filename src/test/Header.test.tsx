import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes';
import { store } from '@/redux/store';

// Mock next/link to render children directly
jest.mock('next/link', () => ({ children, ...props }: any) => <a {...props}>{children}</a>);

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
    expect(screen.getByText(/No menu items/i)).toBeVisible();
  });
});