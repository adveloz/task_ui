import { Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import { createContext } from "react";
import { Slide } from "@mui/material";


export const AppContext = createContext();

const initialNotificationApp = {
  open: false,
  msj: "",
  severity: "info",
};

export default function AppProvider({ children }) {
  const [notificationApp, setNotificationApp] = useState(
    initialNotificationApp
  );
  const showNotificationApp = (msj, severity) => {
    setNotificationApp({
      open: true,
      msj: msj,
      severity: severity,
    });
  };

  function closeNotificationApp( reason) {
    if (reason === "clickaway") {
      return;
    }
    setNotificationApp({...notificationApp, open: false});
  }
  return (
    <AppContext.Provider value={{ showNotificationApp }}>
      {children}
      <Snackbar
        open={notificationApp.open}
        onClose={closeNotificationApp}
        autoHideDuration={4000}
        TransitionComponent={Slide}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={notificationApp.severity} sx={{ width: "100%" }}>
          {notificationApp.msj}
        </Alert>
      </Snackbar>
    </AppContext.Provider>
  );
}
