import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from './index';
import { BrowserRouter as Router } from 'react-router-dom';

describe('<Header/>', () => {
  it('Renders Header Correctly', async () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    expect(screen.getByRole('link', { name: 'Car Rental Agency' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Cars' })).toHaveAttribute('href', '/cars');
    expect(screen.getByRole('link', { name: 'Clients' })).toHaveAttribute('href', '/clients');
    expect(screen.getByRole('link', { name: 'Reservations' })).toHaveAttribute(
      'href',
      '/reservations'
    );
  });
});
