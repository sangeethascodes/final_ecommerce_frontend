import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import axios from 'axios';
import App from './App';
import store from './store';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

test('renders ecommerce home page', async () => {
  axios.get.mockResolvedValue({ data: [] });

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const heading = screen.getByRole('heading', { name: /latest products/i });
  expect(heading).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
