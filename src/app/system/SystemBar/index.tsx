import React from 'react';

import {
  AppBar, Toolbar,
  Button,
  Box, Grid
} from '@material-ui/core'

import SystemBarClock from '../../systembar/Clock';

import { observer } from 'mobx-react';

import './index.scss';
import { SystemStore } from '../../../core/System';

type State = {
  isDrawerOpen: boolean,
}

type Props = {
  store: SystemStore,
}

@observer
export default class SystemBar extends React.Component<Props, State> {
  state: Readonly<State> = {
    isDrawerOpen: false,
  }

  render() {
    const { store } = this.props;
    const { runningApps } = store;

    return (
      <div className="systembar-container">
        <AppBar position="fixed" className="systembar">
          <Toolbar variant="dense">
            <Grid container>
              <Box>
                <Button>START</Button>
              </Box>
              <Box flexGrow={1}>
                {runningApps.map((app) => (
                  <Button key={`systembar-running_app-${app.pid}`}>{app.displayName}</Button>
                ))}
              </Box>
              <Box>
                <SystemBarClock />
              </Box>
            </Grid>
          </Toolbar>
        </AppBar>
        {
          this.state.isDrawerOpen && (
            <div className="app-drawer"></div>
          )
        }
      </div>
    )
  }
}