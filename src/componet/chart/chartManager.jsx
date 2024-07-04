import * as React from "react";
import { Box, Skeleton } from "@mui/material";
import serviTask from "../../axiosConfig";
import { PieChart } from "@mui/x-charts/PieChart";
import { useContext } from "react";
import { AppContext } from "../providers/appProviders";

const iniData = (data) => {
  let managerCounts = {};

  data.forEach((element) => {
    if (managerCounts[element.manager]) {
      managerCounts[element.manager]++;
    } else {
      managerCounts[element.manager] = 1;
    }
  });

  let ret = [];
  for (let manager in managerCounts) {
    ret.push({
      manager: manager,
      taskCount: managerCounts[manager],
    });
  }

  return ret;
};

function BasicPie({ data }) {
  const pieData = data.map((item, index) => ({
    id: index,
    value: item.taskCount,
    label: item.manager,
  }));

  return (
    <PieChart
      series={[
        {
          data: pieData,
        },
      ]}
      width={400}
      height={200}
    />
  );
}

export default function TaskManagerOverview() {
  const [loading, setLoading] = React.useState(true);
  const [refreshTable] = React.useState(0);
  const [items, setItems] = React.useState([]);
  const { showNotificationApp } = useContext(AppContext);

  React.useEffect(() => {
    setLoading(true);
    serviTask
      .get("task")
      .then((response) => {
        setItems(iniData(response.data));
      })
      .catch((error) => {
        showNotificationApp("Error cargando datos del sistema", "error");
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [refreshTable]);

  return (
    <React.Fragment>
      {loading ? (
        <Skeleton
          variant="rectangular"
          width={"0vh"}
          height={"0vh"}
          animation="wave"
        />
      ) : (
        <Box>
          <h3>Gráfica por encargado</h3>
          <BasicPie data={items} />
        </Box>
      )}
    </React.Fragment>
  );
}
