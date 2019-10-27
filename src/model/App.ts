type ComponentClass = new(...args: any[]) => React.Component<any, any>;

export enum APP_CATALOG {
  APP = 'APPS',
  SETTING = 'SETTINGS',
  ABOUT = 'ABOUT',
}

export default interface App {
  id: string;
  app: ComponentClass;
  catalog: APP_CATALOG;
  name: string;
}