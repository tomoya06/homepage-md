type ComponentClass = new(...args: any[]) => React.Component<any, any>;

export enum APP_CATALOG {
  APP = 'APPS',
  SETTING = 'SETTINGS',
  ABOUT = 'ABOUT',
}

export default interface App {
  id: string;
  app: JSX.Element;
  catalog: APP_CATALOG;
  name: string;
}