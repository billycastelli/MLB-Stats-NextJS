import BattingStats from "../BattingStats/BattingStats";
import styles from "./BattingChart.module.scss";
import { ResponsiveLine, Line } from "nivo";
import { AutoSizer } from "react-virtualized";

const BattingChart = (props) => {
  const statData = props.batting.map(
    ((stat, line) => {
      return {
        x: `${line.yearid}`,
        y: line[`${stat}`],
      };
    }).bind(null, props.stat)
  );

  const data = [
    {
      id: props.stat,
      color: "rgb(126, 206, 187)",
      data: statData,
    },
  ];
  console.log(data);
  const height = 500;
  const width = 800;

  return (
    <AutoSizer disableHeight>
      {({ width }) => (
        <Line
          data={data}
          margin={{ top: 24, right: 24, bottom: 24, left: 24 }}
          height={500}
          width={width}
          colorBy={(d) => d.color}
          xScale={{ type: "point" }}
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
            tickRotation: 0,
            legend: "Year",
            legendOffset: 36,
            legendPosition: "center",
            size: "16px",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: `${props.stat}`,
            legendOffset: -40,
            legendPosition: "center",
          }}
          pointLabelYOffset={-12}
          useMesh={true}
        />
      )}
    </AutoSizer>
  );
};

export default BattingChart;
