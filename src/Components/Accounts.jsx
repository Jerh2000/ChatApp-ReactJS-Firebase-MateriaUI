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
import { loadUser } from "../Utils/dbUtils";

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
    paddingBottom: 17,
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


  const addMessageList = (userr) => {
    user.push(userr);

    setUser([...user.sort((a, b) => a.name - b.name)]);
  };

  var id;
  useEffect(() => {
    const chatRef = firebase.database().ref("/users");

    chatRef.on(
      "child_added",
      (snapshot) => {
        const userItem = snapshot.val();
        id = snapshot.key;
        //Leer los datos de un usuario
        if (userItem.avatar) {
          // cargar url de avatar
          firebase
            .storage()
            .ref()
            .child(`/avatars/${userItem.avatar}`)
            .getDownloadURL()
            .then(
              (url) => {
                userItem.avatar = url;
              },
              (error) => {
                console.log(error.message);
              }
            );
        }
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
          {user.map(({ name, avatar, email}, index) => (
            <ListItem button key={index}>
              <ListItemAvatar>
                <CustomAvatar name={name} avatar={avatar} size="md" />
              </ListItemAvatar>
              <ListItemText
                primary={name ? name : "annonymous"}
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
