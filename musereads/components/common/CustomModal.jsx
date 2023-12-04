import { Button, Dialog, DialogTitle } from "@mui/material";
import React from "react";

export default function CustomModal({
  modal_title,
  btn_title,
  children,
  btn_variant,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        sx={{ bgcolor: "#636429 !important", color: "#fff" }}
        size="small"
        variant={"contained"}
        onClick={handleClickOpen}
      >
        {btn_title}
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>{modal_title}</DialogTitle>
        {children}
      </Dialog>
    </>
  );
}
