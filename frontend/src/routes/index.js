import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CarsPage from '../pages/cars';
import Main from '../pages/main';
import DetailPage from '../pages/detailPage';
import ClientsPage from '../pages/clients';
import ReservationsPage from '../pages/reservation';

export default function Routes() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/cars" component={CarsPage} />
          <Route exact path="/clients" component={ClientsPage} />
          <Route exact path="/reservations" component={ReservationsPage} />
          <Route exact path="/:type/:id" component={DetailPage} />
        </Switch>
      </Router>
    </>
  );
}
