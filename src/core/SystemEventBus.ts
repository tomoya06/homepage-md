import { EventEmitter } from 'events';

declare global {
  interface Window { 
    launchApp: Function;
    terminateApp: Function;
    killApp: Function;
  }
}

const systemEventEmitter = new EventEmitter();

window.launchApp = (appid: string) => systemEventEmitter.emit('launch', appid);
window.terminateApp = (appid: string) => systemEventEmitter.emit('terminate', appid);
window.killApp = (pid: number) => systemEventEmitter.emit('kill', pid);

export default systemEventEmitter;
