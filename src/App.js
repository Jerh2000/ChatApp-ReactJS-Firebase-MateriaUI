import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from './Components/Layout/header';
import User from './Components/user';
import Routes from './Routes'

function App() {
  return (
    <Router>
      <CssBaseline />
      <Header>
        <User/>
      </Header>
      <Routes/>
    </Router>
  );
}

export default App;
