import React from 'react';
import ReactClock from 'react-clock';

import {
  Popover, Button, 
} from '@material-ui/core'

import './index.scss';

import moment from 'moment';
import {
  TimezoneItem, getTimezoneList,
  bindTimezoneListUpdateHandler, unbindTimezoneListUpdateHandler
} from './eventbus';

type State = {
  timeFormat: string,
  currentTime: moment.Moment,
  timezoneList: TimezoneItem[],
  anchorEl: HTMLButtonElement | null,
}

export default class Clock extends React.Component<{}, State> {
  state: Readonly<State> = {
    timeFormat: 'HH:mm:ss',
    currentTime: moment(),
    timezoneList: getTimezoneList() || [],
    anchorEl: null,
  }

  timeout: number = 0;
  anchorElemId: string = 'clock-popover';

  componentDidMount() {
    this.timeout = window.setInterval(() => {
      this.updateCurrentTime();
    }, 10);

    bindTimezoneListUpdateHandler(this.updateTimezoneList);
  }

  componentWillUnmount = () => {
    clearInterval(this.timeout);
    unbindTimezoneListUpdateHandler(this.updateTimezoneList);
  }

  updateCurrentTime = () => {
    this.setState({
      currentTime: moment(),
    });
  }

  updateTimezoneList = () => {
    const timezoneList = getTimezoneList();
    this.setState({
      timezoneList,
    });
  }

  handleTriggerClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    this.setState({
      anchorEl: event.currentTarget,
    })
  }

  handleTriggerClose = () => {
    this.setState({
      anchorEl: null,
    })
  }
  
  handleClickSetting = () => {
    // window.launchApp('system.clocksetting');
  }

  render() {
    const { currentTime, timeFormat, timezoneList, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const id = open ? this.anchorElemId : undefined;
    const trigger = (
      <span>{currentTime.format(timeFormat)}</span>
    );
    const popover = (
      <div className="clock-popover">
        <div className="clock-display">
          <div className="one-clock">
            <ReactClock value={currentTime.toDate()} />
            <div className="desc">LOCAL TIME</div>
          </div>
          {
            timezoneList.map(({ lag, label }) => (
              <div
                key={`display-clock-${label}`}
                className="one-clock"
              >
                <ReactClock value={currentTime.add(lag, 'h').toDate()} />
                <div className="desc">{label.split(' ').join('\n')}</div>
              </div>
            ))
          }
        </div>
        <div className="panel">
          <Button onClick={this.handleClickSetting}>SETTING</Button>
          {/* <Button onClick={this.handleTriggerClose}>X</Button> */}
        </div>
      </div>
    );
    return (
      <React.Fragment>
        <Button aria-describedby={id} variant="contained" onClick={this.handleTriggerClick}>
          {trigger}
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleTriggerClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          {popover}
        </Popover>
      </React.Fragment>
    )
  }
}
