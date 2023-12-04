import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/router";

export default function AlertDialog({
  AlertMsg,
  AlertTitle,
  AlertAction,
  BtnTitle,
}) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [ActionPressed, setActionPressed] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAlertAction = () => {
    AlertAction();
    setActionPressed(true);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        {BtnTitle}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{AlertTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {AlertMsg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          {ActionPressed ? (
            <Button onClick={handleClose} autoFocus>
              Done
            </Button>
          ) : (
            <Button onClick={handleAlertAction} autoFocus>
              Agree
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
