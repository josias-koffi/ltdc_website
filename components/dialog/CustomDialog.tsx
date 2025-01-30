import React, { ReactNode } from "react";
import { Dialog, DialogTitle } from "@mui/material";

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
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      {children}
    </Dialog>
  );
};

export default CustomDialog;
