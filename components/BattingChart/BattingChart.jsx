import BattingStats from "../BattingStats/BattingStats";
import styles from "./BattingChart.module.scss";
import { ResponsiveLine, Line } from "@nivo/line";
import { AutoSizer } from "react-virtualized";
import { useState } from "react";
import GraphTooltip from "./GraphTooltip";
import StatSelectionDropdown from "./StatSelectionDropdown";
import { cleanChartStats } from "./../utils/clean";

const BattingChart = (props) => {
  const [chartStat, setChartStat] = useState("homeruns");

  const playerData = [];
  for (let p of props.playerData) {
    playerData.push({
      id: p._source.player.name,
      data: cleanChartStats(p._source.player.batting, chartStat),
    });
  }

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
                    data={playerData}
                    margin={{ top: 40, right: 12, bottom: 64, left: 48 }}
                    height={500}
                    width={width}
                    colors={{ scheme: "category10" }}
                    xScale={{ type: "linear", min: "auto", max: "auto" }}
                    yScale={{
                      type: "linear",
                      min: 0,
                      max: "auto",
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
                    legends={[
                      {
                        anchor: "top-left",
                        direction: "column",
                        justify: false,
                        itemsSpacing: 0,
                        itemDirection: "left-to-right",
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: "circle",
                        symbolBorderColor: "rgba(0, 0, 0, .5)",
                        effects: [
                          {
                            on: "hover",
                            style: {
                              itemBackground: "rgba(0, 0, 0, .03)",
                              itemOpacity: 1,
                            },
                          },
                        ],
                      },
                    ]}
                    tooltip={(input) => {
                      return (
                        <GraphTooltip
                          playerName={input.point.serieId}
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
