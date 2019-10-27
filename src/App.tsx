import React from 'react';
import System from './app/system/System';

import systemStore from './core/System';

const App: React.FC = () => {
  return (
    <System store={systemStore}/>
  );
}

export default App;
