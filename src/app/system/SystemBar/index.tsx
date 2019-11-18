import React from 'react';

import {
  AppBar, Toolbar,
  Button, IconButton,
  Box, Grid,
} from '@material-ui/core'

import {
  DonutLarge as DonutLargeIcon,
} from '@material-ui/icons';

import SystemDrawer from '../Drawer';

import SystemBarClock from '../../systembar/Clock';

import { observer } from 'mobx-react';

import './index.scss';
import { SystemStore } from '../../../core/System';
import registry from '../../../core/registry';

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
    const { isDrawerOpen } = this.state;
    const { store } = this.props;
    const { runningApps } = store;

    return (
      <div className="systembar-container">
        <AppBar position="fixed" className="systembar">
          <Toolbar variant="dense">
            <Grid container>
              <Box>
                <IconButton onClick={() => this.setState({ isDrawerOpen: true})}>
                  <DonutLargeIcon />
                </IconButton>
              </Box>
              <Box flexGrow={1} alignItems="center" display="flex">
                {runningApps.map((app) => (
                  <Button key={`systembar-running_app-${app.pid}`}>{app.displayName}</Button>
                ))}
              </Box>
              <Box alignItems="center" display="flex">
                <SystemBarClock />
              </Box>
            </Grid>
          </Toolbar>
        </AppBar>
        <SystemDrawer 
          isDrawerOpen={isDrawerOpen}
          updateDrawerOpen={(isDrawerOpen) => this.setState({ isDrawerOpen })}
          appList={registry}
        />
      </div>
    )
  }
}