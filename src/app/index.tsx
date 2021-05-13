import React from 'react';
import { Route, Switch } from 'react-router';
import { Exercise } from 'app/components/Exercise';
import { hot } from 'react-hot-loader';

export const App = hot(module)(() => (
  <Switch>
    <Route path="/" component={Exercise} />
  </Switch>
));
