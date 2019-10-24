import App from "./App";

export default class RunningApp {
  app: App;
  private _pid: number;
  isActive: boolean;
  displayName: string;

  constructor(app: App, id: number, displayName?: string) {
    this.app = app;
    this._pid = id;
    this.isActive = false;
    this.displayName = displayName || app.name;
  }

  get pid(): number {
    return this._pid;
  }
}