import React from 'react';
import {
  ButtonGroup, IconButton,
  Paper,
  AppBar, Toolbar
} from '@material-ui/core';
import {
  Close as CloseIcon,
} from '@material-ui/icons';

import { Rnd, ResizeEnable } from 'react-rnd';

type Props = {
  header: JSX.Element | string,
  content: JSX.Element,
  appid: string,
  contentClassName?: string,
  width?: string,
  height?: string,
  enableResizing?: ResizeEnable,
}

export default class Application extends React.Component<Props, {}> {
  handleCloseApp = () => {
    const { appid } = this.props;
    window.terminateApp(appid);
  }

  render() {
    const {
      header, content, width, height, enableResizing,
      contentClassName,
    } = this.props;
    return (
      <Rnd
        default={{
          x: 0,
          y: 0,
          width: width || '',
          height: height || '',
        }}
        dragHandleClassName="window--header"
        enableResizing={enableResizing}
      >
        <Paper
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <AppBar className="window--header" position="static">
            <Toolbar 
              variant="dense"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {header}
              <ButtonGroup>
                <IconButton onClick={this.handleCloseApp}>
                  <CloseIcon />
                </IconButton>
              </ButtonGroup>
            </Toolbar>
          </AppBar>
          <div
            className={contentClassName}
            style={{
              overflow: 'hidden',
              flexGrow: 1,
            }}
          >
            {content}
          </div>
        </Paper>
      </Rnd>
    );
  }
}
