import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import ClientsPage from './index';
import Providers from '../../hooks/providers';

const clientsMock = [
  {
    id: 1,
    firstName: 'firstNameMock',
    lastName: 'lastNameMock',
    nationality: 'nationalityMock',
    address: 'addressMock',
    phoneNumber: 1234,
    dni: 43203946,
    email: 'Email@Email.com',
  },
  {
    id: 2,
    firstName: '3',
    lastName: '4',
    nationality: '5',
    address: '6',
    phoneNumber: 8,
    dni: 8,
    email: '32@asdsad.com',
  },
];

const thRow = [
  'ID',
  'First Name',
  'Last Name',
  'Nationality',
  'Address',
  'Phone Number',
  'D.N.I',
  'Email',
];

const getClientsMock = jest.fn();

const server = setupServer(
  rest.get('http://localhost:3000/client', (req, res, ctx) => {
    const result = getClientsMock();
    return res(ctx.json(result || []));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('<ClientsPage/>', () => {
  it('Renders table if there are at least one client', async () => {
    getClientsMock.mockReturnValueOnce(clientsMock);
    const component = render(
      <Router>
        <Providers>
          <ClientsPage />
        </Providers>
      </Router>
    );

    await component.findByText('There are 2 clients');

    for (let i = 0; i < thRow.length; i++) {
      await component.findByText(thRow[i]);
    }

    for (let i = 0; i < clientsMock.length; i++) {
      const tbData = Object.values(clientsMock[i]);
      await component.findByText(tbData[i]);
    }
  });

  it('Do not render table if there is no clients', async () => {
    getClientsMock.mockReturnValueOnce([]);
    const component = render(
      <Router>
        <Providers>
          <ClientsPage />
        </Providers>
      </Router>
    );
    await component.findByText('There are 0 clients');

    const table = screen.queryByRole('table');
    expect(table).toBeNull();
  });
});
