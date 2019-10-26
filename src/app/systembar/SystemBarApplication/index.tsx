import React from 'react';

import {
  Button, Popover,
} from '@material-ui/core'

type Props = {
  trigger: JSX.Element,
  popover: JSX.Element,
  anchorElemId: string,
}

type State = {
  anchorEl: HTMLButtonElement | null,
}

export default class SystemBarApplication extends React.Component<Props, State>  {
  state: Readonly<State> = {
    anchorEl: null,
  }
  
  handleTriggerClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    this.setState({
      anchorEl: event.currentTarget,
    })
  }

  handleTriggerClose = () => {
    this.setState({
      anchorEl: null,
    })
  }
  
  render() {
    const { trigger, popover, anchorElemId } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const id = open ? anchorElemId : undefined;

    return (
      <React.Fragment>
        <Button aria-describedby={id} variant="contained" onClick={this.handleTriggerClick}>
          {trigger}
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleTriggerClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          {popover}
        </Popover>
      </React.Fragment>
    )
  }
}