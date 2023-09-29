import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import { Alert } from '@material-ui/lab';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState } from 'react';
import { useClient } from '../../hooks/useClient';
import AlertError from '../error';
import { useHistory } from 'react-router-dom';

export default function ClientForm({ clientToUpdate }) {
  const initialState = {
    firstName: '',
    lastName: '',
    nationality: '',
    address: '',
    phoneNumber: '',
    dni: '',
    email: '',
  };
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [client, setClient] = useState(clientToUpdate ? clientToUpdate : initialState);

  const { createClient, error, setError, updateClient } = useClient();

  const handleClickOpen = () => {
    setError(false);
    setClient(initialState);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (clientToUpdate) {
      updateClient(clientToUpdate.id, client);
      history.push('/clients');
    } else {
      createClient(client);
    }
    if (!error) {
      handleClose();
    }
  };

  const handleChange = (e) => {
    setClient({ ...client, [e.target.id]: e.target.value });
  };
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        {clientToUpdate ? 'Update Client' : 'Create New Client'}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          {clientToUpdate ? 'Update Client' : 'Create New Client'}
        </DialogTitle>

        {!error ? (
          <Alert severity="warning" style={{ fontWeight: 'bold', textAlign: 'center' }}>
            All inputs are required
          </Alert>
        ) : (
          <AlertError error={error} />
        )}

        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="firstName"
              label="First Name"
              type="text"
              name="firstName"
              value={client.firstName}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
              fullWidth
              required
            />
            <TextField
              margin="dense"
              id="lastName"
              required
              label="Last Name"
              type="text"
              value={client.lastName}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
              fullWidth
            />
            <TextField
              margin="dense"
              id="nationality"
              required
              label="Nationality"
              type="text"
              value={client.nationality}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
              fullWidth
            />{' '}
            <TextField
              margin="dense"
              id="phoneNumber"
              required
              label="Phone Number"
              type="number"
              value={client.phoneNumber}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
              fullWidth
            />
            <TextField
              margin="dense"
              id="address"
              required
              label="Address"
              type="text"
              value={client.address}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
              fullWidth
            />
            <TextField
              margin="dense"
              id="dni"
              required
              label="D.N.I"
              type="number"
              value={client.dni}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
              fullWidth
            />
            <TextField
              margin="dense"
              id="email"
              required
              label="Email"
              type="email"
              value={client.email}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="secondary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
