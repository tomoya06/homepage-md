import React from 'react';

import { observer } from 'mobx-react';

import SystemBar from '../SystemBar';
import './index.scss';
import { SystemStore } from '../../../core/System';

type Props = {
  store: SystemStore,
}

@observer
class System extends React.Component<Props, {}> {
  render() {
    const { store } = this.props;
    const { runningApps } = store;

    return (
      <div className="system-container">
        <div className="desktop-container">
          {runningApps.map((app) => (
            <React.Fragment key={'pid-'+app.pid}>
              {app.app.app}
            </React.Fragment>
          ))}
        </div>
        <SystemBar />
      </div>
    )
  }
}

export default System;