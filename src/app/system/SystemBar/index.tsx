import React from 'react';

import {
  AppBar, Toolbar,
  Button,
} from '@material-ui/core'

import SystemBarClock from '../../systembar/Clock';

import './index.scss';

type State = {
  isDrawerOpen: boolean;
}

export default class SystemBar extends React.Component<{}, State> {
  state: Readonly<State> = {
    isDrawerOpen: false,
  }

  render() {
    return (
      <div className="systembar-container">
        <AppBar position="fixed" className="systembar">
          <Toolbar variant="dense">
            <Button>START</Button>
            <SystemBarClock/>
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