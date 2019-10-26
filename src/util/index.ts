declare global {
  interface Document {
    webkitIsFullScreen: boolean,
    mozFullScreen: boolean,
    cancelFullScreen: Function,
    webkitCancelFullScreen: Function,
    mozCancelFullScreen: Function,
  }

  interface HTMLElement {
    requestFullScreen: Function,
    webkitRequestFullScreen: Function,
    mozRequestFullScreen: Function,
    
  }
}

export const toggleFullScreen = (event: any) => {
  let element = document.body;

  if (event instanceof HTMLElement) {
    element = event;
  }

  const isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false;

  element.requestFullScreen = element.requestFullScreen
    || element.webkitRequestFullScreen
    || element.mozRequestFullScreen
    || (() => false);
  document.cancelFullScreen = document.cancelFullScreen
    || document.webkitCancelFullScreen
    || document.mozCancelFullScreen
    || (() => false);

  if (isFullscreen) {
    document.cancelFullScreen();
  } else {
    element.requestFullScreen();
  }
};

export const getStorage = (key: string) => JSON.parse(localStorage.getItem(key) || '');
export const setStorage = (key: string, value: Object) => localStorage.setItem(key, JSON.stringify(value));

export const nothing = () => {};
