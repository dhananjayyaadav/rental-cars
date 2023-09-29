import { makeStyles } from '@material-ui/core';
import { useEffect } from 'react';
import { Alert } from '@material-ui/lab';
import Header from '../../components/header';
import Table from '../../components/table';
import AlertError from '../../components/error/alertError';
import { useReservation } from '../../hooks/useReservations';
import ReservationForm from '../../components/form/reservationForm';

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
const useStyles = makeStyles({
  title: {
    textAlign: 'center',
  },
  alert: {
    margin: '1rem 0',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default function ReservationsPage() {
  const classes = useStyles();

  const { getAllReservations, reservations, status, setStatus, error } = useReservation();

  useEffect(() => {
    getAllReservations();
  }, [getAllReservations, setStatus, status]);

  const tbData = reservations.map((reservation) => Object.values(reservation));
  return (
    <>
      <Header />
      <div className={classes.title}>
        <h1>Reservations Management</h1>
        <h3>There are {reservations.length} reservations</h3>
        {status && (
          <Alert className={classes.alert} severity="success">
            {status}
          </Alert>
        )}
        {error && <AlertError error={error} />}
        <ReservationForm isUpdate={false} />
      </div>
      {reservations.length > 0 && <Table thData={thRow} tbData={tbData} type="reservation" />}
    </>
  );
}
