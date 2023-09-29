import { Button, Container, makeStyles, TextField } from '@material-ui/core';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useClient } from '../../hooks/useClient';
import ClientForm from '../form/clientForm';

const useStyles = makeStyles({
  title: {
    textAlign: 'center',
  },
  input: {
    margin: '1rem 0',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-around',
  },
});
export default function ClientDetail({ id }) {
  const classes = useStyles();
  const history = useHistory();
  const { client, getClientById, deleteClient, error } = useClient();

  useEffect(() => {
    getClientById(id);
  }, [id, getClientById]);

  const handleDelete = () => {
    try {
      deleteClient(id);
      history.push('/clients');
    } catch (error) {
      console.log(error);
    }
  };
  if (error) {
    history.push('/clients');
  }
  return (
    <Container>
      <div className={classes.title}>
        <h1>Viewing Client with ID {id}</h1>
      </div>

      <form>
        <TextField
          inputProps={{ readOnly: true }}
          className={classes.input}
          id="first-name"
          label="First Name"
          fullWidth
          autoFocus
          value={client.firstName}
        />
        <TextField
          inputProps={{ readOnly: true }}
          className={classes.input}
          label="Last Name"
          fullWidth
          value={client.lastName}
        />
        <TextField
          inputProps={{ readOnly: true }}
          className={classes.input}
          label="Nationality"
          fullWidth
          value={client.nationality}
        />
        <TextField
          inputProps={{ readOnly: true }}
          className={classes.input}
          label="Address"
          fullWidth
          value={client.address}
        />
        <TextField
          inputProps={{ readOnly: true }}
          className={classes.input}
          label="Phone number"
          fullWidth
          value={client.phoneNumber}
        />
        <TextField
          inputProps={{ readOnly: true }}
          className={classes.input}
          label="Email"
          fullWidth
          value={client.email}
        />

        <div className={classes.buttons}>
          <ClientForm clientToUpdate={client} />
          <Button variant="contained" color="secondary" onClick={handleDelete}>
            Delete Client
          </Button>
        </div>
      </form>
    </Container>
  );
}
