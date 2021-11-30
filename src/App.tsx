import React, { FC } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import Router from './Router';

const App: FC = () => (
  <I18nextProvider i18n={i18n}>
    <Router />
  </I18nextProvider>
);

export default App;
