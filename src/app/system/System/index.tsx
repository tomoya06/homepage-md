import React from 'react';

import { observer } from 'mobx-react';

import { CssBaseline } from '@material-ui/core';

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
        <CssBaseline />
        <div className="desktop-container">
          {runningApps.map((app) => (
            <React.Fragment key={'pid-'+app.pid}>
              {app.app.app}
            </React.Fragment>
          ))}
        </div>
        <SystemBar store={store} />
      </div>
    )
  }
}

export default System;