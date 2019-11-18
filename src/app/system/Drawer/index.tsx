import React from 'react';

import './index.scss';

import {
  Dialog,
  Slide,
  AppBar, Toolbar, Fab,
  Container, Box,
  GridList, GridListTile,
  Typography,
  List, ListItem, ListItemIcon, ListItemText,
  Tabs, Tab,
} from '@material-ui/core';

import {
  DonutLarge as DonutLargeIcon,
  HdrWeak as HdrWeakIcon,
  GridOn as GridOnIcon,
  List as ListIcon,
} from '@material-ui/icons';

import { TransitionProps } from '@material-ui/core/transitions';
import App from '../../../model/App';
import { FORMAT_APPLINK } from '../../../core/const';

type Props = {
  isDrawerOpen: boolean,
  updateDrawerOpen: (flag: boolean) => void,
  appList: App[],
}

type State = {
  tabValue: number,
}

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default class Drawer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tabValue: 1,
    }
  }

  triggerDrawer = (flag: boolean) => {
    this.props.updateDrawerOpen(flag);
  }

  handleClickApplistItem = (app: App) => {
    this.triggerDrawer(false);
    window.launchApp(FORMAT_APPLINK(app.id));
  }

  handleTabValue = (event: React.ChangeEvent<{}>, value: number) => {
    this.setState({
      tabValue: value,
    })
  }

  render() {
    const {
      isDrawerOpen,
      appList,
    } = this.props;
    const {
      tabValue
    } = this.state;
    return (
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
            <Tabs
              className="drawer-tab"
              value={tabValue}
              onChange={this.handleTabValue}
              centered
              indicatorColor="primary"
            >
              {/* <Tab icon={<GridOnIcon />}></Tab> */}
              <Tab icon={<ListIcon />} value={1}></Tab>
            </Tabs>
          </Toolbar>
        </AppBar>
        {
          tabValue === 1 ? (
            <Container maxWidth="md">
              <List>
                {
                  appList.map((app) => (
                    <ListItem
                      key={app.id}
                      button
                      onClick={() => this.handleClickApplistItem(app)}
                    >
                      <ListItemIcon>
                        <HdrWeakIcon />
                      </ListItemIcon>
                      <ListItemText primary={app.name}></ListItemText>
                    </ListItem>
                  ))
                }
              </List>
            </Container>
          ) : (
              <Container maxWidth="md">
                <GridList cellHeight={160} cols={3}>
                  <GridListTile cols={1} rows={1}>
                    <Box height="100%" bgcolor="text.disabled">
                      <Typography>TEST</Typography>
                    </Box>
                  </GridListTile>
                </GridList>
              </Container>
            )
        }
      </Dialog>
    )
  }
}