import { createContext, useCallback, useContext, useState } from 'react';

import api from '../service/api';

export const ReservationContext = createContext();

export function ReservationProvider({ children }) {
  const [reservations, setReservations] = useState([]);
  const [reservation, setReservation] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(false);

  const getAllReservations = useCallback(async () => {
    try {
      const res = await api.get(`/reservation`);
      if (res.status === 200) {
        setReservations(res.data);
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  }, []);

  const createReservation = useCallback(async (reservationToSave) => {
    try {
      const res = await api.post(`/reservation`, reservationToSave);
      setStatus(`New reservation has been created with id ${res.data.id}`);
    } catch (err) {
      setError(err.response.data.message);
    }
  }, []);

  const getReservationById = useCallback(async (reservationId) => {
    try {
      const res = await api.get(`/reservation/${reservationId}`);
      setReservation(res.data);
    } catch (err) {
      setError(err.response.data.message);
    }
  }, []);

  const deleteReservation = useCallback(async (reservationId) => {
    try {
      await api.delete(`/reservation/${reservationId}`);
      setStatus(`Reservation with id ${reservationId} was deleted`);
    } catch (err) {
      setError(err.response.data.message);
    }
  }, []);

  const updateReservation = useCallback(async (reservationId, reservationToUpdate) => {
    try {
      await api.patch(`/reservation/${reservationId}`, reservationToUpdate);
      setStatus(`Reservation with id ${reservationId} was updated`);
    } catch (err) {
      setError(err.response.data.message);
    }
  }, []);

  const updateReservationStatus = useCallback(async (reservationId, status) => {
    try {
      const reservation = await api.patch(`/reservation/${reservationId}/status`, { status });
      setStatus(`Reservation with id ${reservationId} status is now: ${reservation.data.status}`);
    } catch (err) {
      setError(err.response.data.message);
    }
  }, []);

  return (
    <ReservationContext.Provider
      value={{
        reservations,
        reservation,
        error,
        status,
        setReservations,
        getAllReservations,
        createReservation,
        setError,
        getReservationById,
        deleteReservation,
        setReservation,
        updateReservation,
        setStatus,
        updateReservationStatus,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error('use Reservation must be used within a ReservationProvider  ');
  }
  return context;
}
