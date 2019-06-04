import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

function PopUpUsername(props) {
  return (
    <div>
      <Dialog disableBackdropClick disableEscapeKeyDown open={props.open} onClose={props.handleValid}>
        <DialogTitle>Watson Analysis</DialogTitle>
        { props.loading
          ?
          <DialogContent style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <CircularProgress />
          </DialogContent>
          :
          <DialogContent id="alert-dialog-description">
            {props.message}
          </DialogContent>
        }
        <DialogActions>
        { !props.loading
          ?
          <Button onClick={props.handleValid} color="primary">
            Ok
          </Button>
          : null
        }
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PopUpUsername;
