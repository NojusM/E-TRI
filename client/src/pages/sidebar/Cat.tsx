import { Data, Layout } from "plotly.js";
import Plot from "react-plotly.js";
import FAKE_DATA from "../../data/test.json";
import COLORS from "../../data/colors.json";
import { useEffect, useMemo, useState } from "react";
import List from "./List";
import { SquareData, PlotData, TableItem } from "../../types/types";

interface CatProps {
  data: any[];
}

export default function Cat({ data }: CatProps) {
  const [plotdata, setPlotdata] = useState<PlotData>({
    data: undefined,
    config: undefined,
    layout: undefined,
  });
  const [squares, setSquares] = useState<SquareData[][]>();

  useEffect(() => {
    const data: Data[] = [];
    const squaresList: SquareData[][] = FAKE_DATA.map((row) =>
      row.map(([xRange, yRange, probability]) => {
        var x = [...(xRange as [number, number])];
        return {
          x: [
            new Date(Date.now() + x[0] * 1000),
            new Date(Date.now() + x[1] * 1000),
          ],
          y: yRange as [number, number],
          probability: probability as number,
        };
      })
    );
    setSquares(squaresList);

    squaresList.forEach((group, groupIndex) => {
      const groupData: Data[] = [];
      group.forEach((square, squareIndex) => {
        const [x1, x2] = square.x;
        const [y1, y2] = square.y;
        const squareLineData = {
          type: "scatter",
          x: [x1, x2, x2, x1, x1],
          y: [y1, y1, y2, y2, y1],
          line: {
            color: COLORS[groupIndex],
            width: 2,
          },
          mode: "lines",
          marker: {
            size: 0,
          },
          hoverinfo: "skip",
          ids: [
            `group-${groupIndex}-square-${squareIndex}-line`,
            `group-${groupIndex}-square-${squareIndex}-fill`,
          ],
        };

        const fillHeight = (y2 - y1) * square.probability;
        const fillData = {
          type: "scatter",
          x: [x1, x2, x2, x1, x1],
          y: [y1, y1, y1 + fillHeight, y1 + fillHeight, y1],
          fill: "toself",
          fillcolor: COLORS[groupIndex],
          mode: "lines",
          line: {
            color: COLORS[groupIndex],
            width: 0,
          },
          marker: {
            size: 0,
          },
          name: `Probability: ${square.probability.toFixed(3)}`,
          hoverlabel: {
            namelength: 20,
            font: { size: 14 },
          },
          hoveron: "fills",
          opacity: 0.5,
          ids: [
            `group-${groupIndex}-square-${squareIndex}-fill`,
            `group-${groupIndex}-square-${squareIndex}-line`,
          ],
        };

        groupData.push(squareLineData as any);
        groupData.push(fillData as any);
      });

      data.push(groupData as Data);
    });

    const layout = {
      modebar: {
        color: "black",
        activecolor: "#095079",
        orientation: "v",
        buttonmargin: 100,
        add: ["drawrect", "eraseshape", "zoom2d"],
        remove: ["autoscale"],
      },
      xaxis: {
        title: "Arrival time",
        zeroline: false,
        showline: true,
        tickformat: "%H:%M:%S",
      },
      yaxis: {
        title: "Charge",
        zeroline: false,
        showline: true,
      },
      margin: {
        autoexpand: true,
        l: 50,
        r: 50,
        b: 50,
        t: 50,
        pad: 0,
      },
      autosize: true,
      showlegend: false,
      dragmode: "pan",
      hovermode: "x",
      height: 300,
    };

    const config = {
      responsive: true,
      displayModeBar: true,
      displaylogo: false,
      scrollZoom: true,
    };

    setPlotdata(
      () => ({ data: data, config: config, layout: layout } as PlotData)
    );
  }, [FAKE_DATA]);

  const tableData: TableItem[][] = useMemo(
    () =>
      squares?.map((group, groupIndex) =>
        group.map((square, squareIndex) => ({
          id: `group-${groupIndex}-square-${squareIndex}`,
          time: `${square.x[0].toLocaleTimeString([], {
            hour12: false,
          })} ~ ${square.x[1].toLocaleTimeString([], { hour12: false })}`,
          charge: `${square.y[0]} ~ ${square.y[1]}`,
          probability: Number(square.probability.toFixed(3)),
        }))
      ) ?? [],
    [squares]
  );

  return plotdata.data === undefined ? (
    <></>
  ) : (
    <>
      <div className="plot-wrapper">
        <Plot
          data={plotdata.data.flat()}
          layout={plotdata.layout as Partial<Layout>}
          config={plotdata.config}
          className="cat"
          onClick={handleShapeClick}
        />
      </div>
      <div className="tables">
        {tableData.map((table, index) => (
          <List
            tableData={table}
            setPlotdata={setPlotdata}
            index={index}
            key={index}
          />
        ))}
      </div>
    </>
  );
}
function handleShapeClick(event: any) {
  const id = event.points[0].data.ids[0];
  const [tableId, rowId] = id
    .split("-")
    .filter((item: string) => !isNaN(Number(item)));
  const tableElement = document.getElementById(`table-${tableId}`);
  if (tableElement) {
    const rows = tableElement.getElementsByTagName(`tr`);
    if (rowId >= 0 && rowId < rows.length) {
      const targetRow = rows[parseInt(rowId) + 2];
      targetRow.scrollIntoView({ behavior: "smooth", block: "end" });
      targetRow.classList.add("blinking-animation");
      setTimeout(() => {
        targetRow.classList.remove("blinking-animation");
      }, 3000);
    }
  }
}
