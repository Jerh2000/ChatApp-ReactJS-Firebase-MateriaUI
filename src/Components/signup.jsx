import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
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
      <Link color="inherit" href="#">
        ChatApp by Jairo Rojas
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
//Redireccionamiento a componetes sin que recargue la pagina
const LinkLogin = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} to="/getting-started/installation/" {...props} />
));

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = (props) => {
  const classes = useStyles();

  const [user, setUser] = useState({
    name: "",
    apellidos: "",
    avatar: "",
    email: "",
    password: "",
  });

  const [signupMessage, setSignupMessage] = useState(null);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSignupMessage(null);

    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((response) => {
        // guardar los datos del usuario
        delete user.password;
        firebase.database().ref(`/users/${response.user.uid}`).set(user);
        props.history.push("/");
        setSignupMessage({
          type: "success",
          message: "Bienvenido a ChatApp",
        });
        
      })
      .catch((error) => {
        console.log(error);
        setSignupMessage({
          type: "error",
          message: error.message,
        });
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrarme
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Nombre"
                autoFocus
                value={user.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="apellidos"
                label="Apellidos"
                name="apellidos"
                value={user.apellidos}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="avatar"
                label="Imagen de avatar"
                id="avatar"
                value={user.avatar}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="UserName"
                value={user.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={user.password}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            style={{ backgroundColor: "#00bcd4" }}
          >
            Registrarse
          </Button>
          <Grid container justify="flex-start">
            <Grid item>
              <Link to="/login" variant="body2" component={LinkLogin}>
                ¿Ya tienes una cuenta? inicia sesión.
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      {signupMessage && <Alert type={signupMessage.type} message={signupMessage.message} autoclose={5000}/>}
    </Container>
  );
};

export default withRouter(SignUp);
