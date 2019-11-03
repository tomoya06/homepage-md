import React from 'react';

import {
  AppBar, Toolbar,
  Fab,
  Button, IconButton,
  Box, Grid,
  Drawer, Dialog, Slide,
  GridList, GridListTile, GridListTileBar, Container,
  Typography,
} from '@material-ui/core'

import { TransitionProps } from '@material-ui/core/transitions';

import {
  DonutLarge as DonutLargeIcon,
} from '@material-ui/icons';

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


const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

@observer
export default class SystemBar extends React.Component<Props, State> {
  state: Readonly<State> = {
    isDrawerOpen: false,
  }

  triggerDrawer = (flag: boolean) => {
    this.setState({
      isDrawerOpen: flag,
    })
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
                <IconButton onClick={() => this.triggerDrawer(true)}>
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
        <Dialog
          fullScreen open={isDrawerOpen}
          TransitionComponent={Transition}
          onClose={() => this.triggerDrawer(false)}
        >
          <AppBar position="relative">
            <Toolbar variant="dense">
              <Fab onClick={() => this.triggerDrawer(false)} className="drawer-fab">
                <DonutLargeIcon />
              </Fab>
            </Toolbar>
          </AppBar>
          <Container maxWidth="md">
            <GridList cellHeight={160} cols={3}>
              <GridListTile cols={1} rows={1}>
                <Box height="100%" bgcolor="text.disabled">
                  <Typography>TEST</Typography>
                </Box>
              </GridListTile>
            </GridList>
          </Container>
        </Dialog>
      </div>
    )
  }
}