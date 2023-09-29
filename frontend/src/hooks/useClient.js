import { createContext, useCallback, useContext, useState } from 'react';

import api from '../service/api';

export const ClientContext = createContext();

export function ClientProvider({ children }) {
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(false);

  const getAllClients = useCallback(async () => {
    try {
      const res = await api.get(`/client`);
      if (res.status === 200) {
        setClients(res.data);
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  }, []);

  const createClient = useCallback(async (clientToSave) => {
    try {
      const res = await api.post(`/client`, clientToSave);
      setStatus(`New client has been created with id ${res.data.id}`);
    } catch (err) {
      setError(err.response.data.message);
    }
  }, []);

  const getClientById = useCallback(async (clientId) => {
    try {
      const res = await api.get(`/client/${clientId}`);
      setClient(res.data);
    } catch (err) {
      setError(err.response.data.message);
    }
  }, []);

  const deleteClient = useCallback(async (clientId) => {
    try {
      await api.delete(`/client/${clientId}`);
      setStatus(`Client with id ${clientId} was deleted`);
    } catch (err) {
      setError(err.response.data.message);
    }
  }, []);

  const updateClient = useCallback(async (clientId, clientToUpdate) => {
    try {
      await api.patch(`/client/${clientId}`, clientToUpdate);
      setStatus(`Client with id ${clientId} was updated`);
    } catch (err) {
      setError(err.response.data.message);
    }
  }, []);
  return (
    <ClientContext.Provider
      value={{
        clients,
        client,
        error,
        status,
        setClients,
        getAllClients,
        createClient,
        setError,
        getClientById,
        deleteClient,
        updateClient,
        setClient,
        setStatus,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}

export function useClient() {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClient must be used within a ClientProvider  ');
  }
  return context;
}
