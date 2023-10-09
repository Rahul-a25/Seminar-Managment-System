import React, { useState } from "react";
import styles from "./styles.module.css";
import { getNames } from "country-list";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useTable, usePagination } from "react-table";

// Sample data
const data = [
  {
    id: 1,
    sponsorProductId: "243",
    pageName: "abc",
    description: "desc",
    showInOrder: "true",
    pagePosition: "true",
    isPublished: "true",
    smallIcon: "https://i.stack.imgur.com/u4g2i.png",
  },

  // Add more data here
];

//columns
const columns = [
  { Header: "#", accessor: "id" },
  { Header: "Page Name", accessor: "pageName" },
  { Header: "Description", accessor: "description" },
  { Header: "Show In Order", accessor: "showInOrder" },
  { Header: "Page Position", accessor: "pagePosition" },
  { Header: "Is Published", accessor: "isPublished" },
  {
    Header: "Small Icon",
    accessor: "smallIcon",
    Cell: ({ row }) => (
      <img
        src={row.original.smallIcon}
        alt="icon"
        style={{ width: "100px", height: "auto" }}
      />
    ),
  },
  {
    Header: "Action",
    accessor: "actions",
    Cell: ({ row }) => (
      <button
        onClick={() => handleAction(row.original.id)}
        className="bg-blue-500 text-white px-2 py-1 rounded"
      >
        View
      </button>
    ),
  },
];

const handleAction = (id) => {
  console.log(`Clicked action for ID ${id}`);
};

const ListOfMenus = () => {
  const countryNames = getNames();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isTableExpanded, setIsTableExpanded] = useState(true);

  const exportToExcel = () => {
    const wsData = data.map((item) => ({
      ID: item.id,
      "Page Name": item.sponsorProductId,
      Description: item.svdsdsd,
      "Show In Order": item.prodtNdfvdfvdame,
      "Page Position": item.svdsvd,
      "Is Published": item.produNadvfvdfme,
      "Small Icon": item.Nasvfdvdfme,
    }));

    const ws = XLSX.utils.json_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "file");

    // Generate the Excel file as an ArrayBuffer
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    // Convert the ArrayBuffer to a Blob
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create a temporary URL to the blob
    const url = window.URL.createObjectURL(blob);

    // Create a link to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = "file.xlsx";
    a.click();

    // Release the temporary URL and clean up
    window.URL.revokeObjectURL(url);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleTableExpand = () => {
    setIsTableExpanded(!isTableExpanded);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize },
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    pageCount,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    usePagination
  );
  return (
    <div className={`yourComponent ${isTableExpanded ? "expanded" : ""}`}>
      <div className="horizontalLine"></div>
      <div className="header">
        <div className="title">Mobile App Menus</div>
        <button className="expandButton" onClick={toggleTableExpand}>
          {isTableExpanded ? "-" : "+"}
        </button>
      </div>
      {isTableExpanded && (
        <div className="container mx-auto mt-5">
          <div
            className="form-row"
            style={{
              backgroundColor: "rgb(229 231 235)",
              padding: "5px",
              height: " 36px",
            }}
          >
            <button
              className="btn"
              onClick={exportToExcel}
              style={{ backgroundColor: "#fff", borderRadius: "8px" }}
            >
              Export To Excel
            </button>
          </div>
          <div className="overflow-x-auto">
            <table {...getTableProps()} className="table-auto w-full">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr
                    {...headerGroup.getHeaderGroupProps()}
                    className="bg-gray-200"
                    style={{ fontSize: "14px" }}
                  >
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()} className="py-2 px-4">
                        {column.render("Header")}
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
                      {row.cells.map((cell) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            className="border px-4 py-2"
                            style={{ fontSize: "12px" }}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-wrap justify-between">
            <button
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              className="responsive-button"
            >
              {"<<"}
            </button>
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="responsive-button"
            >
              {"<"}
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="responsive-button"
            >
              {">"}
            </button>
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              className="responsive-button"
            >
              {">>"}
            </button>
            <span className="mt-1">
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
              className="p-2 border rounded responsive-select"
            >
              {[5, 10, 20].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListOfMenus;
