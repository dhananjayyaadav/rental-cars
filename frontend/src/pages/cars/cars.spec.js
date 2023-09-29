import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { findByText, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import CarsPage from './index';
import Providers from '../../hooks/providers';

const carsMock = [
  {
    air_conditioning: 'no',
    brand: 'brand1',
    color: 'red',
    id: 1,
    image: 'In construction',
    kms: '2',
    model: 'model1',
    passengers: 1,
    price: 1,
    year: 1,
  },
  {
    air_conditioning: 'yes',
    brand: 'brand2',
    color: 'blue',
    id: 2,
    image: 'In construction',
    kms: '1',
    model: 'model2',
    passengers: 2,
    price: 2,
    year: 2,
  },
];

const thRow = [
  'ID',
  'Brand',
  'Model',
  'Year',
  'Kms',
  'Color',
  'Amount Of Passengers',
  'price',
  'image',
  'Has Air Conditioning?',
];

const mockResponseApi = jest.fn();

const server = setupServer(
  rest.get('http://localhost:3000/car', (req, res, ctx) => {
    const result = mockResponseApi();
    return res(ctx.json(result || []));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('<CarsPage/>', () => {
  it('Renders table if there are at least one car', async () => {
    mockResponseApi.mockReturnValueOnce(carsMock);
    const component = render(
      <Router>
        <Providers>
          <CarsPage />
        </Providers>
      </Router>
    );

    await component.findByText('There are 2 cars');

    for (let i = 0; i < thRow.length; i++) {
      await component.findByText(thRow[i]);
    }

    for (let i = 0; i < carsMock.length; i++) {
      const tbData = Object.values(carsMock[i]);
      await component.findByText(tbData[i]);
    }
  });

  it('Do not render table if there is no cars', async () => {
    mockResponseApi.mockReturnValueOnce([]);
    const component = render(
      <Router>
        <Providers>
          <CarsPage />
        </Providers>
      </Router>
    );
    await component.findByText('There are 0 cars');
    await component.findByText(/Create new car!/i);

    const table = screen.queryByRole('table');
    expect(table).toBeNull();
  });
});
