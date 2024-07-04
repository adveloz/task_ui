import * as React from "react";
import { Box, Skeleton } from "@mui/material";
import serviTask from "../../axiosConfig";
import { PieChart } from "@mui/x-charts/PieChart";
import { useContext } from "react";
import { AppContext } from "../providers/appProviders";

const iniData = (data) => {
  let checkCounts = {};

  data.forEach((element) => {
    if (checkCounts[element.check]) {
      checkCounts[element.check]++;
    } else {
      checkCounts[element.check] = 1;
    }
  });

  let ret = [];
  for (let check in checkCounts) {
    let displayValue = check === "0" ? "Pendiente" : "Completada";
    ret.push({
      check: displayValue,
      taskCount: checkCounts[check],
    });
  }

  return ret;
};

function BasicPie({ data }) {
  const pieData = data.map((item, index) => ({
    id: index,
    value: item.taskCount,
    label: item.check,
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
          variant="circular"
          width={"0vh"}
          height={"0vh"}
          animation="wave"
        />
      ) : (
        <Box>
          <h3>Gráfica por estado de la tarea</h3>
          <BasicPie data={items} />
        </Box>
      )}
    </React.Fragment>
  );
}
