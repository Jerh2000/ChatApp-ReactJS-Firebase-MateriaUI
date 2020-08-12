import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import Alert from './Alert'


import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        ChatApp by Jairo Rojas
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
//Redireccionamiento a componetes sin que recargue la pagina
const LinkSignup = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} to="/getting-started/installation/" {...props} />
));

const useStyles = makeStyles((theme) => ({
  root: {
    height: "91vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {
  const classes = useStyles();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errorLogin, setErrorLogin] = useState('');

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorLogin('');

    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((response) => {
        props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        setErrorLogin(error.message);
      });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar
            className={classes.avatar}
            style={{ backgroundColor: "#00bcd4" }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>
          <form className={classes.form} onSubmit={handleLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Nombre de usuario"
              name="email"
              autoComplete="email"
              autoFocus
              defaultValue={user.email}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              defaultValue={user.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ backgroundColor: "#00bcd4" }}
              className={classes.submit}
            >
              Iniciar sesión
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signup" variant="body2" component={LinkSignup}>
                  {"¿No tienes un cuenta? Únete"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
      {errorLogin && <Alert type="error" message={errorLogin} autoclose={5000}/>}
    </Grid>
  );
};
export default withRouter(Login);
