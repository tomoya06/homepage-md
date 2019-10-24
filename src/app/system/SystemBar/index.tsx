import React from 'react';

import {
  AppBar, Toolbar,
  Button,
} from '@material-ui/core'

import './index.scss';

type SystemBarState = {
  isDrawerOpen: boolean;
}

export default class SystemBar extends React.Component<{}, SystemBarState> {
  state: Readonly<SystemBarState> = {
    isDrawerOpen: false,
  }

  render() {
    return (
      <div className="systembar-container">
        <AppBar position="fixed" className="systembar">
          <Toolbar variant="dense">
            <Button>START</Button>
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