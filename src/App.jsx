/* eslint-disable react/jsx-key */
import { useTable, useSortBy,usePagination } from "react-table";
import {data} from "./assets/data.json"


const columns = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Salary",
    accessor: "salary",
  },
];

function App() {
  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow ,nextPage,previousPage,canNextPage,canPreviousPage,
  state:{pageIndex},pageCount,gotoPage} =
    useTable(
      {
        columns,
        data,
        initialState:{pageSize:5}
      },
      useSortBy,usePagination
    );

  return (
    <div className="container">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((hg) => (
            <tr {...hg.getHeaderGroupProps()}>
              {hg.headers.map((header) => (
                <th {...header.getHeaderProps(header.getSortByToggleProps())}>
                  {header.render("Header")}
                  {header.isSorted && (
                    <span>{header.isSortedDesc ? " 🔽" : " 🔼"}</span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="btn-container">
        <button disabled={pageIndex===0} onClick={()=>gotoPage(0)}>First</button>
        <button disabled={!canPreviousPage} onClick={previousPage}>Prev</button>
        <span>{pageIndex+1} of {pageCount}</span>
        <button disabled={!canNextPage} onClick={nextPage}>Next</button>
        <button disabled={pageIndex>=pageCount-1} onClick={()=>gotoPage(pageCount-1)}>Last</button>
      </div>
    </div>
  );
}

export default App;
