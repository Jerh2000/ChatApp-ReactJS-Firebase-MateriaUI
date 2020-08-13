import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import CustomAvatar from "./CustomAvatar";
import "../CCS/Styles.css";

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
    paddingBottom:17,
  },
  paper: {
    paddingBottom: 50,
    height: "86vh",
    marginTop: 20,
  },
  list: {
    marginBottom: theme.spacing(3),
    maxHeight: "95%",
    overflow: "auto",
  },
}));

const Account = ({ history }) => {
  const classes = useStyles();
  const [user, setUser] = useState([]);

  const chatDomRef = useRef();

  const addMessageList = (userr) => {
    user.push(userr);

    setUser([...user.sort((a, b) => a.name - b.name)]);
  };

  useEffect(() => {
    const chatRef = firebase.database().ref("/users");

    chatRef.on(
      "child_added",
      (snapshot) => {
        //New Message
        const userItem = snapshot.val();
        console.log(userItem);
        //Leer los datos de un usuario
        addMessageList(userItem);
      },
      (error) => {
        console.log(error);
        if (error.message.includes("permission_denied")) {
          history.push("/login");
        }
      }
    );
  }, []);

  return (
    <Container>
      <Paper square className={classes.paper}>
        <Typography
          className={classes.text}
          variant="h5"
          gutterBottom
          style={{ backgroundColor: "#00bcd4", color: "white" }}
        >
          Personas de MeetApp
        </Typography>
        <List className={classes.list}>
          {user.map(({ name, avatar, email }) => (
            <ListItem button>
              <ListItemAvatar>
                <CustomAvatar name={name} avatar={avatar} size="md" />
              </ListItemAvatar>
              <ListItemText
                primary={user ? name : "annonymous"}
                secondary={email}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default withRouter(Account);
