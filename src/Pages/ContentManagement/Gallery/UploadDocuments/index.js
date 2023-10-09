import React, { useState } from "react";
import styles from "./styles.module.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getNames } from "country-list";
import { useTable, usePagination } from "react-table";

// Sample data
const data = [
  {
    id: 1,
    documentsDetails: "Speaker",
    label: "INR",
    labelDescription: "INR",
    contentTypeId: "INR",
    filePath: "INR",
    showInOrder1: "INR",
    isPublished1: "INR",
    fileHost: "INR",
  },

  // Add more data here
];

//columns
const columns = [
  { Header: "#", accessor: "id" },
  { Header: "Documents Details", accessor: "documentsDetails" },
  { Header: "Label", accessor: "label" },
  { Header: "Label Description", accessor: "labelDescription" },
  { Header: "Content Type Id", accessor: "contentTypeId" },
  { Header: "File Path", accessor: "filePath" },
  { Header: "Show In Order 1", accessor: "showInOrder1" },
  { Header: "Is Published 1", accessor: "isPublished1" },
  { Header: "File Host", accessor: "fileHost" },
];

const UploadDocuments = () => {
  const countryNames = getNames();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isTableExpanded, setIsTableExpanded] = useState(true);

  const exportToExcel = () => {
    const wsData = data.map((item) => ({
      ID: item.id,
      "Documents Details ": item.documentsDetails,
      Label: item.label,
      "Label Description": item.labelDescription,
      "Content Type Id": item.contentTypeId,
      "File Path": item.filePath,
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

  const addHandler = async (input) => {
    console.log(input);
    const fd = new FormData();
    fd.append("file", input);
  };

  // export function get by Id
  function Openeer() {
    const targ = document.getElementById("file");
    targ.click();
  }

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
    <div className={`yourComponent ${isExpanded ? "expanded" : ""}`}>
      <div className="horizontalLine"></div>
      <div className="header">
        <div className="title">Upload Albums</div>
        <button className="expandButton" onClick={toggleExpand}>
          {isExpanded ? "-" : "+"}
        </button>
      </div>
      {isExpanded && (
        <form className="form-container">
          <div className="form-row">
            <div className="form-col">
              <label className="mandatory-label">Event Name : </label>
              <select required>
                <option value="">--select--</option>
                <option value="category 1">category 1</option>
                <option value="category 2">category 2</option>
                <option value="category 3">category 3</option>
              </select>
            </div>
            <div className="form-col">
              <label className="mandatory-label">Document Category :</label>
              <select required>
                <option value="">--select--</option>
                <option value="category 1">category 1</option>
                <option value="category 2">category 2</option>
                <option value="category 3">category 3</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label>Title :</label>
              <input type="text" />
            </div>
            <div className="form-col">
              <label>Description :</label>
              <input type="text" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label>Display Image :</label>
              <input type="file" />
            </div>
            <div className="form-col">
              <label>Show In Order :</label>
              <input type="file" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-col checkbox-style">
              <label htmlFor="checkbox">Is Published:</label>
              <input
                type="checkbox"
                id="checkbox"
                name="checkbox"
                style={{ height: "14px" }}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </div>
        </form>
      )}

      {/* table */}
      <div className={`yourComponent ${isTableExpanded ? "expanded" : ""}`}>
        <div className="horizontalLine"></div>
        <div className="header">
          <div className="title">Upload Contents</div>
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
              {/* <button
                className="btn"
                onClick={addHandler}
                style={{ backgroundColor: "#fff", borderRadius: "8px" }}
              >
                Add +
              </button>

              <input type='file' id="handleInput"></input> */}
              <input
                type="file"
                id="file"
                onChange={(e) => {
                  addHandler(e.target.files[0]);
                }}
                style={{ display: "none" }}
              ></input>

              <button onClick={Openeer}>Add +</button>

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
    </div>
  );
};

export default UploadDocuments;
