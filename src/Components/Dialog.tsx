import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface DialogInterface {
    open:boolean
    heading:string
    description:string
    handleClose: () => void
    handleOpen: () => void
    children: React.ReactNode;
}

export default function FormDialog({open, heading, description, handleClose, handleOpen, children}: DialogInterface) {

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{heading}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {description}
          </DialogContentText>
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
}