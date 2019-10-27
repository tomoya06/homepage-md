import React from 'react';
import {
  IconButton, Icon,
  Select, MenuItem,
  List, ListItem, ListItemSecondaryAction, ListItemText,
} from '@material-ui/core';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import './index.scss';

import { triggerTimezoneListUpdate, getTimezoneList, updateTimezoneList, TimezoneItem } from '../../store/eventbus.clock';

import allTimezones from './timezones.json';

const mappedTimezones: TimezoneItem[] = allTimezones.map((key) => ({
  label: key,
  value: key,
  lag: parseInt(key.replace(/^\(GMT([-+]\d{2}).*$/, '$1'), 10),
}));

const currentTimezoneIdx = mappedTimezones.findIndex((zone) => zone.value === '(GMT+08:00) Asia/Taipei');

const MAX_TIMEZONE_COUNT = 5;

type Props = {

}

type State = {
  timezoneSelections: TimezoneItem[],
  selectedTimezone: string,
  timezoneList: TimezoneItem[],
}

class TzEditor extends React.Component<Props, State> {
  state: Readonly<State> = {
    timezoneSelections: mappedTimezones,
    selectedTimezone: mappedTimezones[currentTimezoneIdx].value,
    timezoneList: getTimezoneList() || [],
  };

  onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) => {
    const { timezoneList } = this.state;
    const [oldItem] = timezoneList.splice(oldIndex, 1);
    timezoneList.splice(newIndex, 0, oldItem);
    this.setState({
      timezoneList,
    })
    // const newTimezone = arrayMove(timezoneList, oldIndex, newIndex);
    updateTimezoneList(timezoneList);
    triggerTimezoneListUpdate();
  }

  handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    this.setState({
      selectedTimezone: event.target.value as string,
    });
  }

  submitAddTz = () => {
    const { timezoneSelections, selectedTimezone, timezoneList } = this.state;
    const newTimezone = timezoneSelections.find((zone) => zone.value === selectedTimezone);
    // const newTimezoneList = [...timezoneList, newTimezone];
    newTimezone && timezoneList.push(newTimezone);
    updateTimezoneList(timezoneList);
    this.setState({
      timezoneList: timezoneList,
    });
    triggerTimezoneListUpdate();
  }

  handleDelete = (value: string) => {
    const { timezoneList } = this.state;
    const index = timezoneList.findIndex((zone) => zone.value === value);
    timezoneList.splice(index, 1);
    updateTimezoneList(timezoneList);
    this.setState({
      timezoneList,
    });
    triggerTimezoneListUpdate();
  }

  render() {
    const { 
      timezoneSelections, timezoneList,
      selectedTimezone 
    } = this.state;
    const SortableItem = SortableElement(({ value }: { value: TimezoneItem }) => (
      <ListItem>
        <ListItemText primary={value.label}></ListItemText>
        <ListItemSecondaryAction>
          <IconButton>
            <Icon>delete</Icon>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));
    const SortableList = SortableContainer(({ items }: { items: TimezoneItem[] }) => (
      <List>
        {items && items.map((item, index) => (
          <SortableItem key={`item-${item.value}`} index={index} value={item} />
        ))
        }
      </List>
    ));
    return (
      <div className="tz-editor">
        <div>
          <div className="tz-add" >
            <Select
              value={selectedTimezone}
              onChange={this.handleSelectChange}
            >
              {
                timezoneSelections.map((selection) => (
                  <MenuItem key={selection.value} value={selection.value}>{selection.label}</MenuItem>
                ))
              }
            </Select>
          </div>
        </div>
        <div>
          <SortableList items={timezoneList} onSortEnd={this.onSortEnd} distance={2} />
        </div>
      </div>
    );
  }
}

export default TzEditor;
