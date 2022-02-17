import React from "react";
import Chart from "react-apexcharts";
export default function RadialBar(props) {
  function getCSSVariableValue(variableName) {
    let hex = getComputedStyle(document.documentElement).getPropertyValue(
      variableName
    );
    if (hex && hex.length > 0) {
      hex = hex.trim();
    }

    return hex;
  }
  const baseColor = getCSSVariableValue("--bs-" + props.chartColor);
  const lightColor = getCSSVariableValue("--bs-light-" + props.chartColor);
  const labelColor = getCSSVariableValue("--bs-gray-700");
  const options = {
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "65%",
        },
        dataLabels: {
          name: {
            show: false,
            fontWeight: "700",
          },
          value: {
            color: labelColor,
            fontSize: "25px",
            fontWeight: "800",
            offsetY: 12,
            show: true,
            formatter: function (val) {
              return val + "%";
            },
          },
        },
        track: {
          background: lightColor,
          strokeWidth: "100%",
        },
      },
    },
    colors: [baseColor],
    stroke: {
      lineCap: "round",
    },
  };
  return (
    <div className="card">
      <div className="card-header border-0 py-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bolder fs-3 mb-1">
            Taux d'avancement du projet:
          </span>
        </h3>
      </div>
      <div className="card-body d-flex flex-column ">
        <div className="flex-grow-1">
          <Chart
            options={options}
            series={props.value}
            type="radialBar"
            width="322"
            height="250"
          />
        </div>
      </div>
    </div>
  );
}
