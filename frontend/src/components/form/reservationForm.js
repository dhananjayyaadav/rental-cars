import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import { Alert } from '@material-ui/lab';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  NativeSelect,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import AlertError from '../error';
import { useReservation } from '../../hooks/useReservations';
import { useCar } from '../../hooks/useCar';
import { useClient } from '../../hooks/useClient';

export default function ReservationForm({ reservationToUpdate }) {
  const initialState = {
    startDate: '',
    finishDate: '',
    pricePerDay: '',
    carId: '',
    clientId: '',
    paymentMethod: '',
  };
  const [open, setOpen] = useState(false);
  const [reservation, setReservation] = useState(
    !reservationToUpdate ? initialState : reservationToUpdate
  );
  const history = useHistory();
  const { createReservation, error, setError, updateReservation } = useReservation();

  const { getAllCars, cars } = useCar();
  const { getAllClients, clients } = useClient();

  const handleClickOpen = () => {
    setError(false);
    setReservation(initialState);
    setOpen(true);
    getAllCars();
    getAllClients();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reservationToUpdate) {
      updateReservation(reservationToUpdate.id, reservation);
      history.push('/reservations');
    } else {
      createReservation(reservation);
    }
    if (!error) {
      handleClose();
    }
  };

  const handleChange = (e) => {
    setReservation({ ...reservation, [e.target.id]: e.target.value });
  };
  console.log(reservation);
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        {reservationToUpdate ? 'Update Reservation!' : 'Create New Reservation!'}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          {reservationToUpdate ? 'Update Reservation' : 'Create New Reservation!'}
        </DialogTitle>

        {!error ? (
          <Alert severity="warning" style={{ fontWeight: 'bold', textAlign: 'center' }}>
            Dates must have this format "YYYY/MM/DD" ex: "2021/03/15"
          </Alert>
        ) : (
          <AlertError error={error} />
        )}

        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="startDate"
              label="Starting Date"
              type="text"
              name="startDate"
              value={reservation.startDate}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
              fullWidth
              required
            />
            <TextField
              margin="dense"
              id="finishDate"
              required
              label="Finishing Date"
              type="text"
              value={reservation.finishDate}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
              fullWidth
            />
            <TextField
              margin="dense"
              id="pricePerDay"
              required
              label="Price Per Day"
              type="text"
              value={reservation.pricePerDay}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
              fullWidth
            />

            <FormControl style={{ display: 'flex' }}>
              <InputLabel shrink htmlFor="car-label">
                Select a Car
              </InputLabel>
              <NativeSelect
                onChange={handleChange}
                inputProps={{
                  name: 'carId',
                  id: 'carId',
                }}
              >
                <option value="" selected disabled>
                  Select a Car
                </option>
                {cars.map((car) => (
                  <option value={car.id}>
                    Brand: {car.brand}, Model: {car.model}, Year: {car.year}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>

            <FormControl style={{ display: 'flex' }}>
              <InputLabel shrink htmlFor="car-label">
                Select a Client
              </InputLabel>
              <NativeSelect
                onChange={handleChange}
                inputProps={{
                  name: 'clientId',
                  id: 'clientId',
                }}
              >
                <option value="" selected disabled>
                  Select a Client
                </option>
                {clients.map((client) => (
                  <option value={client.id}>
                    Name: {client.firstName + ' ' + client.lastName}, DNI: {client.dni},
                    Nationality: {client.nationality}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>

            <FormControl component="fieldset">
              <FormLabel component="legend">Payment Method</FormLabel>
              <RadioGroup row aria-label="position" id="paymentMethod">
                <FormControlLabel
                  value="CREDIT_CARD"
                  id="paymentMethod"
                  control={<Radio color="primary" id="paymentMethod" />}
                  label="Credit Card"
                  labelPlacement="start"
                  name="paymentMethod"
                  onChange={(e) => handleChange(e)}
                />
                <FormControlLabel
                  value="CASH"
                  control={
                    <Radio
                      color="primary"
                      name="paymentMethod"
                      id="paymentMethod"
                      onChange={(e) => handleChange(e)}
                    />
                  }
                  label="Cash"
                  labelPlacement="start"
                  name="paymentMethod"
                />
              </RadioGroup>
            </FormControl>
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
