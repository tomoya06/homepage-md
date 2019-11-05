import { EventEmitter } from 'events';
import { SEND_MESSAGE_PREFIX, APPLINK_PROTOCOL } from './const';

declare global {
  interface Window {
    launchApp: (appid: string) => void;
    terminateApp: (appid: string) => void;
    killApp: (pid: number) => void;
    sendMessage: (appid: string, message: URLSearchParams | string) => void;
  }
}

const systemEventEmitter = new EventEmitter();

window.launchApp = (appid: string) => { systemEventEmitter.emit('launch', appid); return; }
window.terminateApp = (appid: string) => { systemEventEmitter.emit('terminate', appid); return; }
window.killApp = (pid: number) => { systemEventEmitter.emit('kill', pid); return; }
window.sendMessage = (appid: string, message: URLSearchParams | string) => {
  let rMessage: URLSearchParams;
  if (typeof message === 'string') {
    debugger
    try {
      const tempUrl = new URL(`${APPLINK_PROTOCOL}null?${message}`);
      rMessage = tempUrl.searchParams;
    } catch (error) {
      console.log(error);
      return;
    }
  } else {
    rMessage = message;
  }
  systemEventEmitter.emit(SEND_MESSAGE_PREFIX(appid), rMessage); return;
}

export default systemEventEmitter;
