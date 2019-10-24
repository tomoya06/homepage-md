import { AppCatalog } from "./AppCatalog";

export default class App {
  id: string;
  app: React.Component;
  catalog: AppCatalog;
  name: string;

  constructor(id: string, app: React.Component, catalog: AppCatalog, name: string) {
    this.id = id;
    this.app = app;
    this.catalog = catalog;
    this.name = name;
  }
}