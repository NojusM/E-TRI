import React, { useMemo } from "react";
import { useTable, Column, useSortBy, HeaderGroup } from "react-table";
import { PlotData, TableItem } from "../../types/types";
import COLORS from "../../data/colors.json";
interface Props {
  tableData: TableItem[];
  setPlotdata: React.Dispatch<React.SetStateAction<PlotData>>;
  index: number;
}

interface RowData {
  time: string;
  charge: string;
  probability: number;
}

export default function List({ tableData, setPlotdata, index }: Props) {
  const handleItemClick = (square: RowData, index: number) => {
    setPlotdata((current) => {
      const { time, charge } = square;
      const [startCharge, endCharge] = charge
        .split(" ~ ")
        .map((c) => parseFloat(c));
      const [startTime, endTime] = time.split(" ~ ").map((t) => {
        const [h, m, s] = t.split(":");
        const now = new Date();
        const date = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          parseInt(h, 10) + (index % 2 === 0 ? 0 : 24),
          parseInt(m, 10),
          parseInt(s, 10)
        );
        return date;
      });

      const xRange = [
        new Date(
          startTime.getTime() - 0.1 * (endTime.getTime() - startTime.getTime())
        ),
        new Date(
          endTime.getTime() + 0.1 * (endTime.getTime() - startTime.getTime())
        ),
      ];
      const yRange = [
        startCharge - 0.1 * (endCharge - startCharge),
        endCharge + 0.1 * (endCharge - startCharge),
      ];
      const temp = { ...current };

      if (temp.layout?.xaxis) {
        temp.layout.xaxis.range = xRange ?? temp.layout.xaxis.range;
      }
      if (temp.layout?.yaxis) {
        temp.layout.yaxis.range = yRange ?? temp.layout.yaxis.range;
      }
      const sideview = document.getElementById("sideview");
      if (sideview) {
        sideview.scrollTo({ top: 0, behavior: "smooth" });
      }

      return temp;
    });
  };

  const columns: Column<TableItem>[] = useMemo(
    () => [
      {
        Header: `${textOnIndex(
          index,
          `Arriving to station`,
          `Leaving station`
        )}`,
        columns: [
          {
            Header: "Time",
            accessor: "time",
            sortType: "basic",
            disableSortBy: true,
          },
          {
            Header: "Charge",
            accessor: "charge",
            sortType: "basic",
            disableSortBy: true,
          },
          {
            Header: "Probability",
            accessor: "probability",
            sortType: "alphanumeric",
            defaultCanSort: true,
          },
        ],
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<TableItem>(
      {
        columns,
        data: tableData,
      },
      useSortBy
    );

  return (
    <div className="group-wrapper">
      <div className="group-title">
        {textOnIndex(index, `Charging station ${index / 2 + 1}`, ``)}
      </div>
      <div className="table-wrapper">
        <table {...getTableProps()} id={`table-${index}`}>
          <thead>
            {headerGroups.map((headerGroup: HeaderGroup<TableItem>, hIndex) => {
              var style: any = {
                border: `2px solid ${COLORS[index]}`,
              };
              if (hIndex === 0) {
                style = {
                  border: `2px solid ${COLORS[index]}`,
                  backgroundColor: COLORS[index],
                };
              }

              return (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      style={style}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              );
            })}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  onClick={() => {
                    handleItemClick(row.values as RowData, index);
                  }}
                  style={{ border: `2px solid ${COLORS[index]}` }}
                  id={`row-${rowIndex}`}
                >
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function textOnIndex(index: number, odd: string, equal: string) {
  return index % 2 === 0 ? `${odd}` : `${equal}`;
}
