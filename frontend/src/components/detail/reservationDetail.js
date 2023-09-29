import { Button, Container, DialogContent, makeStyles, TextField } from '@material-ui/core';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useCar } from '../../hooks/useCar';
import { useClient } from '../../hooks/useClient';
import { useReservation } from '../../hooks/useReservations';
import ReservationForm from '../form/reservationForm';

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
export default function ReservationDetail({ id }) {
  const classes = useStyles();
  const history = useHistory();
  const {
    reservation,
    getReservationById,
    deleteReservation,
    updateReservationStatus,
    error,
  } = useReservation();
  const { getClientById, client } = useClient();
  const { getCarById, car } = useCar();

  useEffect(() => {
    getReservationById(id);
    if (reservation) {
      getClientById(reservation.clientId);
      getCarById(reservation.carId);
    }
  }, [id, getReservationById, getCarById, getClientById, reservation.carId, reservation.clientId]);

  const handleDelete = () => {
    try {
      deleteReservation(id);
      history.push('/reservations');
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateStatus = (status) => {
    try {
      updateReservationStatus(reservation.id, status);
      history.push('/reservations');
    } catch (err) {
      console.log(err);
    }
  };

  if (error) {
    history.push('/reservations');
  }

  return (
    <Container>
      <div className={classes.title}>
        <h1>Viewing Reservation with ID {id}</h1>
      </div>

      <form>
        <DialogContent>
          <TextField
            inputProps={{ readOnly: true }}
            autoFocus
            margin="dense"
            id="startDate"
            label="Starting Date"
            type="text"
            name="startDate"
            value={reservation.startDate}
            fullWidth
          />
          <TextField
            inputProps={{ readOnly: true }}
            margin="dense"
            id="finishDate"
            label="Finishing Date"
            type="text"
            value={reservation.finishDate}
            fullWidth
          />
          <TextField
            inputProps={{ readOnly: true }}
            margin="dense"
            id="pricePerDay"
            label="Price Per Day"
            type="text"
            value={reservation.pricePerDay}
            fullWidth
          />

          <TextField
            inputProps={{ readOnly: true }}
            margin="dense"
            id="paymentMethod"
            label="Payment Method"
            type="text"
            value={reservation.paymentMethod}
            fullWidth
          />

          <TextField
            inputProps={{ readOnly: true }}
            margin="dense"
            id="totalDays"
            label="Total Days"
            type="text"
            value={reservation.totalDays}
            fullWidth
          />

          <TextField
            inputProps={{ readOnly: true }}
            margin="dense"
            id="totalPrice"
            label="Final Price"
            type="text"
            value={`$${reservation.totalPrice}`}
            fullWidth
          />

          <TextField
            inputProps={{ readOnly: true }}
            margin="dense"
            id="client"
            label="Client"
            type="text"
            value={`${client.firstName} ${client.lastName} ${client.phoneNumber} ${client.email} ${client.dni}`}
            fullWidth
          />

          <TextField
            inputProps={{ readOnly: true }}
            margin="dense"
            id="car"
            label="Car"
            type="text"
            value={`${car.brand} ${car.model} ${car.year} $${car.price} `}
            fullWidth
          />

          <TextField
            inputProps={{ readOnly: true }}
            margin="dense"
            id="status"
            label="Status"
            type="text"
            value={reservation.status}
            fullWidth
          />
        </DialogContent>

        <div className={classes.buttons}>
          <ReservationForm reservationToUpdate={reservation} />
          <Button variant="contained" color="secondary" onClick={handleDelete}>
            Delete Reservation
          </Button>

          {reservation.status === 'PENDING' ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleUpdateStatus('PENDING')}
            >
              Update Status: PAID
            </Button>
          ) : reservation.status === 'PAID' ? (
            <Button variant="contained" color="primary" onClick={() => handleUpdateStatus('PAID')}>
              Update Status: FINISHED
            </Button>
          ) : null}
        </div>
      </form>
    </Container>
  );
}
