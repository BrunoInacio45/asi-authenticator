import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/login/Login';
import DoubleFactor from './pages/double-factor/DoubleFactor'

function Routes() {
   return (
      <Switch >
         <Route path="/" exact component={Login} />
         <Route path="/double-factor" exact component={DoubleFactor} />
      </Switch>
   );
}

export default Routes;
