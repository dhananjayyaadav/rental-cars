import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import { Alert } from '@material-ui/lab';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState } from 'react';
import { useCar } from '../../hooks/useCar';
import AlertError from '../error';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export default function CarForm({ carToUpdate }) {
  const initialState = {
    brand: '',
    model: '',
    year: '',
    kms: '',
    color: '',
    passengers: '',
    price: '',
    image: 'In construction',
    air_conditioning: '',
  };
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState(initialState);
  const { createCar, error, setError, updateCar } = useCar();
  const history = useHistory();

  const handleClickOpen = () => {
    setError(false);
    setCar(initialState);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (carToUpdate) {
      updateCar(carToUpdate.id, car);
      history.push('/cars');
    } else {
      createCar(car);
    }
    if (!error) {
      handleClose();
    }
  };

  const handleChange = (e) => {
    setCar({ ...car, [e.target.id]: e.target.value });
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        {carToUpdate ? 'Update Car!' : 'Create New Car!'}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          {carToUpdate ? 'Update Car!' : 'Create New Car!'}
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
              id="brand"
              label="Brand"
              type="text"
              name="brand"
              value={car.brand}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
              fullWidth
              required
            />
            <TextField
              margin="dense"
              id="model"
              required
              label="Model"
              type="text"
              value={car.model}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
              fullWidth
            />
            <TextField
              margin="dense"
              id="year"
              required
              label="Year"
              type="number"
              min="0"
              value={car.year}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
              fullWidth
            />{' '}
            <TextField
              margin="dense"
              id="kms"
              required
              label="Kms"
              type="text"
              value={car.kms}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
              fullWidth
            />{' '}
            <TextField
              margin="dense"
              id="price"
              required
              label="Price"
              type="number"
              min="0"
              value={car.price}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
              fullWidth
            />{' '}
            <TextField
              margin="dense"
              id="passengers"
              required
              label="Amount of passengers"
              type="number"
              min="0"
              value={car.passengers}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
              fullWidth
            />{' '}
            <TextField
              margin="dense"
              id="color"
              required
              label="Colors"
              type="text"
              value={car.color}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
              fullWidth
            />
            <FormControl component="fieldset">
              <FormLabel component="legend">Has Air Conditioning?</FormLabel>
              <RadioGroup row aria-label="position" id="air_conditioning">
                <FormControlLabel
                  value="yes"
                  id="air_conditioning"
                  control={<Radio color="primary" id="air_conditioning" />}
                  label="Yes"
                  labelPlacement="start"
                  name="air_conditioning"
                  onChange={(e) => handleChange(e)}
                />
                <FormControlLabel
                  value="no"
                  control={
                    <Radio
                      color="primary"
                      name="air_conditioning"
                      id="air_conditioning"
                      onChange={(e) => handleChange(e)}
                    />
                  }
                  label="No"
                  labelPlacement="start"
                  name="air_conditioning"
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
