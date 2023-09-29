import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import ReservationPage from './index';
import Providers from '../../hooks/providers';

const reservationsMock = [
  {
    id: 1,
    startDate: '2021/03/15',
    finishDate: '2121/03/20',
    pricePerDay: 500,
    totalDays: 6,
    totalPrice: 2500,
    paymentMethod: 'CASH',
    status: 'FINISHED',
    clientId: 2,
    carId: 3,
  },
  {
    id: 4,
    startDate: '2021/03/20',
    finishDate: '2021/4/30',
    pricePerDay: 600,
    totalDays: 5,
    totalPrice: 25000,
    paymentMethod: 'CASH',
    status: 'FINISHED',
    clientId: 7,
    carId: 8,
  },
];

const thRow = [
  'ID',
  'Starting Date',
  'Finish Date',
  'Price per day',
  'Total Days',
  'Total Price',
  'Payment Method',
  'Status',
  'Client ID',
  'Car ID',
];

const getReservationsMock = jest.fn();

const server = setupServer(
  rest.get('http://localhost:3000/reservation', (req, res, ctx) => {
    const result = getReservationsMock();
    return res(ctx.json(result || []));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('<ReservationPage/>', () => {
  it('Renders table if there are at least one client', async () => {
    getReservationsMock.mockReturnValueOnce(reservationsMock);
    const component = render(
      <Router>
        <Providers>
          <ReservationPage />
        </Providers>
      </Router>
    );

    await component.findByText('There are 2 reservations');

    for (let i = 0; i < thRow.length; i++) {
      await component.findByText(thRow[i]);
    }

    for (let i = 0; i < reservationsMock.length; i++) {
      const tbData = Object.values(reservationsMock[i]);
      await component.findByText(tbData[i]);
    }
  });

  it('Do not render table if there is no reservations', async () => {
    getReservationsMock.mockReturnValueOnce([]);
    const component = render(
      <Router>
        <Providers>
          <ReservationPage />
        </Providers>
      </Router>
    );
    await component.findByText(/There are 0 reservations/i);

    const table = screen.queryByRole('table');
    expect(table).toBeNull();
  });
});
