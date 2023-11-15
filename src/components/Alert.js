// material-ui
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

// ==============================|| Alert ||============================== //

const Alert = (props) => {
  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      {props.title && <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle> }
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{props.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleOk}>확인</Button>
        {props.useCancelYn == 'Y' && <Button onClick={props.handleClose}>취소</Button>}
      </DialogActions>
    </Dialog>
  );
};

export default Alert;