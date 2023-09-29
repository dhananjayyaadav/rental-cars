import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Table from './index';
import { BrowserRouter as Router } from 'react-router-dom';

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

describe('<Table/>', () => {
  it('Renders Table Correctly', async () => {
    const tbData = clientsMock.map((client) => Object.values(client));

    const component = render(
      <Router>
        <Table tbData={tbData} thData={thRow} type="client" />
      </Router>
    );
    await component.findByRole('table');

    for (let i = 0; i < thRow.length; i++) {
      await component.findByText(thRow[i]);
    }

    for (let i = 0; i < clientsMock.length; i++) {
      const tbData = Object.values(clientsMock[i]);
      await component.findByText(tbData[i]);
    }
  });
});
