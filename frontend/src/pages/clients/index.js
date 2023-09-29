import { makeStyles } from '@material-ui/core';
import { useEffect } from 'react';
import { Alert } from '@material-ui/lab';
import Header from '../../components/header';
import Table from '../../components/table';
import AlertError from '../../components/error/alertError';
import { useClient } from '../../hooks/useClient';
import ClientForm from '../../components/form/clientForm';

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
const useStyles = makeStyles({
  title: {
    textAlign: 'center',
  },
  alert: {
    margin: '1rem 0',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-around',
  },
});

export default function ClientsPage() {
  const classes = useStyles();

  const { getAllClients, clients, status, setStatus, error } = useClient();

  useEffect(() => {
    getAllClients();
  }, [getAllClients, setStatus, status]);

  const tbData = clients.map((client) => Object.values(client));
  return (
    <>
      <Header />
      <div className={classes.title}>
        <h1>Clients Management</h1>
        <h3>There are {clients.length} clients</h3>
        {status && (
          <Alert className={classes.alert} severity="success">
            {status}
          </Alert>
        )}
        {error && <AlertError error={error} />}
        <ClientForm isUpdate={false} />
      </div>
      {clients.length > 0 && <Table thData={thRow} tbData={tbData} type="client" />}
    </>
  );
}
