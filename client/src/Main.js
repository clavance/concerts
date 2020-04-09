import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import Google from './Google.js';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  icons: {
    padding: theme.spacing(5),
  },
  inner: {
    padding: theme.spacing(1),
  },
  map: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  }
});

class Main extends Component {
  state = {
    startDate: null, // momentPropTypes.momentObj or null,
    startDateId: "", // PropTypes.string.isRequired,
    endDate: null, // momentPropTypes.momentObj or null,
    endDateId: "", // PropTypes.string.isRequired,
    // onDatesChange: {({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
    focusedInput: null // PropTypes.oneOf([START_DATE, END_DATE]) or null,
    // onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
  }

  render() {
    const {classes} = this.props;

    return (
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>

          <Grid container direction="row" justify="center" alignItems="center" spacing={4} className={classes.icons}>
              <img width={120} src="/images/spotify.png" alt="spotify" className={classes.inner}/>
            <Divider orientation="vertical" flexItem />
              <img width={120} src="/images/songkick.svg" alt="songkick" className={classes.inner}/>
            <Divider orientation="vertical" flexItem />
              <img width={120} src="/images/google.svg" alt="google" className={classes.inner}/>
          </Grid>

          <Typography component="h1" variant="h5">
            Showing concerts from {" "}

            <DateRangePicker
              startDate={this.state.startDate} // momentPropTypes.momentObj or null,
              startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
              endDate={this.state.endDate} // momentPropTypes.momentObj or null,
              endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
              onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
              focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
              onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
            />

          </Typography>

          <div className={classes.map}>
            <Grid container>
              <Google/>
            </Grid>
          </div>

        </div>

      </Container>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Main);
