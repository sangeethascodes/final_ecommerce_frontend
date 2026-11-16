import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    get: jest.fn(() => Promise.resolve({ data: [] })),
  },
}));

test('renders ecommerce home page', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const heading = screen.getByRole('heading', { name: /latest products/i });
  expect(heading).toBeInTheDocument();
});
