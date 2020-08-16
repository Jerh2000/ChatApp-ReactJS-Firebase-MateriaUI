import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  },
  paper: {
    paddingBottom: 20,
    paddingTop: 20,
    marginTop:5,
    border: "1px solid #ccc",
    marginRight: 20,
  },
  message: {
    border: "0px solid #ccc",
    borderRadius: 8,
    padding: "5px 20px 5px",
  },
  box: {
    height: "100%",
    paddingLeft: 20,
  },
}));

const Message = () => {
  const classes = useStyles();
  const [message, setMessage] = useState("");

  //Con este arreglo de funciones se envia los mensajes y se actualiza el state
  const haldleSubmit = (e) => {
    e.preventDefault();

    const { currentUser } = firebase.auth();
    if (!currentUser) return;

    function fecha(){
      var formatDate = new Date();
      var day = formatDate.getUTCDate();
      var month = formatDate.getUTCMonth();
      var year = formatDate.getFullYear();
      var hour = formatDate.getHours();
      var min = formatDate.getUTCMinutes();

      return day+"/"+month+"/"+year+", "+hour+":"+min;
    }

    const NewMessage = {
      user: currentUser.uid,
      message,
      date: fecha(),
      dateN: firebase.database.ServerValue.TIMESTAMP,
    };
    firebase
      .database()
      .ref("/chat")
      .push(NewMessage)
      .then((response) => {
        setMessage("");
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };

  return (
    <Paper square className={classes.paper}>
      <form onSubmit={haldleSubmit}>
        <Grid container spacing={0} direction="row" className={classes.message}>
          <Grid item xs={10}>
            <TextField
              variant="outlined"
              name="message"
              required
              fullWidth
              id="message"
              label="Escribe un mensaje..."
              autoFocus
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <Box display="flex"  className={classes.box}>
              <Button
                variant="contained"
                color="primary"
                endIcon={
                  <Icon>
                    send
                  </Icon>
                }
                fullWidth
                disabled={!message.length}
              >Enviar</Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Message;
