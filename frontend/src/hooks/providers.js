import { CarProvider } from './useCar';
import { ClientProvider } from './useClient';
import { ReservationProvider } from './useReservations';
export default function Providers({ children }) {
  return (
    <ReservationProvider>
      <ClientProvider>
        <CarProvider>{children}</CarProvider>
      </ClientProvider>
    </ReservationProvider>
  );
}
