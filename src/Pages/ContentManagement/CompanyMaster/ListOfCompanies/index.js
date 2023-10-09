import React, { useEffect, useState } from "react";
import "./styles.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useTable, usePagination } from "react-table";
import { baseUrl } from "../../../../Constants/network";
import axios from "axios";
import Popup2 from "../../../../Components/Popup/Popup2";

// Sample data
const data = [
  {
    id: 1,
    locationId: "Speaker",
    locationName: "INR",
    parent: 45,
    locationType: "true",
  },
  {
    id: 2,
    locationId: "Speaker",
    locationName: "INR",
    parent: 45,
    locationType: "true",
  },
  {
    id: 3,
    locationId: "Speaker",
    locationName: "INR",
    parent: 45,
    locationType: "true",
  },
  {
    id: 4,
    locationId: "Speaker",
    locationName: "INR",
    parent: 45,
    locationType: "true",
  },
  {
    id: 5,
    locationId: "Speaker",
    locationName: "INR",
    parent: 45,
    locationType: "true",
  },
  {
    id: 6,
    locationId: "Speaker",
    locationName: "INR",
    parent: 45,
    locationType: "true",
  },
  {
    id: 7,
    locationId: "Speaker",
    locationName: "INR",
    parent: 45,
    locationType: "true",
  },
  {
    id: 8,
    locationId: "Speaker",
    locationName: "INR",
    parent: 45,
    locationType: "true",
  },
  // Add more data here
];

//columns
const columns = [
  { Header: "ID", accessor: "_id" },
  { Header: "Company Name", accessor: "companyName" },
  { Header: "Address", accessor: "address1" },
  // { Header: "Parent", accessor: "parent" },
  // { Header: "Location Type", accessor: "locationType" },
  {
    Header: "Action",
    accessor: "actions",
    Cell: ({ row }) => (
      <button
        onClick={() => {}}
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

const ListOfCompanies = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    handleGetAll();
  }, []);

  const exportToExcel = () => {
    const wsData = data.map((item) => ({
      ID: item.id,
      "Location Id": item.locationId,
      "Location Name": item.locationName,
      Parent: item.parent,
      "Location Type": item.locationType,
    }));

    const ws = XLSX.utils.json_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "file");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "file.xlsx";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
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
      data: tableData,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    usePagination
  );

  // CRUD operation

  const handleAction = (id) => {
    setSelectedCompanyId(id);
    setShowPopup(true);
  };

  const handleGetAll = () => {
    axios.get(`${baseUrl}api/v1/Company`).then((response) => {
      console.log("Get All action successful", response.data.data);
      setTableData(response.data.data);
    });
  };

  // popUp

  const [showPopup, setShowPopup] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  const handleView = (companyData) => {
    setSelectedCompanyId(companyData);
    setShowPopup(true);
  };

  return (
    <>
      <div className="yourComponent expanded">
        <div className="horizontalLine"></div>
        <div className="header">
          <div className="title">Search</div>
        </div>
        <form className="form-container">
          <div className="form-row">
            <div className="form-col">
              <label htmlFor="currency">Company Category : </label>
              <select>
                <option value="">--select--</option>
                <option value="category 1">category 1</option>
                <option value="category 2">category 2</option>
                <option value="category 3">category 3</option>
              </select>
            </div>
            <div className="form-col">
              <label htmlFor="currency">Company Name : </label>
              <input type="text" />
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
      </div>
      <div className={`yourComponent ${isExpanded ? "expanded" : ""}`}>
        <div className="horizontalLine"></div>
        <div className="header">
          <div className="title">Search Output</div>
          <button className="expandButton" onClick={toggleExpand}>
            {isExpanded ? "-" : "+"}
          </button>
        </div>
        {isExpanded && (
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
                        <button
                          style={{
                            width: "50px",
                            height: "30px",
                            background: "black",
                            color: "white",
                            borderRadius: "5px",
                          }}
                          onClick={handleView}
                        >
                          Show
                        </button>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {showPopup && (
                <Popup2
                  companyID={tableData}
                  companyData={selectedCompanyId}
                  onClose={() => setShowPopup(false)}
                />
              )}
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
    </>
  );
};

export default ListOfCompanies;
