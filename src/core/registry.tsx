import React from 'react';
import App, { APP_CATALOG } from '../model/App';

import ClockSetting from '../app/system/ClockSetting';

const registry: App[] = [
  {
    id: 'system.clocksetting',
    app: (<ClockSetting />),
    catalog: APP_CATALOG.APP,
    name: 'clock setting',
  }
]

export default registry;
