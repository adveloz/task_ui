import * as React from "react";
import {
  TextField,
  Button,
  Stack,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import serviTask from "../../../axiosConfig";
import { AppContext } from "../../providers/appProviders";
import { useContext } from "react";

const iniData = {
  name: "",
  manager: "",
  check: 0,
  description: "",
};
const iniDataValid = {
  name: { error: false, errorText: "" },
  manager: { error: false, errorText: "" },
};

export default function FormElements({ open, onClose, create, editData }) {
  const [dataSt, setDataSt] = React.useState(iniData);
  const [dataValid, setDataValid] = React.useState(iniDataValid);
  const [loading, setLoading] = React.useState(false);
  const { showNotificationApp } = useContext(AppContext);

  const handleClose = () => {
    setDataSt(iniData);
    setDataValid(iniDataValid);
    setLoading(false);
    onClose();
  };

  const handleName = (event) => {
    if (event.target.value === "") {
      setDataValid({
        ...dataValid,
        name: { error: true, errorText: "Este campo es obligatorio." },
      });
    } else {
      setDataValid({
        ...dataValid,
        name: { error: false, errorText: "" },
      });
    }
    setDataSt({
      ...dataSt,
      name: event.target.value,
    });
  };

  const handleManager = (event) => {
    if (event.target.value === "") {
      setDataValid({
        ...dataValid,
        manager: { error: true, errorText: "Este campo es obligatorio." },
      });
    } else {
      setDataValid({
        ...dataValid,
        manager: { error: false, errorText: "" },
      });
    }
    setDataSt({
      ...dataSt,
      manager: event.target.value,
    });
  };

  const handleCheck = (e) => {
    setDataSt({
      ...dataSt,
      check: e.target.value,
    });
  };

  const handleDescription = (event) => {
    setDataSt({
      ...dataSt,
      description: event.target.value,
    });
  };
  const handleSubmit = () => {
    let valid = { ...dataValid };
    let fail = false;
    setLoading(true);

    if (dataValid.name.error) fail = true;

    if (dataSt.name === "") {
      fail = true;
      valid = {
        ...valid,
        name: { error: true, errorText: "Este campo es obligatorio." },
      };
    }

    if (dataValid.manager.error) fail = true;

    if (dataSt.manager === "") {
      fail = true;
      valid = {
        ...valid,
        manager: { error: true, errorText: "Este campo es obligatorio." },
      };
    }

    if (!fail) {
      if (create) {
        let newData = {};
        newData.name = dataSt.name;
        newData.manager = dataSt.manager;
        newData.check = dataSt.check;
        newData.description = dataSt.description;

        serviTask
          .post(`addTask`, newData)
          .then((response) => {
            showNotificationApp("Se ha creado correctamente", "success");
            onClose();
            setLoading(false);
          })
          .catch((error) => {
            showNotificationApp(
              "Ha ocurrido un error mientras se guardan los datos",
              "error"
            );
            console.log(error);
            setDataSt(iniData);
            setDataValid(iniDataValid);
          })
          .finally(() => setLoading(false));
      } else {
        let updateData = {};
        updateData.name = dataSt.name;
        updateData.manager = dataSt.manager;
        updateData.check = dataSt.check;
        updateData.description = dataSt.description;

        serviTask
          .put(
            `updateTask/${editData.id}`,
            updateData
          )
          .then((response) => {
            showNotificationApp("Se ha actualizado correctamente", "success");
            onClose();
            setLoading(false);
          })
          .catch((error) => {
            showNotificationApp(
              "Ha ocurrido un error mientras se guardan los datos",
              "error"
            );
            console.log(error);
            onClose();
          });
      }
    } else {
      setDataValid({ ...valid });
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (!open) {
      return undefined;
    }
    if (create) {
    } else {
      const getCheck = (check) => {
        switch (check) {
          case "pendiente":
            return 0;
          case "completada":
            return 1;
          default:
            return "";
        }
      };
      setDataSt({
        id: editData.id,
        name: editData.name,
        manager: editData.manager,
        check: editData.check === ""
        ? ""
        : getCheck(editData.check),
        description: editData.description,
      });
    }
  }, [open]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        fullWidth
        maxWidth="xs"
        scroll="paper"
        color="primary"
      >
        <DialogTitle className="dialog-title">
          {`${create ? `Agregar Tarea` : `Editar Tarea`} `}
          <Tooltip title="Cerrar" placement="top">
            <IconButton
              aria-label="cerrar-form-data-client-sale"
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
        <DialogContent dividers sx={{ maxHeight: "305h", minHeight: "35vh" }}>
          <Stack
            direction="column"
            spacing={2}
            alignItems="initial"
            alignContent="center"
            sx={{ mb: "1vh" }}
          >
            <TextField
              variant="standard"
              label="Tarea"
              required
              type="text"
              disabled={loading}
              value={dataSt.name}
              onChange={handleName}
              autoComplete="false"
              error={dataValid.name.error}
              helperText={dataValid.name.errorText}
              sx={{
                minWidth: "120px",
                width: "400px",
              }}
            />
                 <TextField
              variant="standard"
              label="Encargado"
              required
              type="text"
              disabled={loading}
              value={dataSt.manager}
              onChange={handleManager}
              autoComplete="false"
              error={dataValid.manager.error}
              helperText={dataValid.manager.errorText}
              sx={{
                minWidth: "120px",
                width: "400px",
              }}
            />
             <FormControl
                    variant="standard"
                    sx={{ minWidth: "100px", width: "400px" }}
                    disabled={loading}
                  >
                    <InputLabel id="tipo de impresora/toner">
                     Estado de la Tarea
                    </InputLabel>
                    <Select
                      labelId="state-ct-select-label-equipo"
                      id="state-ct-select-equipo"
                      value={dataSt.check}
                      onChange={handleCheck}
                      label="toner"
                    >
                      <MenuItem value={0}>pendiente</MenuItem>
                      <MenuItem value={1}>completada</MenuItem>
                    </Select>
                  </FormControl>
            <TextField
              multiline
              rows={2}
              name="standart"
              variant="standard"
              label={`Descripción`}
              type="text"
              disabled={loading}
              value={dataSt.description}
              onChange={handleDescription}
              autoComplete="false"
              sx={{
                minWidth: "120px",
                width: "400px",
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{ borderRadius: 0 }}
            color="inherit"
            disabled={loading}
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            sx={{
              borderRadius: 0,
              background: "#212544",
            }}
            loading={loading}
            onClick={handleSubmit}
          >
            Aceptar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
