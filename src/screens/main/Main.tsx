import React, { FC } from 'react';
import InputSection from './components/inputSection';
import OutputSection from './components/outputSection';

import './styles.css';

const Main: FC = () => (
  <div className="layout">
    <InputSection />
    <OutputSection />
  </div>
);

export default Main;
