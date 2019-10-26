import { EventEmitter } from 'events';
import { setStorage, getStorage } from '../../../util/index';

const clock = new EventEmitter();

const CONSTANT = {
  TIMEZONELIST: 'TIMEZONE_LIST',
  TIMEZONELIST_UPDATE: 'TIMEZONELIST_UPDATE',
};

export type TimezoneItem = {
  label: string,
  value: string,
  lag: number,
}

const triggerTimezoneListUpdate = () => {
  clock.emit(CONSTANT.TIMEZONELIST_UPDATE);
  return;
}
const bindTimezoneListUpdateHandler = (func: (...args: any[]) => void) => {
  clock.on(CONSTANT.TIMEZONELIST_UPDATE, func);
  return;
}
const unbindTimezoneListUpdateHandler = (func: (...args: any[]) => void) => {
  clock.off(CONSTANT.TIMEZONELIST_UPDATE, func)
  return;
};

const updateTimezoneList: (arg: TimezoneItem[]) => void
  = (timezoneList: TimezoneItem[]) => setStorage(CONSTANT.TIMEZONELIST, timezoneList);
const getTimezoneList: () => TimezoneItem[]
  = () => getStorage(CONSTANT.TIMEZONELIST);

export {
  updateTimezoneList,
  getTimezoneList,
  triggerTimezoneListUpdate,
  bindTimezoneListUpdateHandler,
  unbindTimezoneListUpdateHandler,
};
