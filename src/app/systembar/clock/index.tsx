import React from 'react';
import ReactClock from 'react-clock';

import {
  Button, 
  Divider,
} from '@material-ui/core'

import './index.scss';

import moment from 'moment-timezone';
import {
  TimezoneItem, getTimezoneList,
  bindTimezoneListUpdateHandler, unbindTimezoneListUpdateHandler
} from '../../store/eventbus.clock';

import Application from '../SystemBarApplication/index';

type State = {
  timeFormat: string,
  currentTime: moment.Moment,
  timezoneList: TimezoneItem[],
}

export default class Clock extends React.Component<{}, State> {
  state: Readonly<State> = {
    timeFormat: 'HH:mm:ss',
    currentTime: moment(),
    timezoneList: getTimezoneList() || [],
  }

  timeout: number = 0;
  anchorElemId: string = 'clock-popover';

  componentDidMount() {
    this.timeout = window.setInterval(() => {
      this.updateCurrentTime();
    }, 1000);

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

  handleClickSetting = () => {
    window.launchApp('system.clocksetting');
  }

  render() {
    const { currentTime, timeFormat, timezoneList } = this.state;
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
            timezoneList.map(({ label, locale, lag }) => (
              <div
                key={`display-clock-${label}`}
                className="one-clock"
              >
                <ReactClock value={currentTime.tz(locale).toDate()} />
                <div className="desc">{`${lag}\n${label}`}</div>
              </div>
            ))
          }
        </div>
        <Divider />
        <div className="panel">
          <Button onClick={this.handleClickSetting}>SETTING</Button>
        </div>
      </div>
    );
    return (
      <Application 
        trigger={trigger}
        popover={popover}
        anchorElemId="clock-appbar"
      />
    )
  }
}
