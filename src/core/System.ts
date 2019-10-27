import { observable, autorun, computed } from 'mobx';
import _ from 'lodash';

import RunningApp from '../model/RunningApp';
import App from '../model/App';

import systemEvt from './SystemEventbus';
import registry from './registry';

export class SystemStore {
  pidCnt: number = 0;

  @observable
  runningApps: RunningApp[] = [];

  @computed
  get runningAppids(): string[] {
    return this.runningApps.map((app: RunningApp) => app.app.id);
  }

  constructor() {
    autorun(() => console.log('system'));
  }

  launchApp(newApp: App, displayName?: string) {
    const _appid: string = newApp.id;
    if (this.runningAppids.includes(_appid)) return -1;

    this.pidCnt += 1;
    const newRunningApp = new RunningApp(newApp, this.pidCnt, displayName);

    this.runningApps.push(newRunningApp);
    return newRunningApp.pid;
  }

  activateApp(pid: number) {
    for (let i = 0; i < this.runningApps.length; i += 1) {
      this.runningApps[i].isActive = pid === this.runningApps[i].pid;
    }
    return pid;
  }

  terminateAppByAppid(appid: string) {
    const [targetApp] = _.remove(this.runningApps, (app) => app.app.id === appid);
    return targetApp ? targetApp.pid : -1;
  }

  terminateAppByPid(pid: number) {
    const [targetApp] = _.remove(this.runningApps, (app) => app.pid === pid);
    return targetApp ? targetApp.pid : -1;
  }
}

const systemStore = new SystemStore();

systemEvt.on('launch', (appid: string) => {
  const targetApp = registry.find((reg) => reg.id === appid);
  const pid = targetApp ? systemStore.launchApp(targetApp) : -1;
  return pid;
});

systemEvt.on('terminate', (appid: string) => {
  return systemStore.terminateAppByAppid(appid);
});

systemEvt.on('kill', (pid: number) => {
  return systemStore.terminateAppByPid(pid);
});

export default systemStore;
