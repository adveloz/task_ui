import { IconButton } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { Dialog } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DialogActions } from "@mui/material";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { DialogContent } from "@mui/material";
import { Typography } from "@mui/material";
import { Tooltip } from "@mui/material";

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  onError,
  title,
  text,
  textConfirm,
  colorConfirm,
  textCancel,
}) {
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    setLoading(true);
    onConfirm()
      .then((resp) => {
        setLoading(false);
        onClose();
      })
      .catch((error) => {
        console.log(error);
        onError();
      });
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm" scroll="paper" color="primary">
      <DialogTitle>
      {title}
        <Tooltip title="Cerrar" placement="top">
          <IconButton
            aria-label="cerrar-form-data"
            disabled={loading}
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ textAlign: "center", my: "26px" }}>{text}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          sx={{ borderRadius: 0 }}
          color="inherit"
          disabled={loading}
          onClick={handleClose}
        >
          {textCancel}
        </Button>
        <LoadingButton
          type="submit"
          variant="contained"
          color={colorConfirm}
          sx={{
            borderRadius: 0,
            background: "#212544",
          }}
          loading={loading}
          onClick={handleConfirm}
        >
          {textConfirm}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
