import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes'

import './Global.scss'

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
