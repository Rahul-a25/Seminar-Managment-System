import React, { useState } from "react";
import styles from "./styles.module.css";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import { getNames } from "country-list";
import { useTable, usePagination } from "react-table";

// Sample data
const data = ["Item 1", "Item 2", "Item 3", "Item 4"];

//columns
const columns = [{ Header: "#", accessor: "id" }];

const AddressLevelForDelegates = () => {
  const countryNames = getNames();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isTableExpanded, setIsTableExpanded] = useState(true);
  const handleExportToWord = () => {
    try {
      const tableHtml = `
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            ${data
              .map(
                (item, index) =>
                  `<tr><td>${index + 1}</td><td>${item}</td></tr>`
              )
              .join("")}
          </tbody>
        </table>
      `;

      const blob = new Blob([tableHtml], { type: "application/msword" });
      saveAs(blob, "table.docx");
    } catch (error) {
      console.error("Error exporting to Word:", error);
    }
  };

  // Helper function to convert a data URI to a Blob
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
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
    <div className={`yourComponent ${isExpanded ? "expanded" : ""}`}>
      <div className="horizontalLine"></div>
      <div className="header">
        <div className="title">Search</div>
        <button className="expandButton" onClick={toggleExpand}>
          {isExpanded ? "-" : "+"}
        </button>
      </div>
      {isExpanded && (
        <form className="form-container">
          <div className="form-row">
            <div className="form-col">
              <label className="mandatory-label">Event :</label>
              <select>
                <option value="">--select--</option>
                <option value="category 1">category 1</option>
                <option value="category 2">category 2</option>
                <option value="category 3">category 3</option>
              </select>
            </div>
            <div className="form-col">
              <label>Company :</label>
              <select>
                <option value="">--select--</option>
                <option value="category 1">category 1</option>
                <option value="category 2">category 2</option>
                <option value="category 3">category 3</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label>Category :</label>
              <select>
                <option value="">--select--</option>
                <option value="category 1">category 1</option>
                <option value="category 2">category 2</option>
                <option value="category 3">category 3</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-col">
              <button type="submit" className="btn">
                View
              </button>
            </div>
          </div>
        </form>
      )}

      {/* table */}
      <div className={`yourComponent ${isTableExpanded ? "expanded" : ""}`}>
        <div className="horizontalLine"></div>
        <div className="header">
          <div className="title">Search Result</div>
          <button className="expandButton" onClick={toggleTableExpand}>
            {isTableExpanded ? "-" : "+"}
          </button>
        </div>
        {isTableExpanded && (
          <div className="container mx-auto mt-5">
            <button
              onClick={handleExportToWord}
              className="btn"
              style={{ margin: "15px" }}
            >
              Export to Word
            </button>
            <div className="overflow-x-auto">
              <table className="table-auto w-full" id="table-to-export">
                <thead>
                  <tr>
                    {/* <th>Serial Number</th>
          <th>Data</th>
          <th>Serial Number</th>
          <th>Data</th> */}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        width: "50%",
                      }}
                    >
                      <td>{index + 1}</td>
                      <td>{item}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressLevelForDelegates;
