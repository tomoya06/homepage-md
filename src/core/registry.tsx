import React from 'react';
import App, { APP_CATALOG } from '../model/App';

import { exchangeToken } from "../util/github";

import ClockSetting from '../app/system/ClockSetting';

const registry: App[] = [
  {
    id: 'system.clocksetting',
    app: (<ClockSetting />),
    catalog: APP_CATALOG.APP,
    name: 'clock setting',
  }
]

exchangeToken().then(() => {
  const scanWorker = new Worker('../worker/ScanGithub.js');
  scanWorker.onmessage = (ev: MessageEvent) => {
    const scanResult = ev.data as App[];
  }
});

export default registry;
