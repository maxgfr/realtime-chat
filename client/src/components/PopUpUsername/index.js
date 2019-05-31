import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function PopUpUsername(props) {
  const classes = useStyles();
  return (
    <div>
      <Dialog disableBackdropClick disableEscapeKeyDown open={props.open} onClose={props.handleValid}>
        <DialogTitle>Choose a username</DialogTitle>
        <DialogContent>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="username-native-simple">Username</InputLabel>
            <Input id="username-native-simple" onChange={props.onChangeUsername}/>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleValid} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PopUpUsername;
