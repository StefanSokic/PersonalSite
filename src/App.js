import React from 'react';
import logo from './logo.svg';
import './App.css';
import icon from '@react95/icons';
import Icon from '@react95/core/Icon';
import Alert from '@react95/core/Alert';

import Footer from "./components/footer.jsx"

function App() {
  return (
    <div className="App">
      <div>
      <Alert>Click me!</Alert>
      </div>
      <div>
        <Icon name="explore"/>
        <Icon name="explore"/>
        <Icon name="explore"/>
        <Icon name="explore"/>
        <Icon name="explore"/>
        <Icon name="explore"/>
      </div>
      <Footer />
    </div>
  );
}

export default App;
