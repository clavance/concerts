import React from 'react';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://clav.dev/">
        :-)
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  icons: {
    padding: theme.spacing(3),
  },
  inner: {
    padding: theme.spacing(1),
  },

}));

export default function Login() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>

        <Typography component="h1" variant="h4" align="center">
          Your favourite concerts on a Google map!
        </Typography>

        <br/>

        <Grid container direction="row" justify="center" alignItems="center" spacing={4} className={classes.icons}>
            <img width={120} src="/images/spotify.png" alt="spotify" className={classes.inner}/>
          <Divider orientation="vertical" flexItem />
            <img width={120} src="/images/songkick.svg" alt="songkick" className={classes.inner}/>
          <Divider orientation="vertical" flexItem />
            <img width={120} src="/images/google.svg" alt="google" className={classes.inner}/>
        </Grid>

        <br />

        <Typography component="h1" variant="h6">
          Powered by Spotify, Songkick, Google APIs
        </Typography>

        <form className={classes.form} noValidate action="http://localhost:3001/login">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In via Spotify API
          </Button>

        </form>
      </div>
      <Box mt={2}>
        <Copyright />
      </Box>
    </Container>
  );
}
