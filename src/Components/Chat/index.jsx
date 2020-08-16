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
import { loadUser } from "../../Utils/dbUtils";
import Message from "./Messages";
import ListSubheader from "@material-ui/core/ListSubheader";
import Account from "../Accounts";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  text: {
    padding: theme.spacing(2, 2, 0),
    paddingBottom: 17,
  },
  paper: {
    paddingBottom: 60,
    height: "70vh",
    marginTop: 20,
    marginRight: 20,
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

    setMessages([...messages.sort((a, b) => a.dateN - b.dateN)]);

    if (chatDomRef.current) {
      chatDomRef.current.scrollTop = chatDomRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const chatRef = firebase.database().ref("/chat");

    chatRef.on(
      "child_added",
      (snapshot) => {
        //New Message
        const messageItem = snapshot.val();
        //Leer los datos de un usuario
        loadUser(messageItem.user).then((data) => {
          messageItem.user = data;
          addMessageList(messageItem);
        });
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
    <div className={classes.root}>
      <Grid container>
        <Grid xs={12} sm={4}>
          <Account />
        </Grid>
        <Grid xs={12} sm={8}>
          <Paper square className={classes.paper}>
            <Typography
              className={classes.text}
              variant="h5"
              gutterBottom
              style={{ backgroundColor: "#00bcd4", color: "white" }}
            >
              Chat
            </Typography>
            <List className={classes.list} ref={chatDomRef}>
              {messages.map(({ date, user, message }, index) => (
                <ListItem button key={index}>
                  <ListSubheader spacing={0}>{date}</ListSubheader>
                  <ListItemAvatar>
                    <CustomAvatar
                      name={user.name}
                      avatar={user.avatar}
                      size="md"
                    />
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
        </Grid>
      </Grid>
    </div>
  );
};

export default withRouter(Chat);
