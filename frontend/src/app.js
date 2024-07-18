import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import Budget from './components/Finance/Budget';
import Expenses from './components/Finance/Expenses';
import Reminder from './components/Finance/Reminder';
import UserProfile from './components/Profile/UserProfile';
import Navbar from './components/Shared/Navbar';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/budget" component={Budget} />
        <Route path="/expenses" component={Expenses} />
        <Route path="/reminder" component={Reminder} />
        <Route path="/profile" component={UserProfile} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
