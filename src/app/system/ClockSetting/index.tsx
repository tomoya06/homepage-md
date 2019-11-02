import React from 'react';

import Application from '../Application';
import IApplication from '../Application/IApplication';

import TzEditor from './TzEditor';

export default class ClockSetting extends React.Component implements IApplication {
  appid = 'system.clocksetting';
  
  render() {
    const header = 'Clock Setting';
    const content = (
      <TzEditor />
    );
    return  (
      <Application 
        header={header}
        content={content}
        appid={this.appid}
      />
    )
  }
}