import { Button, Container, makeStyles, TextField } from '@material-ui/core';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useCar } from '../../hooks/useCar';
import CarForm from '../form/carForm';

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
export default function CarDetail({ id }) {
  const classes = useStyles();
  const history = useHistory();
  const { car, getCarById, deleteCar, error } = useCar();

  useEffect(() => {
    getCarById(id);
  }, [id, getCarById]);

  const handleDelete = () => {
    try {
      deleteCar(id);
      history.push('/cars');
    } catch (error) {
      console.log(error);
    }
  };

  if (error) {
    history.push('/cars');
  }

  return (
    <Container>
      <div className={classes.title}>
        <h1>Viewing Car with ID {id}</h1>
      </div>

      <form>
        <TextField
          inputProps={{ readOnly: true }}
          className={classes.input}
          id="brand"
          label="Brand"
          fullWidth
          autoComplete="off"
          autoFocus
          value={car.brand}
        />
        <TextField
          inputProps={{ readOnly: true }}
          className={classes.input}
          label="Model"
          fullWidth
          autoComplete="off"
          value={car.model}
        />
        <TextField
          inputProps={{ readOnly: true }}
          className={classes.input}
          label="Year"
          fullWidth
          autoComplete="off"
          value={car.year}
        />
        <TextField
          inputProps={{ readOnly: true }}
          className={classes.input}
          label="Kilometers"
          fullWidth
          autoComplete="off"
          value={car.kms}
        />
        <TextField
          inputProps={{ readOnly: true }}
          className={classes.input}
          label="Price"
          fullWidth
          autoComplete="off"
          value={car.passengers}
        />
        <TextField
          inputProps={{ readOnly: true }}
          className={classes.input}
          label="Amount of Passengers"
          fullWidth
          autoComplete="off"
          value={car.passengers}
        />
        <TextField
          inputProps={{ readOnly: true }}
          className={classes.input}
          label="Colors"
          fullWidth
          autoComplete="off"
          value={car.color}
        />
        <TextField
          inputProps={{ readOnly: true }}
          className={classes.input}
          label="Air_conditioning"
          fullWidth
          value={car.air_conditioning}
          autoComplete="off"
        />

        <div className={classes.buttons}>
          <CarForm carToUpdate={car} />
          <Button variant="contained" color="secondary" onClick={handleDelete}>
            Delete Car
          </Button>
        </div>
      </form>
    </Container>
  );
}
