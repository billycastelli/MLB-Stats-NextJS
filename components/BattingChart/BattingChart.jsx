import BattingStats from "../BattingStats/BattingStats";
import styles from "./BattingChart.module.scss";
import { ResponsiveLine, Line } from "@nivo/line";
import { AutoSizer } from "react-virtualized";
import { useState } from "react";
import GraphTooltip from "./GraphTooltip";

// import ZingChart from "zingchart-react";

const BattingChart = (props) => {
  const [chartStat, setChartStat] = useState("homeruns");
  const statData = props.batting.map(
    ((stat, line) => {
      return {
        x: `${line.yearid}`,
        y: line[`${stat}`],
      };
    }).bind(null, chartStat)
  );

  const data = [
    {
      id: chartStat,
      color: "rgb(86, 168, 191)",
      data: statData,
    },
  ];
  const height = 500;
  const width = 800;

  return (
    <div className="container">
      <div className="section">
        <div className="columns is-centered is-mobile">
          <div className="column is-two-thirds-desktop is-two-thirds-tablet is-four-fifths-mobile">
            <h1 style={{ paddingTop: "24px" }}>Stat Chart</h1>
            <hr className={styles.greenHr} />
          </div>
        </div>
      </div>
      <div className="columns is-centered is-mobile">
        <div className="column is-half-desktop is-half-tablet is-full-mobile">
          <AutoSizer disableHeight>
            {({ width }) => (
              <Line
                data={data}
                margin={{ top: 48, right: 24, bottom: 64, left: 48 }}
                height={500}
                width={width}
                colors={{ datum: "color" }}
                xScale={{ type: "linear", min: "auto", max: "auto" }}
                yScale={{
                  type: "linear",
                  min: "auto",
                  max: "auto",
                  stacked: true,
                  reverse: false,
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  orient: "bottom",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: -45,
                  tickValues: 6,
                  legend: "Year",
                  legendOffset: 48,
                  legendPosition: "center",
                  size: "16px",
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: `${chartStat}`,
                  legendOffset: -40,
                  legendPosition: "start",
                }}
                pointLabelYOffset={-12}
                useMesh={true}
                tooltip={(input) => {
                  return (
                    <GraphTooltip
                      playerName={props.playerName}
                      chartStat={chartStat}
                      statValue={input.point.data.y}
                      year={input.point.data.x}
                    />
                  );
                }}
              />
            )}
          </AutoSizer>
        </div>
        <div className="column is-one-fifth-desktop is-one-fifth-tablet is-full-mobile">
          <p>Displaying: {chartStat}</p>

          <button onClick={() => setChartStat("avg")}>Average</button>
        </div>
      </div>
    </div>
  );
};

export default BattingChart;
