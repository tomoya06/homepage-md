import React from 'react';
import {
  IconButton,
  Typography,
  Paper,
  AppBar, Toolbar
} from '@material-ui/core';
import {
  Close as CloseIcon,
} from '@material-ui/icons';
import {
  withStyles,
} from '@material-ui/core/styles';

import { Rnd, ResizeEnable } from 'react-rnd';

type Props = {
  header: string,
  content: JSX.Element,
  appid: string,
  contentClassName?: string,
  width?: string,
  height?: string,
  enableResizing?: ResizeEnable,
  classes: any,
}

const customStyles = {
  customIconButton: {
    color: 'white'
  }
}

class Application extends React.Component<Props, {}> {
  handleCloseApp = () => {
    const { appid } = this.props;
    window.terminateApp(appid);
  }

  render() {
    const {
      header, content, width, height, enableResizing,
      contentClassName,
      classes,
    } = this.props;

    return (
      <Rnd
        default={{
          x: 0,
          y: 0,
          width: width || 'auto',
          height: height || 'auto',
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
              disableGutters={true}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 0 0 1rem'
              }}
            >
              <Typography variant="subtitle1">
                {header}
              </Typography>
              <span>
                <IconButton onClick={this.handleCloseApp}>
                  <CloseIcon className={classes.customIconButton} />
                </IconButton>
              </span>
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

export default withStyles(customStyles)(Application);
