import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Budget from './pages/Budget';
import Expenses from './pages/Expenses';
import Reminder from './pages/Reminder';
import NotFound from './pages/NotFound';
import Navbar from './components/Shared/Navbar';  // Ruta corregida

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
            <Route path="/budget" component={Budget} />
            <Route path="/expenses" component={Expenses} />
            <Route path="/reminder" component={Reminder} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
