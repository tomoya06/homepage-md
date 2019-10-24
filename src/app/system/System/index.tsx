import React from 'react';

import SystemBar from '../SystemBar';
import './index.scss';

const System: React.FC = () => (
  <div className="system-container">
    <div className="desktop-container"></div>
    <SystemBar />
  </div>
)

export default System;