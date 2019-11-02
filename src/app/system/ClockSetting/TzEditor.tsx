import React from 'react';
import {
  Grid, Box,
  IconButton, Button,
  Divider,
  Typography,
  Select, MenuItem, FormControl,
  List, ListItem, ListItemSecondaryAction, ListItemText, ListItemIcon,
} from '@material-ui/core';
import {
  Delete as DeleteIcon,
  DragHandle as DragHandleIcon,
} from '@material-ui/icons';

import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import './index.scss';

import { triggerTimezoneListUpdate, getTimezoneList, updateTimezoneList, TimezoneItem } from '../../store/eventbus.clock';

import allTimezones from './timezones.json';

const mappedTimezones: TimezoneItem[] = allTimezones.map(({ locale, lag }: { locale: string, lag: string }) => ({
  label: `${locale.replace('_', ' ')}`,
  value: locale,
  locale: locale,
  lag: lag,
}));

const currentTimezoneIdx = mappedTimezones.findIndex((zone) => zone.value === 'Asia/Taipei');

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
    if (newTimezone && timezoneList.findIndex((timezone) => timezone.value === newTimezone.value) >= 0) return;
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

    const DragHandle = SortableHandle(() => <DragHandleIcon className="drag-handle" />);

    const SortableItem = SortableElement(({ value }: { value: TimezoneItem }) => (
      <ListItem ContainerComponent="div">
        <ListItemIcon>
          <DragHandle />
        </ListItemIcon>
        <ListItemText primary={value.label}></ListItemText>
        <ListItemSecondaryAction>
          <IconButton onClick={() => this.handleDelete(value.value)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));
    const SortableList = SortableContainer(({ items }: { items: TimezoneItem[] }) => (
      <List component="div">
        {
          items && items.map((item, index) => (
            <SortableItem key={`item-${item.value}`} index={index} value={item} />
          ))
        }
      </List>
    ));
    return (
      <div className="tz-editor">
        <Grid container spacing={1}>
          <Typography variant="subtitle1" gutterBottom={true}>
            <Box component="span">Timezones </Box>
            <Box component="span" color={
              timezoneList.length >= MAX_TIMEZONE_COUNT ? 'secondary.main' : 'text.secondary'
            }>{timezoneList.length}/{MAX_TIMEZONE_COUNT}</Box>
          </Typography>
        </Grid>
        <Divider />
        <Grid container spacing={1}>
          <Grid item sm={12}>
            <SortableList
              items={timezoneList}
              onSortEnd={this.onSortEnd}
              useDragHandle={true}
              lockAxis="y"
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} justify="space-between" >
          <Grid item sm={12}>
            <FormControl fullWidth={true} variant="outlined">
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
            </FormControl>
          </Grid>
          <Divider />
          <Grid item sm={12}>
            <Button variant="outlined" fullWidth={true} onClick={() => this.submitAddTz()}>
              <span>ADD</span>
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default TzEditor;
