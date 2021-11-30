import React, { FC, Suspense } from 'react';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';

import Main from 'screens/main';

import { ROUTES } from './config';

const App = () => (
  <Suspense fallback={null}>
    <Switch>
      <Redirect exact from="/" to={ROUTES.main} />
      <Route path={ROUTES.main} component={Main} />
    </Switch>
  </Suspense>
);

const Router: FC = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default Router;
