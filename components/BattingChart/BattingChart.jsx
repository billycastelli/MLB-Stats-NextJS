import BattingStats from "../BattingStats/BattingStats";
import styles from "./BattingChart.module.scss";
import { ResponsiveLine, Line } from "@nivo/line";
import { AutoSizer } from "react-virtualized";
import { useState } from "react";
import GraphTooltip from "./GraphTooltip";
import StatSelectionDropdown from "./StatSelectionDropdown";
import { cleanNan } from "./../utils/clean";

const BattingChart = (props) => {
  const [chartStat, setChartStat] = useState("homeruns");
  const statData = props.batting
    .filter((line) => line.stint === 1)
    .map(
      ((stat, line) => {
        return {
          x: `${line.yearid}`,
          y: cleanNan(line[`${stat}`]),
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
    <div
      className={`container ${styles.customMobile} ${styles.chartContainer}`}
    >
      <div className="columns is-centered">
        <div className="column is-two-thirds">
          <h1 style={{ paddingTop: "24px" }}>Stat Chart</h1>
          <hr className={styles.greenHr} />
          <div className="columns is-centered">
            <div className="column is-one-quarter">
              <StatSelectionDropdown setChartStat={setChartStat} />
            </div>
            <div className="column is-three-quarters">
              <AutoSizer disableHeight>
                {({ width }) => (
                  <Line
                    data={data}
                    margin={{ top: 40, right: 24, bottom: 64, left: 48 }}
                    height={500}
                    width={width}
                    colors={{ datum: "color" }}
                    xScale={{ type: "linear", min: "auto", max: "auto" }}
                    yScale={{
                      type: "linear",
                      min: 0,
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
                      format: (e) => Math.floor(e) === e && e,
                    }}
                    axisLeft={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: `${chartStat}`,
                      legendOffset: -40,
                      legendPosition: "start",
                      format: (e) => Math.floor(e) === e && e,
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattingChart;
