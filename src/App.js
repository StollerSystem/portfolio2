import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Projects from './components/pages/Projects';
import About from './components/pages/About';
import SignUp from './components/pages/SignUp';
import Footer from './components/Footer';

function App() {
  return (
    <>
     <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/projects' component={Projects} />
        <Route path='/about' component={About} />
        <Route path='/contact' component={SignUp} />
      </Switch>
      <Footer />
     </Router>
    </> 
  );
}

export default App;
