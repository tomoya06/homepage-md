import React from 'react';
import App, { APP_CATALOG } from '../model/App';

import { exchangeToken } from "../util/github";

import ClockSetting from '../app/system/ClockSetting';

import { scanAllRepo } from '../worker/ScanGithub';

const registry: App[] = [
  {
    id: 'system.clocksetting',
    app: (<ClockSetting />),
    catalog: APP_CATALOG.APP,
    name: 'clock setting',
  }
]

exchangeToken().then(() => {
  scanAllRepo().then((results) => {
    debugger;
  }).catch((error) => {
    debugger;
  })
});

export default registry;
