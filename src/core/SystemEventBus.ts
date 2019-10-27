import { EventEmitter } from 'events';

declare global {
  interface Window {
    launchApp: (appid: string) => void;
    terminateApp: (appid: string) => void;
    killApp: (pid: number) => void;
  }
}

const systemEventEmitter = new EventEmitter();

window.launchApp = (appid: string) => { systemEventEmitter.emit('launch', appid); return; }
window.terminateApp = (appid: string) => { systemEventEmitter.emit('terminate', appid); return; }
window.killApp = (pid: number) => { systemEventEmitter.emit('kill', pid); return; }

export default systemEventEmitter;
