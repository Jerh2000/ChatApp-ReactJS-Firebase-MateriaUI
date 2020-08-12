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
import CustomAvatar from "../CustomAvatar";
import {loadUser} from '../../Utils/dbUtils'
import Message from "./Messages";

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
    height: "70vh",
    marginTop: 20,
  },
  list: {
    marginBottom: theme.spacing(3),
    maxHeight: "95%",
    overflow: "auto",
  },
}));

const Chat = ({ history }) => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);

  const chatDomRef = useRef();

  const addMessageList = (message) => {
    messages.push(message);

    setMessages([...messages.sort((a, b) => a.date - b.date)]);

    if (chatDomRef.current) {
      chatDomRef.current.scrollTop = chatDomRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const chatRef = firebase.database().ref("/chat");

    chatRef.on(
      "child_added",
      snapshot => {
        //New Message
        const messageItem = snapshot.val();
        //Leer los datos de un usuario
        loadUser(messageItem.user)
        .then(data => {
            messageItem.user = data;
            addMessageList(messageItem);
        });
      },
      error => {
        console.log(error);
        if (error.message.includes("permission_denied")) {
          history.push("/login");
        }
      }
    )
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
          Chats
        </Typography>
        <List className={classes.list} ref={chatDomRef}>
          {messages.map(({ date, user, message }) => (
            <ListItem button key={date}>
              <ListItemAvatar>
                <CustomAvatar name={user.name} avatar={user.avatar} size="md" />
              </ListItemAvatar>
              <ListItemText
                primary={user ? user.name : "annonymous"}
                secondary={message}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Message />
    </Container>
  );
};

export default withRouter(Chat);
