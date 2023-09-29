import { createContext, useCallback, useContext, useState } from 'react';

import api from '../service/api';

export const CarContext = createContext();

export function CarProvider({ children }) {
  const [cars, setCars] = useState([]);
  const [car, setCar] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(false);

  const getAllCars = useCallback(async () => {
    try {
      const res = await api.get(`/car`);
      if (res.status === 200) {
        setCars(res.data);
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  }, []);

  const createCar = useCallback(async (carToSave) => {
    try {
      const res = await api.post(`/car`, carToSave);
      setStatus(`New car has been created with id ${res.data.id}`);
    } catch (err) {
      setError(err.response.data.message);
    }
  }, []);

  const getCarById = useCallback(async (carId) => {
    try {
      const res = await api.get(`/car/${carId}`);
      setCar(res.data);
    } catch (err) {
      setError(err.response.data.message);
    }
  }, []);

  const updateCar = useCallback(async (carId, carToUpdate) => {
    try {
      await api.patch(`/car/${carId}`, carToUpdate);
      setStatus(`Car with id ${carId} was updated`);
    } catch (err) {
      setError(err.response.data.message);
    }
  }, []);

  const deleteCar = useCallback(async (carId) => {
    try {
      await api.delete(`/car/${carId}`);
      setStatus(`Car with id ${carId} was deleted`);
    } catch (err) {
      setError(err.response.data.message);
    }
  }, []);
  return (
    <CarContext.Provider
      value={{
        cars,
        car,
        error,
        status,
        setCars,
        getAllCars,
        createCar,
        setError,
        getCarById,
        deleteCar,
        setCar,
        setStatus,
        updateCar,
      }}
    >
      {children}
    </CarContext.Provider>
  );
}

export function useCar() {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('use Car must be used within a CarProvider  ');
  }
  return context;
}
