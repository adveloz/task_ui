import React from "react";
import ChartManager from "./chart/chartManager";
import ChartCheck from "./chart/chartCheck";
import './chart/chart.css';

function Homepage() {

  return (
    <div className="homepage">
      <div className="manager">
        <ChartManager />
      </div>
      <div className="check">
        <ChartCheck />
      </div>
    </div>
  );
}

export default Homepage;

