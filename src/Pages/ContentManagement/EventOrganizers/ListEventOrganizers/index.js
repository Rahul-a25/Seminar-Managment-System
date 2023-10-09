import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useTable, usePagination } from "react-table";
import { baseUrl } from "../../../../Constants/network";
import axios from "axios";

// Sample data
const data = [
  {
    id: 1,
    organizerName: "Speaker",
    shortName: "INR",
    Address1: 45,
    Address2: "true",
    contactPerson: "true",
    contactPersonNo: "true",
    contactEmail: "true",
    contactFax: "true",
    isPublished: "true",
  },
  {
    id: 2,
    organizerName: "Speaker",
    shortName: "INR",
    Address1: 45,
    Address2: "true",
    contactPerson: "true",
    contactPersonNo: "true",
    contactEmail: "true",
    contactFax: "true",
    isPublished: "true",
  },
  {
    id: 3,
    organizerName: "Speaker",
    shortName: "INR",
    Address1: 45,
    Address2: "true",
    contactPerson: "true",
    contactPersonNo: "true",
    contactEmail: "true",
    contactFax: "true",
    isPublished: "true",
  },
  {
    id: 4,
    organizerName: "Speaker",
    shortName: "INR",
    Address1: 45,
    Address2: "true",
    contactPerson: "true",
    contactPersonNo: "true",
    contactEmail: "true",
    contactFax: "true",
    isPublished: "true",
  },

  // Add more data here
];

//columns
const columns = [
  { Header: "#", accessor: "id" },
  { Header: "Organizer Name", accessor: "organizerName" },
  { Header: "Short Name", accessor: "shortName" },
  { Header: "Address 1", accessor: "Address1" },
  { Header: "Address 2", accessor: "Address2" },
  { Header: "Contact Person", accessor: "contactPerson" },
  { Header: "Contact Person No", accessor: "contactPersonNo" },
  { Header: "Contact Email", accessor: "contactEmail" },
  { Header: "Contact Fax", accessor: "contactFax" },
  { Header: "Is Published", accessor: "isPublished" },
  {
    Header: "Action",
    accessor: "actions",
    Cell: ({ row }) => (
      <button
        onClick={() => handleAction(row.original.id)}
        className="bg-blue-500 text-white px-2 py-1 rounded">
        Action
      </button>
    ),
  },
];

const handleAction = (id) => {
  console.log(`Clicked action for ID ${id}`);
};

const ListEventOrganizer = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    handleGetAll();
  }, []);

  const exportToExcel = () => {
    const wsData = data.map((item) => ({
      ID: item.id,
      "Organizer Name": item.organizerName,
      "Location Name": item.shortName,
      "Address 1": item.Address1,
      "Address 2": item.Address2,
      "Contact Person": item.contactPerson,
      "Contact Person No": item.contactPersonNo,
      "Contact Email": item.contactEmail,
      "Contact Fax": item.contactFax,
      "Is Published": item.isPublished,
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

  // crud operation
  const [showPopup, setShowPopup] = useState(false); // Define showPopup state
  const [selectedCompanyId, setSelectedCompanyId] = useState(null); // Add this line

  const handleAction = (id) => {
    setSelectedCompanyId(id);
    setShowPopup(true);
  };

  const handleEdit = async () => {
    try {
      const response = await axios.put(
        `/api/companies/${selectedCompanyId}`,
        {}
      );
      console.log("Edit action successful", response.data);
    } catch (error) {
      console.error("Edit action failed", error);
    } finally {
      setShowPopup(false);
    }
  };

  const handleGetAll = () => {
    axios.get(`${baseUrl}api/v1/EventOrganiser`).then((response) => {
      console.log("Get All action successful", response.data.data);
      setTableData(response.data.data);
    });
  };

  // Popup

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
              <label>Event Name : </label>
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
      </div>
      <div className={`yourComponent ${isExpanded ? "expanded" : ""}`}>
        <div className="horizontalLine"></div>
        <div className="header">
          <div className="title">Search Result</div>
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
              }}>
              <button
                className="btn"
                onClick={exportToExcel}
                style={{ backgroundColor: "#fff", borderRadius: "8px" }}>
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
                      style={{ fontSize: "14px" }}>
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
                              style={{ fontSize: "12px" }}>
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
                          onClick={handleView}>
                          Show
                        </button>
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
                className="responsive-button">
                {"<<"}
              </button>
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                className="responsive-button">
                {"<"}
              </button>
              <button
                onClick={() => nextPage()}
                disabled={!canNextPage}
                className="responsive-button">
                {">"}
              </button>
              <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
                className="responsive-button">
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
                className="p-2 border rounded responsive-select">
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

export default ListEventOrganizer;
