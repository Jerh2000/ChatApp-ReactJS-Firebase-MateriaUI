
import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';



const Chat = () =>{
    return(
        <h1>Bienvenido</h1>
    )
}

export default withRouter(Chat);