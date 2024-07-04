import * as React from "react";
import {
  Box,
  Stack,
  Divider,
  IconButton,
  Skeleton,
  Tooltip
} from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import ConfirmDialog from "../../confirmDialog/confirmDialog";
import RefreshSharpIcon from "@mui/icons-material/RefreshSharp";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import serviTask from "../../../axiosConfig";
import FormAddItem from "./formAddItem";
import { useContext } from "react";
import { AppContext } from "../../providers/appProviders";

const iniData = (data) => {
  let ret = [];
  
  data.forEach((element) => {
    ret.push({
      id: element.id,
      name: element.name,
      manager: element.manager,
      check: element.check ? "completada" : "pendiente",
      description: element.description,
    });
  });
  return ret;
};

export default function DataGridDemo() {
  const [loading, setLoading] = React.useState(true);
  const [refreshTable, setRefreshTable] = React.useState(0);
  const [openFormData, setOpenFormData] = React.useState(false);
  const [formCreate, setFormCreate] = React.useState(true);
  const [openConfirmDelete, setOpenConfirmDelete] = React.useState(false);
  const [selectionTab, setSelectionTab] = React.useState([]);
  const { showNotificationApp } = useContext(AppContext);
  const [items, setItems] = React.useState([]);

  const handleOpenConfirmDelete = () => {
    setOpenConfirmDelete(true);
  };

  const handleCloseConfirmDelete = () => {
    setOpenConfirmDelete(false);
    handleRefreshT();
  };

  const handleDeleteData = async () => {
    return await Promise.all(
      selectionTab.map((element) => {
        return serviTask.delete(`task/${element}`);
      })
    )
      .then(() => {
        showNotificationApp("Se ha eliminado correctamente", "success");
        handleRefreshT();
      })
      .catch((err) => {
        showNotificationApp(
          "Ha ocurrido un error durante la eliminación",
          "error"
        );
        console.log(err);
      });
  };

  const handleCloseFormData = () => {
    setOpenFormData(false);
    handleRefreshT();
  };

  const handleCreateData = () => {
    if (!formCreate) {
      setFormCreate(true);
    }
    setOpenFormData(true);
  };

  const handleUpdateData = () => {
    if (selectionTab.length === 1) {
      if (formCreate) {
        setFormCreate(false);
      }
      setOpenFormData(true);
    }
  };

  React.useEffect(() => {
    setLoading(true);
    serviTask
      .get('task')
      .then((response) => {
        setItems(iniData(response.data));
      })
      .catch((error) => {
        showNotificationApp("Error cargando datos del sistema", "error");
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [refreshTable]);

  const handleRefreshT = () => {
    setSelectionTab([]);
    setRefreshTable(refreshTable === 0 ? 1 : 0);
  };

  const MenuToolBar = () => {
    return (
      <Stack
        direction="row"
        justifyContent="flex-start"
        divider={<Divider orientation="vertical" />}
        spacing={1}
      >
        <IconButton
          variant="text"
          aria-label="refresh"
          color="primary"
          onClick={handleRefreshT}
        >
          <Tooltip title="Actualizar Tabla" placement="top">
            <RefreshSharpIcon fontSize="medium" />
          </Tooltip>
        </IconButton>
        <IconButton
          variant="text"
          aria-label="crear"
          color="primary"
          onClick={handleCreateData}
        >
          <Tooltip title="Nueva" placement="top">
            <AddSharpIcon fontSize="medium"/>
          </Tooltip>
        </IconButton>
        <IconButton
          variant="text"
          aria-label="editar"
          color="primary"
          disabled={selectionTab.length !== 1}
          onClick={handleUpdateData}
        >
          <Tooltip title="Editar" placement="top">
            <EditSharpIcon fontSize="medium" />
          </Tooltip>
        </IconButton>

        <IconButton
          variant="text"
          color="error"
          disabled={selectionTab.length < 1}
          onClick={handleOpenConfirmDelete}
        >
          <Tooltip title="Eliminar" placement="top">
            <DeleteSharpIcon fontSize="medium"/>
          </Tooltip>
        </IconButton>
      </Stack>
    );
  };

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
        <GridToolbarExport
          printOptions={{ disableToolbarButton: true }}
          csvOptions={{ allColumns: true }}
        />
        <MenuToolBar />
      </GridToolbarContainer>
    );
  };

  return (
    <React.Fragment>
      {loading ? (
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={"700px"}
          animation="wave"
        />
      ) : (
        <Box sx={{ height: "70vh", width: "100%" }}>
          <MenuToolBar/>
            <DataGrid
              checkboxSelection
              rows={items}
              columns={[
                { field: "name", headerName: "Tarea", width: 150 },
                { field: "manager", headerName: "Encargado", width: 150 },
                { field: "check", headerName: "Estado", width: 150 },
                { field: "description", headerName: "Descripción", flex: 1 },
              ]}
              initialState={{
                sorting: {
                  sortModel: [{ field: "name", sort: "desc" }],
                },
              }}
              components={{
                Toolbar: CustomToolbar,
              }}
              onRowSelectionModelChange={(newSelectionModel) => {
                setSelectionTab(newSelectionModel);
              }}
              rowSelectionModel={selectionTab}
            />
          </Box>
      )}
           <FormAddItem
            open={openFormData}
            onClose={handleCloseFormData}
            create={formCreate}
            editData={
              !formCreate && selectionTab.length === 1
                ? items.find((elem) => elem.id === selectionTab[0])
                : null
            }
          />
           <ConfirmDialog
            open={openConfirmDelete}
            onClose={handleCloseConfirmDelete}
            onConfirm={handleDeleteData}
            onError={() => {
              showNotificationApp(
                "Hubo un problema durante la eliminación del contenedor.",
                "error"
              );
            }}
            title="Confirmar eliminación"
            text="¿Está seguro que desea eliminar la tarea seleccionada?"
            textConfirm="Eliminar"
            colorConfirm="error"
            textCancel="Cancelar"
          />
    </React.Fragment>
  );
}
