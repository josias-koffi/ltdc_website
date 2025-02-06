import React, { ReactNode } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const CustomDialog = ({
  title,
  open,
  handleClose,
  children,
}: {
  title: string;
  open: boolean;
  handleClose: (value: string) => void;
  children: ReactNode;
}) => {
  return (
    <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ overflow: "hidden" }}>{children}</DialogContent>
      <DialogActions>
        {/*@ts-ignore - strange overload problème */}
        <Button onClick={handleClose}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
