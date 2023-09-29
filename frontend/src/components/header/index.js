import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    alignItems: 'center',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontWeight: 'bold',
    textDecoration: 'none',
    color: 'white',
    margin: '0 .5rem',
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            <Link to="/" className={classes.title}>
              Car Rental Agency
            </Link>
          </Typography>
          <Link to="/cars" className={classes.title}>
            <Button color="inherit">Cars</Button>
          </Link>
          <Link to="/clients" className={classes.title}>
            <Button color="inherit">Clients</Button>
          </Link>
          <Link to="/reservations" className={classes.title}>
            <Button color="inherit">Reservations</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
